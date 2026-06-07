import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { teamData as initialTeamData, TeamMember } from '../../data/mockData';
import { Edit2, Trash2, UserPlus, Shield, User, Radio, X, Camera, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { useSettings } from '../../context/SettingsContext';

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return canvas.toDataURL('image/jpeg');
}

export default function AdminTeam() {
  const location = useLocation();
  const navigate = useNavigate();
  const [team, setTeam] = useState(initialTeamData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const { settings, saveSettings } = useSettings();
  const [categories, setCategories] = useState<string[]>(['Usuário', 'Administrador', 'Locutor']);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    role: 'usuario',
    photo: '',
    program: '',
    facebook: '',
    instagram: '',
    twitter: '',
    email: '',
    password: ''
  });
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const [programs, setPrograms] = useState<string[]>([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetch('/api/team.php');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((m: any) => ({
              ...m,
              photo: m.photo || m.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'
            }));
            setTeam(mapped);
            return;
          }
        }
      } catch (e) {
        console.warn("API Team indisponível, usando fallback local");
      }

      const stored = localStorage.getItem('radioTeam');
      if (stored) {
        setTeam(JSON.parse(stored));
      } else {
        setTeam(initialTeamData);
        localStorage.setItem('radioTeam', JSON.stringify(initialTeamData));
      }
    };
    loadTeam();

    const storedPrograms = localStorage.getItem('radioPrograms');
    if (storedPrograms) {
      const parsed = JSON.parse(storedPrograms);
      setPrograms(parsed.map((p: any) => p.title));
    } else {
      setPrograms(['Manhã Show', 'Tarde Total', 'Noite de Sucessos', 'Sábado Especial']);
    }

    if (location.state?.startTour) {
      navigate('.', { replace: true, state: {} });
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-add-member', popover: { title: 'Adicionar Membro', description: 'Cadastre novos locutores ou administradores para a rádio.', side: "bottom", align: 'start' }},
          { element: '#tour-team-list', popover: { title: 'Sua Equipe', description: 'Aqui você visualiza e gerencia os membros cadastrados. Pode editar suas informações e fotos.', side: "top", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (settings.teamCategories) {
      try {
        const parsed = JSON.parse(settings.teamCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed);
        }
      } catch (e) {
        console.error("Failed to parse teamCategories", e);
      }
    }
  }, [settings.teamCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const name = newCategoryName.trim();

    // Evitar duplicados (case insensitive)
    if (categories.some(c => c.toLowerCase() === name.toLowerCase())) {
      alert("Esta categoria já existe.");
      return;
    }

    const updatedCategories = [...categories, name];
    setCategories(updatedCategories);
    setFormData(prev => ({ ...prev, role: name.toLowerCase() }));
    setNewCategoryName('');
    setShowAddCategoryForm(false);

    try {
      await saveSettings({
        teamCategories: JSON.stringify(updatedCategories)
      });
    } catch (e) {
      console.error("Erro ao salvar categorias", e);
      localStorage.setItem('teamCategories', JSON.stringify(updatedCategories));
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'administrador': return <Shield size={14} className="text-red-400" />;
      case 'locutor': return <Radio size={14} className="text-blue-400" />;
      case 'usuario': return <User size={14} className="text-slate-400" />;
      default: return <User size={14} className="text-purple-400" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'administrador': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'locutor': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'usuario': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja remover este membro da equipe?")) {
      const updated = team.filter(member => member.id !== id);
      setTeam(updated);
      try {
        const bodyData = updated.map((m: any) => ({
          ...m,
          imageUrl: m.photo || m.imageUrl || '',
          social: {
            facebook: m.facebook || '',
            instagram: m.instagram || '',
            twitter: m.twitter || ''
          }
        }));
        await fetch('/api/team.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyData) });
      } catch (e) {
        localStorage.setItem('radioTeam', JSON.stringify(updated));
      }
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      role: 'usuario',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      program: '',
      facebook: '',
      instagram: '',
      twitter: '',
      email: '',
      password: ''
    });
    setShowAddCategoryForm(false);
    setNewCategoryName('');
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setModalMode('edit');
    setFormData({
      ...member,
      facebook: member.facebook || '',
      instagram: member.instagram || '',
      twitter: member.twitter || '',
      email: member.email || '',
      password: member.password || ''
    });
    setShowAddCategoryForm(false);
    setNewCategoryName('');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Nome é obrigatório");
      return;
    }
    
    let updated;
    if (modalMode === 'create') {
      updated = [...team, formData];
    } else {
      updated = team.map(m => m.id === formData.id ? formData : m);
    }
    
    setTeam(updated);
    setIsModalOpen(false);

    try {
      const bodyData = updated.map((m: any) => ({
        ...m,
        imageUrl: m.photo || m.imageUrl || '',
        social: {
          facebook: m.facebook || '',
          instagram: m.instagram || '',
          twitter: m.twitter || ''
        }
      }));
      await fetch('/api/team.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
    } catch (e) {
      localStorage.setItem('radioTeam', JSON.stringify(updated));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Gerenciar Equipe</h1>
          <p className="text-slate-400 text-sm">Cadastre e gerencie os membros da sua rádio.</p>
        </div>
        <button 
          id="tour-add-member"
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
        >
          <UserPlus size={16} />
          Novo Membro
        </button>
      </div>

      <div id="tour-team-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 shadow-2xl flex flex-col justify-between"
          >
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base truncate max-w-[150px]">{member.name}</h3>
                  <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${getRoleBadgeColor(member.role)}`}>
                    {getRoleIcon(member.role)}
                    {member.role}
                  </div>
                </div>
              </div>

              {member.program && (
                <div className="bg-slate-900/50 rounded-lg p-3 border border-white/5 mb-4">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-1">Programa</p>
                  <p className="text-blue-400 text-sm font-bold">{member.program}</p>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 p-4 border-t border-white/5 flex justify-between gap-2">
              <button 
                onClick={() => openEditModal(member)}
                className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors text-xs font-bold"
              >
                <Edit2 size={14} />
                Editar
              </button>
              <button 
                onClick={() => handleDelete(member.id)}
                className="flex-1 flex items-center justify-center gap-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 px-3 py-2 rounded-lg transition-colors text-xs font-bold"
              >
                <Trash2 size={14} />
                Excluir
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/90 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-white font-black text-lg uppercase tracking-wider">
                  {modalMode === 'create' ? 'Adicionar Membro' : 'Editar Membro'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {imageToCrop ? (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
                      <Cropper
                        image={imageToCrop}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs font-black uppercase">Zoom</span>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="flex-1 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => setImageToCrop(null)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={async () => {
                          if (imageToCrop && croppedAreaPixels) {
                            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
                            setFormData({ ...formData, photo: croppedImage });
                            setImageToCrop(null);
                          }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
                      >
                        Salvar Corte
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Photo Preview & Upload */}
                    <div className="flex justify-center mb-4">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/20 cursor-pointer group"
                        title="Clique para alterar a foto"
                      >
                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera size={20} className="text-white mb-1" />
                          <span className="text-white text-[10px] font-bold uppercase">Alterar</span>
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-1">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider">URL da Foto</label>
                      <input
                        type="text"
                        value={formData.photo}
                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                        className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Nome</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                        placeholder="Nome do membro"
                      />
                    </div>

                    {/* Category/Role */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Categoria</label>
                        {!showAddCategoryForm && (
                          <button
                            type="button"
                            onClick={() => setShowAddCategoryForm(true)}
                            className="text-blue-500 hover:text-blue-400 text-xs font-bold flex items-center gap-1"
                          >
                            <Plus size={12} /> Nova Categoria
                          </button>
                        )}
                      </div>
                      {showAddCategoryForm ? (
                        <div className="flex gap-2 bg-slate-800/40 p-2 rounded-lg border border-white/5">
                          <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Nova categoria..."
                            className="flex-1 bg-slate-800 border border-white/5 rounded-md px-2.5 py-1.5 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleAddCategory}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors"
                          >
                            Adicionar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddCategoryForm(false);
                              setNewCategoryName('');
                            }}
                            className="text-slate-400 hover:text-white px-2 py-1.5 text-xs transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Program (Conditional) */}
                    {formData.role === 'locutor' && (
                      <div className="space-y-1">
                        <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Programa</label>
                        <select
                          value={formData.program || ''}
                          onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                        >
                          <option value="">Selecione um programa</option>
                          {programs.map((prog, index) => (
                            <option key={index} value={prog}>{prog}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Redes Sociais */}
                    <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                      <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2">Redes Sociais</p>
                      
                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Instagram (Link)</label>
                        <input
                          type="url"
                          value={formData.instagram || ''}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                          placeholder="https://instagram.com/usuario"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Facebook (Link)</label>
                        <input
                          type="url"
                          value={formData.facebook || ''}
                          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                          placeholder="https://facebook.com/usuario"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Twitter / X (Link)</label>
                        <input
                          type="url"
                          value={formData.twitter || ''}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                          placeholder="https://x.com/usuario"
                        />
                      </div>
                    </div>

                    {/* Dados de Acesso (Sub-área) */}
                    {formData.role === 'administrador' && (
                      <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2">Dados de Acesso</p>
                        
                        <div className="space-y-1">
                          <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Email</label>
                          <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                            placeholder="email@radio.com"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Senha</label>
                          <input
                            type="password"
                            value={formData.password || ''}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {!imageToCrop && (
                <div className="p-6 bg-slate-950/50 border-t border-white/5 flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-sm font-bold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
                  >
                    Salvar
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}




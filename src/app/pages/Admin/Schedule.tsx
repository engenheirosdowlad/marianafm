import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { motion, AnimatePresence } from 'framer-motion';
import { programData as initialProgramData, teamData, Program } from '../../data/mockData';
import { Calendar, Clock, User, Plus, Edit2, Trash2, X } from 'lucide-react';

const daysOfWeek = [
  { id: 'seg', name: 'Segunda' },
  { id: 'ter', name: 'Terça' },
  { id: 'qua', name: 'Quarta' },
  { id: 'qui', name: 'Quinta' },
  { id: 'sex', name: 'Sexta' },
  { id: 'sab', name: 'Sábado' },
  { id: 'dom', name: 'Domingo' }
];

export default function AdminSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedDay, setSelectedDay] = useState('seg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState<Program>({
    id: '',
    title: '',
    time: '',
    days: [],
    description: '',
    presenterId: ''
  });

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const response = await fetch('/api/schedule.php');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setPrograms(data);
            return;
          }
        }
      } catch (e) {
        console.warn("API Schedule indisponível, usando fallback");
      }

      const storedPrograms = localStorage.getItem('radioPrograms');
      if (storedPrograms) {
        setPrograms(JSON.parse(storedPrograms));
      } else {
        setPrograms(initialProgramData);
        localStorage.setItem('radioPrograms', JSON.stringify(initialProgramData));
      }
    };
    loadSchedule();

    if (location.state?.startTour) {
      // Clear state so it doesn't run again on refresh
      navigate('.', { replace: true, state: {} });
      
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-add-btn', popover: { title: 'Novo Programa', description: 'Clique aqui para cadastrar um novo programa ou horário na rádio.', side: "bottom", align: 'start' }},
          { element: '#tour-days-tabs', popover: { title: 'Dias da Semana', description: 'Alterne entre os dias para visualizar ou editar a programação específica daquele dia.', side: "bottom", align: 'start' }},
          { element: '#tour-programs-list', popover: { title: 'Grade de Programas', description: 'Aqui ficam listados todos os programas do dia. Você pode editar os horários ou o locutor de cada um.', side: "top", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [location, navigate]);

  const filteredPrograms = programs.filter(prog => prog.days.includes(selectedDay));

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este programa?")) {
      const updated = programs.filter(p => p.id !== id);
      setPrograms(updated);
      try {
      await fetch('/api/schedule.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
    } catch (e) {
      localStorage.setItem('radioPrograms', JSON.stringify(updated));
    }
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      time: '00:00 - 00:00',
      days: [selectedDay],
      description: '',
      presenterId: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prog: Program) => {
    setModalMode('edit');
    setFormData(prog);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.time.trim()) {
      alert("Título e Horário são obrigatórios");
      return;
    }

    let updated;
    if (modalMode === 'create') {
      updated = [...programs, formData];
    } else {
      updated = programs.map(p => p.id === formData.id ? formData : p);
    }
    
    setPrograms(updated);
    try {
      await fetch('/api/schedule.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) });
    } catch (e) {
      localStorage.setItem('radioPrograms', JSON.stringify(updated));
    }
    setIsModalOpen(false);
  };

  const toggleDayInForm = (dayId: string) => {
    const currentDays = formData.days;
    if (currentDays.includes(dayId)) {
      setFormData({ ...formData, days: currentDays.filter(d => d !== dayId) });
    } else {
      setFormData({ ...formData, days: [...currentDays, dayId] });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Gerenciar Grade</h1>
          <p className="text-slate-400 text-sm">Organize a programação semanal da rádio.</p>
        </div>
        <button 
          id="tour-add-btn"
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus size={16} />
          Novo Programa
        </button>
      </div>

      {/* Days Tabs */}
      <div id="tour-days-tabs" className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-thin scrollbar-thumb-slate-700">
        {daysOfWeek.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              selectedDay === day.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Programs List */}
      <div id="tour-programs-list" className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {filteredPrograms.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500 bg-slate-800/20 rounded-xl border border-white/5">
                Nenhum programa cadastrado para este dia.
              </div>
            ) : (
              filteredPrograms.map((prog) => {
                const presenter = teamData.find(t => t.id === prog.presenterId);
                return (
                  <div
                    key={prog.id}
                    className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden flex flex-col sm:flex-row"
                  >
                    <div className="bg-slate-900/50 p-4 flex flex-col justify-center items-center sm:border-r border-white/5 min-w-[120px]">
                      <Clock size={16} className="text-blue-500 mb-1" />
                      <span className="text-white font-bold text-sm">{prog.time.split(' - ')[0]}</span>
                      <span className="text-slate-500 text-[10px] font-bold uppercase">até</span>
                      <span className="text-white font-bold text-sm">{prog.time.split(' - ')[1]}</span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-base mb-1">{prog.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mb-2">{prog.description}</p>
                        
                        {presenter && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10">
                              <img src={presenter.photo} alt={presenter.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-slate-300 text-xs font-medium">{presenter.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/5">
                        <button 
                          onClick={() => openEditModal(prog)}
                          className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded transition-colors text-xs font-bold"
                        >
                          <Edit2 size={12} />
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(prog.id)}
                          className="flex items-center gap-1 text-slate-400 hover:text-red-400 px-2 py-1 rounded transition-colors text-xs font-bold"
                        >
                          <Trash2 size={12} />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-white font-black text-sm uppercase tracking-wider">
                  {modalMode === 'create' ? 'Adicionar Programa' : 'Editar Programa'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-4 space-y-3">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                    placeholder="Nome do programa"
                  />
                </div>

                {/* Time */}
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Horário (ex: 08:00 - 10:00)</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                    placeholder="00:00 - 00:00"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none h-20 resize-none"
                    placeholder="Sinopse do programa..."
                  />
                </div>

                {/* Presenter */}
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Locutor</label>
                  <select
                    value={formData.presenterId || ''}
                    onChange={(e) => setFormData({ ...formData, presenterId: e.target.value })}
                    className="w-full bg-slate-800 border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:border-blue-500 outline-none"
                  >
                    <option value="">Programação Automática</option>
                    {teamData.filter(t => t.role === 'locutor').map(locutor => (
                      <option key={locutor.id} value={locutor.id}>{locutor.name}</option>
                    ))}
                  </select>
                </div>

                {/* Days */}
                <div className="space-y-1">
                  <label className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Dias da Semana</label>
                  <div className="flex flex-wrap gap-1">
                    {daysOfWeek.map(day => {
                      const isSelected = formData.days.includes(day.id);
                      return (
                        <button
                          key={day.id}
                          onClick={() => toggleDayInForm(day.id)}
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500 hover:text-white'
                          }`}
                        >
                          {day.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/50 border-t border-white/5 flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

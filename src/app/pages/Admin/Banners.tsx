import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Save, Plus, Trash2, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  position?: string;
}

export default function AdminBanners() {
  const location = useLocation();
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedBanners = localStorage.getItem('siteBanners');
    if (storedBanners) {
      try {
        setBanners(JSON.parse(storedBanners));
      } catch (e) {
        console.error("Erro ao carregar banners", e);
      }
    }

    if (location.state?.startTour) {
      navigate('.', { replace: true, state: {} });
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-add-banner', popover: { title: 'Adicionar Banner', description: 'Clique aqui para adicionar uma nova imagem ao carrossel.', side: "top", align: 'center' }},
          { element: '#tour-save-banners', popover: { title: 'Salvar', description: 'Não se esqueça de salvar as alterações para publicá-las no site!', side: "bottom", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [location, navigate]);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('siteBanners', JSON.stringify(banners));
      setLoading(false);
      setSaved(true);
      
      // Dispatch event to update Home component
      window.dispatchEvent(new Event('bannersUpdated'));
      
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  };

  const addBanner = () => {
    const newBanner: Banner = {
      id: Date.now().toString(),
      imageUrl: '',
      linkUrl: '',
      position: 'center'
    };
    setBanners([...banners, newBanner]);
  };

  const removeBanner = (id: string) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const updateBanner = (id: string, field: keyof Banner, value: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBanner(id, 'imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="text-blue-500" /> Banners do Site
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Gerencie as imagens rotativas da página inicial</p>
        </div>
        
        <button
          id="tour-save-banners"
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
            saved 
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <>Salvo com sucesso!</>
          ) : (
            <><Save size={20} /> Salvar Alterações</>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 p-6 shadow-xl relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  Banner {index + 1}
                </h3>
                <button
                  onClick={() => removeBanner(banner.id)}
                  className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                  title="Remover Banner"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-400" /> Imagem do Banner (URL ou Upload)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={banner.imageUrl}
                      onChange={(e) => updateBanner(banner.id, 'imageUrl', e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Cole um link ou faça upload ->"
                    />
                    <label className="flex items-center justify-center bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 hover:border-blue-500 text-blue-400 hover:text-white px-4 rounded-lg cursor-pointer transition-all shrink-0">
                      <Upload size={18} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(banner.id, e)} 
                      />
                    </label>
                  </div>
                  {banner.imageUrl && (
                    <div className="mt-3 rounded-lg overflow-hidden border border-white/10 h-32 w-full bg-slate-900 relative">
                      <img src={banner.imageUrl} alt={`Preview banner ${index + 1}`} className={`w-full h-full object-cover object-${banner.position || 'center'}`} />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={14} className="text-emerald-400" /> Posição da Imagem no Banner
                  </label>
                  <select
                    value={banner.position || 'center'}
                    onChange={(e) => updateBanner(banner.id, 'position', e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="top">Topo (Focar na parte de cima)</option>
                    <option value="center">Centro (Padrão)</option>
                    <option value="bottom">Base (Focar na parte de baixo)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                    <LinkIcon size={14} className="text-purple-400" /> Link de Destino (Opcional)
                  </label>
                  <input
                    type="text"
                    value={banner.linkUrl}
                    onChange={(e) => updateBanner(banner.id, 'linkUrl', e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: https://wa.me/558199999999"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          id="tour-add-banner"
          onClick={addBanner}
          className="w-full py-6 rounded-xl border-2 border-dashed border-white/10 text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
            <Plus size={20} />
          </div>
          <span className="font-semibold text-sm">Adicionar Novo Banner</span>
        </button>

        {banners.length === 0 && (
          <div className="text-center p-8">
            <p className="text-slate-500">Nenhum banner cadastrado. Adicione um acima!</p>
          </div>
        )}
      </div>
    </div>
  );
}

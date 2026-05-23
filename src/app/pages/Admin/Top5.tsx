import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Trophy, Save, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Top5Item {
  position: number;
  title: string;
  artist: string;
  youtubeUrl: string;
}

const defaultTop5: Top5Item[] = [
  { position: 1, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', youtubeUrl: 'https://www.youtube.com/watch?v=kPa7bsKwL-c' },
  { position: 2, title: 'Birds of a Feather', artist: 'Billie Eilish', youtubeUrl: 'https://www.youtube.com/watch?v=d5kdQMkOOto' },
  { position: 3, title: 'Espresso', artist: 'Sabrina Carpenter', youtubeUrl: 'https://www.youtube.com/watch?v=eVli-tstM5E' },
  { position: 4, title: 'Si Antes Te Hubiera Conocido', artist: 'Karol G', youtubeUrl: 'https://www.youtube.com/watch?v=nC1ylqFhJzQ' },
  { position: 5, title: 'A Bar Song (Tipsy)', artist: 'Shaboozey', youtubeUrl: 'https://www.youtube.com/watch?v=t7bQwwqW-Hc' },
];

export default function AdminTop5() {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<Top5Item[]>(defaultTop5);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('top5Requests');
    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      localStorage.setItem('top5Requests', JSON.stringify(defaultTop5));
    }

    if (location.state?.startTour) {
      navigate('.', { replace: true, state: {} });
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-top5-list', popover: { title: 'Músicas Mais Pedidas', description: 'Edite o Nome, Artista e Link do YouTube das 5 músicas mais populares da rádio.', side: "top", align: 'start' }},
          { element: '#tour-save-top5', popover: { title: 'Salvar', description: 'Clique aqui após atualizar a lista para colocar as novidades no ar!', side: "bottom", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [location, navigate]);

  const handleChange = (index: number, field: keyof Top5Item, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSave = () => {
    localStorage.setItem('top5Requests', JSON.stringify(items));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-yellow-500" /> TOP 5
          </h1>
          <p className="text-slate-400 text-sm mt-1">Gerencie a lista do Top 5 com link do YouTube.</p>
        </div>
        <button 
          id="tour-save-top5"
          onClick={handleSave}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
            isSaved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
          }`}
        >
          <Save size={18} />
          {isSaved ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </div>

      <div id="tour-top5-list" className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="space-y-6">
          {items.map((item, index) => {
            const ytId = extractYoutubeId(item.youtubeUrl);
            const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/default.jpg` : null;

            return (
              <motion.div 
                key={item.position}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0">
                  {item.position}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Música</label>
                    <input 
                      type="text" 
                      value={item.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cantor / Banda</label>
                    <input 
                      type="text" 
                      value={item.artist}
                      onChange={(e) => handleChange(index, 'artist', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <LinkIcon size={12} /> Link do YouTube
                    </label>
                    <input 
                      type="url" 
                      value={item.youtubeUrl}
                      onChange={(e) => handleChange(index, 'youtubeUrl', e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="hidden sm:flex w-32 h-20 bg-slate-950 rounded-lg border border-slate-800 flex-shrink-0 overflow-hidden items-center justify-center">
                  {thumbUrl ? (
                    <img src={thumbUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-slate-700" size={24} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

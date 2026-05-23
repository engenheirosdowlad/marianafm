import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Youtube } from 'lucide-react';
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

export function TopRequests() {
  const [requests, setRequests] = useState<Top5Item[]>(defaultTop5);

  useEffect(() => {
    const loadTop5 = async () => {
      try {
        const response = await fetch('/api/top5.php');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setRequests(data);
            return;
          }
        }
      } catch (e) {
        console.warn("API Top5 indisponível, usando fallback local");
      }

      const stored = localStorage.getItem('top5Requests');
      if (stored) {
        try {
          setRequests(JSON.parse(stored));
        } catch (e) {
          console.error("Erro ao carregar top 5", e);
        }
      }
    };
    
    loadTop5();
    window.addEventListener('top5Updated', loadTop5);
    return () => window.removeEventListener('top5Updated', loadTop5);
  }, []);

  const extractYoutubeId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="glass-card p-5 h-full border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <Trophy className="text-yellow-500" size={16} />
          TOP 5
        </h2>
        <TrendingUp className="text-blue-500" size={16} />
      </div>

      <div className="space-y-3">
        {requests.map((request, index) => {
          const ytId = extractYoutubeId(request.youtubeUrl);
          const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/default.jpg` : null;

          return (
            <motion.a
              href={request.youtubeUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              key={request.position}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 hover:bg-slate-800/80 transition-all group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm 
                ${request.position === 1 ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors'}`}>
                {request.position}
              </div>
              
              <div className="w-14 h-10 bg-slate-950 rounded overflow-hidden flex-shrink-0 relative border border-white/10 group-hover:border-blue-500/50 transition-colors">
                 {thumbUrl ? (
                   <img src={thumbUrl} alt={request.title} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <Youtube size={16} className="text-slate-500" />
                   </div>
                 )}
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Youtube size={16} className="text-white drop-shadow-md" />
                 </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate group-hover:text-blue-400 transition-colors">{request.title}</p>
                <p className="text-slate-500 text-[11px] font-medium truncate uppercase tracking-tighter">{request.artist}</p>
              </div>

            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

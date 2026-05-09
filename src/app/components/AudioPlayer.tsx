import { Volume2, Radio } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayPauseIcon } from './ui/PlayPauseIcon';
import logo from '../../assets/logo.png';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack] = useState({
    title: "Cidade FM 87,9",
    artist: "Onde nasce o sucesso!",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2670&auto=format&fit=crop"
  });

  const [streamUrl, setStreamUrl] = useState("https://link.radio.br:18630/stream");

  useEffect(() => {
    const storedStream = localStorage.getItem('audioStreamUrl');
    if (storedStream) setStreamUrl(storedStream);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Erro ao reproduzir áudio:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="glass-card p-4 h-full flex flex-col justify-between overflow-hidden relative border border-white/5">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="absolute top-0 right-0 p-3">
        <div className="flex items-center gap-2 bg-red-600/20 px-2.5 py-1 rounded-full border border-red-600/30">
          <div className={`w-1.5 h-1.5 bg-red-600 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="text-[9px] font-black text-red-600 tracking-wider uppercase">No Ar</span>
        </div>
      </div>

      <div className="mb-2">
        <p className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2">Conecta 87,9 FM</p>
        <div className="relative group max-w-[150px] mx-auto">
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-full aspect-square rounded-full border-4 border-slate-900 shadow-2xl overflow-hidden relative z-10"
          >
            <img 
              src={currentTrack.cover} 
              alt="Cover" 
              className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'grayscale-0' : 'grayscale'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </motion.div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center border-2 border-slate-800 shadow-xl z-20">
             <Radio className={isPlaying ? "text-blue-500 animate-bounce" : "text-slate-600"} size={16} />
          </div>
          
          {/* Decorative Ring */}
          <div className="absolute -inset-2 border border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
        </div>
      </div>

      <div className="text-center space-y-0.5 mb-2">
        <h3 className="text-white font-black text-base tracking-tight leading-tight uppercase truncate">{currentTrack.title}</h3>
        <p className="text-slate-400 text-[10px] font-medium truncate tracking-wide">{currentTrack.artist}</p>
      </div>

      <div className="flex items-center gap-1 h-10 mb-4 px-3 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden shadow-inner">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying 
                ? [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`, `${20 + Math.random() * 60}%`] 
                : '15%' 
            }}
            transition={{ 
              duration: 0.5 + Math.random() * 0.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`flex-1 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-blue-500' : 'bg-slate-700'}`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:scale-110 active:scale-95 transition-all duration-300 transform"
            title={isPlaying ? "Pausar" : "Ouvir Rádio"}
          >
            <img src={logo} alt="Play/Pause" className={`w-[72px] h-[72px] object-contain ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/60 rounded-xl p-2.5 border border-white/5 group/vol">
          <Volume2 size={14} className="text-slate-500 group-hover/vol:text-blue-400 transition-colors" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
}

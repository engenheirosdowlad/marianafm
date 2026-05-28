import { Volume2, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';
import { useSettings } from '../context/SettingsContext';

export function AudioPlayer() {
  const { isPlaying, setIsPlaying, volume, setVolume, activePlayer, setActivePlayer } = usePlayer();
  const { settings } = useSettings();
  const isAudioPlaying = isPlaying && activePlayer === 'audio';

  const audioTitle = settings.audioPlayTitle || "CIDADE FM 87,9 MHZ";
  const audioSubtitle = settings.audioPlaySubtitle || "Onde nasce o sucesso!";
  const audioTitleSize = settings.audioTitleSize || "20";
  const audioTitleColor = settings.audioTitleColor || "#ffffff";
  const audioTitleFont = settings.audioTitleFont || "sans";
  const audioSubtitleSize = settings.audioSubtitleSize || "14";
  const audioSubtitleColor = settings.audioSubtitleColor || "#cbd5e1";
  const audioSubtitleFont = settings.audioSubtitleFont || "sans";

  const fontMap: Record<string, string> = {
    sans: "'Outfit', 'Inter', sans-serif",
    system: "system-ui, -apple-system, sans-serif",
    mono: "monospace"
  };
  const selectedTitleFont = fontMap[audioTitleFont] || fontMap.sans;
  const selectedSubtitleFont = fontMap[audioSubtitleFont] || fontMap.sans;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayPause = () => {
    if (activePlayer !== 'audio') {
      setActivePlayer('audio');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between items-center rounded-2xl border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Header */}
      <div className="text-center w-full z-10">
        <h2 className="text-white text-lg font-black tracking-widest uppercase opacity-90 drop-shadow-md">
          Ouça Ao Vivo!
        </h2>
      </div>

      {/* Giant Play Button */}
      <div className="relative group my-8 z-10 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-600/30 scale-125 pointer-events-none" />
        
        {/* Inner Glowing Ring */}
        <motion.div 
          animate={{ scale: isAudioPlaying ? [1, 1.05, 1] : 1, opacity: isAudioPlaying ? [0.5, 0.8, 0.5] : 0.5 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-blue-500/50 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)] pointer-events-none" 
        />
        
        {/* The Button */}
        <button
          onClick={handlePlayPause}
          className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),_0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:text-blue-300 transition-colors">
            {isAudioPlaying ? (
              <Pause fill="currentColor" size={36} />
            ) : (
              <Play fill="currentColor" size={36} className="ml-1" />
            )}
          </div>
        </button>
      </div>

      {/* Track Info */}
      <div className="text-center z-10 w-full mb-6">
        <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-1">
          Now Playing
        </p>
        <h3 
          style={{
            fontFamily: selectedTitleFont,
            fontSize: `${audioTitleSize}px`,
            color: audioTitleColor
          }}
          className="font-bold tracking-tight leading-tight truncate px-2"
        >
          {audioTitle}
        </h3>
        <p 
          style={{
            fontFamily: selectedSubtitleFont,
            fontSize: `${audioSubtitleSize}px`,
            color: audioSubtitleColor
          }}
          className="font-medium truncate mt-0.5"
        >
          {audioSubtitle}
        </p>
      </div>

      {/* Rainbow Equalizer */}
      <div className="flex items-center justify-center gap-[2px] h-12 w-full max-w-[200px] mb-6 z-10">
        {Array.from({ length: 30 }).map((_, i) => {
          // Rainbow color logic based on index
          const hue = (i / 30) * 360; // 0 to 360
          
          return (
            <motion.div
              key={i}
              animate={{ 
                height: isAudioPlaying 
                  ? [`${15 + Math.random() * 85}%`, `${20 + Math.random() * 80}%`, `${15 + Math.random() * 85}%`] 
                  : '10%' 
              }}
              transition={{ 
                duration: 0.4 + Math.random() * 0.4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundColor: isAudioPlaying ? `hsl(${hue}, 80%, 60%)` : '#334155'
              }}
              className="flex-1 rounded-full transition-colors duration-500 w-1"
            />
          );
        })}
      </div>

      {/* Volume Control (Hidden on small screens) */}
      <div className="w-full max-w-[200px] hidden lg:flex items-center gap-3 bg-slate-950/40 rounded-full px-3 py-1.5 border border-white/5 group/vol z-10">
        <Volume2 size={14} className="text-slate-500 group-hover/vol:text-blue-400 transition-colors" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      
    </div>
  );
}

import { useRef } from 'react';
import { Maximize2, ExternalLink, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';
import { useSettings } from '../context/SettingsContext';

export function VideoPlayer() {
  const { isPlaying, setIsPlaying, activePlayer, setActivePlayer } = usePlayer();
  const { settings } = useSettings();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVideoPlaying = isPlaying && activePlayer === 'video';
  const videoUrl = "https://player.radiosnaweb.com/clappr/video.php?urlplayer=https://5a57bda70564a.streamlock.net/marianafm/marianafm.sdp/playlist.m3u8";

  const videoPlayIcon = settings.videoPlayIcon || '/favicon.png';
  const videoPlayIconSize = parseInt(settings.videoPlayIconSize || '100');
  const videoPlayText = settings.videoPlayText || 'ASSISTA';
  const videoPlayTextSize = parseInt(settings.videoPlayTextSize || '16');

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl group relative">
      <div className="aspect-video w-full bg-black relative">
        <iframe
          src={isVideoPlaying ? `${videoUrl}&autoplay=true` : ''}
          className={`w-full h-full border-0 absolute inset-0 ${isVideoPlaying ? 'pointer-events-auto' : 'pointer-events-none'}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video Stream"
        ></iframe>
        
        {/* Custom Overlay / Splash Screen */}
        <AnimatePresence>
          {!isVideoPlaying && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 flex"
            >
              <button 
                onClick={() => {
                  setActivePlayer('video');
                  setIsPlaying(true);
                }}
                className="hover:scale-105 active:scale-95 transition-all duration-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.35)] flex flex-col items-center"
              >
                <img 
                  src={videoPlayIcon} 
                  alt={videoPlayText} 
                  style={{ width: `${videoPlayIconSize}px` }} 
                  className="object-contain" 
                />
                <span 
                  style={{ fontSize: `${videoPlayTextSize}px` }}
                  className="text-white/90 font-black uppercase tracking-widest mt-2"
                >
                  {videoPlayText}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md p-3 flex items-center justify-between border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <div className="flex items-center gap-2">
           <button
             onClick={() => {
               if (activePlayer !== 'video') {
                 setActivePlayer('video');
                 setIsPlaying(true);
               } else {
                 setIsPlaying(!isPlaying);
               }
             }}
             className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg flex items-center justify-center"
             title={isVideoPlaying ? "Pausar Vídeo" : "Reproduzir Vídeo"}
           >
             {isVideoPlaying ? <Pause size={14} /> : <Play size={14} className="text-blue-400" />}
           </button>
           <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest ml-1">Mariana FM - TV</span>
        </div>
        <div className="flex items-center gap-3">
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            >
              <ExternalLink size={16} />
            </a>
            <button 
              onClick={toggleFullscreen}
              className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
            >
              <Maximize2 size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Maximize2, ExternalLink } from 'lucide-react';
import { PlayPauseIcon } from './ui/PlayPauseIcon';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

export function VideoPlayer() {
  const [hasStarted, setHasStarted] = useState(false);
  const videoUrl = "https://player.radiosnaweb.com/clappr/video.php?urlplayer=https://5a57bda70564a.streamlock.net/marianafm/marianafm.sdp/playlist.m3u8";

  return (
    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl group relative">
      <div className="aspect-video w-full bg-black relative">
        <iframe
          src={`${videoUrl}${hasStarted ? '&autoplay=true' : ''}`}
          className="w-full h-full border-0 absolute inset-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title="Video Stream"
        ></iframe>
        
        {/* Custom Overlay / Splash Screen */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-20"
            >
              <button 
                onClick={() => setHasStarted(true)}
                className="hover:scale-110 active:scale-95 transition-all duration-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <img src={logo} alt="Play" className="w-[100px] h-[100px] object-contain" />
              </button>
              <p className="text-white font-black text-xs uppercase tracking-[0.3em] mt-6 animate-pulse">Assistir ao Vivo</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* UI Indicators */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">LIVE STREAM</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/80 backdrop-blur-md p-3 flex items-center justify-between border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <div className="flex items-center gap-2">
           <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Mariana FM - TV</span>
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
            <button className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
              <Maximize2 size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}

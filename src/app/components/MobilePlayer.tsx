import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../context/PlayerContext';

export function MobilePlayer() {
  const { isPlaying, setIsPlaying, volume, setVolume, activePlayer } = usePlayer();
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-t border-white/5 p-3 shadow-2xl flex items-center justify-between gap-2">


      
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center border border-white/10 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&h=100&fit=crop" 
            alt="Cover" 
            className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-bold truncate">Conecta 87,9 FM</p>
          <p className="text-slate-400 text-[10px] truncate">Onde nasce o sucesso!</p>
        </div>
      </div>

      {/* Center: Status Indicator (No Ar) */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-1.5 bg-red-600/20 px-2.5 py-1 rounded-full border border-red-600/30">
          <div className={`w-1.5 h-1.5 bg-red-600 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="text-[9px] font-black text-red-600 tracking-wider uppercase">No Ar</span>
        </div>
      </div>

      {/* Right: Volume + Play Button */}
      <div className="flex-1 flex items-center justify-end gap-3">
        {/* Volume Control */}
        {activePlayer === 'audio' && (
          <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1.5 rounded-lg border border-white/5 group/vol">
            <Volume2 size={12} className="text-slate-500 group-hover/vol:text-blue-400 transition-colors" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-12 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        )}


        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex-shrink-0"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}



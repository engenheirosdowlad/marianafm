import { Play, Pause } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { teamData, programData, Program } from '../data/mockData';

export function MobilePlayer() {
  const { isPlaying, setIsPlaying, activePlayer, setActivePlayer } = usePlayer();
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('radioPrograms');
    if (stored) {
      setPrograms(JSON.parse(stored));
    } else {
      setPrograms(programData);
    }
  }, []);

  const getCurrentProgram = () => {
    if (programs.length === 0) return null;
    
    const sorted = [...programs].sort((a, b) => {
      const aStart = a.time.split(' - ')[0];
      const bStart = b.time.split(' - ')[0];
      return aStart.localeCompare(bStart);
    });

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    let currentIndex = -1;

    for (let i = 0; i < sorted.length; i++) {
      const [start, end] = sorted[i].time.split(' - ');
      const startMins = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
      let endMins = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
      
      if (endMins <= startMins) endMins += 24 * 60;
      
      let checkMins = currentMins;
      if (startMins > endMins) {
        if (currentMins < endMins) checkMins += 24 * 60;
      } else if (endMins > 24 * 60 && currentMins < (endMins - 24 * 60)) {
         checkMins += 24 * 60;
      }

      if (checkMins >= startMins && checkMins < endMins) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex === -1) currentIndex = 0;
    return sorted[currentIndex];
  };

  const handlePlayPause = () => {
    if (activePlayer !== 'audio') {
      setActivePlayer('audio');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const isAudioPlaying = isPlaying && activePlayer === 'audio';
  const current = getCurrentProgram();
  const currentPresenter = current ? teamData.find(t => t.id === current.presenterId) : null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-white/5 p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4">
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center border border-white/10 overflow-hidden shadow-inner">
          <img 
            src={currentPresenter?.photo || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&h=100&fit=crop"} 
            alt="Cover" 
            className={`w-full h-full object-cover ${isAudioPlaying ? 'animate-pulse' : 'opacity-70'}`}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <p className="text-white text-sm font-black truncate leading-tight">{current?.title || "CIDADE FM 87,9 MHZ"}</p>
          <p className="text-blue-400 text-xs font-semibold truncate leading-tight mt-0.5">
            {currentPresenter ? `Com ${currentPresenter.name}` : "Onde nasce o sucesso!"}
          </p>
        </div>
      </div>

      {/* Right: Play Button */}
      <div className="flex items-center justify-end pr-1">
        <button
          onClick={handlePlayPause}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all flex-shrink-0 ${
            isAudioPlaying 
              ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30' 
              : 'bg-slate-800 hover:bg-slate-700 border border-white/10'
          }`}
        >
          {isAudioPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1 text-blue-400" />}
        </button>
      </div>
    </div>
  );
}



import { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import { teamData, programData, Program } from '../data/mockData';

export function ProgramCards() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [whatsappUrl, setWhatsappUrl] = useState('#');

  useEffect(() => {
    const loadWa = () => setWhatsappUrl(localStorage.getItem('whatsappUrl') || '#');
    loadWa();
    window.addEventListener('settingsUpdated', loadWa);
    
    const stored = localStorage.getItem('radioPrograms');
    if (stored) {
      setPrograms(JSON.parse(stored));
    } else {
      setPrograms(programData);
    }
    
    return () => window.removeEventListener('settingsUpdated', loadWa);
  }, []);

  const getCurrentAndNext = () => {
    if (programs.length === 0) return { current: null, next: [] };
    
    // Sort programs by start time
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
      
      // Handle overnight programs (e.g., 22:00 - 02:00)
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

    const current = sorted[currentIndex];
    const next = [];
    for (let i = 1; i <= 3; i++) {
      if (sorted.length > i) {
        next.push(sorted[(currentIndex + i) % sorted.length]);
      }
    }

    return { current, next };
  };

  const { current, next } = getCurrentAndNext();
  const currentPresenter = current ? teamData.find(t => t.id === current.presenterId) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Atual */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center">
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-5">No Ar Agora</p>
        {current && currentPresenter ? (
          <>
            <div className="w-24 h-24 rounded-2xl bg-slate-700 overflow-hidden mb-4 border-2 border-blue-500/50 shadow-xl shadow-blue-500/20">
              <img
                src={currentPresenter.photo}
                alt={currentPresenter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-black text-base w-full truncate">{current.title}</h3>
            <p className="text-blue-400 text-xs font-bold mt-1">Com {currentPresenter.name}</p>
          </>
        ) : current ? (
          <>
            <div className="w-24 h-24 rounded-2xl bg-slate-700 overflow-hidden mb-4 border-2 border-blue-500/50 flex items-center justify-center">
              <Radio size={40} className="text-blue-400" />
            </div>
            <h3 className="text-white font-black text-base w-full truncate">{current.title}</h3>
            <p className="text-blue-400 text-xs font-bold mt-1">{current.time}</p>
          </>
        ) : null}
      </div>

      {/* Card 2: A Seguir */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-5 border border-white/5 shadow-2xl flex flex-col">
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-4">A Seguir na Cidade</p>
        <div className="space-y-4 flex-1">
          {next.map(prog => {
            const presenter = teamData.find(t => t.id === prog.presenterId);
            return (
              <div key={prog.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-slate-300 text-[10px] font-black">{prog.time}</p>
                </div>
                <p className="text-white text-sm font-bold truncate">{prog.title}</p>
                {presenter && (
                  <p className="text-slate-400 text-[10px] font-medium mt-0.5 truncate">Com {presenter.name}</p>
                )}
              </div>
            );
          })}
          {next.length === 0 && <p className="text-slate-500 text-sm italic">Nenhum programa cadastrado.</p>}
        </div>
      </div>

      {/* Card 3: Peça sua Música */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/5 shadow-2xl flex flex-col items-center justify-between">
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2 text-center w-full">Participe Ao Vivo</p>
        
        <div className="flex-1 flex items-center justify-center py-6">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>

        <a 
          href={whatsappUrl}
          target={whatsappUrl !== '#' ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white font-black py-3 px-4 rounded-xl transition-all text-[11px] uppercase tracking-wider shadow-lg shadow-blue-900/50 border-t border-blue-400/30 text-center block"
        >
          MANDE SUA MENSAGEM
        </a>
      </div>
    </div>
  );
}

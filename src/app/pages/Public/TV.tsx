import { useState, useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { teamData, programData, Program } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { Capacitor } from '@capacitor/core';

export default function TV() {
  const { isPlaying, setIsPlaying, activePlayer, setActivePlayer } = usePlayer();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [showUI, setShowUI] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isNative = Capacitor.isNativePlatform();

  // Auto-play audio na TV
  useEffect(() => {
    setActivePlayer('audio');
    setIsPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lógica de inatividade para esconder a UI (apenas na web, não no app nativo)
  useEffect(() => {
    if (isNative) return;

    const handleActivity = () => {
      setShowUI(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowUI(false);
      }, 5000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    // Inicia o timer
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isNative]);

  // Navegação por teclado (Controle Remoto TV)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'MediaPlayPause') {
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, setIsPlaying]);

  // Carrega dados da API com fallback
  useEffect(() => {
    const loadData = async () => {
      try {
        const [progRes, teamRes] = await Promise.all([
          fetch('/api/schedule.php'),
          fetch('/api/team.php')
        ]);
        
        let fetchedProgs = [];
        let fetchedTeam = [];
        
        if (progRes.ok) {
          fetchedProgs = await progRes.json();
        }
        if (teamRes.ok) {
          fetchedTeam = await teamRes.json();
        }
        
        if (Array.isArray(fetchedProgs) && fetchedProgs.length > 0) {
          setPrograms(fetchedProgs);
        } else {
          const stored = localStorage.getItem('radioPrograms');
          if (stored) setPrograms(JSON.parse(stored));
          else setPrograms(programData);
        }
        
        if (Array.isArray(fetchedTeam) && fetchedTeam.length > 0) {
          setTeam(fetchedTeam);
        } else {
          const storedTeam = localStorage.getItem('radioTeam');
          if (storedTeam) setTeam(JSON.parse(storedTeam));
          else setTeam(teamData);
        }
      } catch (e) {
        console.warn("API indisponível no player de TV, usando fallback local", e);
        const stored = localStorage.getItem('radioPrograms');
        if (stored) setPrograms(JSON.parse(stored));
        else setPrograms(programData);

        const storedTeam = localStorage.getItem('radioTeam');
        if (storedTeam) setTeam(JSON.parse(storedTeam));
        else setTeam(teamData);
      }
    };
    loadData();
  }, []);

  const getCurrentAndNext = () => {
    if (programs.length === 0) return { current: null, next: null };
    
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
    const current = sorted[currentIndex];
    const next = sorted[(currentIndex + 1) % sorted.length];
    return { current, next };
  };

  const { current, next } = getCurrentAndNext();
  const currentPresenter = current ? team.find(t => t.id === (current.presenterId || current.host)) : null;
  const isAudioPlaying = isPlaying && activePlayer === 'audio';

  // --- SE FOR APLICATIVO NATIVO (APK/MÓVEL) ---
  if (isNative) {
    return (
      <div className="fixed inset-0 bg-black overflow-hidden flex flex-col justify-end">
        {/* Vídeo em Tela Cheia no Fundo */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://player.radiosnaweb.com/clappr/video.php?urlplayer=https://5a57bda70564a.streamlock.net/marianafm/marianafm.sdp/playlist.m3u8&autoplay=true"
            className="w-full h-full border-0 absolute inset-0 pointer-events-none"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Barra inferior permanente com info do programa atual e a próxima atração */}
        <div className="relative z-10 w-full bg-slate-950/90 backdrop-blur-md border-t border-white/10 p-4 flex items-center justify-between text-white shadow-2xl safe-bottom">
          <div className="flex flex-col min-w-0 flex-1 pr-4">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Ouvindo Agora</span>
            <span className="font-bold text-sm truncate leading-tight">{current?.title || "Programação Rádio"}</span>
            {currentPresenter && (
              <span className="text-slate-400 text-xs truncate mt-0.5">Com {currentPresenter.name}</span>
            )}
          </div>
          
          {next && (
            <div className="flex flex-col items-end text-right border-l border-white/15 pl-4 max-w-[50%] flex-shrink-0">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                A Seguir ({next.time.split(' - ')[0]})
              </span>
              <span className="font-bold text-xs truncate w-full leading-tight text-slate-200">{next.title}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- INTERFACE WEB COMPARTILHADA / DESKTOP / TV ---
  return (
    <div className={`fixed inset-0 bg-black overflow-hidden flex flex-col justify-end ${!showUI ? 'cursor-none' : ''}`}>
      {/* Vídeo em Tela Cheia no Fundo */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://player.radiosnaweb.com/clappr/video.php?urlplayer=https://5a57bda70564a.streamlock.net/marianafm/marianafm.sdp/playlist.m3u8&autoplay=true"
          className="w-full h-full object-cover pointer-events-none"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        {/* Degradê escuro na base para dar leitura aos textos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Overlay de Informações (Mostrado quando há atividade) */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full p-10 md:p-16 flex flex-col md:flex-row items-end justify-between gap-8"
          >
            {/* Esquerda: Info do Programa Atual */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-800 flex-shrink-0 flex items-center justify-center border-2 border-white/20 shadow-2xl overflow-hidden">
                <img 
                  src={currentPresenter?.photo || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&fit=crop"} 
                  alt="Apresentador" 
                  className={`w-full h-full object-cover ${isAudioPlaying ? 'scale-110' : 'opacity-70'} transition-all duration-1000`}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1 rounded-full border border-red-500/50 shadow-lg shadow-red-600/30">
                    <div className={`w-2 h-2 bg-white rounded-full ${isAudioPlaying ? 'animate-pulse' : ''}`} />
                    <span className="text-white text-xs font-black tracking-widest uppercase">No Ar</span>
                  </div>
                  {!isAudioPlaying && (
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">PAUSADO</span>
                  )}
                </div>
                <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight drop-shadow-xl">
                  {current?.title || "CIDADE FM 87,9 MHZ"}
                </h1>
                <p className="text-blue-400 text-xl md:text-2xl font-bold mt-1 drop-shadow-md">
                  {currentPresenter ? `Com ${currentPresenter.name}` : "Onde nasce o sucesso!"}
                </p>
              </div>
            </div>

            {/* Direita: Próximo Programa */}
            {next && (
              <div className="hidden lg:flex flex-col items-end text-right bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
                <p className="text-white/60 text-sm font-black uppercase tracking-widest mb-1">A Seguir ({next.time.split(' - ')[0]})</p>
                <h3 className="text-white text-xl font-bold">{next.title}</h3>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Volume2, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useSettings } from '../context/SettingsContext';
import { teamData, programData, Program } from '../data/mockData';
import logoImg from '../../assets/logo.png';

export function AudioPlayer() {
  const { isPlaying, setIsPlaying, volume, setVolume, activePlayer, setActivePlayer } = usePlayer();
  const { settings } = useSettings();
  const isAudioPlaying = isPlaying && activePlayer === 'audio';

  // ── Program / Presenter data (same logic as ProgramCards) ─────────────────
  const [programs, setPrograms] = useState<Program[]>([]);
  const [team, setTeam]         = useState<any[]>(teamData);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const res = await fetch('/api/schedule.php');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) { setPrograms(data); return; }
        }
      } catch { /* fallthrough */ }
      const stored = localStorage.getItem('radioPrograms');
      setPrograms(stored ? JSON.parse(stored) : programData);
    };
    const loadTeam = async () => {
      try {
        const res = await fetch('/api/team.php');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) { setTeam(data); return; }
        }
      } catch { /* fallthrough */ }
    };
    loadPrograms();
    loadTeam();
  }, []);

  const getCurrentProgram = () => {
    if (!programs.length) return null;
    const sorted = [...programs].sort((a, b) =>
      a.time.split(' - ')[0].localeCompare(b.time.split(' - ')[0])
    );
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    let idx = 0;
    for (let i = 0; i < sorted.length; i++) {
      const [s, e] = sorted[i].time.split(' - ');
      const sM = parseInt(s) * 60 + parseInt(s.split(':')[1]);
      let eM   = parseInt(e) * 60 + parseInt(e.split(':')[1]);
      if (eM <= sM) eM += 1440;
      let chk = nowMins;
      if (eM > 1440 && nowMins < (eM - 1440)) chk += 1440;
      if (chk >= sM && chk < eM) { idx = i; break; }
    }
    return sorted[idx];
  };

  const current          = getCurrentProgram();
  const currentPresenter = current ? team.find(t => t.id === current.presenterId) : null;

  // ── Settings ──────────────────────────────────────────────────────────────
  const audioLogoUrl     = settings.audioLogoUrl     || '';
  const audioLogoSize    = Number(settings.audioLogoSize    || '100');
  const audioLogoOffsetX = Number(settings.audioLogoOffsetX || '0');
  const audioLogoOffsetY = Number(settings.audioLogoOffsetY || '0');

  // Pause logo — falls back to play logo if not set
  const audioPauseLogoUrl     = settings.audioPauseLogoUrl     || audioLogoUrl;
  const audioPauseLogoSize    = Number(settings.audioPauseLogoSize    || settings.audioLogoSize    || '100');
  const audioPauseLogoOffsetX = Number(settings.audioPauseLogoOffsetX || '0');
  const audioPauseLogoOffsetY = Number(settings.audioPauseLogoOffsetY || '0');

  const textStopped   = settings.audioTextStopped   || 'Ouça Ao Vivo!';
  const textPlaying   = settings.audioTextPlaying   || 'No Ar Agora';
  const textNowPlaying = settings.audioTextNowPlaying || 'Now Playing';

  // Which logo/size/offset to use right now
  const activeSrc     = isAudioPlaying ? (audioLogoUrl || logoImg) : (audioPauseLogoUrl || audioLogoUrl || logoImg);
  const activeSize    = isAudioPlaying ? audioLogoSize    : audioPauseLogoSize;
  const activeOffsetX = isAudioPlaying ? audioLogoOffsetX : audioPauseLogoOffsetX;
  const activeOffsetY = isAudioPlaying ? audioLogoOffsetY : audioPauseLogoOffsetY;

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(parseFloat(e.target.value));

  const handlePlayPause = () => {
    if (activePlayer !== 'audio') {
      setActivePlayer('audio');
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const presenterPhoto =
    currentPresenter?.imageUrl ||
    currentPresenter?.photo ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop';

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl p-6 h-full flex flex-col items-center rounded-2xl border border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden gap-4">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />

      {/* ── Header text: changes on play ── */}
      <div className="text-center w-full z-10 pt-1">
        <AnimatePresence mode="wait">
          <motion.h2
            key={isAudioPlaying ? 'playing' : 'stopped'}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="text-white text-lg font-black tracking-widest uppercase opacity-90 drop-shadow-md"
          >
            {isAudioPlaying ? textPlaying : textStopped}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* ── Circle Play Button with logo inside ── */}
      <div className="relative flex items-center justify-center z-10 my-2">
        {/* Outer decorative ring */}
        <div className="absolute rounded-full border-2 border-slate-600/30 pointer-events-none"
          style={{ width: activeSize + 40, height: activeSize + 40 }} />

        {/* Inner pulsing ring */}
        <motion.div
          animate={{ scale: isAudioPlaying ? [1, 1.06, 1] : 1, opacity: isAudioPlaying ? [0.45, 0.8, 0.45] : 0.4 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.35)] pointer-events-none"
          style={{ width: activeSize + 24, height: activeSize + 24 }}
        />

        {/* The circular button */}
        <button
          onClick={handlePlayPause}
          className="relative rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.08),_0_10px_24px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden group"
          style={{ width: activeSize + 8, height: activeSize + 8 }}
          aria-label={isAudioPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Logo — crossfades between play and pause image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={isAudioPlaying ? 'play-logo' : 'pause-logo'}
              src={activeSrc}
              alt={isAudioPlaying ? 'Pausar' : 'Reproduzir'}
              initial={{ opacity: 0, scale: 0.85, x: activeOffsetX, y: activeOffsetY }}
              animate={{ opacity: 1, scale: 1,   x: activeOffsetX, y: activeOffsetY }}
              exit={{    opacity: 0, scale: 0.85, x: activeOffsetX, y: activeOffsetY }}
              transition={{ duration: 0.3 }}
              className="object-contain relative z-10"
              style={{ width: `${activeSize}px`, height: `${activeSize}px` }}
              draggable={false}
            />
          </AnimatePresence>
        </button>
      </div>


      {/* ── Current program info (replaces title/subtitle) ── */}
      <div className="text-center z-10 w-full px-2">
        <p className="text-slate-400 text-[10px] font-black tracking-widest uppercase mb-2">{textNowPlaying}</p>

        <AnimatePresence mode="wait">
          {current && currentPresenter ? (
            <motion.div
              key="with-presenter"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Presenter photo */}
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-blue-500/50 shadow-xl shadow-blue-500/20 flex-shrink-0">
                <img
                  src={presenterPhoto}
                  alt={currentPresenter.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-black text-sm leading-tight truncate">{current.title}</h3>
                <p className="text-blue-400 text-xs font-bold mt-0.5">Com {currentPresenter.name}</p>
              </div>
            </motion.div>
          ) : current ? (
            <motion.div
              key="no-presenter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-blue-500/30 flex items-center justify-center">
                <Radio size={28} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-black text-sm leading-tight truncate">{current.title}</h3>
                <p className="text-blue-400 text-xs font-bold mt-0.5">{current.time}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="no-program" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                <Radio size={28} className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-xs">Carregando programação…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Rainbow Equalizer ── */}
      <div className="flex items-center justify-center gap-[2px] h-10 w-full max-w-[180px] z-10">
        {Array.from({ length: 28 }).map((_, i) => {
          const hue = (i / 28) * 360;
          return (
            <motion.div
              key={i}
              animate={{
                height: isAudioPlaying
                  ? [`${15 + Math.random() * 85}%`, `${20 + Math.random() * 80}%`, `${15 + Math.random() * 85}%`]
                  : '10%',
              }}
              transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ backgroundColor: isAudioPlaying ? `hsl(${hue}, 80%, 60%)` : '#334155' }}
              className="flex-1 rounded-full transition-colors duration-500"
            />
          );
        })}
      </div>

      {/* ── Volume Control ── */}
      <div className="w-full max-w-[180px] hidden lg:flex items-center gap-3 bg-slate-950/40 rounded-full px-3 py-1.5 border border-white/5 group/vol z-10">
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

import { useState, useEffect } from 'react';
import { Save, Radio, Video, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [audioStream, setAudioStream] = useState('https://link.radio.br:18630/stream');
  const [videoStream, setVideoStream] = useState('https://link.radio.br:18630/video'); // Placeholder padrão
  const [siteName, setSiteName] = useState('Conecta 87,9 FM');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedAudio = localStorage.getItem('audioStreamUrl');
    const storedVideo = localStorage.getItem('videoStreamUrl');
    const storedName = localStorage.getItem('siteName');

    if (storedAudio) setAudioStream(storedAudio);
    if (storedVideo) setVideoStream(storedVideo);
    if (storedName) setSiteName(storedName);
  }, []);

  const handleSave = () => {
    setLoading(true);
    localStorage.setItem('audioStreamUrl', audioStream);
    localStorage.setItem('videoStreamUrl', videoStream);
    localStorage.setItem('siteName', siteName);
    
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Configurações do Sistema</h1>
          <p className="text-slate-400 text-sm">Gerencie os links de transmissão e dados básicos da rádio.</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 shadow-2xl p-6 space-y-6">
        {/* Site Name */}
        <div className="space-y-1">
          <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
            <Globe size={14} className="text-blue-400" /> Nome da Rádio / Site
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
            placeholder="Ex: Conecta 87,9 FM"
          />
        </div>

        {/* Audio Stream */}
        <div className="space-y-1">
          <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
            <Radio size={14} className="text-green-400" /> Link do Stream de Áudio
          </label>
          <input
            type="text"
            value={audioStream}
            onChange={(e) => setAudioStream(e.target.value)}
            className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            placeholder="https://..."
          />
          <p className="text-slate-500 text-[10px]">URL direta do streaming de áudio (Icecast, Shoutcast, etc.)</p>
        </div>

        {/* Video Stream */}
        <div className="space-y-1">
          <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
            <Video size={14} className="text-red-400" /> Link do Stream de Vídeo
          </label>
          <input
            type="text"
            value={videoStream}
            onChange={(e) => setVideoStream(e.target.value)}
            className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            placeholder="https://..."
          />
          <p className="text-slate-500 text-[10px]">URL do streaming de vídeo ou link de incorporação (YouTube Live, Facebook, etc.)</p>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-white/5 flex justify-end items-center gap-4">
          {saved && (
            <span className="text-green-400 text-sm font-bold animate-pulse">✓ Configurações salvas!</span>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
          >
            <Save size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}

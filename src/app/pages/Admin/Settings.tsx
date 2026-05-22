import { useState, useEffect } from 'react';
import { Save, Radio, Video, Globe, MessageCircle, Instagram, Facebook, Phone, Upload } from 'lucide-react';

export default function AdminSettings() {
  const [audioStream, setAudioStream] = useState('https://link.radio.br:18630/stream');
  const [videoStream, setVideoStream] = useState('https://link.radio.br:18630/video');
  const [siteName, setSiteName] = useState('CIDADE FM 87,9 MHZ');
  const [logoUrl, setLogoUrl] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Seja bem-vindo a Cidade FM');
  const [headerSubtitle, setHeaderSubtitle] = useState('onde nasce o sucesso');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedAudio = localStorage.getItem('audioStreamUrl');
    const storedVideo = localStorage.getItem('videoStreamUrl');
    const storedName = localStorage.getItem('siteName');
    const storedLogo = localStorage.getItem('logoUrl');
    const storedHTitle = localStorage.getItem('headerTitle');
    const storedHSub = localStorage.getItem('headerSubtitle');
    const storedWaUrl = localStorage.getItem('whatsappUrl');
    const storedWaNum = localStorage.getItem('whatsappNumber');
    const storedInsta = localStorage.getItem('instagramUrl');
    const storedFb = localStorage.getItem('facebookUrl');

    if (storedAudio) setAudioStream(storedAudio);
    if (storedVideo) setVideoStream(storedVideo);
    if (storedName) setSiteName(storedName);
    if (storedLogo) setLogoUrl(storedLogo);
    if (storedHTitle) setHeaderTitle(storedHTitle);
    if (storedHSub) setHeaderSubtitle(storedHSub);
    if (storedWaUrl) setWhatsappUrl(storedWaUrl);
    if (storedWaNum) setWhatsappNumber(storedWaNum);
    if (storedInsta) setInstagramUrl(storedInsta);
    if (storedFb) setFacebookUrl(storedFb);
  }, []);

  const handleSave = () => {
    setLoading(true);
    localStorage.setItem('audioStreamUrl', audioStream);
    localStorage.setItem('videoStreamUrl', videoStream);
    localStorage.setItem('siteName', siteName);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('headerTitle', headerTitle);
    localStorage.setItem('headerSubtitle', headerSubtitle);
    localStorage.setItem('whatsappUrl', whatsappUrl);
    localStorage.setItem('whatsappNumber', whatsappNumber);
    localStorage.setItem('instagramUrl', instagramUrl);
    localStorage.setItem('facebookUrl', facebookUrl);
    
    // Dispatch an event so components like Footer can update immediately
    window.dispatchEvent(new Event('settingsUpdated'));
    
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Configurações do Sistema</h1>
          <p className="text-slate-400 text-sm">Gerencie os links de transmissão e dados básicos da rádio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream Settings */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Radio className="text-blue-500" size={18} /> Transmissão
          </h2>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Globe size={14} className="text-blue-400" /> Nome da Rádio / Site
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: CIDADE FM 87,9 MHZ"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Logo do Site (URL ou Upload)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                placeholder="Cole um link ou clique ao lado ->"
              />
              <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Fazer upload de imagem">
                <Upload size={18} />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogoUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
              </label>
            </div>
            {logoUrl && logoUrl.startsWith('data:image') && (
              <p className="text-[10px] text-green-400 mt-1">✓ Imagem carregada do computador.</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Radio size={14} className="text-green-400" /> Link do Stream de Áudio
            </label>
            <input
              type="text"
              value={audioStream}
              onChange={(e) => setAudioStream(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Video size={14} className="text-red-400" /> Link do Stream de Vídeo
            </label>
            <input
              type="text"
              value={videoStream}
              onChange={(e) => setVideoStream(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            />
          </div>
        </div>

        {/* Header Texts Settings */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="text-blue-500" size={18} /> Textos do Cabeçalho Animado
          </h2>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Título Principal
            </label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: Seja bem-vindo a Cidade FM"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={headerSubtitle}
              onChange={(e) => setHeaderSubtitle(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: onde nasce o sucesso"
            />
          </div>
        </div>

        {/* Social Links Settings */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="text-blue-500" size={18} /> Redes Sociais e Contato
          </h2>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Phone size={14} className="text-slate-400" /> Número de Contato / WhatsApp
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: (81) 99999-9999"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <MessageCircle size={14} className="text-green-500" /> Link do WhatsApp
            </label>
            <input
              type="url"
              value={whatsappUrl}
              onChange={(e) => setWhatsappUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
              placeholder="https://wa.me/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Instagram size={14} className="text-pink-500" /> Link do Instagram
            </label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Facebook size={14} className="text-blue-500" /> Link do Facebook
            </label>
            <input
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
        {saved && (
          <span className="text-green-400 text-sm font-bold animate-pulse">✓ Configurações salvas!</span>
        )}
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20"
        >
          <Save size={18} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Salvando...' : 'Salvar Todas as Alterações'}
        </button>
      </div>
    </div>
  );
}

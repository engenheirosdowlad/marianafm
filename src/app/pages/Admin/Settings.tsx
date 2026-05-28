import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Save, Radio, Video, Globe, MessageCircle, Instagram, Facebook, Phone, Upload, Info } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, saveSettings } = useSettings();
  
  const [audioStream, setAudioStream] = useState('https://link.radio.br:18630/stream');
  const [videoStream, setVideoStream] = useState('https://link.radio.br:18630/video');
  const [siteName, setSiteName] = useState('CIDADE FM 87,9 MHZ');
  const [logoUrl, setLogoUrl] = useState('');
  const [headerPhrases, setHeaderPhrases] = useState('Seja bem-vindo a Cidade FM');
  const [headerSubtitleEnabled, setHeaderSubtitleEnabled] = useState(true);
  const [headerSubtitle, setHeaderSubtitle] = useState('onde nasce o sucesso');
  const [headerTextDuration, setHeaderTextDuration] = useState('5000');
  const [headerTransitionSpeed, setHeaderTransitionSpeed] = useState('700');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  
  const [dividerThickness, setDividerThickness] = useState('1');
  const [dividerGlow, setDividerGlow] = useState('20');
  
  const [visualizerColor, setVisualizerColor] = useState('#3b82f6');
  const [visualizerIntensity, setVisualizerIntensity] = useState('50');
  const [visualizerThickness, setVisualizerThickness] = useState('5');
  const [playImageSize, setPlayImageSize] = useState('200');
  const [logoSize, setLogoSize] = useState('60');
  
  const [headerTextSize, setHeaderTextSize] = useState('24');
  const [headerTextEffect, setHeaderTextEffect] = useState('fade');
  const [headerTextFont, setHeaderTextFont] = useState('sans');
  const [headerTextColor, setHeaderTextColor] = useState('#ffffff');

  const [videoPlayIcon, setVideoPlayIcon] = useState('/favicon.png');
  const [videoPlayIconSize, setVideoPlayIconSize] = useState('100');
  const [videoPlayText, setVideoPlayText] = useState('ASSISTA');
  const [videoPlayTextSize, setVideoPlayTextSize] = useState('16');
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.audioStreamUrl) setAudioStream(settings.audioStreamUrl);
    if (settings.videoStreamUrl) setVideoStream(settings.videoStreamUrl);
    if (settings.siteName) setSiteName(settings.siteName);
    if (settings.logoUrl) setLogoUrl(settings.logoUrl);
    if (settings.headerPhrases) {
      setHeaderPhrases(settings.headerPhrases);
    } else if (settings.headerTitle) {
      setHeaderPhrases(settings.headerTitle);
    }
    if (settings.headerSubtitleEnabled) {
      setHeaderSubtitleEnabled(settings.headerSubtitleEnabled === 'true');
    }
    if (settings.headerSubtitle) setHeaderSubtitle(settings.headerSubtitle);
    if (settings.whatsappUrl) setWhatsappUrl(settings.whatsappUrl);
    if (settings.whatsappNumber) setWhatsappNumber(settings.whatsappNumber);
    if (settings.instagramUrl) setInstagramUrl(settings.instagramUrl);
    if (settings.facebookUrl) setFacebookUrl(settings.facebookUrl);
    if (settings.youtubeUrl) setYoutubeUrl(settings.youtubeUrl);
    if (settings.contactEmail) setContactEmail(settings.contactEmail);

    
    if (settings.dividerThickness) setDividerThickness(settings.dividerThickness);
    if (settings.dividerGlow) setDividerGlow(settings.dividerGlow);

    if (settings.visualizerColor) setVisualizerColor(settings.visualizerColor);
    if (settings.visualizerIntensity) setVisualizerIntensity(settings.visualizerIntensity);
    if (settings.visualizerThickness) setVisualizerThickness(settings.visualizerThickness);
    if (settings.logoSize) setLogoSize(settings.logoSize);
    if (settings.headerTextSize) setHeaderTextSize(settings.headerTextSize);
    if (settings.headerTextEffect) setHeaderTextEffect(settings.headerTextEffect);
    if (settings.headerTextFont) setHeaderTextFont(settings.headerTextFont);
    if (settings.headerTextColor) setHeaderTextColor(settings.headerTextColor);
    if (settings.headerTextDuration) setHeaderTextDuration(settings.headerTextDuration);
    if (settings.headerTransitionSpeed) setHeaderTransitionSpeed(settings.headerTransitionSpeed);

    if (settings.videoPlayIcon) setVideoPlayIcon(settings.videoPlayIcon);
    if (settings.videoPlayIconSize) setVideoPlayIconSize(settings.videoPlayIconSize);
    if (settings.videoPlayText) setVideoPlayText(settings.videoPlayText);
    if (settings.videoPlayTextSize) setVideoPlayTextSize(settings.videoPlayTextSize);

    if (location.state?.startTour) {
      navigate('.', { replace: true, state: {} });
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-settings-streams', popover: { title: 'Transmissão', description: 'Configure os links de áudio e vídeo (YouTube/Twitch) da sua rádio.', side: "right", align: 'start' }},
          { element: '#tour-settings-social', popover: { title: 'Redes Sociais', description: 'Cadastre os links do seu WhatsApp, Instagram e Facebook.', side: "left", align: 'start' }},
          { element: '#tour-save-settings', popover: { title: 'Salvar Configurações', description: 'Sempre que alterar alguma coisa aqui, lembre-se de salvar.', side: "bottom", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [settings, location, navigate]);

  const handleSave = async () => {
    setLoading(true);
    
    try {
      await saveSettings({
        audioStreamUrl: audioStream,
        videoStreamUrl: videoStream,
        siteName: siteName,
        logoUrl: logoUrl,
        headerTitle: headerPhrases.split('\n')[0] || '',
        headerPhrases: headerPhrases,
        headerSubtitleEnabled: headerSubtitleEnabled ? 'true' : 'false',
        headerSubtitle: headerSubtitle,
        whatsappUrl: whatsappUrl,
        whatsappNumber: whatsappNumber,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        youtubeUrl: youtubeUrl,
        contactEmail: contactEmail,
        dividerThickness: dividerThickness,
        dividerGlow: dividerGlow,
        visualizerColor: visualizerColor,
        visualizerIntensity: visualizerIntensity,
        visualizerThickness: visualizerThickness,

        playImageSize: playImageSize,
        logoSize: logoSize,
        headerTextSize: headerTextSize,
        headerTextEffect: headerTextEffect,
        headerTextFont: headerTextFont,
        headerTextColor: headerTextColor,
        headerTextDuration: headerTextDuration,
        headerTransitionSpeed: headerTransitionSpeed,
        videoPlayIcon,
        videoPlayIconSize,
        videoPlayText,
        videoPlayTextSize
      });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Erro ao salvar as configurações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Configurações do Sistema</h1>
          <p className="text-slate-400 text-sm">Gerencie os links de transmissão e dados básicos da rádio.</p>
        </div>
        <button
          id="tour-save-settings"
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
            saved 
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <>Salvo com sucesso!</>
          ) : (
            <><Save size={20} /> Salvar Alterações</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stream Settings */}
        <div id="tour-settings-streams" className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
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
              Frases Rotativas (Uma por Linha)
            </label>
            <textarea
              value={headerPhrases}
              onChange={(e) => setHeaderPhrases(e.target.value)}
              rows={4}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Digite as frases, uma em cada linha.&#10;Ex:&#10;Seja bem-vindo a Cidade FM&#10;A rádio que você ama&#10;Onde nasce o sucesso"
            />
          </div>

          <div className="flex items-center gap-3 py-2 bg-slate-900/40 p-3 rounded-lg border border-white/5">
            <input
              type="checkbox"
              id="headerSubtitleEnabled"
              checked={headerSubtitleEnabled}
              onChange={(e) => setHeaderSubtitleEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-slate-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="headerSubtitleEnabled" className="text-slate-300 text-sm font-semibold select-none cursor-pointer">
              Exibir Subtítulo Fixo
            </label>
          </div>

          {headerSubtitleEnabled && (
            <div className="space-y-1 animate-fadeIn">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                Texto do Subtítulo Fixo
              </label>
              <input
                type="text"
                value={headerSubtitle}
                onChange={(e) => setHeaderSubtitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: onde nasce o sucesso"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                <span>Tamanho da Fonte</span>
                <span className="text-blue-400">{headerTextSize}px</span>
              </label>
              <input
                type="range"
                min="12"
                max="36"
                value={headerTextSize}
                onChange={(e) => setHeaderTextSize(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                Cor do Texto
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={headerTextColor}
                  onChange={(e) => setHeaderTextColor(e.target.value)}
                  className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                />
                <input
                  type="text"
                  value={headerTextColor}
                  onChange={(e) => setHeaderTextColor(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                Tipo da Fonte
              </label>
              <select
                value={headerTextFont}
                onChange={(e) => setHeaderTextFont(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              >
                <option value="sans">Sans-serif Moderno</option>
                <option value="system">Sistema Padrão</option>
                <option value="mono">Monospace Digital</option>
              </select>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                Efeito Visual
              </label>
              <select
                value={headerTextEffect}
                onChange={(e) => setHeaderTextEffect(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              >
                <option value="fade">Desvanecer (Fade)</option>
                <option value="pulse">Pulsar (Glow)</option>
                <option value="static">Estático (Sem Efeito)</option>
              </select>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                <span>Tempo de Exibição</span>
                <span className="text-blue-400">{(Number(headerTextDuration) / 1000).toFixed(1)}s</span>
              </label>
              <input
                type="range"
                min="1500"
                max="10000"
                step="500"
                value={headerTextDuration}
                onChange={(e) => setHeaderTextDuration(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                <span>Velocidade de Transição</span>
                <span className="text-blue-400">{headerTransitionSpeed}ms</span>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={headerTransitionSpeed}
                onChange={(e) => setHeaderTransitionSpeed(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div id="tour-settings-social" className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
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
              <Info size={14} className="text-slate-400" /> E-mail de Contato (Rodapé)
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
              placeholder="Ex: contato@cidadefmpa.com.br"
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

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <Globe size={14} className="text-red-500" /> Link do YouTube
            </label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            />
          </div>
        </div>

        {/* Layout Customization */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="text-blue-500" size={18} /> Estilos do Layout
          </h2>

          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Espessura das Barras Divisórias (px)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={dividerThickness}
              onChange={(e) => setDividerThickness(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
            />
          </div>



          <div className="space-y-1">
            <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Intensidade do Brilho/Neon das Barras
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={dividerGlow}
              onChange={(e) => setDividerGlow(e.target.value)}
              className="w-full accent-blue-500"
            />
            <div className="text-right text-slate-500 text-xs mt-1">{dividerGlow}px de propagação</div>
          </div>

          {/* Visualizador de Áudio */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Radio className="text-blue-500" size={16} /> Visualizador de Áudio (Fundo)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                  <span>Intensidade / Brilho</span>
                  <span className="text-blue-400">{visualizerIntensity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={visualizerIntensity}
                  onChange={(e) => setVisualizerIntensity(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                  <span>Espessura das Barras</span>
                  <span className="text-blue-400">{visualizerThickness}px</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={visualizerThickness}
                  onChange={(e) => setVisualizerThickness(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 pt-4 border-t border-white/5">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                  <span>Tamanho do Botão "Assistir ao Vivo"</span>
                  <span className="text-blue-400">{playImageSize}px</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="10"
                  value={playImageSize}
                  onChange={(e) => setPlayImageSize(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 pt-4 border-t border-white/5">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                  <span>Tamanho da Logo do Cabeçalho</span>
                  <span className="text-blue-400">{logoSize}px</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={logoSize}
                  onChange={(e) => setLogoSize(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Player de Vídeo */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6 lg:col-span-2">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Video className="text-blue-500" size={18} /> Player de Vídeo (Overlay de Play)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                Ícone do Player (Favicon ou URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoPlayIcon}
                  onChange={(e) => setVideoPlayIcon(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                  placeholder="Ex: /favicon.png"
                />
                <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Fazer upload do Ícone">
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
                          setVideoPlayIcon(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                <span>Tamanho do Ícone</span>
                <span className="text-blue-400">{videoPlayIconSize}px</span>
              </label>
              <input
                type="range"
                min="30"
                max="250"
                step="5"
                value={videoPlayIconSize}
                onChange={(e) => setVideoPlayIconSize(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                Texto do Botão
              </label>
              <input
                type="text"
                value={videoPlayText}
                onChange={(e) => setVideoPlayText(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: ASSISTA"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between">
                <span>Tamanho da Fonte do Texto</span>
                <span className="text-blue-400">{videoPlayTextSize}px</span>
              </label>
              <input
                type="range"
                min="10"
                max="36"
                value={videoPlayTextSize}
                onChange={(e) => setVideoPlayTextSize(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>
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

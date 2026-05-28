import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Save, Radio, Video, Globe, MessageCircle, Instagram, Facebook, Phone, Upload, Info, RotateCcw } from 'lucide-react';
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
  
  const [audioPlayTitle, setAudioPlayTitle] = useState('CIDADE FM 87,9 MHZ');
  const [audioPlaySubtitle, setAudioPlaySubtitle] = useState('Onde nasce o sucesso!');
  const [audioTitleSize, setAudioTitleSize] = useState('20');
  const [audioTitleColor, setAudioTitleColor] = useState('#ffffff');
  const [audioTitleFont, setAudioTitleFont] = useState('sans');
  const [audioSubtitleSize, setAudioSubtitleSize] = useState('14');
  const [audioSubtitleColor, setAudioSubtitleColor] = useState('#cbd5e1');
  const [footerAddressStreet, setFooterAddressStreet] = useState('Avenida Cronge da Silveira, nº 805');
  const [footerAddressDetails, setFooterAddressDetails] = useState('Altos, Sala 02 — Centro');
  const [footerAddressCity, setFooterAddressCity] = useState('CEP: 67400-112 — Barcarena, Pará');
  const [footerMapsQuery, setFooterMapsQuery] = useState('Avenida Cronge da Silveira, 805 - Centro, Barcarena - PA, 67400-112');
  const [footerStreetViewUrl, setFooterStreetViewUrl] = useState('https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-1.5058,-48.6258');
  const [footerCopyrightText, setFooterCopyrightText] = useState('Cidade FM PA. Todos os direitos reservados.');
  const [footerHeaderColor, setFooterHeaderColor] = useState('#f59e0b');
  const [footerHeaderSize, setFooterHeaderSize] = useState('11');
  const [footerContentColor, setFooterContentColor] = useState('#cbd5e1');
  const [footerContentSize, setFooterContentSize] = useState('14');
  const [footerIconSize, setFooterIconSize] = useState('18');
  const [footerIconColor, setFooterIconColor] = useState('#94a3b8');
  const [footerIconWhatsapp, setFooterIconWhatsapp] = useState('');
  const [footerIconInstagram, setFooterIconInstagram] = useState('');
  const [footerIconFacebook, setFooterIconFacebook] = useState('');
  const [footerIconYoutube, setFooterIconYoutube] = useState('');

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('transmission');

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

    if (settings.audioPlayTitle) setAudioPlayTitle(settings.audioPlayTitle);
    if (settings.audioPlaySubtitle) setAudioPlaySubtitle(settings.audioPlaySubtitle);
    if (settings.audioTitleSize) setAudioTitleSize(settings.audioTitleSize);
    if (settings.audioTitleColor) setAudioTitleColor(settings.audioTitleColor);
    if (settings.audioTitleFont) setAudioTitleFont(settings.audioTitleFont);
    if (settings.audioSubtitleSize) setAudioSubtitleSize(settings.audioSubtitleSize);
    if (settings.audioSubtitleColor) setAudioSubtitleColor(settings.audioSubtitleColor);
    if (settings.audioSubtitleFont) setAudioSubtitleFont(settings.audioSubtitleFont);

    if (settings.footerAddressStreet) setFooterAddressStreet(settings.footerAddressStreet);
    if (settings.footerAddressDetails) setFooterAddressDetails(settings.footerAddressDetails);
    if (settings.footerAddressCity) setFooterAddressCity(settings.footerAddressCity);
    if (settings.footerMapsQuery) setFooterMapsQuery(settings.footerMapsQuery);
    if (settings.footerStreetViewUrl) setFooterStreetViewUrl(settings.footerStreetViewUrl);
    if (settings.footerCopyrightText) setFooterCopyrightText(settings.footerCopyrightText);
    if (settings.footerHeaderColor) setFooterHeaderColor(settings.footerHeaderColor);
    if (settings.footerHeaderSize) setFooterHeaderSize(settings.footerHeaderSize);
    if (settings.footerContentColor) setFooterContentColor(settings.footerContentColor);
    if (settings.footerContentSize) setFooterContentSize(settings.footerContentSize);
    if (settings.footerIconSize) setFooterIconSize(settings.footerIconSize);
    if (settings.footerIconColor) setFooterIconColor(settings.footerIconColor);
    if (settings.footerIconWhatsapp) setFooterIconWhatsapp(settings.footerIconWhatsapp);
    if (settings.footerIconInstagram) setFooterIconInstagram(settings.footerIconInstagram);
    if (settings.footerIconFacebook) setFooterIconFacebook(settings.footerIconFacebook);
    if (settings.footerIconYoutube) setFooterIconYoutube(settings.footerIconYoutube);

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
        videoPlayTextSize,
        audioPlayTitle,
        audioPlaySubtitle,
        audioTitleSize,
        audioTitleColor,
        audioTitleFont,
        audioSubtitleSize,
        audioSubtitleColor,
        audioSubtitleFont,
        footerAddressStreet,
        footerAddressDetails,
        footerAddressCity,
        footerMapsQuery,
        footerStreetViewUrl,
        footerCopyrightText,
        footerHeaderColor,
        footerHeaderSize,
        footerContentColor,
        footerContentSize,
        footerIconSize,
        footerIconColor,
        footerIconWhatsapp,
        footerIconInstagram,
        footerIconFacebook,
        footerIconYoutube
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

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {[
          { id: 'transmission', label: 'Transmissão', icon: Radio },
          { id: 'header', label: 'Cabeçalho', icon: Globe },
          { id: 'layout', label: 'Layout', icon: Info },
          { id: 'video', label: 'Áudio / Vídeo', icon: Video },
          { id: 'footer', label: 'Rodapé', icon: Phone },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all text-sm ${
              activeTab === tab.id
                ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20'
                : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-6">
        {activeTab === 'transmission' && (
          <div id="tour-settings-streams" className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Radio className="text-blue-500" size={18} /> Transmissão
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <Globe size={14} className="text-blue-400" /> Nome da Rádio / Site
                </label>
                <button 
                  type="button" 
                  onClick={() => setSiteName('CIDADE FM 87,9 MHZ')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: CIDADE FM 87,9 MHZ"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <Radio size={14} className="text-green-400" /> Link do Stream de Áudio
                </label>
                <button 
                  type="button" 
                  onClick={() => setAudioStream('https://link.radio.br:18630/stream')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <input
                type="text"
                value={audioStream}
                onChange={(e) => setAudioStream(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                  <Video size={14} className="text-red-400" /> Link do Stream de Vídeo
                </label>
                <button 
                  type="button" 
                  onClick={() => setVideoStream('https://link.radio.br:18630/video')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <input
                type="text"
                value={videoStream}
                onChange={(e) => setVideoStream(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
              />
            </div>
          </div>
        )}

        {/* Header Texts Settings */}
        {activeTab === 'header' && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Globe className="text-blue-500" size={18} /> Textos do Cabeçalho Animado
            </h2>

           <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex flex-col gap-0.5">
                <span>Frases Rotativas (Uma por Linha)</span>
                <span className="text-slate-500 text-[10px] lowercase normal-case">Use a barra vertical | para adicionar um subtítulo específico à frase.</span>
              </label>
              <button 
                type="button" 
                onClick={() => setHeaderPhrases('Seja bem-vindo a Cidade FM\nOnde nasce o sucesso!')}
                className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                title="Restaurar valor padrão"
              >
                <RotateCcw size={10} /> Padrão
              </button>
            </div>
            <textarea
              value={headerPhrases}
              onChange={(e) => setHeaderPhrases(e.target.value)}
              rows={4}
              className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Ex:&#10;Seja bem-vindo a Cidade FM | A sua rádio preferida&#10;Onde nasce o sucesso!&#10;Melhores músicas | 24 horas no ar"
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Texto do Subtítulo Fixo
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderSubtitle('onde nasce o sucesso')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                  <span>Tamanho da Fonte</span>
                  <span className="text-blue-400">{headerTextSize}px</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextSize('24')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Cor do Texto
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextColor('#ffffff')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Tipo da Fonte
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextFont('sans')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Efeito Visual
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextEffect('fade')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                  <span>Tempo de Exibição</span>
                  <span className="text-blue-400">{(Number(headerTextDuration) / 1000).toFixed(1)}s</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextDuration('5000')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                  <span>Velocidade de Transição</span>
                  <span className="text-blue-400">{headerTransitionSpeed}ms</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTransitionSpeed('700')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
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
      )}

        {/* Footer/Rodape Settings */}
        {activeTab === 'footer' && (
          <div className="space-y-6 lg:col-span-2">
            {/* 1. Redes Sociais & Ícones Personalizados */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="text-blue-500" size={18} /> 1. Redes Sociais & Ícones Personalizados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WhatsApp Link & Icon */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <MessageCircle size={14} className="text-green-500" /> Link do WhatsApp
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setWhatsappUrl('https://wa.me/5591982736292')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="url"
                      value={whatsappUrl}
                      onChange={(e) => setWhatsappUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                      placeholder="https://wa.me/..."
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        Ícone WhatsApp (Upload ou URL)
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setFooterIconWhatsapp('')}
                        className="text-[9px] text-slate-500 hover:text-blue-400 flex items-center gap-0.5 transition-colors"
                      >
                        <RotateCcw size={8} /> Padrão
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerIconWhatsapp}
                        onChange={(e) => setFooterIconWhatsapp(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors font-mono"
                        placeholder="Deixe em branco para ícone padrão"
                      />
                      <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload de Ícone">
                        <Upload size={14} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFooterIconWhatsapp(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Instagram Link & Icon */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <Instagram size={14} className="text-pink-500" /> Link do Instagram
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setInstagramUrl('https://www.instagram.com/marianafmdigital')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="url"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        Ícone Instagram (Upload ou URL)
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setFooterIconInstagram('')}
                        className="text-[9px] text-slate-500 hover:text-blue-400 flex items-center gap-0.5 transition-colors"
                      >
                        <RotateCcw size={8} /> Padrão
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerIconInstagram}
                        onChange={(e) => setFooterIconInstagram(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors font-mono"
                        placeholder="Deixe em branco para ícone padrão"
                      />
                      <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload de Ícone">
                        <Upload size={14} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFooterIconInstagram(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Facebook Link & Icon */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <Facebook size={14} className="text-blue-500" /> Link do Facebook
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setFacebookUrl('https://www.facebook.com/jpscardoso88')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="url"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        Ícone Facebook (Upload ou URL)
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setFooterIconFacebook('')}
                        className="text-[9px] text-slate-500 hover:text-blue-400 flex items-center gap-0.5 transition-colors"
                      >
                        <RotateCcw size={8} /> Padrão
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerIconFacebook}
                        onChange={(e) => setFooterIconFacebook(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors font-mono"
                        placeholder="Deixe em branco para ícone padrão"
                      />
                      <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload de Ícone">
                        <Upload size={14} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFooterIconFacebook(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* YouTube Link & Icon */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        <Globe size={14} className="text-red-500" /> Link do YouTube
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setYoutubeUrl('https://www.youtube.com/@LaMarianaFMProgramas')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        Ícone YouTube (Upload ou URL)
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setFooterIconYoutube('')}
                        className="text-[9px] text-slate-500 hover:text-blue-400 flex items-center gap-0.5 transition-colors"
                      >
                        <RotateCcw size={8} /> Padrão
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerIconYoutube}
                        onChange={(e) => setFooterIconYoutube(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors font-mono"
                        placeholder="Deixe em branco para ícone padrão"
                      />
                      <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload de Ícone">
                        <Upload size={14} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFooterIconYoutube(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Informações de Contato & Endereço */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Phone className="text-blue-500" size={18} /> 2. Informações de Contato & Endereço
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      Número do WhatsApp (Exibição)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setWhatsappNumber('(91) 98273-6292')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      E-mail de Contato
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setContactEmail('contato@cidadefmpa.com.br')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Endereço (Rua e Número)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterAddressStreet('Avenida Cronge da Silveira, nº 805')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerAddressStreet}
                    onChange={(e) => setFooterAddressStreet(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Endereço (Altos / Sala / Bairro)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterAddressDetails('Altos, Sala 02 — Centro')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerAddressDetails}
                    onChange={(e) => setFooterAddressDetails(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Endereço (CEP / Cidade / Estado)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterAddressCity('CEP: 67400-112 — Barcarena, Pará')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerAddressCity}
                    onChange={(e) => setFooterAddressCity(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Texto do Copyright (Rodapé)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterCopyrightText('Cidade FM PA. Todos os direitos reservados.')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerCopyrightText}
                    onChange={(e) => setFooterCopyrightText(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 3. Links de Mapas */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} /> 3. Integração com Mapas
              </h2>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Termo de Busca do Google Maps (Ver no Mapa)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterMapsQuery('Avenida Cronge da Silveira, 805 - Centro, Barcarena - PA, 67400-112')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerMapsQuery}
                    onChange={(e) => setFooterMapsQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Link do Street View
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterStreetViewUrl('https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-1.5058,-48.6258')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="url"
                    value={footerStreetViewUrl}
                    onChange={(e) => setFooterStreetViewUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 4. Estilos Visuais do Rodapé */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="text-blue-500" size={18} /> 4. Estilos Visuais do Rodapé
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Header Color */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor dos Títulos de Seção
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterHeaderColor('#f59e0b')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={footerHeaderColor}
                      onChange={(e) => setFooterHeaderColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={footerHeaderColor}
                      onChange={(e) => setFooterHeaderColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Content Color */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor Geral dos Textos
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterContentColor('#cbd5e1')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={footerContentColor}
                      onChange={(e) => setFooterContentColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={footerContentColor}
                      onChange={(e) => setFooterContentColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Icon Hover Color */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor dos Ícones de Redes
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterIconColor('#94a3b8')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={footerIconColor}
                      onChange={(e) => setFooterIconColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={footerIconColor}
                      onChange={(e) => setFooterIconColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Header Size */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho da Fonte dos Títulos ({footerHeaderSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterHeaderSize('11')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="9"
                    max="18"
                    value={footerHeaderSize}
                    onChange={(e) => setFooterHeaderSize(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                </div>

                {/* Content Size */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho Geral das Fontes ({footerContentSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterContentSize('14')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="22"
                    value={footerContentSize}
                    onChange={(e) => setFooterContentSize(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                </div>

                {/* Icon Size */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho dos Ícones ({footerIconSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterIconSize('18')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={footerIconSize}
                    onChange={(e) => setFooterIconSize(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Customization */}
        {activeTab === 'layout' && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Globe className="text-blue-500" size={18} /> Estilos do Layout
            </h2>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                Logo do Site (URL ou Upload)
              </label>
              <button 
                type="button" 
                onClick={() => setLogoUrl('')}
                className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                title="Restaurar valor padrão"
              >
                <RotateCcw size={10} /> Padrão
              </button>
            </div>
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
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                Espessura das Barras Divisórias (px)
              </label>
              <button 
                type="button" 
                onClick={() => setDividerThickness('1')}
                className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                title="Restaurar valor padrão"
              >
                <RotateCcw size={10} /> Padrão
              </button>
            </div>
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
            <div className="flex justify-between items-center">
              <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                <span>Intensidade do Brilho/Neon das Barras</span>
                <span className="text-slate-500 text-[10px]">{dividerGlow}px de propagação</span>
              </label>
              <button 
                type="button" 
                onClick={() => setDividerGlow('20')}
                className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                title="Restaurar valor padrão"
              >
                <RotateCcw size={10} /> Padrão
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={dividerGlow}
              onChange={(e) => setDividerGlow(e.target.value)}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Visualizador de Áudio */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Radio className="text-blue-500" size={16} /> Visualizador de Áudio (Fundo)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Intensidade / Brilho ({visualizerIntensity}%)</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setVisualizerIntensity('50')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
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
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Espessura das Barras ({visualizerThickness}px)</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setVisualizerThickness('5')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
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
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Tamanho do Botão "Assistir ao Vivo" ({playImageSize}px)</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setPlayImageSize('200')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
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
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Tamanho da Logo do Cabeçalho ({logoSize}px)</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setLogoSize('60')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
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
      )}

        {/* Player de Áudio / Vídeo */}
        {activeTab === 'video' && (
          <div className="space-y-6 lg:col-span-2">
            {/* Player de Áudio */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Radio className="text-blue-500" size={18} /> Player de Áudio (Informações do Stream)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Título do Áudio
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioPlayTitle('CIDADE FM 87,9 MHZ')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={audioPlayTitle}
                    onChange={(e) => setAudioPlayTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: CIDADE FM 87,9 MHZ"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Subtítulo do Áudio (Artista/Slogan)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioPlaySubtitle('Onde nasce o sucesso!')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={audioPlaySubtitle}
                    onChange={(e) => setAudioPlaySubtitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: Onde nasce o sucesso!"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho da Fonte do Título ({audioTitleSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioTitleSize('20')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="36"
                    value={audioTitleSize}
                    onChange={(e) => setAudioTitleSize(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho da Fonte do Subtítulo ({audioSubtitleSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioSubtitleSize('14')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="28"
                    value={audioSubtitleSize}
                    onChange={(e) => setAudioSubtitleSize(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor do Título
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioTitleColor('#ffffff')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={audioTitleColor}
                      onChange={(e) => setAudioTitleColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={audioTitleColor}
                      onChange={(e) => setAudioTitleColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor do Subtítulo
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioSubtitleColor('#cbd5e1')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={audioSubtitleColor}
                      onChange={(e) => setAudioSubtitleColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={audioSubtitleColor}
                      onChange={(e) => setAudioSubtitleColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                      placeholder="#cbd5e1"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Fonte do Título
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioTitleFont('sans')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <select
                    value={audioTitleFont}
                    onChange={(e) => setAudioTitleFont(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="sans">Sans-serif Moderno</option>
                    <option value="system">Sistema Padrão</option>
                    <option value="mono">Monospace Digital</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Fonte do Subtítulo
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setAudioSubtitleFont('sans')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <select
                    value={audioSubtitleFont}
                    onChange={(e) => setAudioSubtitleFont(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="sans">Sans-serif Moderno</option>
                    <option value="system">Sistema Padrão</option>
                    <option value="mono">Monospace Digital</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Player de Vídeo */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Video className="text-blue-500" size={18} /> Player de Vídeo (Overlay de Play)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                      Ícone do Player (Favicon ou URL)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setVideoPlayIcon('/favicon.png')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
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
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho do Ícone ({videoPlayIconSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setVideoPlayIconSize('100')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
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
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Texto do Botão
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setVideoPlayText('ASSISTA')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={videoPlayText}
                    onChange={(e) => setVideoPlayText(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: ASSISTA"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Tamanho da Fonte do Texto ({videoPlayTextSize}px)</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setVideoPlayTextSize('16')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
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
        )}
      </div>
    </div>
  );
}

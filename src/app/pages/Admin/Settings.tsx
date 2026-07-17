import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Save, Radio, Video, Globe, MessageCircle, Instagram, Facebook, Phone, Upload, Info, RotateCcw, MapPin, Menu, Eye, EyeOff } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import defaultLogoPreview from '../../../assets/logo.png';

const defaultMenuItems = [
  { id: 'radio', label: 'Rádio Ao Vivo', iconName: 'Radio', path: '/', enabled: true, external: false },
  { id: 'schedule', label: 'Programação', iconName: 'Calendar', path: '/schedule', enabled: true, external: false },
  { id: 'news', label: 'Notícias', iconName: 'Newspaper', path: '/news', enabled: true, external: false },
  { id: 'about', label: 'Nossa História', iconName: 'Info', path: '/about', enabled: true, external: false },
  { id: 'team', label: 'Equipe', iconName: 'Users', path: '/team', enabled: true, external: false },
  { id: 'contact', label: 'Contato', iconName: 'Phone', path: '/contact', enabled: true, external: false },
  { id: 'whatsapp', label: 'WhatsApp', iconName: 'MessageCircle', path: '', url: '', enabled: true, external: true },
];

export default function AdminSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, saveSettings } = useSettings();
  
  const [audioStream, setAudioStream] = useState('https://link.radio.br:17304/stream');
  const [videoStream, setVideoStream] = useState('https://5a2b083e9f360.streamlock.net/cidadefmpa/cidadefmpa.sdp/playlist.m3u8');
  const [siteName, setSiteName] = useState('CIDADE FM 87,9 MHZ');
  const [logoUrl, setLogoUrl] = useState('');
  const [headerPhrases, setHeaderPhrases] = useState('Seja bem-vindo a Cidade FM');
  const [headerSubtitleEnabled, setHeaderSubtitleEnabled] = useState(true);
  const [headerSubtitle, setHeaderSubtitle] = useState('onde nasce o sucesso');
  const [headerTextDuration, setHeaderTextDuration] = useState('5000');
  const [headerTransitionSpeed, setHeaderTransitionSpeed] = useState('700');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappCardTitle, setWhatsappCardTitle] = useState('Participe');
  const [whatsappCardBtnText, setWhatsappCardBtnText] = useState('MANDE SUA MENSAGEM');
  const [commercialNumber, setCommercialNumber] = useState('');
  const [footerLabelCommercial, setFooterLabelCommercial] = useState('Comercial');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactEmail2, setContactEmail2] = useState('');

  
  const [dividerThickness, setDividerThickness] = useState('1');
  const [dividerGlow, setDividerGlow] = useState('20');
  
  const [visualizerColor, setVisualizerColor] = useState('#3b82f6');
  const [visualizerIntensity, setVisualizerIntensity] = useState('50');
  const [visualizerThickness, setVisualizerThickness] = useState('5');
  const [playImageSize, setPlayImageSize] = useState('200');
  const [logoSize, setLogoSize] = useState('60');
  const [logoSizeMobile, setLogoSizeMobile] = useState('45');
  
  const [headerTextSize, setHeaderTextSize] = useState('24');
  const [headerTextSizeMobile, setHeaderTextSizeMobile] = useState('16');
  const [headerTextEffect, setHeaderTextEffect] = useState('fade');
  const [headerAnimationType, setHeaderAnimationType] = useState('blur');
  const [headerAnimationDirection, setHeaderAnimationDirection] = useState('both');
  const [headerTextFont, setHeaderTextFont] = useState('sans');
  const [headerTextColor, setHeaderTextColor] = useState('#ffffff');

  const [videoPlayIcon, setVideoPlayIcon] = useState('/favicon.png');
  const [videoPlayIconSize, setVideoPlayIconSize] = useState('100');
  const [videoPlayText, setVideoPlayText] = useState('ASSISTA');
  const [videoPlayTextSize, setVideoPlayTextSize] = useState('16');
  const [videoChannelName, setVideoChannelName] = useState('Mariana FM - TV');
  
  const [audioPlayTitle, setAudioPlayTitle] = useState('CIDADE FM 87,9 MHZ');
  const [audioPlaySubtitle, setAudioPlaySubtitle] = useState('Onde nasce o sucesso!');
  const [audioTitleSize, setAudioTitleSize] = useState('20');
  const [audioTitleColor, setAudioTitleColor] = useState('#ffffff');
  const [audioTitleFont, setAudioTitleFont] = useState('sans');
  const [audioSubtitleSize, setAudioSubtitleSize] = useState('14');
  const [audioSubtitleColor, setAudioSubtitleColor] = useState('#cbd5e1');
  const [audioSubtitleFont, setAudioSubtitleFont] = useState('sans');
  const [audioTextStopped,    setAudioTextStopped]    = useState('Ouça Ao Vivo!');
  const [audioTextPlaying,    setAudioTextPlaying]    = useState('No Ar Agora');
  const [audioTextNowPlaying, setAudioTextNowPlaying] = useState('Now Playing');
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
  const [footerMapsIconColor, setFooterMapsIconColor] = useState('#60a5fa');
  const [footerStreetViewIconColor, setFooterStreetViewIconColor] = useState('#fb923c');
  const [footerWhatsappColor, setFooterWhatsappColor] = useState('#cbd5e1');
  const [footerEmailColor, setFooterEmailColor] = useState('#cbd5e1');
  const [footerStreetColor, setFooterStreetColor] = useState('#ffffff');
  const [footerDetailsColor, setFooterDetailsColor] = useState('#cbd5e1');
  const [footerCityColor, setFooterCityColor] = useState('#cbd5e1');
  const [footerCopyrightColor, setFooterCopyrightColor] = useState('#cbd5e1');
  const [footerIconWhatsapp, setFooterIconWhatsapp] = useState('');
  const [footerIconInstagram, setFooterIconInstagram] = useState('');
  const [footerIconFacebook, setFooterIconFacebook] = useState('');
  const [footerIconYoutube, setFooterIconYoutube] = useState('');

  const [footerTitleContact, setFooterTitleContact] = useState('Contato');
  const [footerTitleContactColor, setFooterTitleContactColor] = useState('#f59e0b');
  const [footerTitleAddress, setFooterTitleAddress] = useState('Endereço');
  const [footerTitleAddressColor, setFooterTitleAddressColor] = useState('#f59e0b');
  const [footerTitleMaps, setFooterTitleMaps] = useState('Ver no Mapa');
  const [footerTitleMapsColor, setFooterTitleMapsColor] = useState('#f59e0b');
  const [footerTitleStreetView, setFooterTitleStreetView] = useState('Street View');
  const [footerTitleStreetViewColor, setFooterTitleStreetViewColor] = useState('#f59e0b');
  const [footerLabelWhatsapp, setFooterLabelWhatsapp] = useState('WhatsApp');
  const [footerLabelEmail, setFooterLabelEmail] = useState('E-mail');
  const [footerColumnSpacing, setFooterColumnSpacing] = useState('40');
  const [footerDividerThickness, setFooterDividerThickness] = useState('1');

  const [audioLogoUrl, setAudioLogoUrl] = useState('');
  const [audioLogoSize, setAudioLogoSize] = useState('100');
  const [audioLogoX, setAudioLogoX] = useState('50');
  const [audioLogoY, setAudioLogoY] = useState('40');
  const [audioLogoOffsetX, setAudioLogoOffsetX] = useState('0');
  const [audioLogoOffsetY, setAudioLogoOffsetY] = useState('0');
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const audioPreviewRef = useRef<HTMLDivElement>(null);
  const logoOffsetDragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const [audioPauseLogoUrl, setAudioPauseLogoUrl] = useState('');
  const [audioPauseLogoSize, setAudioPauseLogoSize] = useState('100');
  const [audioPauseLogoOffsetX, setAudioPauseLogoOffsetX] = useState('0');
  const [audioPauseLogoOffsetY, setAudioPauseLogoOffsetY] = useState('0');
  const pauseLogoDragRef = useRef(null);

  const [sidebarTitle, setSidebarTitle] = useState('CIDADE FM 87,9 MHZ');
  const [sidebarLogoUrl, setSidebarLogoUrl] = useState('');
  const [sidebarMenuItems, setSidebarMenuItems] = useState<any[]>(defaultMenuItems);

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('transmission');

  const handleAudioLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAudioLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioPauseLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAudioPauseLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
    if (settings.whatsappCardTitle !== undefined) setWhatsappCardTitle(settings.whatsappCardTitle);
    if (settings.whatsappCardBtnText !== undefined) setWhatsappCardBtnText(settings.whatsappCardBtnText);
    if (settings.commercialNumber !== undefined) setCommercialNumber(settings.commercialNumber);
    if (settings.footerLabelCommercial !== undefined) setFooterLabelCommercial(settings.footerLabelCommercial);
    if (settings.instagramUrl) setInstagramUrl(settings.instagramUrl);
    if (settings.facebookUrl) setFacebookUrl(settings.facebookUrl);
    if (settings.youtubeUrl) setYoutubeUrl(settings.youtubeUrl);
    if (settings.contactEmail) setContactEmail(settings.contactEmail);
    if (settings.contactEmail2 !== undefined) setContactEmail2(settings.contactEmail2);

    
    if (settings.dividerThickness) setDividerThickness(settings.dividerThickness);
    if (settings.dividerGlow) setDividerGlow(settings.dividerGlow);

    if (settings.visualizerColor) setVisualizerColor(settings.visualizerColor);
    if (settings.visualizerIntensity) setVisualizerIntensity(settings.visualizerIntensity);
    if (settings.visualizerThickness) setVisualizerThickness(settings.visualizerThickness);
    if (settings.logoSize) setLogoSize(settings.logoSize);
    if (settings.logoSizeMobile) setLogoSizeMobile(settings.logoSizeMobile);
    if (settings.headerTextSize) setHeaderTextSize(settings.headerTextSize);
    if (settings.headerTextSizeMobile) setHeaderTextSizeMobile(settings.headerTextSizeMobile);
    if (settings.headerTextEffect) setHeaderTextEffect(settings.headerTextEffect);
    if (settings.headerAnimationType) setHeaderAnimationType(settings.headerAnimationType);
    if (settings.headerAnimationDirection) setHeaderAnimationDirection(settings.headerAnimationDirection);
    if (settings.headerTextFont) setHeaderTextFont(settings.headerTextFont);
    if (settings.headerTextColor) setHeaderTextColor(settings.headerTextColor);
    if (settings.headerTextDuration) setHeaderTextDuration(settings.headerTextDuration);
    if (settings.headerTransitionSpeed) setHeaderTransitionSpeed(settings.headerTransitionSpeed);

    if (settings.videoPlayIcon) setVideoPlayIcon(settings.videoPlayIcon);
    if (settings.videoPlayIconSize) setVideoPlayIconSize(settings.videoPlayIconSize);
    if (settings.videoPlayText) setVideoPlayText(settings.videoPlayText);
    if (settings.videoPlayTextSize) setVideoPlayTextSize(settings.videoPlayTextSize);
    if (settings.videoChannelName) setVideoChannelName(settings.videoChannelName);

    if (settings.audioPlayTitle) setAudioPlayTitle(settings.audioPlayTitle);
    if (settings.audioPlaySubtitle) setAudioPlaySubtitle(settings.audioPlaySubtitle);
    if (settings.audioTitleSize) setAudioTitleSize(settings.audioTitleSize);
    if (settings.audioTitleColor) setAudioTitleColor(settings.audioTitleColor);
    if (settings.audioTitleFont) setAudioTitleFont(settings.audioTitleFont);
    if (settings.audioSubtitleSize) setAudioSubtitleSize(settings.audioSubtitleSize);
    if (settings.audioSubtitleColor) setAudioSubtitleColor(settings.audioSubtitleColor);
    if (settings.audioSubtitleFont) setAudioSubtitleFont(settings.audioSubtitleFont);
    if (settings.audioTextStopped)    setAudioTextStopped(settings.audioTextStopped);
    if (settings.audioTextPlaying)    setAudioTextPlaying(settings.audioTextPlaying);
    if (settings.audioTextNowPlaying) setAudioTextNowPlaying(settings.audioTextNowPlaying);

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
    if (settings.footerMapsIconColor) setFooterMapsIconColor(settings.footerMapsIconColor);
    if (settings.footerStreetViewIconColor) setFooterStreetViewIconColor(settings.footerStreetViewIconColor);
    if (settings.footerWhatsappColor) setFooterWhatsappColor(settings.footerWhatsappColor);
    if (settings.footerEmailColor) setFooterEmailColor(settings.footerEmailColor);
    if (settings.footerStreetColor) setFooterStreetColor(settings.footerStreetColor);
    if (settings.footerDetailsColor) setFooterDetailsColor(settings.footerDetailsColor);
    if (settings.footerCityColor) setFooterCityColor(settings.footerCityColor);
    if (settings.footerCopyrightColor) setFooterCopyrightColor(settings.footerCopyrightColor);
    if (settings.footerIconWhatsapp) setFooterIconWhatsapp(settings.footerIconWhatsapp);
    if (settings.footerIconInstagram) setFooterIconInstagram(settings.footerIconInstagram);
    if (settings.footerIconFacebook) setFooterIconFacebook(settings.footerIconFacebook);
    if (settings.footerIconYoutube) setFooterIconYoutube(settings.footerIconYoutube);

    if (settings.footerTitleContact) setFooterTitleContact(settings.footerTitleContact);
    if (settings.footerTitleContactColor) setFooterTitleContactColor(settings.footerTitleContactColor);
    if (settings.footerTitleAddress) setFooterTitleAddress(settings.footerTitleAddress);
    if (settings.footerTitleAddressColor) setFooterTitleAddressColor(settings.footerTitleAddressColor);
    if (settings.footerTitleMaps) setFooterTitleMaps(settings.footerTitleMaps);
    if (settings.footerTitleMapsColor) setFooterTitleMapsColor(settings.footerTitleMapsColor);
    if (settings.footerTitleStreetView) setFooterTitleStreetView(settings.footerTitleStreetView);
    if (settings.footerTitleStreetViewColor) setFooterTitleStreetViewColor(settings.footerTitleStreetViewColor);
    if (settings.footerLabelWhatsapp) setFooterLabelWhatsapp(settings.footerLabelWhatsapp);
    if (settings.footerLabelEmail) setFooterLabelEmail(settings.footerLabelEmail);
    if (settings.footerColumnSpacing) setFooterColumnSpacing(settings.footerColumnSpacing);
    if (settings.footerDividerThickness) setFooterDividerThickness(settings.footerDividerThickness);
    if (settings.audioLogoUrl !== undefined) setAudioLogoUrl(settings.audioLogoUrl);
    if (settings.audioLogoSize) setAudioLogoSize(settings.audioLogoSize);
    if (settings.audioLogoX) setAudioLogoX(settings.audioLogoX);
    if (settings.audioLogoY) setAudioLogoY(settings.audioLogoY);
    if (settings.audioLogoOffsetX !== undefined) setAudioLogoOffsetX(settings.audioLogoOffsetX);
    if (settings.audioLogoOffsetY !== undefined) setAudioLogoOffsetY(settings.audioLogoOffsetY);

    if (settings.audioPauseLogoUrl) setAudioPauseLogoUrl(settings.audioPauseLogoUrl);
    if (settings.audioPauseLogoSize) setAudioPauseLogoSize(settings.audioPauseLogoSize);
    if (settings.audioPauseLogoOffsetX) setAudioPauseLogoOffsetX(settings.audioPauseLogoOffsetX);
    if (settings.audioPauseLogoOffsetY) setAudioPauseLogoOffsetY(settings.audioPauseLogoOffsetY);

    if (settings.sidebarTitle) {
      setSidebarTitle(settings.sidebarTitle);
    } else if (settings.siteName) {
      setSidebarTitle(settings.siteName);
    }
    if (settings.sidebarLogoUrl) {
      setSidebarLogoUrl(settings.sidebarLogoUrl);
    } else if (settings.logoUrl) {
      setSidebarLogoUrl(settings.logoUrl);
    }
    if (settings.sidebarMenuItems) {
      try {
        setSidebarMenuItems(JSON.parse(settings.sidebarMenuItems));
      } catch (e) {
        setSidebarMenuItems(defaultMenuItems);
      }
    } else {
      setSidebarMenuItems(defaultMenuItems);
    }

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
        whatsappCardTitle: whatsappCardTitle,
        whatsappCardBtnText: whatsappCardBtnText,
        commercialNumber: commercialNumber,
        footerLabelCommercial: footerLabelCommercial,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        youtubeUrl: youtubeUrl,
        contactEmail: contactEmail,
        contactEmail2: contactEmail2,
        dividerThickness: dividerThickness,
        dividerGlow: dividerGlow,
        visualizerColor: visualizerColor,
        visualizerIntensity: visualizerIntensity,
        visualizerThickness: visualizerThickness,

        playImageSize: playImageSize,
        logoSize: logoSize,
        logoSizeMobile: logoSizeMobile,
        headerTextSize: headerTextSize,
        headerTextSizeMobile: headerTextSizeMobile,
        headerTextEffect: headerTextEffect,
        headerAnimationType,
        headerAnimationDirection,
        headerTextFont: headerTextFont,
        headerTextColor: headerTextColor,
        headerTextDuration: headerTextDuration,
        headerTransitionSpeed: headerTransitionSpeed,
        videoPlayIcon,
        videoPlayIconSize,
        videoPlayText,
        videoPlayTextSize,
        videoChannelName,
        audioPlayTitle,
        audioPlaySubtitle,
        audioTitleSize,
        audioTitleColor,
        audioTitleFont,
        audioSubtitleSize,
        audioSubtitleColor,
        audioSubtitleFont,
        audioTextStopped,
        audioTextPlaying,
        audioTextNowPlaying,
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
        footerMapsIconColor,
        footerStreetViewIconColor,
        footerWhatsappColor,
        footerEmailColor,
        footerStreetColor,
        footerDetailsColor,
        footerCityColor,
        footerCopyrightColor,
        footerIconWhatsapp,
        footerIconInstagram,
        footerIconFacebook,
        footerIconYoutube,
        footerTitleContact,
        footerTitleContactColor,
        footerTitleAddress,
        footerTitleAddressColor,
        footerTitleMaps,
        footerTitleMapsColor,
        footerTitleStreetView,
        footerTitleStreetViewColor,
        footerLabelWhatsapp,
        footerLabelEmail,
        footerColumnSpacing,
        footerDividerThickness,
        audioLogoUrl,
        audioLogoSize,
        audioLogoX,
        audioLogoY,
        audioLogoOffsetX,
        audioLogoOffsetY,
        audioPauseLogoUrl,
        audioPauseLogoSize,
        audioPauseLogoOffsetX,
        audioPauseLogoOffsetY,
        sidebarTitle,
        sidebarLogoUrl,
        sidebarMenuItems: JSON.stringify(sidebarMenuItems)
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
          { id: 'sidebar', label: 'Menu Lateral', icon: Menu },
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
                  onClick={() => setAudioStream('https://link.radio.br:17304/stream')}
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
                  onClick={() => setVideoStream('https://5a2b083e9f360.streamlock.net/cidadefmpa/cidadefmpa.sdp/playlist.m3u8')}
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
                  <span>Tamanho da Fonte (Desktop)</span>
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
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                  <span>Tamanho da Fonte (Mobile)</span>
                  <span className="text-blue-400">{headerTextSizeMobile}px</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setHeaderTextSizeMobile('16')}
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
                value={headerTextSizeMobile}
                onChange={(e) => setHeaderTextSizeMobile(e.target.value)}
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

            {/* Animar (Header Animation Settings) */}
            <div className="col-span-2 space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center">
                <label className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  ✨ Animar (Efeitos de Texto)
                </label>
              </div>

              {/* Grid of Animation Types */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'elevate', label: 'Elevação', icon: '↑' },
                  { id: 'pan', label: 'Panorama', icon: '↔' },
                  { id: 'pop', label: 'Surgir', icon: '↗' },
                  { id: 'bounce', label: 'Quicar', icon: '⤻' },
                  { id: 'stream', label: 'Correnteza', icon: '≈' },
                  { id: 'blur', label: 'Desfoque', icon: '⚏' },
                ].map((anim) => (
                  <button
                    key={anim.id}
                    type="button"
                    onClick={() => setHeaderAnimationType(anim.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      headerAnimationType === anim.id
                        ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-2xl mb-2">{anim.icon}</span>
                    <span className="text-[11px] font-bold">{anim.label}</span>
                  </button>
                ))}
              </div>

              {/* Animation Direction */}
              <div className="space-y-2 pt-2">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Animar</label>
                <div className="flex gap-3">
                  {[
                    { id: 'both', label: 'Ambos' },
                    { id: 'in', label: 'Entrando' },
                    { id: 'out', label: 'Saindo' },
                  ].map((dir) => (
                    <button
                      key={dir.id}
                      type="button"
                      onClick={() => setHeaderAnimationDirection(dir.id)}
                      className={`flex-1 py-2 rounded-lg border font-bold text-sm transition-all ${
                        headerAnimationDirection === dir.id
                          ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                          : 'border-white/10 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {dir.label}
                    </button>
                  ))}
                </div>
              </div>
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

          {/* Efeito de barras de Som (Fundo) */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <Radio className="text-blue-500" size={16} /> Efeito de barras de Som (Fundo)
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
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">
                    <MessageCircle size={16} className="text-green-500" /> WhatsApp
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        Link do WhatsApp
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
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                        Título do Card de WhatsApp
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setWhatsappCardTitle('Participe')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="text"
                      value={whatsappCardTitle}
                      onChange={(e) => setWhatsappCardTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Ex: Participe"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                        Texto do Botão
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setWhatsappCardBtnText('MANDE SUA MENSAGEM')}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                        title="Restaurar valor padrão"
                      >
                        <RotateCcw size={10} /> Padrão
                      </button>
                    </div>
                    <input
                      type="text"
                      value={whatsappCardBtnText}
                      onChange={(e) => setWhatsappCardBtnText(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Ex: MANDE SUA MENSAGEM"
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
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">
                    <Instagram size={16} className="text-pink-500" /> Instagram
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        Link do Instagram
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
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">
                    <Facebook size={16} className="text-blue-500" /> Facebook
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        Link do Facebook
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
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">
                    <Globe size={16} className="text-red-500" /> YouTube
                  </h3>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">
                        Link do YouTube
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
                {/* Card de Contato */}
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">Seção de Contato</h3>
                  
                  {/* Título de Contato */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">Título Principal</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerTitleContact}
                        onChange={(e) => setFooterTitleContact(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerTitleContactColor}
                        onChange={(e) => setFooterTitleContactColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor do Título de Contato"
                      />
                    </div>
                  </div>

                  {/* Contato Comercial */}
                  <div className="space-y-2 border-t border-white/5 pt-2">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">Contato Comercial</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] uppercase">Rótulo (ex: Comercial)</label>
                        <input
                          type="text"
                          value={footerLabelCommercial}
                          onChange={(e) => setFooterLabelCommercial(e.target.value)}
                          className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors"
                          placeholder="Ex: Comercial"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] uppercase">Número comercial</label>
                        <input
                          type="text"
                          value={commercialNumber}
                          onChange={(e) => setCommercialNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs focus:border-blue-500 outline-none transition-colors"
                          placeholder="Ex: (91) 98273-6292"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">WhatsApp (Exibição)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerWhatsappColor}
                        onChange={(e) => setFooterWhatsappColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor do WhatsApp"
                      />
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">E-mail de Contato</label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerEmailColor}
                        onChange={(e) => setFooterEmailColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor do E-mail"
                      />
                    </div>
                  </div>

                  {/* E-mail 2 */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">E-mail de Contato 2</label>
                    <input
                      type="email"
                      value={contactEmail2}
                      onChange={(e) => setContactEmail2(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Ex: comercial@cidadefmpa.com.br"
                    />
                  </div>
                </div>

                {/* Card de Endereço */}
                <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 space-y-4">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2 pb-2 border-b border-white/5">Seção de Endereço</h3>
                  
                  {/* Título de Endereço */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex items-center gap-2">Título Principal</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerTitleAddress}
                        onChange={(e) => setFooterTitleAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerTitleAddressColor}
                        onChange={(e) => setFooterTitleAddressColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor do Título de Endereço"
                      />
                    </div>
                  </div>

                  {/* Rua */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Endereço (Rua e Número)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerAddressStreet}
                        onChange={(e) => setFooterAddressStreet(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerStreetColor}
                        onChange={(e) => setFooterStreetColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor da Rua"
                      />
                    </div>
                  </div>

                  {/* Altos */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Endereço (Complemento)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerAddressDetails}
                        onChange={(e) => setFooterAddressDetails(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerDetailsColor}
                        onChange={(e) => setFooterDetailsColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor do Complemento"
                      />
                    </div>
                  </div>

                  {/* Cidade */}
                  <div className="space-y-1">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Endereço (CEP e Cidade)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={footerAddressCity}
                        onChange={(e) => setFooterAddressCity(e.target.value)}
                        className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                      />
                      <input
                        type="color"
                        value={footerCityColor}
                        onChange={(e) => setFooterCityColor(e.target.value)}
                        className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0"
                        title="Cor da Cidade"
                      />
                    </div>
                  </div>
                </div>

                {/* Copyright isolado abaixo */}
                <div className="col-span-1 md:col-span-2 space-y-1 pt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Texto do Copyright</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={footerCopyrightText}
                      onChange={(e) => setFooterCopyrightText(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    />
                    <input
                      type="color"
                      value={footerCopyrightColor}
                      onChange={(e) => setFooterCopyrightColor(e.target.value)}
                      className="w-12 h-12 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0 shrink-0 animate-scaleIn"
                      title="Escolher Cor do Copyright"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Links de Mapas */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} /> 3. Integração com Mapas
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      Cor do Ícone de Mapa
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterMapsIconColor('#60a5fa')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={footerMapsIconColor}
                      onChange={(e) => setFooterMapsIconColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={footerMapsIconColor}
                      onChange={(e) => setFooterMapsIconColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    />
                  </div>
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

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Cor do Ícone de Street View
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterStreetViewIconColor('#fb923c')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={footerStreetViewIconColor}
                      onChange={(e) => setFooterStreetViewIconColor(e.target.value)}
                      className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                    />
                    <input
                      type="text"
                      value={footerStreetViewIconColor}
                      onChange={(e) => setFooterStreetViewIconColor(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    />
                  </div>
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

            {/* 5. Customização de Títulos do Rodapé */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="text-blue-500" size={18} /> 5. Customização de Títulos do Rodapé
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contato Title */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Título da Seção de Contato
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterTitleContact('Contato')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerTitleContact}
                    onChange={(e) => setFooterTitleContact(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Endereço Title */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Título da Seção de Endereço
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterTitleAddress('Endereço')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerTitleAddress}
                    onChange={(e) => setFooterTitleAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Label WhatsApp */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Prefixo do WhatsApp
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterLabelWhatsapp('WhatsApp')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerLabelWhatsapp}
                    onChange={(e) => setFooterLabelWhatsapp(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Label Email */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Prefixo do E-mail
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterLabelEmail('E-mail')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerLabelEmail}
                    onChange={(e) => setFooterLabelEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Ver no Mapa Title */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Título do Botão "Ver no Mapa"
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterTitleMaps('Ver no Mapa')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerTitleMaps}
                    onChange={(e) => setFooterTitleMaps(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Street View Title */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Título do Botão "Street View"
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setFooterTitleStreetView('Street View')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={footerTitleStreetView}
                    onChange={(e) => setFooterTitleStreetView(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 6. Layout das Colunas do Rodapé */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} /> 6. Posicionamento e Layout do Rodapé
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Footer Column Spacing */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Espaçamento entre colunas ({footerColumnSpacing}px)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setFooterColumnSpacing('40')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="120"
                    step="4"
                    value={footerColumnSpacing}
                    onChange={(e) => setFooterColumnSpacing(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                  <p className="text-slate-500 text-[10px]">Controla o gap entre a coluna Contato, a barra divisória central e a coluna Endereço.</p>
                </div>

                {/* Footer Divider Thickness */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                      <span>Espessura da barra vertical ({footerDividerThickness}px)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setFooterDividerThickness('1')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={footerDividerThickness}
                    onChange={(e) => setFooterDividerThickness(e.target.value)}
                    className="w-full h-8 accent-blue-500"
                  />
                  <p className="text-slate-500 text-[10px]">Espessura da linha vertical que divide as colunas Contato e Endereço no rodapé.</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Tamanho da Logo (Desktop: {logoSize}px)</span>
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

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Tamanho da Logo (Mobile: {logoSizeMobile}px)</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setLogoSizeMobile('45')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={logoSizeMobile}
                  onChange={(e) => setLogoSizeMobile(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>
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

                {/* --- Texto do cabeçalho (parado) --- */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Texto quando Parado
                    </label>
                    <button type="button" onClick={() => setAudioTextStopped('Ouça Ao Vivo!')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input type="text" value={audioTextStopped} onChange={(e) => setAudioTextStopped(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: Ouça Ao Vivo!" />
                </div>

                {/* --- Texto do cabeçalho (tocando) --- */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Texto quando Tocando
                    </label>
                    <button type="button" onClick={() => setAudioTextPlaying('No Ar Agora')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input type="text" value={audioTextPlaying} onChange={(e) => setAudioTextPlaying(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: No Ar Agora" />
                </div>

                {/* --- Texto "Now Playing" --- */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Label "Now Playing"
                    </label>
                    <button type="button" onClick={() => setAudioTextNowPlaying('Now Playing')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input type="text" value={audioTextNowPlaying} onChange={(e) => setAudioTextNowPlaying(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: Now Playing" />
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

            {/* ── Logo do Player de Áudio ── */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-8">
              <h2 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <Radio className="text-blue-500" size={18} /> Logos do Player de Áudio
              </h2>
              <p className="text-slate-500 text-xs -mt-4">Configure a logo exibida durante a reprodução e durante a pausa.</p>

              {/* ── PLAY logo ── */}
              <div className="space-y-4 border border-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">▶</span>
                  Logo de Play (reproduzindo)
                </h3>

                {/* Upload */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Imagem</label>
                    <button type="button" onClick={() => setAudioLogoUrl('')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Limpar
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={audioLogoUrl} onChange={(e) => setAudioLogoUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                      placeholder="Deixe vazio para a logo padrão" />
                    <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload">
                      <Upload size={16} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAudioLogoUpload} />
                    </label>
                  </div>
                  {audioLogoUrl && audioLogoUrl.startsWith('data:image') && (
                    <p className="text-[10px] text-green-400">✓ Imagem carregada do computador.</p>
                  )}
                </div>

                {/* Size */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Tamanho ({audioLogoSize}px)</label>
                    <button type="button" onClick={() => setAudioLogoSize('100')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input type="range" min="40" max="200" step="4" value={audioLogoSize}
                    onChange={(e) => setAudioLogoSize(e.target.value)} className="w-full h-8 accent-blue-500" />
                </div>

                {/* Drag circle */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-between w-full">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Posição dentro do círculo</label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] font-mono">
                        {Number(audioLogoOffsetX) >= 0 ? '+' : ''}{audioLogoOffsetX}px / {Number(audioLogoOffsetY) >= 0 ? '+' : ''}{audioLogoOffsetY}px
                      </span>
                      <button type="button" onClick={() => { setAudioLogoOffsetX('0'); setAudioLogoOffsetY('0'); }}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                        <RotateCcw size={10} /> Centralizar
                      </button>
                    </div>
                  </div>
                  {(() => {
                    const PREVIEW = 140;
                    const actual = Number(audioLogoSize) + 8;
                    const scale = PREVIEW / actual;
                    const dispOX = Number(audioLogoOffsetX) * scale;
                    const dispOY = Number(audioLogoOffsetY) * scale;
                    const imgPx = Number(audioLogoSize) * scale;
                    return (
                      <div
                        className="rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.08),_0_10px_24px_rgba(0,0,0,0.6)] overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
                        style={{ width: PREVIEW, height: PREVIEW }}
                        onMouseDown={(e) => {
                          logoOffsetDragRef.current = { x: e.clientX, y: e.clientY, ox: Number(audioLogoOffsetX), oy: Number(audioLogoOffsetY) };
                          e.preventDefault();
                        }}
                        onMouseMove={(e) => {
                          if (!logoOffsetDragRef.current) return;
                          const dx = (e.clientX - logoOffsetDragRef.current.x) / scale;
                          const dy = (e.clientY - logoOffsetDragRef.current.y) / scale;
                          setAudioLogoOffsetX(String(Math.round(logoOffsetDragRef.current.ox + dx)));
                          setAudioLogoOffsetY(String(Math.round(logoOffsetDragRef.current.oy + dy)));
                        }}
                        onMouseUp={() => { logoOffsetDragRef.current = null; }}
                        onMouseLeave={() => { logoOffsetDragRef.current = null; }}
                      >
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 pointer-events-none" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <img src={audioLogoUrl || defaultLogoPreview} alt="Play preview" draggable={false}
                            className="object-contain"
                            style={{ width: imgPx, height: imgPx, transform: `translate(${dispOX}px, ${dispOY}px)` }} />
                        </div>
                      </div>
                    );
                  })()}
                  <p className="text-slate-600 text-[10px] text-center">Arraste para reposicionar dentro do círculo.</p>
                </div>
              </div>

              {/* ── PAUSE logo ── */}
              <div className="space-y-4 border border-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-[10px]">⏸</span>
                  Logo de Pause (pausado / parado)
                </h3>

                {/* Upload */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Imagem</label>
                    <button type="button" onClick={() => setAudioPauseLogoUrl('')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Limpar
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={audioPauseLogoUrl} onChange={(e) => setAudioPauseLogoUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                      placeholder="Deixe vazio para usar a logo de play" />
                    <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload">
                      <Upload size={16} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleAudioPauseLogoUpload} />
                    </label>
                  </div>
                  {audioPauseLogoUrl && audioPauseLogoUrl.startsWith('data:image') && (
                    <p className="text-[10px] text-green-400">✓ Imagem carregada do computador.</p>
                  )}
                  {!audioPauseLogoUrl && (
                    <p className="text-[10px] text-slate-600">↳ Nenhuma imagem definida — usará a logo de play como fallback.</p>
                  )}
                </div>

                {/* Size */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Tamanho ({audioPauseLogoSize}px)</label>
                    <button type="button" onClick={() => setAudioPauseLogoSize('100')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input type="range" min="40" max="200" step="4" value={audioPauseLogoSize}
                    onChange={(e) => setAudioPauseLogoSize(e.target.value)} className="w-full h-8 accent-blue-500" />
                </div>

                {/* Drag circle */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-between w-full">
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">Posição dentro do círculo</label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px] font-mono">
                        {Number(audioPauseLogoOffsetX) >= 0 ? '+' : ''}{audioPauseLogoOffsetX}px / {Number(audioPauseLogoOffsetY) >= 0 ? '+' : ''}{audioPauseLogoOffsetY}px
                      </span>
                      <button type="button" onClick={() => { setAudioPauseLogoOffsetX('0'); setAudioPauseLogoOffsetY('0'); }}
                        className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                        <RotateCcw size={10} /> Centralizar
                      </button>
                    </div>
                  </div>
                  {(() => {
                    const PREVIEW = 140;
                    const actual = Number(audioPauseLogoSize) + 8;
                    const scale = PREVIEW / actual;
                    const dispOX = Number(audioPauseLogoOffsetX) * scale;
                    const dispOY = Number(audioPauseLogoOffsetY) * scale;
                    const imgPx = Number(audioPauseLogoSize) * scale;
                    const pauseSrc = audioPauseLogoUrl || audioLogoUrl || defaultLogoPreview;
                    return (
                      <div
                        className="rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.08),_0_10px_24px_rgba(0,0,0,0.6)] overflow-hidden relative cursor-grab active:cursor-grabbing select-none opacity-75"
                        style={{ width: PREVIEW, height: PREVIEW }}
                        onMouseDown={(e) => {
                          pauseLogoDragRef.current = { x: e.clientX, y: e.clientY, ox: Number(audioPauseLogoOffsetX), oy: Number(audioPauseLogoOffsetY) };
                          e.preventDefault();
                        }}
                        onMouseMove={(e) => {
                          if (!pauseLogoDragRef.current) return;
                          const dx = (e.clientX - pauseLogoDragRef.current.x) / scale;
                          const dy = (e.clientY - pauseLogoDragRef.current.y) / scale;
                          setAudioPauseLogoOffsetX(String(Math.round(pauseLogoDragRef.current.ox + dx)));
                          setAudioPauseLogoOffsetY(String(Math.round(pauseLogoDragRef.current.oy + dy)));
                        }}
                        onMouseUp={() => { pauseLogoDragRef.current = null; }}
                        onMouseLeave={() => { pauseLogoDragRef.current = null; }}
                      >
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 pointer-events-none" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <img src={pauseSrc} alt="Pause preview" draggable={false}
                            className="object-contain"
                            style={{ width: imgPx, height: imgPx, transform: `translate(${dispOX}px, ${dispOY}px)` }} />
                        </div>
                      </div>
                    );
                  })()}
                  <p className="text-slate-600 text-[10px] text-center">Arraste para reposicionar dentro do círculo.</p>
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
                    <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                      Nome do Canal (Player de Vídeo)
                    </label>
                    <button 
                      type="button" 
                      onClick={() => setVideoChannelName('Mariana FM - TV')}
                      className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                      title="Restaurar valor padrão"
                    >
                      <RotateCcw size={10} /> Padrão
                    </button>
                  </div>
                  <input
                    type="text"
                    value={videoChannelName}
                    onChange={(e) => setVideoChannelName(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                    placeholder="Ex: Mariana FM - TV"
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

        {/* Menu Lateral Customization */}
        {activeTab === 'sidebar' && (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Menu className="text-blue-500" size={18} /> Configurações do Menu Lateral
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sidebar Title */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Título do Menu Lateral
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setSidebarTitle(siteName)}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Usar o nome do site"
                  >
                    <RotateCcw size={10} /> Copiar Nome do Site
                  </button>
                </div>
                <input
                  type="text"
                  value={sidebarTitle}
                  onChange={(e) => setSidebarTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                  placeholder="Ex: CIDADE FM 87,9 MHZ"
                />
              </div>

              {/* Sidebar Logo */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Logo do Menu Lateral (URL ou Upload)
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setSidebarLogoUrl('')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Usar a logo padrão do site"
                  >
                    <RotateCcw size={10} /> Usar Logo do Site
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sidebarLogoUrl}
                    onChange={(e) => setSidebarLogoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                    placeholder="Cole o link ou clique ao lado para upload"
                  />
                  <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Upload de Imagem">
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
                            setSidebarLogoUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div>
                <h3 className="text-white font-bold text-base">Seções do Menu</h3>
                <p className="text-slate-400 text-xs mt-1">Habilite, edite os nomes, ícones e links das seções do menu lateral.</p>
              </div>

              <div className="space-y-3">
                {sidebarMenuItems.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center gap-4 ${
                      item.enabled !== false 
                        ? 'bg-slate-900/60 border-white/5' 
                        : 'bg-slate-950/20 border-white/5 opacity-50'
                    }`}
                  >
                    {/* Habilitado / Visibilidade */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = [...sidebarMenuItems];
                          newItems[idx] = { ...item, enabled: item.enabled === false ? true : false };
                          setSidebarMenuItems(newItems);
                        }}
                        className={`p-2.5 rounded-lg border transition-all ${
                          item.enabled !== false
                            ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600/20'
                            : 'bg-slate-800/40 border-white/5 text-slate-500 hover:bg-slate-800/80'
                        }`}
                        title={item.enabled !== false ? "Ocultar do Menu" : "Mostrar no Menu"}
                      >
                        {item.enabled !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest md:hidden">
                        {item.enabled !== false ? "Visível" : "Oculto"}
                      </span>
                    </div>

                    {/* Ícone */}
                    <div className="flex flex-col space-y-1 min-w-[120px]">
                      <label className="text-[10px] text-slate-500 font-bold uppercase">Ícone</label>
                      <select
                        value={item.iconName}
                        onChange={(e) => {
                          const newItems = [...sidebarMenuItems];
                          newItems[idx] = { ...item, iconName: e.target.value };
                          setSidebarMenuItems(newItems);
                        }}
                        className="bg-slate-900 border border-white/5 rounded-lg px-2 py-2 text-white text-xs outline-none focus:border-blue-500"
                      >
                        <option value="Radio">📻 Rádio</option>
                        <option value="Calendar">📅 Programação</option>
                        <option value="Newspaper">📰 Notícias</option>
                        <option value="Info">ℹ️ Informações</option>
                        <option value="Users">👥 Equipe</option>
                        <option value="Phone">📞 Contato</option>
                        <option value="MessageCircle">💬 WhatsApp</option>
                      </select>
                    </div>

                    {/* Nome da Seção */}
                    <div className="flex-1 flex flex-col space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase">Nome da Seção</label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const newItems = [...sidebarMenuItems];
                          newItems[idx] = { ...item, label: e.target.value };
                          setSidebarMenuItems(newItems);
                        }}
                        className="bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-blue-500 font-bold"
                        placeholder="Nome no menu"
                      />
                    </div>

                    {/* Link de Destino / Rota */}
                    <div className="flex-1 flex flex-col space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase">
                        {item.external ? "Link Externo (URL)" : "Link Interno (Caminho)"}
                      </label>
                      <input
                        type="text"
                        value={item.external ? (item.url || '') : item.path}
                        onChange={(e) => {
                          const newItems = [...sidebarMenuItems];
                          if (item.external) {
                            newItems[idx] = { ...item, url: e.target.value };
                          } else {
                            newItems[idx] = { ...item, path: e.target.value };
                          }
                          setSidebarMenuItems(newItems);
                        }}
                        className="bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-blue-500 font-mono"
                        placeholder={item.external ? "https://..." : "/exemplo"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

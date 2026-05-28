import { Menu, Search, Headphones } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Logo } from './ui/Logo';
import { WeatherWidget } from './WeatherWidget';
import { AudioVisualizer } from './AudioVisualizer';
import { useSettings } from '../context/SettingsContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { settings } = useSettings();
  
  const headerTextSize = Number(settings.headerTextSize || '24');
  const headerTextEffect = settings.headerTextEffect || 'fade';
  const headerTextFont = settings.headerTextFont || 'sans';
  const headerTextColor = settings.headerTextColor || '#ffffff';

  const fontMap: Record<string, string> = {
    sans: "'Outfit', 'Inter', sans-serif",
    system: "system-ui, -apple-system, sans-serif",
    mono: "monospace"
  };
  const selectedFont = fontMap[headerTextFont] || fontMap.sans;

  const animationClass = headerTextEffect === 'fade' 
    ? 'animate-header-fade' 
    : headerTextEffect === 'pulse' 
      ? 'animate-header-pulse' 
      : '';

  const titleStyle: React.CSSProperties = {
    fontFamily: selectedFont,
    color: headerTextColor,
    fontSize: `${headerTextSize}px`,
    lineHeight: '1.2'
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily: selectedFont,
    color: headerTextColor,
    opacity: 0.8,
    fontSize: `${Math.max(8, headerTextSize * 0.55)}px`,
    lineHeight: '1.2'
  };
  const rawPhrases = settings.headerPhrases || settings.headerTitle || 'Seja bem-vindo a Cidade FM';
  const phrases = rawPhrases.split('\n').map(p => p.trim()).filter(Boolean);
  const subtitleEnabled = settings.headerSubtitleEnabled !== 'false';
  const subtitle = settings.headerSubtitle || 'onde nasce o sucesso';

  const showDuration = Number(settings.headerTextDuration || '5000');
  const transitionSpeed = Number(settings.headerTransitionSpeed || '700');

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) {
      setCurrentPhraseIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setIsFading(false);
      }, transitionSpeed);
    }, showDuration);

    return () => clearInterval(interval);
  }, [phrases.length, showDuration, transitionSpeed]);

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 px-6 py-4 shadow-2xl border-b border-white/5 h-20 flex items-center justify-between">
      {/* Visualizer Background */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-slate-950">
        <AudioVisualizer />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Central Animated Text (Centered on the equatorial line of the Header) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none w-max">
          <div 
            style={{ transitionDuration: `${transitionSpeed}ms` }}
            className={`transition-all ease-in-out transform ${isFading ? 'opacity-0 scale-95 translate-y-1' : 'opacity-100 scale-100 translate-y-0'} ${animationClass}`}
          >
            <h2 
              style={titleStyle}
              className="font-black uppercase tracking-[0.1em] md:tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {phrases[currentPhraseIndex] || ''}
            </h2>
          </div>
          
          {subtitleEnabled && subtitle && (
            <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-1.5">
              <div className="h-[1px] w-4 md:w-8 bg-gradient-to-r from-transparent to-blue-500" style={{ backgroundColor: headerTextColor, opacity: 0.3 }} />
              <p 
                style={subtitleStyle}
                className="font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
              >
                {subtitle}
              </p>
              <div className="h-[1px] w-4 md:w-8 bg-gradient-to-l from-transparent to-blue-500" style={{ backgroundColor: headerTextColor, opacity: 0.3 }} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <WeatherWidget />



          <button
            onClick={onMenuClick}
            className="p-3 text-white bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

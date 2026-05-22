import { Menu, Search, Headphones } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Logo } from './ui/Logo';
import { WeatherWidget } from './WeatherWidget';
import cidadeVideo from '../../imports/video.mp4';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  const [title, setTitle] = useState('Seja bem-vindo a Cidade FM');
  const [subtitle, setSubtitle] = useState('onde nasce o sucesso');

  useEffect(() => {
    const loadTexts = () => {
      const storedTitle = localStorage.getItem('headerTitle');
      const storedSub = localStorage.getItem('headerSubtitle');
      if (storedTitle) setTitle(storedTitle);
      if (storedSub) setSubtitle(storedSub);
    };
    
    loadTexts();
    window.addEventListener('settingsUpdated', loadTexts);
    return () => window.removeEventListener('settingsUpdated', loadTexts);
  }, []);

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 px-6 py-4 overflow-hidden shadow-2xl border-b border-white/5">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        <video 
          src={cidadeVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Central Animated Text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center flex pointer-events-none w-max mt-1 md:mt-0">
          <h2 className="text-[10px] sm:text-sm md:text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white uppercase tracking-[0.1em] md:tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {title}
          </h2>
          <div className="flex items-center gap-2 md:gap-4 mt-0.5 md:mt-1">
            <div className="h-[1px] w-4 md:w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <p className="text-[6px] sm:text-[8px] md:text-xs lg:text-sm text-blue-400 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
              {subtitle}
            </p>
            <div className="h-[1px] w-4 md:w-8 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
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

import { Menu, Search, Headphones } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Logo } from './ui/Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 glass-panel px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden xl:flex items-center gap-8">
            {['Início', 'Programação', 'Notícias', 'Promoções', 'Contato'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-all relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex-1 max-w-sm mx-12 hidden lg:block">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="w-full bg-slate-800/40 border border-white/5 rounded-2xl py-2 pl-10 pr-4 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all backdrop-blur-sm"
              />
           </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Ao Vivo: Manhã Show</p>
          </div>

          <Link 
            to="/admin" 
            className="p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-600/5 rounded-2xl transition-all"
            title="Área Administrativa"
          >
            <Headphones size={22} />
          </Link>

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

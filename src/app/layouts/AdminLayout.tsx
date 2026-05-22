import { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router';
import { 
  LayoutDashboard, 
  Radio, 
  Newspaper, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  ExternalLink,
  Trophy
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../components/ui/use-mobile';
import { MobilePlayer } from '../components/MobilePlayer';

export function AdminLayout() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Programação', icon: Radio, path: '/admin/schedule' },
    { label: 'Notícias', icon: Newspaper, path: '/admin/news' },
    { label: 'Banners', icon: ImageIcon, path: '/admin/banners' },
    { label: 'TOP 5', icon: Trophy, path: '/admin/top5' },
    { label: 'Equipe', icon: Users, path: '/admin/team' },
    { label: 'Configurações', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-100">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : (isMobile ? 0 : 80),
          x: isSidebarOpen ? 0 : (isMobile ? -260 : 0)
        }}
        className={`bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 relative z-40 ${isMobile ? 'absolute inset-y-0 left-0 shadow-2xl' : ''}`}
      >
        <div className="p-6 flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex-shrink-0 flex items-center justify-center font-bold text-xl">
            C
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col min-w-0"
              >
                <span className="font-bold text-lg whitespace-nowrap">ADMIN PANEL</span>
                <Link to="/" className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-0.5 transition-colors mt-0.5">
                  <ExternalLink size={10} /> Ver Site
                </Link>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                ${location.pathname === item.path 
                  ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}
              `}
            >
              <item.icon size={22} className={location.pathname === item.path ? 'text-blue-500' : 'group-hover:text-blue-400 text-slate-400'} />
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              {location.pathname === item.path && isSidebarOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </Link>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/20 hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
             {/* Mobile menu (hidden on desktop sidebar) */}
             <button 
               className="lg:hidden text-slate-400"
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             >
               <Menu />
             </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Administrador</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-24 lg:pb-8">
          <Outlet />
        </div>
      </main>
      <MobilePlayer />
    </div>
  );
}

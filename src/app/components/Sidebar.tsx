import { X, Radio, Newspaper, Calendar, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import defaultLogo from '../../assets/logo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [settings, setSettings] = useState({
    whatsappUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    logoUrl: '',
    siteName: 'CIDADE FM'
  });

  useEffect(() => {
    const loadSettings = () => {
      setSettings({
        whatsappUrl: localStorage.getItem('whatsappUrl') || '',
        instagramUrl: localStorage.getItem('instagramUrl') || '',
        facebookUrl: localStorage.getItem('facebookUrl') || '',
        youtubeUrl: localStorage.getItem('youtubeUrl') || '',
        logoUrl: localStorage.getItem('logoUrl') || '',
        siteName: localStorage.getItem('siteName') || 'CIDADE FM'
      });
    };
    loadSettings();
    window.addEventListener('settingsUpdated', loadSettings);
    return () => window.removeEventListener('settingsUpdated', loadSettings);
  }, []);

  const menuItems = [
    { label: 'Rádio Ao Vivo', icon: Radio, path: '/' },
    { label: 'Programação', icon: Calendar, path: '/schedule' },
    { label: 'Notícias', icon: Newspaper, path: '/news' },
    { label: 'WhatsApp', icon: MessageCircle, url: settings.whatsappUrl, external: true },
  ];

  const socialLinks = [
    { icon: Facebook, color: 'hover:text-blue-500', url: settings.facebookUrl },
    { icon: Instagram, color: 'hover:text-pink-500', url: settings.instagramUrl },
    { icon: Youtube, color: 'hover:text-red-500', url: settings.youtubeUrl },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-white/5 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                 <img 
                   src={settings.logoUrl || defaultLogo} 
                   alt="Logo" 
                   className="w-10 h-10 object-contain drop-shadow-md" 
                 />
                 <span className="font-black tracking-tight text-white">{settings.siteName}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
              <nav className="space-y-1">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.external ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                      >
                        <item.icon size={22} className="group-hover:text-green-500 transition-colors" />
                        <span className="font-bold text-lg">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                      >
                        <item.icon size={22} className="group-hover:text-blue-500 transition-colors" />
                        <span className="font-bold text-lg">{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/5">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Siga-nos nas Redes</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, i) => (
                    social.url ? (
                      <motion.a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                        className={`p-4 bg-slate-800 rounded-2xl text-slate-400 ${social.color} border border-white/5 transition-all block`}
                      >
                        <social.icon size={24} />
                      </motion.a>
                    ) : null
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-slate-950/30">

              <p className="text-center text-slate-500 text-[10px] mt-4 font-medium tracking-widest">© 2024 CIDADE WEB RÁDIO</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

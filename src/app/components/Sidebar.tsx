import { X, Radio, Newspaper, Calendar, Heart, MessageSquare, Instagram, Facebook, Youtube, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { label: 'Rádio Ao Vivo', icon: Radio, path: '/' },
    { label: 'Programação', icon: Calendar, path: '/schedule' },
    { label: 'Notícias', icon: Newspaper, path: '/news' },
    { label: 'Favoritos', icon: Heart, path: '#' },
    { label: 'Pedir Música', icon: MessageSquare, path: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, color: 'hover:text-blue-500' },
    { icon: Instagram, color: 'hover:text-pink-500' },
    { icon: Youtube, color: 'hover:text-red-500' },
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
                 <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">C</div>
                 <span className="font-black tracking-tight text-white">CONECTA FM</span>
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
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                    >
                      <item.icon size={22} className="group-hover:text-blue-500 transition-colors" />
                      <span className="font-bold text-lg">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/5">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">Siga-nos nas Redes</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -5 }}
                      className={`p-4 bg-slate-800 rounded-2xl text-slate-400 ${social.color} border border-white/5 transition-all`}
                    >
                      <social.icon size={24} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-slate-950/30">
              <Link 
                to="/admin"
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                <LogIn size={20} />
                Área Restrita
              </Link>
              <p className="text-center text-slate-500 text-[10px] mt-4 font-medium tracking-widest">© 2024 CONECTA WEB RÁDIO</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

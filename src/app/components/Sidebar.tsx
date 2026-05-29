import { X, Radio, Newspaper, Calendar, MessageCircle, Instagram, Facebook, Youtube, Info, Phone, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import defaultLogo from '../../assets/logo.png';

import { useSettings } from '../context/SettingsContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, any> = {
  Radio,
  Calendar,
  Newspaper,
  Info,
  Users,
  Phone,
  MessageCircle,
};

const defaultMenuItems = [
  { id: 'radio', label: 'Rádio Ao Vivo', iconName: 'Radio', path: '/' },
  { id: 'schedule', label: 'Programação', iconName: 'Calendar', path: '/schedule' },
  { id: 'news', label: 'Notícias', iconName: 'Newspaper', path: '/news' },
  { id: 'about', label: 'Sobre', iconName: 'Info', path: '/about' },
  { id: 'team', label: 'Equipe', iconName: 'Users', path: '/team' },
  { id: 'contact', label: 'Contato', iconName: 'Phone', path: '/contact' },
  { id: 'whatsapp', label: 'WhatsApp', iconName: 'MessageCircle', path: '', url: '', external: true },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { settings } = useSettings();

  // Carregar os itens do menu a partir das configurações ou usar o padrão
  let menuItemsToShow = defaultMenuItems;
  if (settings.sidebarMenuItems) {
    try {
      const parsed = JSON.parse(settings.sidebarMenuItems);
      if (Array.isArray(parsed) && parsed.length > 0) {
        menuItemsToShow = parsed;
      }
    } catch (e) {
      console.error("Failed to parse sidebar menu items:", e);
    }
  }

  // Filtrar apenas os itens ativos/habilitados
  const activeMenuItems = menuItemsToShow.filter((item: any) => item.enabled !== false);

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
                   src={settings.sidebarLogoUrl || settings.logoUrl || defaultLogo} 
                   alt="Logo" 
                   className="w-10 h-10 object-contain drop-shadow-md" 
                 />
                 <span className="font-black tracking-tight text-white">
                   {settings.sidebarTitle || settings.siteName || "CIDADE FM 87,9 MHZ"}
                 </span>
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
                {activeMenuItems.map((item, i) => {
                  const IconComponent = iconMap[item.iconName] || Info;
                  const itemUrl = item.external 
                    ? (item.url || (item.id === 'whatsapp' ? settings.whatsappUrl : '#'))
                    : item.path;

                  return (
                    <motion.div
                      key={item.id || item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item.external ? (
                        <a
                          href={itemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                        >
                          <IconComponent size={22} className="group-hover:text-green-500 transition-colors" />
                          <span className="font-bold text-lg">{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          to={itemUrl}
                          onClick={onClose}
                          className="flex items-center gap-4 px-4 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
                        >
                          <IconComponent size={22} className="group-hover:text-blue-500 transition-colors" />
                          <span className="font-bold text-lg">{item.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
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

import { MessageCircle, Instagram, Facebook, MapPin, Map, Navigation } from 'lucide-react';
import { GlowingDivider } from './ui/GlowingDivider';
import { useSettings } from '../context/SettingsContext';

export function Footer() {
  const { settings } = useSettings();
  
  const links = {
    whatsapp: settings.whatsappUrl || '#',
    instagram: settings.instagramUrl || '#',
    facebook: settings.facebookUrl || '#',
    number: settings.whatsappNumber || '(81) 999.523.2550'
  };

  return (
    <footer className="bg-slate-900 pt-6 pb-6 px-4 mt-8 relative">
      {/* Glowing Divider Top */}
      <GlowingDivider className="absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-5">
            <a
              href={links.whatsapp}
              target={links.whatsapp !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
            <a
              href={links.instagram}
              target={links.instagram !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href={links.facebook}
              target={links.facebook !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
          </div>

          <div className="text-center mt-2">
            <p className="text-white font-semibold text-sm mb-0.5 flex items-center justify-center gap-1">
              <MessageCircle size={14} className="text-green-500" /> WhatsApp
            </p>
            <p className="text-slate-400 text-xs mb-5">{links.number}</p>

            <p className="text-white font-semibold text-sm mb-1 flex items-center justify-center gap-1">
              <MapPin size={14} className="text-red-500" /> Endereço
            </p>
            <p className="text-slate-400 text-xs mb-3">Av. Jerônimo Pimentel, 64, Barcarena - PA, 68445-000</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a 
                href="https://www.google.com/maps/place/Av.+Jer%C3%B4nimo+Pimentel,+64,+Barcarena+-+PA,+68445-000" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-lg"
              >
                <Map size={12} className="text-blue-400" /> Ver no Mapa
              </a>
              <a 
                href="https://www.google.com/maps/search/Av.+Jer%C3%B4nimo+Pimentel,+64,+Barcarena+-+PA,+68445-000" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-lg"
              >
                <Navigation size={12} className="text-orange-400" /> Street View
              </a>
            </div>
          </div>

          <p className="text-slate-600 text-[10px] text-center">
            *Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}

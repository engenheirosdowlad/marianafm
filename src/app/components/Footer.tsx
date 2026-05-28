import { MessageCircle, Instagram, Facebook, Youtube, MapPin, Map, Navigation, Mail, Phone } from 'lucide-react';
import { GlowingDivider } from './ui/GlowingDivider';
import { useSettings } from '../context/SettingsContext';

export function Footer() {
  const { settings } = useSettings();
  
  const links = {
    whatsapp: settings.whatsappUrl || '#',
    instagram: settings.instagramUrl || '#',
    facebook: settings.facebookUrl || '#',
    youtube: settings.youtubeUrl || '#',
    number: settings.whatsappNumber || '(91) 98273-6292',
    email: settings.contactEmail || 'contato@cidadefmpa.com.br'
  };

  const mapsSearchQuery = "Avenida Cronge da Silveira, 805 - Centro, Barcarena - PA, 67400-112";
  const mapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsSearchQuery)}`;
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-1.5058,-48.6258`;

  return (
    <footer className="bg-slate-950 pt-8 pb-8 px-4 mt-12 relative border-t border-slate-900">
      {/* Glowing Divider Top */}
      <GlowingDivider className="absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Redes Sociais com Estilo Padrão Ouro */}
          <div className="flex items-center gap-4">
            <a
              href={links.whatsapp}
              target={links.whatsapp !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 active:scale-95"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={links.instagram}
              target={links.instagram !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 active:scale-95"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={links.facebook}
              target={links.facebook !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 active:scale-95"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={links.youtube}
              target={links.youtube !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 active:scale-95"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>

          <div className="text-center w-full max-w-md mx-auto space-y-6">
            {/* Seção Contato (WhatsApp + Email) */}
            <div className="space-y-2">
              <p className="text-amber-500 font-extrabold uppercase tracking-widest text-[11px] flex items-center justify-center gap-1.5">
                <Phone size={12} className="text-amber-500" /> Contato
              </p>
              <div className="flex flex-col items-center gap-1">
                <a 
                  href={links.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 text-sm font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-emerald-500 font-bold text-xs uppercase">WhatsApp:</span>
                  {links.number}
                </a>
                <a 
                  href={`mailto:${links.email}`} 
                  className="text-slate-300 text-sm font-semibold hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-amber-500 font-bold text-xs uppercase">E-mail:</span>
                  {links.email}
                </a>
              </div>
            </div>

            {/* Seção Endereço Organizado */}
            <div className="space-y-2 pt-2">
              <p className="text-amber-500 font-extrabold uppercase tracking-widest text-[11px] flex items-center justify-center gap-1.5">
                <MapPin size={12} className="text-amber-500" /> Endereço
              </p>
              <div className="text-slate-300 text-xs leading-relaxed font-medium space-y-0.5">
                <p className="text-slate-100 font-bold text-sm">Avenida Cronge da Silveira, nº 805</p>
                <p className="text-slate-400">Altos, Sala 02 — Centro</p>
                <p className="text-slate-400">CEP: 67400-112 — Barcarena, Pará</p>
              </div>
            </div>

            {/* Botões de Mapa de Alta Qualidade */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a 
                href={mapsDirectUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] font-bold bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-amber-500/20 text-slate-300 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-xl hover:shadow-amber-500/5 active:scale-95"
              >
                <Map size={13} className="text-blue-400 animate-pulse" /> Ver no Mapa
              </a>
              <a 
                href={streetViewUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] font-bold bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-amber-500/20 text-slate-300 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-xl hover:shadow-amber-500/5 active:scale-95"
              >
                <Navigation size={13} className="text-orange-400 animate-pulse" /> Street View
              </a>
            </div>
          </div>

          <p className="text-slate-600 text-[10px] text-center tracking-wider uppercase font-semibold mt-4">
            © {new Date().getFullYear()} Cidade FM PA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

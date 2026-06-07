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

  const addressStreet = settings.footerAddressStreet || "Avenida Cronge da Silveira, nº 805";
  const addressDetails = settings.footerAddressDetails || "Altos, Sala 02 — Centro";
  const addressCity = settings.footerAddressCity || "CEP: 67400-112 — Barcarena, Pará";
  
  const mapsSearchQuery = settings.footerMapsQuery || "Avenida Cronge da Silveira, 805 - Centro, Barcarena - PA, 67400-112";
  const mapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsSearchQuery)}`;
  const streetViewUrl = settings.footerStreetViewUrl || `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-1.5058,-48.6258`;
  const copyrightText = settings.footerCopyrightText || "Cidade FM PA. Todos os direitos reservados.";
  
  const headerColor = settings.footerHeaderColor || "#f59e0b";
  const headerSize = settings.footerHeaderSize || "11";
  const contentColor = settings.footerContentColor || "#cbd5e1";
  const contentSize = settings.footerContentSize || "14";
  
  const iconSize = parseInt(settings.footerIconSize || "18");
  const iconColor = settings.footerIconColor || "#94a3b8";

  const iconWhatsapp = settings.footerIconWhatsapp || "";
  const iconInstagram = settings.footerIconInstagram || "";
  const iconFacebook = settings.footerIconFacebook || "";
  const iconYoutube = settings.footerIconYoutube || "";

  const titleContact = settings.footerTitleContact || "Contato";
  const titleContactColor = settings.footerTitleContactColor || headerColor;
  const titleAddress = settings.footerTitleAddress || "Endereço";
  const titleAddressColor = settings.footerTitleAddressColor || headerColor;
  const titleMaps = settings.footerTitleMaps || "Ver no Mapa";
  const titleMapsColor = settings.footerTitleMapsColor || headerColor;
  const titleStreetView = settings.footerTitleStreetView || "Street View";
  const titleStreetViewColor = settings.footerTitleStreetViewColor || headerColor;
  const labelWhatsapp = settings.footerLabelWhatsapp || "WhatsApp";
  const labelEmail = settings.footerLabelEmail || "E-mail";

  return (
    <footer className="bg-slate-950 pt-8 pb-8 px-4 mt-12 relative border-t border-slate-900">
      {/* Glowing Divider Top */}
      <GlowingDivider className="absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Redes Sociais com Estilo Padrão Ouro */}
          <div className="flex items-center gap-8 justify-center mx-auto">
            {/* WhatsApp */}
            <a
              href={links.whatsapp}
              target={links.whatsapp !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 active:scale-95"
              aria-label="WhatsApp"
              style={{ color: iconColor }}
            >
              {iconWhatsapp ? (
                <img src={iconWhatsapp} alt="WhatsApp" className="object-contain" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
              ) : (
                <MessageCircle size={iconSize} />
              )}
            </a>

            {/* Instagram */}
            <a
              href={links.instagram}
              target={links.instagram !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:text-pink-500 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 active:scale-95"
              aria-label="Instagram"
              style={{ color: iconColor }}
            >
              {iconInstagram ? (
                <img src={iconInstagram} alt="Instagram" className="object-contain" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
              ) : (
                <Instagram size={iconSize} />
              )}
            </a>

            {/* Facebook */}
            <a
              href={links.facebook}
              target={links.facebook !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:text-blue-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 active:scale-95"
              aria-label="Facebook"
              style={{ color: iconColor }}
            >
              {iconFacebook ? (
                <img src={iconFacebook} alt="Facebook" className="object-contain" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
              ) : (
                <Facebook size={iconSize} />
              )}
            </a>

            {/* YouTube */}
            <a
              href={links.youtube}
              target={links.youtube !== '#' ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:text-red-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 active:scale-95"
              aria-label="YouTube"
              style={{ color: iconColor }}
            >
              {iconYoutube ? (
                <img src={iconYoutube} alt="YouTube" className="object-contain" style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
              ) : (
                <Youtube size={iconSize} />
              )}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl px-4 gap-8 md:gap-0">
            {/* Seção Contato */}
            <div className="flex flex-col items-center md:items-end space-y-3 md:border-r border-slate-700" style={{ paddingRight: `${Math.round(parseInt(settings.footerColumnSpacing || '40') / 2)}px`, borderRightWidth: `${settings.footerDividerThickness || '1'}px` }}>
              <p 
                style={{ color: titleContactColor, fontSize: `${headerSize}px` }}
                className="font-extrabold uppercase tracking-widest flex items-center justify-end gap-1.5"
              >
                <Phone size={Math.max(12, parseInt(headerSize))} style={{ verticalAlign: 'middle' }} /> {titleContact}
              </p>
              <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1.5">
                {settings.commercialNumber && (
                  <a 
                    href={`tel:${settings.commercialNumber.replace(/\D/g, '')}`}
                    style={{ color: settings.footerWhatsappColor || contentColor, fontSize: `${contentSize}px` }}
                    className="font-semibold hover:text-blue-400 transition-colors flex items-center justify-end gap-1.5"
                  >
                    <span style={{ color: headerColor }} className="font-bold text-xs uppercase">{settings.footerLabelCommercial || 'Comercial'}:</span>
                    {settings.commercialNumber}
                  </a>
                )}
                <a 
                  href={links.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: settings.footerWhatsappColor || contentColor, fontSize: `${contentSize}px` }}
                  className="font-semibold hover:text-emerald-400 transition-colors flex items-center justify-end gap-1.5"
                >
                  <span style={{ color: headerColor }} className="font-bold text-xs uppercase">{labelWhatsapp}:</span>
                  {links.number}
                </a>
                <div className="flex items-start gap-1.5 justify-center md:justify-end">
                  <span style={{ color: headerColor }} className="font-bold text-xs uppercase mt-0.5">{labelEmail}:</span>
                  <div className="flex flex-col items-center md:items-start gap-0.5">
                    <a 
                      href={`mailto:${links.email}`} 
                      style={{ color: settings.footerEmailColor || contentColor, fontSize: `${contentSize}px` }}
                      className="font-semibold hover:text-amber-400 transition-colors"
                    >
                      {links.email}
                    </a>
                    {settings.contactEmail2 && (
                      <a 
                        href={`mailto:${settings.contactEmail2}`} 
                        style={{ color: settings.footerEmailColor || contentColor, fontSize: `${contentSize}px` }}
                        className="font-semibold hover:text-amber-400 transition-colors"
                      >
                        {settings.contactEmail2}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Seção Endereço */}
            <div className="flex flex-col items-center md:items-start space-y-3 md:pl-8" style={{ paddingLeft: `${Math.round(parseInt(settings.footerColumnSpacing || '40') / 2)}px` }}>
              <p 
                style={{ color: titleAddressColor, fontSize: `${headerSize}px` }}
                className="font-extrabold uppercase tracking-widest flex items-center justify-start gap-1.5"
              >
                <MapPin size={Math.max(12, parseInt(headerSize))} style={{ verticalAlign: 'middle' }} /> {titleAddress}
              </p>
              <div 
                style={{ color: contentColor, fontSize: `${contentSize}px` }}
                className="leading-relaxed font-medium text-center md:text-left flex flex-col items-center md:items-start"
              >
                <p style={{ color: settings.footerStreetColor || '#ffffff', fontSize: `${parseInt(contentSize) + 2}px` }} className="font-bold">{addressStreet}</p>
                <p style={{ color: settings.footerDetailsColor || contentColor }} className="opacity-80">{addressDetails}</p>
                <p style={{ color: settings.footerCityColor || contentColor }} className="opacity-80">{addressCity}</p>
              </div>
            </div>
          </div>

          {/* Botões de Mapa */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-white/5 w-full max-w-lg">
            <a 
              href={mapsDirectUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] font-bold bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-amber-500/20 text-slate-300 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-xl hover:shadow-amber-500/5 active:scale-95"
            >
              <Map size={13} style={{ color: settings.footerMapsIconColor || '#60a5fa' }} /> {titleMaps}
            </a>
            <a 
              href={streetViewUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[11px] font-bold bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-amber-500/20 text-slate-300 px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-xl hover:shadow-amber-500/5 active:scale-95"
            >
              <Navigation size={13} style={{ color: settings.footerStreetViewIconColor || '#fb923c' }} /> {titleStreetView}
            </a>
          </div>

          <p 
            style={{ color: settings.footerCopyrightColor || '#cbd5e1' }}
            className="text-[10px] text-center tracking-wider uppercase font-semibold mt-4"
          >
            © {new Date().getFullYear()} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}

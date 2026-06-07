import { useSettings } from '../../context/SettingsContext';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Compass, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { settings } = useSettings();
  
  const email = settings.contactEmail || "contato@cidadefmpa.com.br";
  const email2 = settings.contactEmail2;
  const whatsappNum = settings.whatsappNumber || "(91) 98273-6292";
  const whatsappUrl = settings.whatsappUrl || "https://wa.me/5591982736292";
  
  const addressStreet = settings.footerAddressStreet || "Avenida Cronge da Silveira, nº 805";
  const addressDetails = settings.footerAddressDetails || "Altos, Sala 02 — Centro";
  const addressCity = settings.footerAddressCity || "CEP: 67400-112 — Barcarena, Pará";
  const address = `${addressStreet}, ${addressDetails} - ${addressCity}`;
  
  // Google Maps Search Query
  const mapsSearchQuery = settings.footerMapsQuery || "Avenida Cronge da Silveira, 805 - Centro, Barcarena - PA, 67400-112";
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsSearchQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const streetViewUrl = settings.footerStreetViewUrl || `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=-1.5058,-48.6258`;
  const mapsDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsSearchQuery)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Fale Conosco</h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Entre em contato com nossa equipe ou faça-nos uma visita no nosso estúdio!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-6 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-slate-800/40 hover:border-blue-500/25 transition-all group shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-400 text-xs font-black uppercase tracking-wider">E-mail</h3>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <a href={`mailto:${email}`} className="text-white font-bold text-sm hover:text-blue-400 transition-colors block truncate">{email}</a>
                    {email2 && (
                      <a href={`mailto:${email2}`} className="text-white font-bold text-sm hover:text-blue-400 transition-colors block truncate">{email2}</a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="block bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:bg-slate-800/40 hover:border-green-500/25 transition-all group shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-600/10 rounded-xl text-green-500 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-slate-400 text-xs font-black uppercase tracking-wider">WhatsApp</h3>
                  <p className="text-white font-bold text-sm mt-0.5">{whatsappNum}</p>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-xl space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-600/10 rounded-xl text-red-500 mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-slate-400 text-xs font-black uppercase tracking-wider">Endereço</h3>
                  <p className="text-white font-bold text-sm mt-0.5 leading-relaxed">{address}</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-white/5 flex gap-2">
                <a
                  href={mapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MapPin size={14} /> Google Maps
                </a>
                <a
                  href={streetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Compass size={14} /> Street View
                </a>
              </div>
            </motion.div>
          </div>

          {/* Embedded Google Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-[380px] lg:h-auto min-h-[350px] relative"
          >
            <iframe
              src={mapsEmbedUrl}
              className="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-[180deg]"
              allowFullScreen
              loading="lazy"
              title="Estúdio Cidade FM no Google Maps"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

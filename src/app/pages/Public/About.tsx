import { useSettings } from '../../context/SettingsContext';
import { motion } from 'framer-motion';
import defaultLogo from '../../../assets/logo.png';
import { Radio } from 'lucide-react';

export default function About() {
  const { settings } = useSettings();
  
  const defaultText = "A rádio Cidade FM 87,9 MHZ é líder em audiência em Barcarena, Pará, trazendo o melhor da música, jornalismo e entretenimento para todos os nossos ouvintes. Onde nasce o sucesso!";
  const aboutText = settings.aboutText || defaultText;

  const aboutImageUrl = settings.aboutImageUrl || settings.logoUrl || defaultLogo;
  const aboutImageSize = settings.aboutImageSize || '192';
  const aboutTextSize = settings.aboutTextSize || '16';
  const aboutTextFont = settings.aboutTextFont || 'sans';
  const aboutTextAlign = settings.aboutTextAlign || 'left';
  const aboutTextColor = settings.aboutTextColor || '#cbd5e1';
  const aboutCardBgColor = settings.aboutCardBgColor || 'rgba(15, 23, 42, 0.5)';

  const fontMap: Record<string, string> = {
    sans: "'Outfit', 'Inter', sans-serif",
    system: "system-ui, -apple-system, sans-serif",
    mono: "monospace"
  };
  const selectedFont = fontMap[aboutTextFont] || fontMap.sans;

  const aboutTitle = settings.aboutTitle || 'Quem Somos';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500 mb-2">
            <Radio size={32} className="animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Sobre a Cidade FM</h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Conheça a história e o propósito da rádio que é a voz e o coração de Barcarena.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{ backgroundColor: aboutCardBgColor }}
          className="backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          <div 
            style={{ 
              width: `${aboutImageSize}px`, 
              height: `${aboutImageSize}px` 
            }}
            className="max-w-full rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center p-6 shrink-0 shadow-lg shadow-blue-500/5"
          >
            <img 
              src={aboutImageUrl} 
              alt="Cidade FM Logo" 
              className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
            />
          </div>

          <div className="flex-1 w-full space-y-6">
            <h2 className="text-white font-bold text-2xl tracking-tight">{aboutTitle}</h2>
            <div 
              style={{
                fontFamily: selectedFont,
                fontSize: `${aboutTextSize}px`,
                color: aboutTextColor,
                textAlign: aboutTextAlign as any
              }}
              className="leading-relaxed whitespace-pre-wrap transition-all"
            >
              {aboutText}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

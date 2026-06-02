import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './ui/Logo';
import { WeatherWidget } from './WeatherWidget';
import { AudioVisualizer } from './AudioVisualizer';
import { GlowingDivider } from './ui/GlowingDivider';
import { useSettings } from '../context/SettingsContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { settings } = useSettings();

  const headerTextSize = Number(settings.headerTextSize || '24');
  const headerTextSizeMobile = Number(settings.headerTextSizeMobile || '16');
  const headerTextEffect = settings.headerTextEffect || 'fade';
  const headerAnimationType = settings.headerAnimationType || 'blur';
  const headerAnimationDirection = settings.headerAnimationDirection || 'both';
  const headerTextFont = settings.headerTextFont || 'sans';
  const headerTextColor = settings.headerTextColor || '#ffffff';

  const fontMap: Record<string, string> = {
    sans: "'Outfit', 'Inter', sans-serif",
    system: 'system-ui, -apple-system, sans-serif',
    mono: 'monospace',
  };
  const selectedFont = fontMap[headerTextFont] || fontMap.sans;

  const rawPhrases =
    settings.headerPhrases || settings.headerTitle || 'Seja bem-vindo a Cidade FM';
  const phrases = rawPhrases
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);
  const subtitleEnabled = settings.headerSubtitleEnabled !== 'false';
  const subtitle = settings.headerSubtitle || 'onde nasce o sucesso';

  const parsedPhrases = phrases.map((line) => {
    const parts = line.split('|');
    const mainText = parts[0]?.trim() || '';
    const subText = parts[1]?.trim() || null;
    return { mainText, subText };
  });

  const showDuration = Number(settings.headerTextDuration || '5000');
  const transitionSpeed = Number(settings.headerTransitionSpeed || '700');

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) {
      setCurrentPhraseIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, showDuration);
    return () => clearInterval(interval);
  }, [phrases.length, showDuration]);

  // ── scroll-aware bottom bar ───────────────────────────────────────────────
  const [showBottomBar, setShowBottomBar] = useState(true);
  useEffect(() => {
    const handleScroll = () => setShowBottomBar(window.scrollY < 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) return null;

  const currentPhrase = parsedPhrases[currentPhraseIndex];
  const activeSubtitle =
    currentPhrase?.subText || (subtitleEnabled ? subtitle : null);

  return (
    <header className="sticky top-0 z-50 px-6 py-4 shadow-2xl h-[130px] flex items-center justify-between relative">
      {/* Visualizer Background */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-slate-950">
        <AudioVisualizer />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
      </div>

      {/* Main content row */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Central Animated Text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none w-max">
          {(() => {
            const getVariants = () => {
              const isEntering = headerAnimationDirection === 'in' || headerAnimationDirection === 'both';
              const isExiting = headerAnimationDirection === 'out' || headerAnimationDirection === 'both';

              const hiddenIn: any = { opacity: 0 };
              const hiddenOut: any = { opacity: 0 };

              switch (headerAnimationType) {
                case 'blur':
                  if (isEntering) hiddenIn.filter = 'blur(10px)';
                  if (isExiting) hiddenOut.filter = 'blur(10px)';
                  break;
                case 'elevate':
                  if (isEntering) hiddenIn.y = 20;
                  if (isExiting) hiddenOut.y = -20;
                  break;
                case 'pan':
                  if (isEntering) hiddenIn.x = 50;
                  if (isExiting) hiddenOut.x = -50;
                  break;
                case 'pop':
                  if (isEntering) hiddenIn.scale = 0.8;
                  if (isExiting) hiddenOut.scale = 1.2;
                  break;
                case 'bounce':
                  if (isEntering) hiddenIn.y = 40;
                  if (isExiting) hiddenOut.y = -40;
                  break;
                case 'stream':
                  if (isEntering) hiddenIn.x = 100;
                  if (isExiting) hiddenOut.x = -100;
                  break;
                default:
                  break;
              }

              return {
                initial: hiddenIn,
                animate: { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' },
                exit: hiddenOut,
              };
            };

            const transition = {
              duration: transitionSpeed / 1000,
              type: headerAnimationType === 'bounce' ? 'spring' : 'tween',
              bounce: headerAnimationType === 'bounce' ? 0.5 : 0,
            };

            return (
              <>
                <style>{`
                  .header-title-text {
              font-family: ${selectedFont};
              color: ${headerTextColor};
              font-size: ${headerTextSizeMobile}px;
              line-height: 1.2;
            }
            .header-subtitle-text {
              font-family: ${selectedFont};
              color: ${headerTextColor};
              opacity: 0.8;
              font-size: ${Math.max(8, headerTextSizeMobile * 0.55)}px;
              line-height: 1.2;
            }
            @media (min-width: 768px) {
              .header-title-text { font-size: ${headerTextSize}px; }
              .header-subtitle-text { font-size: ${Math.max(8, headerTextSize * 0.55)}px; }
            }
          `}</style>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhraseIndex}
              variants={getVariants()}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              className="flex flex-col items-center"
            >
              <h2 className="header-title-text font-black uppercase tracking-[0.1em] md:tracking-[0.2em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {currentPhrase?.mainText || ''}
              </h2>

              {activeSubtitle && (
                <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-1.5">
                  <div
                    className="h-[1px] w-4 md:w-8 bg-gradient-to-r from-transparent to-blue-500"
                    style={{ backgroundColor: headerTextColor, opacity: 0.3 }}
                  />
                  <p className="header-subtitle-text font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                    {activeSubtitle}
                  </p>
                  <div
                    className="h-[1px] w-4 md:w-8 bg-gradient-to-l from-transparent to-blue-500"
                    style={{ backgroundColor: headerTextColor, opacity: 0.3 }}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
              </>
            );
          })()}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <WeatherWidget />
          <button
            onClick={onMenuClick}
            className="p-3 text-white bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Bottom GlowingDivider — identical to the footer's top bar.
          Fades out when the user scrolls down (same behaviour as before). */}
      <GlowingDivider
        className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${
          showBottomBar ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  );
}

import { VideoPlayer } from '../../components/VideoPlayer';
import { AudioPlayer } from '../../components/AudioPlayer';
import { ProgramCards } from '../../components/ProgramCards';
import { NewsSection } from '../../components/NewsSection';
import { TopRequests } from '../../components/TopRequests';
import { useSettings } from '../../context/SettingsContext';
import { GlowingDivider } from '../../components/ui/GlowingDivider';

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel';
import { Radio, Video, Headphones } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
const motion = { div: 'div' } as any;

export default function Home() {
  const { activePlayer, setActivePlayer } = usePlayer();
  const [banners, setBanners] = useState<any[]>([]);
  const { banners: contextBanners, settings } = useSettings();

  useEffect(() => {
    if (contextBanners && contextBanners.length > 0) {
      setBanners(contextBanners);
    }
  }, [contextBanners]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Players Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl h-full">
            <VideoPlayer />
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl h-full p-6">
            <AudioPlayer />
          </div>
        </div>
      </div>

      {/* Glowing Divider */}
      <GlowingDivider className="my-10" />

      <Carousel 
        className="w-full mb-10" 
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: (Number(settings.bannerInterval) || 5) * 1000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <CarouselItem key={banner.id || index}>
                {banner.linkUrl ? (
                  <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" className="block relative group overflow-hidden bg-slate-900 rounded-3xl border border-white/5 shadow-2xl h-[200px] md:h-[250px] w-full">
                    <picture className="w-full h-full">
                      {banner.mobileImageUrl && <source media="(max-width: 640px)" srcSet={banner.mobileImageUrl} />}
                      <img src={banner.imageUrl} alt={`Banner ${index + 1}`} className={`w-full h-full object-cover object-${banner.position || 'center'} group-hover:scale-105 transition-transform duration-700`} />
                    </picture>
                  </a>
                ) : (
                  <div className="relative group overflow-hidden bg-slate-900 rounded-3xl border border-white/5 shadow-2xl h-[200px] md:h-[250px] w-full">
                    <picture className="w-full h-full">
                      {banner.mobileImageUrl && <source media="(max-width: 640px)" srcSet={banner.mobileImageUrl} />}
                      <img src={banner.imageUrl} alt={`Banner ${index + 1}`} className={`w-full h-full object-cover object-${banner.position || 'center'} group-hover:scale-105 transition-transform duration-700`} />
                    </picture>
                  </div>
                )}
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="relative group overflow-hidden bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl p-6 lg:p-8 text-center border border-white/5 backdrop-blur-md shadow-2xl h-[200px] md:h-[250px] flex flex-col justify-center items-center">
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="px-4 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase">
                    Advertising Space
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight uppercase leading-none">
                    ANUNCIE NA <span className="text-blue-500">CIDADE FM</span>
                  </h3>
                  <p className="text-slate-400 text-sm font-medium">
                    Sua marca em destaque para milhares de ouvintes.
                  </p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Glowing Divider */}
      <GlowingDivider className="my-10" />

      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider">Programação</h3>
          <Link to="/schedule" className="text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">VER GRADE COMPLETA →</Link>
        </div>
        <ProgramCards />
      </div>

      {/* Glowing Divider */}
      <GlowingDivider className="my-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 pb-12">
        <div className="space-y-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            Últimas Notícias
            <span className="flex-1 h-[1px] bg-slate-700/50"></span>
          </h3>
          <NewsSection />
        </div>
        <div className="space-y-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            TOP 5
            <span className="flex-1 h-[1px] bg-slate-700/50"></span>
          </h3>
          <TopRequests />
        </div>
      </div>
    </motion.div>
  );
}

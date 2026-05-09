import { VideoPlayer } from '../../components/VideoPlayer';
import { AudioPlayer } from '../../components/AudioPlayer';
import { ProgramCards } from '../../components/ProgramCards';
import { NewsSection } from '../../components/NewsSection';
import { TopRequests } from '../../components/TopRequests';
import { Advertisers } from '../../components/Advertisers';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel';
// import { motion } from 'framer-motion';
const motion = { div: 'div' } as any;

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-white font-bold text-2xl mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-blue-500 rounded-full animate-pulse"></span>
        VEJA AO VIVO!
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
            <VideoPlayer />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl h-full">
            <AudioPlayer />
          </div>
        </div>
      </div>

      <Carousel className="w-full mb-10" opts={{ loop: true }}>
        <CarouselContent>
          {/* Banner 1: Clicknet */}
          <CarouselItem>
            <div className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 lg:p-8 text-center border border-white/5 backdrop-blur-md shadow-2xl h-48 flex flex-col justify-center items-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&fit=crop')] opacity-20 mix-blend-overlay object-cover" />
              <div className="relative z-10">
                <div className="px-3 py-0.5 bg-white/10 rounded-full text-white text-[10px] font-black uppercase mb-2 w-fit mx-auto">Patrocinador</div>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase mb-1">CLICKNET</h3>
                <p className="text-white/80 text-sm font-medium">A melhor internet fibra da região</p>
              </div>
            </div>
          </CarouselItem>
          
          {/* Banner 2: Sicredi */}
          <CarouselItem>
            <div className="relative group overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 lg:p-8 text-center border border-white/5 backdrop-blur-md shadow-2xl h-48 flex flex-col justify-center items-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&fit=crop')] opacity-20 mix-blend-overlay object-cover" />
              <div className="relative z-10">
                <div className="px-3 py-0.5 bg-white/10 rounded-full text-white text-[10px] font-black uppercase mb-2 w-fit mx-auto">Patrocinador</div>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase mb-1">SICREDI</h3>
                <p className="text-white/80 text-sm font-medium">Gente que coopera cresce</p>
              </div>
            </div>
          </CarouselItem>

          {/* Banner 3: Default Ad */}
          <CarouselItem>
            <div className="relative group overflow-hidden bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl p-6 lg:p-8 text-center border border-white/5 backdrop-blur-md shadow-2xl h-48 flex flex-col justify-center items-center">
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="px-4 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase">
                  Advertising Space
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight uppercase leading-none">
                  ANUNCIE NA <span className="text-blue-500">CONECTA FM</span>
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  Sua marca em destaque para milhares de ouvintes.
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="mb-10">
        <Advertisers />
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider">Programação</h3>
          <button className="text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors">VER GRADE COMPLETA →</button>
        </div>
        <ProgramCards />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        <div className="space-y-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            Últimas Notícias
            <span className="flex-1 h-[1px] bg-slate-700/50"></span>
          </h3>
          <NewsSection />
        </div>
        <div className="space-y-6">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            Top Pedidos
            <span className="flex-1 h-[1px] bg-slate-700/50"></span>
          </h3>
          <TopRequests />
        </div>
      </div>
    </motion.div>
  );
}

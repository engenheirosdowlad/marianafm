import { Globe, Shield, Wifi, Home, Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const advertisers = [
  { id: 1, name: 'Clicknet', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/5' },
  { id: 2, name: 'Sicredi', icon: Shield, color: 'text-green-400', bg: 'bg-green-500/5' },
  { id: 3, name: 'Wlan Fibra', icon: Wifi, color: 'text-orange-400', bg: 'bg-orange-500/5' },
  { id: 4, name: 'Danyslar', icon: Home, color: 'text-purple-400', bg: 'bg-purple-500/5' },
  { id: 5, name: 'Mateus', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/5' },
  { id: 6, name: 'Liliani', icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-500/5' },
  { id: 7, name: 'Líder', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/5' },
];

export function Advertisers() {
  return (
    <div className="space-y-6">
      <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
        Anunciantes
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {advertisers.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-card p-4 flex flex-col items-center justify-center gap-3 border border-white/5 hover:border-blue-500/20 hover:bg-slate-800/80 transition-all duration-300 cursor-pointer group h-28 rounded-xl ${brand.bg}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
              <brand.icon size={28} className={`${brand.color}`} />
            </div>
            <span className="text-white text-xs font-black uppercase tracking-wider group-hover:text-blue-400 transition-colors text-center">
              {brand.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

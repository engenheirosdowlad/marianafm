import { Trophy, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function TopRequests() {
  const requests = [
    { position: 1, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', count: '142', trend: 'up' },
    { position: 2, title: 'Birds of a Feather', artist: 'Billie Eilish', count: '128', trend: 'up' },
    { position: 3, title: 'Espresso', artist: 'Sabrina Carpenter', count: '115', trend: 'down' },
    { position: 4, title: 'Si Antes Te Hubiera Conocido', artist: 'Karol G', count: '98', trend: 'stable' },
    { position: 5, title: 'A Bar Song (Tipsy)', artist: 'Shaboozey', count: '87', trend: 'up' },
  ];

  return (
    <div className="glass-card p-5 h-full border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <Trophy className="text-yellow-500" size={16} />
          Top 5 Pedidas
        </h2>
        <TrendingUp className="text-blue-500" size={16} />
      </div>

      <div className="space-y-3">
        {requests.map((request, index) => (
          <motion.div
            key={request.position}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-3 hover:bg-slate-800/80 transition-all cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black text-sm 
              ${request.position === 1 ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition-colors'}`}>
              {request.position}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate group-hover:text-blue-400 transition-colors">{request.title}</p>
              <p className="text-slate-500 text-[11px] font-medium truncate uppercase tracking-tighter">{request.artist}</p>
            </div>

            <div className="text-right">
              <p className="text-blue-500 text-xs font-black">{request.count}</p>
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Plays</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-slate-900/50 border border-white/5 rounded-xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
        Ver Ranking Completo
      </button>
    </div>
  );
}

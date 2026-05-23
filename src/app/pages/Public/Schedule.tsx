import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';

const daysOfWeek = [
  { id: 'seg', name: 'Segunda' },
  { id: 'ter', name: 'Terça' },
  { id: 'qua', name: 'Quarta' },
  { id: 'qui', name: 'Quinta' },
  { id: 'sex', name: 'Sexta' },
  { id: 'sab', name: 'Sábado' },
  { id: 'dom', name: 'Domingo' }
];

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState('seg');
  const [programs, setPrograms] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [progRes, teamRes] = await Promise.all([
          fetch('/api/schedule.php'),
          fetch('/api/team.php')
        ]);
        if (progRes.ok) setPrograms(await progRes.json());
        if (teamRes.ok) setTeam(await teamRes.json());
      } catch (e) {
        console.warn("API indisponível, usando fallback local");
        const storedProg = localStorage.getItem('radioPrograms');
        const storedTeam = localStorage.getItem('radioTeam');
        if (storedProg) setPrograms(JSON.parse(storedProg));
        if (storedTeam) setTeam(JSON.parse(storedTeam));
      }
    };
    loadData();
    
    // Set today's day correctly (0 = dom, 1 = seg...)
    const todayIndex = new Date().getDay();
    const daysMap = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    setSelectedDay(daysMap[todayIndex]);
  }, []);

  const filteredPrograms = programs.filter(prog => prog.days?.includes(selectedDay));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-white font-black text-4xl uppercase tracking-wider flex items-center gap-3">
            <span className="w-3 h-12 bg-blue-500 rounded-full animate-pulse"></span>
            Grade de Programação
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Fique por dentro de tudo o que rola na nossa rádio.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          <Calendar size={16} className="text-blue-500 ml-2" />
          <span className="text-white text-xs font-bold uppercase mr-2">Programação Semanal</span>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {daysOfWeek.map(day => (
          <button
            key={day.id}
            onClick={() => setSelectedDay(day.id)}
            className={`px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 flex-shrink-0 ${
              selectedDay === day.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-white/5'
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Programs List */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredPrograms.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500 bg-slate-800/20 rounded-2xl border border-white/5">
                Nenhum programa cadastrado para este dia.
              </div>
            ) : (
              filteredPrograms.map((prog, index) => {
                const presenter = team.find(t => t.id === prog.host);
                return (
                  <motion.div
                    key={prog.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all duration-500 group overflow-hidden flex flex-col sm:flex-row"
                  >
                    {/* Time block */}
                    <div className="bg-slate-900/50 p-6 flex flex-col justify-center items-center sm:border-r border-white/5 min-w-[140px]">
                      <Clock size={20} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-white font-black text-lg">{prog.time.split(' - ')[0]}</span>
                      <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">até</span>
                      <span className="text-white font-black text-lg">{prog.time.split(' - ')[1]}</span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black bg-blue-600/10 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-500/20">
                            Ao Vivo
                          </span>
                        </div>
                        <h3 className="text-white font-black text-xl mb-2 group-hover:text-blue-400 transition-colors">
                          {prog.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          {prog.description}
                        </p>
                      </div>

                      {presenter ? (
                        <div className="flex items-center gap-3 bg-slate-900/30 p-3 rounded-xl border border-white/5">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shadow-lg flex-shrink-0 bg-slate-800 flex items-center justify-center">
                            {presenter.imageUrl ? (
                               <img src={presenter.imageUrl} alt={presenter.name} className="w-full h-full object-cover" />
                            ) : (
                               <User size={16} className="text-slate-500" />
                            )}
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Apresentação</p>
                            <p className="text-white text-sm font-bold">{presenter.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-slate-900/30 p-3 rounded-xl border border-white/5">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-white/10 flex-shrink-0">
                            <User size={16} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">Apresentação</p>
                            <p className="text-slate-400 text-sm font-bold">Programação Automática</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

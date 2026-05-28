import { useEffect, useState } from 'react';
import { teamData } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Users } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team.php')
      .then(res => {
        if (!res.ok) throw new Error('API status ' + res.status);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data);
        } else {
          setTeam(teamData);
        }
      })
      .catch(err => {
        console.error('Failed to fetch team crew, using mock data...', err);
        setTeam(teamData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500 mb-2">
            <Users size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Nossa Equipe</h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Conheça as vozes e os profissionais que fazem a Cidade FM ser a melhor rádio da região.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden group shadow-xl hover:border-blue-500/20 hover:bg-slate-800/30 transition-all flex flex-col h-full"
              >
                <div className="aspect-square w-full bg-slate-800 relative overflow-hidden">
                  <img
                    src={member.imageUrl || member.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&fit=crop"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-blue-400 transition-colors">{member.name}</h3>
                    <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">{member.role}</p>
                  </div>

                  {/* Social media icons */}
                  <div className="flex items-center gap-3 pt-2">
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors">
                        <Instagram size={18} />
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors">
                        <Facebook size={18} />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors">
                        <Twitter size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

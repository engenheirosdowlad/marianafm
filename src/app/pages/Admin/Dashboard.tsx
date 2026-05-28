import { motion } from 'framer-motion';
import { LayoutDashboard, Radio, Newspaper, MessageSquare, Users, Settings, Map, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function AdminDashboard() {
  const stats = [
    { label: 'Ouvintes Agora', value: '1.248', icon: Radio, color: 'text-blue-500' },
    { label: 'Notícias Postadas', value: '156', icon: Newspaper, color: 'text-purple-500' },
    { label: 'Equipe Ativa', value: '8', icon: Users, color: 'text-green-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <LayoutDashboard className="text-blue-500" />
          Painel Administrativo
        </h1>
        <div className="text-slate-400 text-sm">
          Bem-vindo de volta, <span className="text-white font-semibold">Administrador</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-slate-900 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Newspaper size={20} className="text-purple-500" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <Newspaper />
              Nova Notícia
            </button>
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <Radio />
              Editar Grade
            </button>
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-green-600 hover:text-white hover:border-green-500 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <Users />
              Gerenciar Equipe
            </button>
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <Settings />
              Configurações
            </button>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
            <Map size={20} className="text-blue-500" />
            Tour Rápido
          </h2>
          <div className="space-y-3 relative z-10">
            <Link to="/admin/schedule" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-blue-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-blue-400 transition-colors">1. Programação</h4>
                <p className="text-slate-400 text-xs mt-1">Configure a grade de programas e locutores por horário.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-blue-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>

            <Link to="/admin/news" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-purple-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-purple-400 transition-colors">2. Notícias</h4>
                <p className="text-slate-400 text-xs mt-1">Acompanhe as notícias locais que aparecem na página principal.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-purple-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>

            <Link to="/admin/banners" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-pink-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-pink-400 transition-colors">3. Banners</h4>
                <p className="text-slate-400 text-xs mt-1">Gerencie o carrossel de publicidade e parceiros do topo.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-pink-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>

            <Link to="/admin/top5" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-yellow-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-yellow-400 transition-colors">4. TOP 5</h4>
                <p className="text-slate-400 text-xs mt-1">Atualize o ranking das músicas mais pedidas pelos ouvintes.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-yellow-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>

            <Link to="/admin/team" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-green-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-green-400 transition-colors">5. Equipe</h4>
                <p className="text-slate-400 text-xs mt-1">Cadastre locutores e equipe para associá-los aos programas.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-green-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>

            <Link to="/admin/settings" state={{ startTour: true }} className="flex items-start gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors group">
              <CheckCircle2 className="text-slate-600 group-hover:text-orange-500 mt-0.5 flex-shrink-0 transition-colors" size={18} />
              <div>
                <h4 className="text-white text-sm font-semibold group-hover:text-orange-400 transition-colors">6. Configurações</h4>
                <p className="text-slate-400 text-xs mt-1">Personalize links, streams e aparência geral do sistema.</p>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-orange-500 ml-auto flex-shrink-0 mt-2 transition-colors" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { LayoutDashboard, Radio, Newspaper, MessageSquare, Users, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Ouvintes Agora', value: '1.248', icon: Radio, color: 'text-blue-500' },
    { label: 'Notícias Postadas', value: '156', icon: Newspaper, color: 'text-purple-500' },
    { label: 'Pedidos Pendentes', value: '12', icon: MessageSquare, color: 'text-orange-500' },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-orange-600 hover:text-white hover:border-orange-500 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <MessageSquare />
              Ver Pedidos
            </button>
            <button className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all text-sm font-semibold flex flex-col items-center gap-2">
              <Settings />
              Configurações
            </button>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Pedidos Recentes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-700/50">
                <div>
                  <p className="text-white text-sm font-semibold">Beat It - Michael Jackson</p>
                  <p className="text-slate-500 text-xs">Pedido por: João Silva</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg transition-colors">Aceitar</button>
                  <button className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg transition-colors">Negar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

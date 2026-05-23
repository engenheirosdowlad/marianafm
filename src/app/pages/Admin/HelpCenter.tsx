import { motion } from 'framer-motion';
import { HelpCircle, LayoutDashboard, Radio, Newspaper, ImageIcon, Trophy, Users, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function HelpCenter() {
  const helps = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      color: 'text-blue-500',
      path: '/admin',
      description: 'Visão geral do sistema. Aqui você encontra atalhos para ações rápidas e estatísticas resumidas da rádio.'
    },
    {
      title: 'Programação',
      icon: Radio,
      color: 'text-orange-500',
      path: '/admin/schedule',
      description: 'Edite a grade de programas, horários e locutores que aparecem no player principal. O programa atual muda automaticamente.'
    },
    {
      title: 'Notícias',
      icon: Newspaper,
      color: 'text-purple-500',
      path: '/admin/news',
      description: 'Acompanhe e gerencie as notícias locais. Nesta versão de demonstração, elas são puxadas automaticamente de feeds RSS.'
    },
    {
      title: 'Banners',
      icon: ImageIcon,
      color: 'text-pink-500',
      path: '/admin/banners',
      description: 'Gerencie o carrossel de publicidade e anúncios que passa na página inicial. Suba fotos e direcione cliques para links.'
    },
    {
      title: 'TOP 5',
      icon: Trophy,
      color: 'text-yellow-500',
      path: '/admin/top5',
      description: 'Atualize as 5 músicas mais pedidas. Isso atualiza a tabela da página principal em tempo real de forma automática.'
    },
    {
      title: 'Equipe',
      icon: Users,
      color: 'text-green-500',
      path: '/admin/team',
      description: 'Cadastre seus locutores com nome, cargo e foto. Eles aparecerão na grade de programação selecionável.'
    },
    {
      title: 'Configurações',
      icon: Settings,
      color: 'text-slate-400',
      path: '/admin/settings',
      description: 'Ajuste os links do WhatsApp, Instagram, YouTube, transmissões de Áudio e Vídeo, além da grossura e brilho do layout.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-4xl mx-auto pb-24"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="text-blue-500" />
          Central de Ajuda (Tour Interativo)
        </h1>
      </div>

      <p className="text-slate-400 text-sm mb-6">
        Clique em qualquer um dos cartões abaixo para ser guiado imediatamente para a respectiva seção do painel.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {helps.map((help, i) => (
          <Link to={help.path} state={{ startTour: true }} key={help.title} className="w-full md:w-[calc(50%-12px)]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg hover:bg-slate-700/50 hover:border-slate-500 transition-all cursor-pointer group h-full flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-slate-900 ${help.color} group-hover:scale-110 transition-transform`}>
                    <help.icon size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{help.title}</h2>
                </div>
                <ArrowRight className="text-slate-600 group-hover:text-blue-500 transition-colors" size={20} />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                {help.description}
              </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

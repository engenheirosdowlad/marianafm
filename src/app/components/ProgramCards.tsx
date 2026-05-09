import { MessageCircle } from 'lucide-react';
import { teamData, programData } from '../data/mockData';

export function ProgramCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Card 1: Próxima Música */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-2xl">
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">Próxima Música</p>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-16 h-16 rounded-lg bg-slate-700 overflow-hidden flex-shrink-0 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop"
              alt="Album cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm mb-0.5 truncate">Música do Sucesso</h3>
            <p className="text-slate-400 text-xs truncate">Artista Famoso</p>
          </div>
        </div>
      </div>

      {/* Card 2: Grade de Programação */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-2xl">
        <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">No Ar & A Seguir</p>
        <div className="space-y-3">
          {programData.map(prog => {
            const presenter = teamData.find(t => t.id === prog.presenterId);
            return (
              <div key={prog.id} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-white text-sm font-bold">{prog.title}</p>
                  <p className="text-blue-400 text-[10px] font-black">{prog.time}</p>
                </div>
                {presenter && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-white/20">
                      <img src={presenter.photo} alt={presenter.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-slate-400 text-xs font-medium">{presenter.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 3: Peça sua Música */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-2xl flex flex-col justify-between">
        <div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">Peça sua Música</p>
          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mb-3 border border-green-600/30">
              <MessageCircle size={24} className="text-green-500" />
            </div>
            <p className="text-white text-xs font-bold text-center mb-1">Mande seu Alô!</p>
            <p className="text-slate-400 text-[10px] text-center">Participe da nossa programação</p>
          </div>
        </div>
        <button 
          onClick={() => {
            const userName = window.prompt("Seu Nome:");
            if (!userName) return;
            const songTitle = window.prompt("Música que deseja pedir:");
            if (!songTitle) return;
            
            const newRequest = {
              id: Math.random().toString(36).substr(2, 9),
              userName,
              songTitle,
              status: 'pending',
              timestamp: new Date().toISOString()
            };
            
            const storedRequests = localStorage.getItem('musicRequests');
            const currentRequests = storedRequests ? JSON.parse(storedRequests) : [];
            localStorage.setItem('musicRequests', JSON.stringify([...currentRequests, newRequest]));
            
            alert("Pedido enviado com sucesso!");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2 px-4 rounded-lg transition-all text-xs uppercase tracking-wider mt-2"
        >
          Enviar Pedido
        </button>
      </div>
    </div>
  );
}


import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, EyeOff, Eye, Check, Clock } from 'lucide-react';

interface MusicRequest {
  id: string;
  userName: string;
  songTitle: string;
  artist?: string;
  status: 'pending' | 'played' | 'hidden';
  timestamp: string;
}

export default function AdminRequests() {
  const [requests, setRequests] = useState<MusicRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = () => {
    setLoading(true);
    const storedRequests = localStorage.getItem('musicRequests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } else {
      // Dados fictícios iniciais se não houver nada no localStorage
      const mockRequests: MusicRequest[] = [
        { id: '1', userName: 'Carlos Silva', songTitle: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', status: 'pending', timestamp: new Date().toISOString() },
        { id: '2', userName: 'Ana Souza', songTitle: 'Birds of a Feather', artist: 'Billie Eilish', status: 'played', timestamp: new Date().toISOString() },
        { id: '3', userName: 'Pedro Rocha', songTitle: 'Espresso', artist: 'Sabrina Carpenter', status: 'pending', timestamp: new Date().toISOString() }
      ];
      setRequests(mockRequests);
      localStorage.setItem('musicRequests', JSON.stringify(mockRequests));
    }
    setLoading(false);
  };

  const updateStatus = (id: string, newStatus: 'pending' | 'played' | 'hidden') => {
    const updated = requests.map(req => req.id === id ? { ...req, status: newStatus } : req);
    setRequests(updated);
    localStorage.setItem('musicRequests', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      const updated = requests.filter(req => req.id !== id);
      setRequests(updated);
      localStorage.setItem('musicRequests', JSON.stringify(updated));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Pedidos de Música</h1>
          <p className="text-slate-400 text-sm">Gerencie os pedidos feitos pelos ouvintes.</p>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/50">
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Ouvinte</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Música</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Status</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-24" /></td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-48" /></td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16" /></td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                    Nenhum pedido recebido ainda.
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr key={req.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${req.status === 'hidden' ? 'opacity-50' : ''}`}>
                    <td className="p-4">
                      <p className="text-white text-sm font-bold">{req.userName}</p>
                      <p className="text-slate-500 text-[10px]">{new Date(req.timestamp).toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm font-bold">{req.songTitle}</p>
                      {req.artist && <p className="text-blue-400 text-xs">{req.artist}</p>}
                    </td>
                    <td className="p-4">
                      {req.status === 'pending' && (
                        <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase tracking-widest border border-yellow-500/20 flex items-center gap-1 w-fit">
                          <Clock size={10} /> pendente
                        </span>
                      )}
                      {req.status === 'played' && (
                        <span className="text-[10px] font-black bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-500/20 flex items-center gap-1 w-fit">
                          <Check size={10} /> atendido
                        </span>
                      )}
                      {req.status === 'hidden' && (
                        <span className="text-[10px] font-black bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest w-fit block">
                          oculto
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {req.status !== 'played' && (
                          <button 
                            onClick={() => updateStatus(req.id, 'played')}
                            className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/5 rounded-lg transition-colors"
                            title="Marcar como Atendido"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => updateStatus(req.id, req.status === 'hidden' ? 'pending' : 'hidden')}
                          className={`p-2 rounded-lg transition-colors ${req.status === 'hidden' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                          title={req.status === 'hidden' ? "Mostrar" : "Ocultar"}
                        >
                          {req.status === 'hidden' ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button 
                          onClick={() => handleDelete(req.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 animate-pulse space-y-2">
                <div className="h-4 bg-slate-700 rounded w-1/4" />
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-700 rounded w-1/2" />
              </div>
            ))
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nenhum pedido recebido ainda.
            </div>
          ) : (
            requests.map((req, index) => (
              <div key={req.id} className={`p-4 space-y-3 ${req.status === 'hidden' ? 'opacity-50' : ''}`}>
                <div>
                  <p className="text-white text-sm font-bold">{req.userName}</p>
                  <p className="text-slate-500 text-[10px]">{new Date(req.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{req.songTitle}</p>
                  {req.artist && <p className="text-blue-400 text-xs">{req.artist}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {req.status === 'pending' && (
                      <span className="text-[10px] font-black bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase tracking-widest border border-yellow-500/20 flex items-center gap-1 w-fit">
                        <Clock size={10} /> pendente
                      </span>
                    )}
                    {req.status === 'played' && (
                      <span className="text-[10px] font-black bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-500/20 flex items-center gap-1 w-fit">
                        <Check size={10} /> atendido
                      </span>
                    )}
                    {req.status === 'hidden' && (
                      <span className="text-[10px] font-black bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest w-fit block">
                        oculto
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {req.status !== 'played' && (
                      <button 
                        onClick={() => updateStatus(req.id, 'played')}
                        className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/5 rounded-lg transition-colors"
                        title="Marcar como Atendido"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => updateStatus(req.id, req.status === 'hidden' ? 'pending' : 'hidden')}
                      className={`p-2 rounded-lg transition-colors ${req.status === 'hidden' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                      title={req.status === 'hidden' ? "Mostrar" : "Ocultar"}
                    >
                      {req.status === 'hidden' ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(req.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

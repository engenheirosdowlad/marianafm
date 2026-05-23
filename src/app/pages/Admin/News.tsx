import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Trash2, EyeOff, Eye, RefreshCw } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  source: string;
}

export default function AdminNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const { settings, saveSettings } = useSettings();

  const [sources, setSources] = useState<{name: string, url: string}[]>([
    { name: 'ENTRETENIMENTO', url: 'https://g1.globo.com/rss/g1/pop-arte/' },
    { name: 'ESPORTE', url: 'https://jovempan.com.br/esportes/feed' },
    { name: 'POLÍTICA', url: 'https://g1.globo.com/rss/g1/politica/' }
  ]);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [savingSources, setSavingSources] = useState(false);
  
  useEffect(() => {
    // Carregar IDs ocultos e excluídos do context
    if (settings.hiddenNewsLinks) {
      try { setHiddenIds(JSON.parse(settings.hiddenNewsLinks)); } catch(e) {}
    }
    if (settings.deletedNewsLinks) {
      try { setDeletedIds(JSON.parse(settings.deletedNewsLinks)); } catch(e) {}
    }
    let currentSources = sources;
    if (settings.rssSources) {
      try { 
        currentSources = JSON.parse(settings.rssSources);
        setSources(currentSources);
      } catch(e) {}
    }

    fetchNews(currentSources);

    if (location.state?.startTour) {
      navigate('.', { replace: true, state: {} });
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '#tour-refresh-btn', popover: { title: 'Atualizar Notícias', description: 'Clique aqui para buscar as últimas notícias nos feeds RSS (G1, DOL, etc).', side: "bottom", align: 'start' }},
          { element: '#tour-news-table', popover: { title: 'Lista de Notícias', description: 'Aqui ficam todas as notícias que vão para o site principal.', side: "top", align: 'start' }}
        ]
      });
      setTimeout(() => driverObj.drive(), 500);
    }
  }, [settings.hiddenNewsLinks, settings.deletedNewsLinks, settings.rssSources, location, navigate]);

  const fetchNews = async (sourcesToFetch = sources) => {
    setLoading(true);
    const allNews: NewsItem[] = [];

    for (const source of sourcesToFetch) {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
        if (!response.ok) continue;
        
        const data = await response.json();
        if (data.status !== 'ok') continue;
        
        const parsed = data.items.slice(0, 10).map((item: any) => {
          const title = item.title || "";
          const link = item.link || "";
          
          let image = item.thumbnail || item.enclosure?.link || "";
          
          if (!image && item.description) {
            const imgMatch = item.description.match(/src="([^"]+)"/);
            image = imgMatch ? imgMatch[1] : '';
          }

          if (image) {
            return { title, link, image, source: source.name };
          }
          return null;
        }).filter((item: any) => item !== null) as NewsItem[];

        allNews.push(...parsed);
      } catch (error) {
        console.error(`Erro ao buscar notícias de ${source.name}:`, error);
      }
    }

    setNews(allNews);
    setLoading(false);
  };

  const handleHide = async (link: string) => {
    let newHidden;
    if (hiddenIds.includes(link)) {
      newHidden = hiddenIds.filter(id => id !== link);
    } else {
      newHidden = [...hiddenIds, link];
    }
    setHiddenIds(newHidden);
    try {
      await saveSettings({ hiddenNewsLinks: JSON.stringify(newHidden) });
    } catch (e) {
      console.warn("Failed to save to API");
    }
  };

  const handleDelete = async (link: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia? Ela não aparecerá mais no site.")) {
      const newDeleted = [...deletedIds, link];
      setDeletedIds(newDeleted);
      setNews(news.filter(item => item.link !== link));
      try {
        await saveSettings({ deletedNewsLinks: JSON.stringify(newDeleted) });
      } catch (e) {
        console.warn("Failed to save to API");
      }
    }
  };

  // Filtrar notícias que foram excluídas
  const visibleNews = news.filter(item => !deletedIds.includes(item.link));

  const handleAddSource = async () => {
    if (!newSourceName || !newSourceUrl) return;
    setSavingSources(true);
    const updated = [...sources, { name: newSourceName.toUpperCase(), url: newSourceUrl }];
    setSources(updated);
    setNewSourceName('');
    setNewSourceUrl('');
    try {
      await saveSettings({ rssSources: JSON.stringify(updated) });
      fetchNews(updated);
    } catch(e) {
      console.warn("Failed to save sources");
    }
    setSavingSources(false);
  };

  const handleDeleteSource = async (index: number) => {
    if (window.confirm("Deseja mesmo remover esta fonte?")) {
      setSavingSources(true);
      const updated = sources.filter((_, i) => i !== index);
      setSources(updated);
      try {
        await saveSettings({ rssSources: JSON.stringify(updated) });
        fetchNews(updated);
      } catch(e) {
        console.warn("Failed to save sources");
      }
      setSavingSources(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Gerenciar Notícias</h1>
          <p className="text-slate-400 text-sm">Oculte ou exclua notícias puxadas automaticamente dos portais.</p>
        </div>
        <button 
          id="tour-refresh-btn"
          onClick={fetchNews}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-white/5"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Atualizar
        </button>
      </div>

      {/* Gerenciador de Fontes RSS */}
      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-white/5 shadow-2xl mb-8">
        <h2 className="text-white font-bold text-lg mb-4 uppercase tracking-wider text-sm">Fontes de Notícias (RSS)</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Nome da Categoria (Ex: ECONOMIA)" 
              value={newSourceName}
              onChange={e => setNewSourceName(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <input 
              type="text" 
              placeholder="Link do Feed RSS (Ex: https://g1.../rss)" 
              value={newSourceUrl}
              onChange={e => setNewSourceUrl(e.target.value)}
              className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            onClick={handleAddSource}
            disabled={savingSources || !newSourceName || !newSourceUrl}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors text-sm"
          >
            Adicionar Fonte
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {sources.map((source, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-900/50 border border-white/5 p-3 rounded-lg">
              <div>
                <span className="text-xs font-black bg-blue-600/20 text-blue-400 px-2 py-1 rounded uppercase mr-3">
                  {source.name}
                </span>
                <span className="text-slate-400 text-xs break-all">{source.url}</span>
              </div>
              <button 
                onClick={() => handleDeleteSource(idx)}
                disabled={savingSources}
                className="text-slate-500 hover:text-red-400 p-2"
                title="Excluir Fonte"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div id="tour-news-table" className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-slate-900/50">
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Notícia</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Fonte</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider">Status</th>
                <th className="p-4 text-slate-400 text-xs font-black uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5 animate-pulse">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-16 h-10 bg-slate-700 rounded-lg" />
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                    </td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16" /></td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-12" /></td>
                    <td className="p-4"><div className="h-4 bg-slate-700 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : visibleNews.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                    Nenhuma notícia encontrada ou todas foram excluídas.
                  </td>
                </tr>
              ) : (
                visibleNews.map((item, index) => {
                  const isHidden = hiddenIds.includes(item.link);
                  return (
                    <tr key={index} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${isHidden ? 'opacity-50' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-white text-sm font-bold line-clamp-2 max-w-xl">{item.title}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-500/20">
                          {item.source}
                        </span>
                      </td>
                      <td className="p-4">
                        {isHidden ? (
                          <span className="text-[10px] font-black bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            Oculto
                          </span>
                        ) : (
                          <span className="text-[10px] font-black bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-500/20">
                            Visível
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleHide(item.link)}
                            className={`p-2 rounded-lg transition-colors ${isHidden ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            title={isHidden ? "Mostrar" : "Ocultar"}
                          >
                            {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(item.link)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 animate-pulse space-y-3">
                <div className="flex gap-3">
                  <div className="w-16 h-10 bg-slate-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-700 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : visibleNews.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nenhuma notícia encontrada ou todas foram excluídas.
            </div>
          ) : (
            visibleNews.map((item, index) => {
              const isHidden = hiddenIds.includes(item.link);
              return (
                <div key={index} className={`p-4 space-y-3 ${isHidden ? 'opacity-50' : ''}`}>
                  <div className="flex gap-3">
                    <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold line-clamp-2">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-blue-500/20">
                          {item.source}
                        </span>
                        {isHidden ? (
                          <span className="text-[10px] font-black bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            Oculto
                          </span>
                        ) : (
                          <span className="text-[10px] font-black bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-widest border border-green-500/20">
                            Visível
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                    <button 
                      onClick={() => handleHide(item.link)}
                      className={`p-2 rounded-lg transition-colors ${isHidden ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                      title={isHidden ? "Mostrar" : "Ocultar"}
                    >
                      {isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(item.link)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

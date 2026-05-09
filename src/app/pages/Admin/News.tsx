import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, EyeOff, Eye, RefreshCw } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  source: string;
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const sources = [
    { name: 'G1 PARÁ', url: 'https://g1.globo.com/rss/g1/pa/para/' },
    { name: 'DOL', url: 'https://dol.com.br/rss' },
    { name: 'O LIBERAL', url: 'https://www.oliberal.com/rss' }
  ];

  useEffect(() => {
    // Carregar IDs ocultos e excluídos do localStorage
    const storedHidden = localStorage.getItem('hiddenNewsLinks');
    const storedDeleted = localStorage.getItem('deletedNewsLinks');
    
    if (storedHidden) setHiddenIds(JSON.parse(storedHidden));
    if (storedDeleted) setDeletedIds(JSON.parse(storedDeleted));

    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const allNews: NewsItem[] = [];

    for (const source of sources) {
      try {
        const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(source.url)}`);
        if (!response.ok) continue;
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const items = xmlDoc.querySelectorAll("item");
        
        const parsed = Array.from(items).slice(0, 10).map(item => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const description = item.querySelector("description")?.textContent || "";
          
          let image = "";
          const mediaContent = item.getElementsByTagName("media:content")[0] || item.getElementsByTagName("content")[0];
          if (mediaContent) {
            image = mediaContent.getAttribute("url") || "";
          }
          
          if (!image) {
            const imgMatch = description.match(/src="([^"]+)"/);
            image = imgMatch ? imgMatch[1] : '';
          }

          if (!image) {
            image = source.name === 'G1 PARÁ' 
              ? 'https://s2-g1.glbimg.com/E8S9hP0H5yH5yH5yH5yH5yH5yH5y=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c128475bb6a11030283f6f1c/internal_photos/bs/2023/q/r/ABCDEF.jpg'
              : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
          }

          return { title, link, image, source: source.name };
        });

        allNews.push(...parsed);
      } catch (error) {
        console.error(`Erro ao buscar notícias de ${source.name}:`, error);
      }
    }

    setNews(allNews);
    setLoading(false);
  };

  const handleHide = (link: string) => {
    let newHidden;
    if (hiddenIds.includes(link)) {
      newHidden = hiddenIds.filter(id => id !== link);
    } else {
      newHidden = [...hiddenIds, link];
    }
    setHiddenIds(newHidden);
    localStorage.setItem('hiddenNewsLinks', JSON.stringify(newHidden));
  };

  const handleDelete = (link: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia? Ela não aparecerá mais no site.")) {
      const newDeleted = [...deletedIds, link];
      setDeletedIds(newDeleted);
      localStorage.setItem('deletedNewsLinks', JSON.stringify(newDeleted));
      setNews(news.filter(item => item.link !== link));
    }
  };

  // Filtrar notícias que foram excluídas
  const visibleNews = news.filter(item => !deletedIds.includes(item.link));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Gerenciar Notícias</h1>
          <p className="text-slate-400 text-sm">Oculte ou exclua notícias puxadas automaticamente dos portais.</p>
        </div>
        <button 
          onClick={fetchNews}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors border border-white/5"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Atualizar
        </button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}

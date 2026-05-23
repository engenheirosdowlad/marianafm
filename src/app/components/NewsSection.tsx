import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  source: string;
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    let hidden: string[] = [];
    let deleted: string[] = [];
    
    if (settings.hiddenNewsLinks) {
      try { hidden = JSON.parse(settings.hiddenNewsLinks); } catch(e) {}
    }
    if (settings.deletedNewsLinks) {
      try { deleted = JSON.parse(settings.deletedNewsLinks); } catch(e) {}
    }
    
    setHiddenIds(hidden);
    setDeletedIds(deleted);
  }, [settings.hiddenNewsLinks, settings.deletedNewsLinks]);

  const sources = settings.rssSources ? JSON.parse(settings.rssSources) : [
    { name: 'ENTRETENIMENTO', url: 'https://g1.globo.com/rss/g1/pop-arte/' },
    { name: 'ESPORTE', url: 'https://jovempan.com.br/esportes/feed' },
    { name: 'POLÍTICA', url: 'https://g1.globo.com/rss/g1/politica/' }
  ];

  const fetchAllNews = useCallback(async () => {
    setLoading(true);
    const allNews: NewsItem[] = [];

    for (const source of sources) {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
        if (!response.ok) continue;
        
        const data = await response.json();
        if (data.status !== 'ok') continue;
        
        data.items.slice(0, 15).forEach((item: any) => {
          const title = item.title || "";
          const link = item.link || "";
          
          if (title.toUpperCase().includes('VÍDEO') || title.toUpperCase().includes('ASSISTA') || link.includes('video')) {
            return;
          }

          let image = item.thumbnail || item.enclosure?.link || "";
          
          if (!image && item.description) {
            const imgMatch = item.description.match(/src="([^"]+)"/);
            if (imgMatch) {
              image = imgMatch[1];
            }
          }

          if (image) {
            allNews.push({ title, link, image, source: source.name });
          }
        });

      } catch (error) {
        console.error(`Erro ao buscar notícias de ${source.name}:`, error);
      }
    }

    let filteredNews = allNews.filter(item => 
      !deletedIds.includes(item.link) && !hiddenIds.includes(item.link)
    );

    filteredNews = filteredNews.sort(() => Math.random() - 0.5);

    setNews(filteredNews);
    setLoading(false);
  }, [settings.rssSources, deletedIds, hiddenIds]);

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  const displayNews = activeCategory 
    ? news.filter(n => n.source === activeCategory).slice(0, 6)
    : news.slice(0, 6);

  return (
    <div className="glass-card p-5 h-full border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Últimas Notícias
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-[8px] font-black border px-1.5 py-0.5 rounded uppercase tracking-tighter transition-colors ${
                activeCategory === null 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'text-slate-500 border-slate-800 hover:text-white hover:border-slate-600'
              }`}
            >
              TODAS
            </button>
            {Array.from(new Set(sources.map((s: any) => s.name))).map((categoryName: any) => (
              <button 
                key={categoryName} 
                onClick={() => setActiveCategory(categoryName)}
                className={`text-[8px] font-black border px-1.5 py-0.5 rounded uppercase tracking-tighter transition-colors ${
                  activeCategory === categoryName 
                    ? 'bg-blue-600 text-white border-blue-500' 
                    : 'text-slate-500 border-slate-800 hover:text-white hover:border-slate-600'
                }`}
              >
                {categoryName}
              </button>
            ))}
          </div>
          <button 
            onClick={fetchAllNews}
            disabled={loading}
            className="p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-colors border border-white/5"
            title="Atualizar notícias"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800/50 aspect-video rounded-xl border border-white/5" />
          ))
        ) : displayNews.length > 0 ? (
          displayNews.map((item, index) => (
            <motion.a
              key={item.link + index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden border border-white/5 cursor-pointer shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-95 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-center gap-2 mb-1.5">
                   <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-widest shadow-lg">
                      {item.source}
                   </span>
                </div>
                <p className="text-white text-[10px] font-bold leading-tight line-clamp-3 group-hover:text-blue-400 transition-colors drop-shadow-md">
                  {item.title}
                </p>
                <div className="h-0.5 w-0 bg-blue-500 mt-2 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            </motion.a>
          ))
        ) : (
          <p className="text-slate-400 text-xs sm:col-span-2 text-center py-10">
            Nenhuma notícia com foto encontrada no momento para esta categoria.
          </p>
        )}
      </div>
    </div>
  );
}

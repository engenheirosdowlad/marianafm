import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  source: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const sources = [
    { name: 'POLÍTICA', url: 'https://g1.globo.com/rss/g1/politica/' },
    { name: 'ESPORTE', url: 'https://ge.globo.com/rss/ge/' },
    { name: 'ENTRETENIMENTO', url: 'https://g1.globo.com/rss/g1/pop-arte/' }
  ];

  const fetchAllNews = useCallback(async () => {
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
        
        // Fetch up to 30 items per category to ensure a good amount of news on the full page
        Array.from(items).slice(0, 30).forEach(item => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const description = item.querySelector("description")?.textContent || "";
          
          if (title.toUpperCase().includes('VÍDEO') || title.toUpperCase().includes('ASSISTA') || link.includes('video')) {
            return;
          }

          let image = "";
          const mediaContent = item.getElementsByTagName("media:content")[0] || item.getElementsByTagName("content")[0];
          const enclosure = item.getElementsByTagName("enclosure")[0];

          if (mediaContent) {
            image = mediaContent.getAttribute("url") || "";
          } else if (enclosure) {
            image = enclosure.getAttribute("url") || "";
          }
          
          if (!image) {
            const imgMatch = description.match(/src="([^"]+)"/);
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

    const storedHidden = localStorage.getItem('hiddenNewsLinks');
    const storedDeleted = localStorage.getItem('deletedNewsLinks');
    const hiddenIds = storedHidden ? JSON.parse(storedHidden) : [];
    const deletedIds = storedDeleted ? JSON.parse(storedDeleted) : [];

    let filteredNews = allNews.filter(item => 
      !deletedIds.includes(item.link) && !hiddenIds.includes(item.link)
    );

    // Embaralhar para misturar fontes
    filteredNews = filteredNews.sort(() => Math.random() - 0.5);

    setNews(filteredNews);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  // Display up to 24 items on the full page
  const displayNews = activeCategory 
    ? news.filter(n => n.source === activeCategory).slice(0, 24)
    : news.slice(0, 24);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h1 className="text-white font-black text-3xl uppercase tracking-wider flex items-center gap-3">
          <span className="w-3 h-10 bg-blue-500 rounded-full animate-pulse"></span>
          Notícias
        </h1>
        
        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-white/5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs font-black border px-3 py-1.5 rounded-lg uppercase tracking-tighter transition-colors ${
                activeCategory === null 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                  : 'text-slate-500 border-slate-800 hover:text-white hover:border-slate-600'
              }`}
            >
              TODAS
            </button>
            {sources.map(s => (
              <button 
                key={s.name} 
                onClick={() => setActiveCategory(s.name)}
                className={`text-xs font-black border px-3 py-1.5 rounded-lg uppercase tracking-tighter transition-colors ${
                  activeCategory === s.name 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                    : 'text-slate-500 border-slate-800 hover:text-white hover:border-slate-600'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="w-px h-8 bg-slate-800 hidden sm:block"></div>
          <button 
            onClick={fetchAllNews}
            disabled={loading}
            className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-colors border border-white/5 flex items-center gap-2"
            title="Atualizar notícias"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span className="text-xs font-bold uppercase hidden sm:block">Atualizar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800/50 aspect-video rounded-xl border border-white/5" />
          ))
        ) : displayNews.length > 0 ? (
          displayNews.map((item, index) => (
            <motion.a
              key={item.link + index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col bg-slate-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-2xl"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-95 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg">
                    {item.source}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-white text-sm font-bold leading-tight line-clamp-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </p>
                <div className="h-0.5 w-0 bg-blue-500 mt-3 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            </motion.a>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
            <p className="text-lg">Nenhuma notícia com foto encontrada no momento para esta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

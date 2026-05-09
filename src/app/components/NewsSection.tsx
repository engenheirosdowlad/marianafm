import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  source: string;
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const sources = [
    { name: 'G1 PARÁ', url: 'https://g1.globo.com/rss/g1/pa/para/' },
    { name: 'DOL', url: 'https://dol.com.br/rss' },
    { name: 'O LIBERAL', url: 'https://www.oliberal.com/rss' }
  ];

  useEffect(() => {
    async function fetchAllNews() {
      setLoading(true);
      const allNews: NewsItem[] = [];

      for (const source of sources) {
        try {
          // Usando corsproxy.io para todos
          const response = await fetch(`https://corsproxy.io/?${encodeURIComponent(source.url)}`);
          if (!response.ok) continue;
          
          const xmlText = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");
          
          const items = xmlDoc.querySelectorAll("item");
          
          const parsed = Array.from(items).slice(0, 3).map(item => {
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

            // Fallback image based on source if not found
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

      // Se falhar tudo, carregar fallback
      if (allNews.length === 0) {
        allNews.push({
          title: "Acompanhe as notícias do Pará nos portais regionais",
          link: "https://g1.globo.com/pa/para/",
          image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop",
          source: "SISTEMA"
        });
      }

      const storedHidden = localStorage.getItem('hiddenNewsLinks');
      const storedDeleted = localStorage.getItem('deletedNewsLinks');
      const hiddenIds = storedHidden ? JSON.parse(storedHidden) : [];
      const deletedIds = storedDeleted ? JSON.parse(storedDeleted) : [];

      const filteredNews = allNews.filter(item => 
        !deletedIds.includes(item.link) && !hiddenIds.includes(item.link)
      );

      // Embaralhar um pouco para misturar fontes
      setNews(filteredNews.sort(() => Math.random() - 0.5).slice(0, 6));
      setLoading(false);
    }

    fetchAllNews();
  }, []);

  return (
    <div className="glass-card p-5 h-full border border-white/5 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Notícias do Pará
        </h2>
        <div className="flex gap-2">
          {['G1', 'DOL', 'LIBERAL'].map(s => (
            <span key={s} className="text-[8px] font-black text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded uppercase tracking-tighter">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-slate-800/50 aspect-video rounded-xl border border-white/5" />
          ))
        ) : (
          news.map((item, index) => (
            <motion.a
              key={index}
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
        )}
      </div>
    </div>
  );
}

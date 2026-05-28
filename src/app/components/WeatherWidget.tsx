import { useEffect, useState } from 'react';
import { CloudSun, Sun, CloudRain, Cloud } from 'lucide-react';

interface WeatherData {
  temp: number;
  isDay: boolean;
  code: number;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Barcarena - PA coordinates: -1.5058, -48.6258
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-1.5058&longitude=-48.6258&current=temperature_2m,is_day,weather_code')
      .then(res => {
        if (!res.ok) throw new Error('Open-Meteo status ' + res.status);
        return res.json();
      })
      .then(data => {
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            isDay: data.current.is_day === 1,
            code: data.current.weather_code,
          });
        }
      })
      .catch(err => {
        console.error('Failed to fetch weather from Open-Meteo, trying wttr.in fallback...', err);
        fetch('https://wttr.in/Barcarena?format=j1')
          .then(res => res.json())
          .then(data => {
            if (data && data.current_condition && data.current_condition[0]) {
              const current = data.current_condition[0];
              const temp = Math.round(Number(current.temp_C));
              const iconUrl = current.weatherIconUrl?.[0]?.value || '';
              const isDay = !iconUrl.includes('night') && !iconUrl.includes('_night');
              const wttrCode = Number(current.weatherCode);
              
              // Map WWO code to WMO code
              let code = 3;
              if (wttrCode === 113) code = 0;
              else if (wttrCode === 116) code = 1;
              else if (wttrCode === 119 || wttrCode === 122) code = 3;
              else if (wttrCode >= 263 && wttrCode <= 308) code = 61; // Rain
              else if (wttrCode >= 353 && wttrCode <= 359) code = 80; // Shower
              else if (wttrCode >= 386 && wttrCode <= 395) code = 95; // Thunderstorm
              else if (wttrCode >= 248 && wttrCode <= 260) code = 45; // Fog

              setWeather({
                temp,
                isDay,
                code,
              });
            }
          })
          .catch(fallbackErr => console.error('Failed to fetch weather from fallback', fallbackErr));
      });
  }, []);

  const getWeatherIcon = () => {
    if (!weather) {
      // Loading state (Sun peeking through cloud floating)
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative text-slate-300">
          <g className="animate-spin-slow origin-[18px_6px]">
            <circle cx="18" cy="6" r="3" fill="#eab308" className="animate-pulse" />
          </g>
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="currentColor" 
            className="animate-bounce-slow"
          />
        </svg>
      );
    }

    const code = weather.code;

    // Tempestade / Storm (code >= 95)
    if (code >= 95) {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative">
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="#64748b" 
            className="animate-storm-cloud"
          />
          <path d="M13 10L9 15h3l-1 5 5-6h-3l1-4z" fill="#facc15" className="animate-lightning" />
          <line x1="8" y1="19" x2="6" y2="23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-rain-1" />
          <line x1="15" y1="19" x2="13" y2="23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-rain-3" />
        </svg>
      );
    }

    // Chuva / Rain (code >= 61 && code <= 67) or Pancadas (code >= 80 && code <= 82)
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative">
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="#94a3b8" 
            className="animate-bounce-slow"
          />
          <line x1="8" y1="19" x2="6" y2="23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-rain-1" />
          <line x1="12" y1="19" x2="10" y2="23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-rain-2" />
          <line x1="16" y1="19" x2="14" y2="23" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="animate-rain-3" />
        </svg>
      );
    }

    // Garoa / Drizzle (code >= 51 && code <= 55)
    if (code >= 51 && code <= 55) {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative">
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="#e2e8f0" 
            className="animate-bounce-slow"
          />
          <line x1="9" y1="19" x2="9" y2="21" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" className="animate-drizzle-1" />
          <line x1="12" y1="19" x2="12" y2="21" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" className="animate-drizzle-2" />
          <line x1="15" y1="19" x2="15" y2="21" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" className="animate-drizzle-3" />
        </svg>
      );
    }

    // Nublado / Cloudy (code >= 1 && code <= 3) or Névoa (code >= 45 && code <= 48)
    if (code >= 1 && code <= 48) {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative">
          {/* Back cloud (slate-400) */}
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="#64748b" 
            className="animate-weather-cloud-back origin-center" 
            transform="scale(0.8) translate(4, -2)"
          />
          {/* Front cloud (pure white) */}
          <path 
            d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
            fill="#ffffff" 
            className="animate-weather-cloud-front origin-center"
          />
        </svg>
      );
    }

    // Ensolarado / Sunny (code === 0)
    if (code === 0) {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" className="relative text-yellow-400 animate-sun-pulse">
          <g className="animate-spin-slow origin-center">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="19.78" y1="4.22" x2="18.36" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="5.64" y1="18.36" x2="4.22" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );
    }

    // Fallback default
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" className="relative text-white animate-bounce-slow">
        <path 
          d="M17.5 19A4.5 4.5 0 0 0 22 14.5c0-2-1.34-3.75-3.2-4.28A6.5 6.5 0 0 0 6.8 9.77a4 4 0 0 0 .2 7.98h10.5z" 
          fill="currentColor" 
        />
      </svg>
    );
  };

  const getWeatherText = () => {
    if (!weather) return 'Carregando...';
    const code = weather.code;
    if (code === 0) return weather.isDay ? 'Ensolarado' : 'Céu Limpo';
    if (code >= 1 && code <= 3) return 'Nublado';
    if (code >= 45 && code <= 48) return 'Névoa';
    if (code >= 51 && code <= 55) return 'Garoa';
    if (code >= 61 && code <= 67) return 'Chuva';
    if (code >= 80 && code <= 82) return 'Pancadas';
    if (code >= 95) return 'Tempestade';
    return 'Instável';
  };

  return (
    <a 
      href="https://www.climatempo.com.br/previsao-do-tempo/cidade/655/barcarena-pa"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 transition-colors border border-white/5 rounded-2xl backdrop-blur-sm group cursor-pointer"
      title="Ver previsão completa"
    >
      {getWeatherIcon()}
      <div className="flex flex-col">
        <span className="text-slate-200 text-[10px] font-black uppercase tracking-wider leading-none mb-0.5 group-hover:text-white transition-colors">Barcarena, PA</span>
        <div className="flex items-center gap-1.5 mt-0.5">
           <span className="text-blue-400 text-xs font-bold leading-none">{weather ? `${weather.temp}ºC` : '--º C'}</span>
           {weather && <span className="text-slate-400 text-[10px] font-medium leading-none tracking-wide">{getWeatherText()}</span>}
        </div>
      </div>
    </a>
  );
}

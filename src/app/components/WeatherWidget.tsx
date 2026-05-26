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
    if (!weather) return <CloudSun size={18} className="text-blue-400" />;
    if (weather.code >= 60 && weather.code <= 69) return <CloudRain size={18} className="text-blue-400" />;
    if (weather.code >= 3) return <Cloud size={18} className="text-slate-400" />;
    if (weather.isDay) return <Sun size={18} className="text-yellow-400" />;
    return <CloudSun size={18} className="text-blue-400" />;
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

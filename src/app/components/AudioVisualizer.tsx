import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';

export function AudioVisualizer() {
  const { isPlaying } = usePlayer();
  const { settings: globalSettings } = useSettings();
  
  const settings = {
    color: globalSettings.visualizerColor || '#3b82f6',
    intensity: parseInt(globalSettings.visualizerIntensity || '50'),
    thickness: parseInt(globalSettings.visualizerThickness || '5')
  };

  // Calculate number of bars based on screen width (approximate)
  const [barCount, setBarCount] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      // Roughly 1 bar per 15px of screen width
      const width = window.innerWidth;
      setBarCount(Math.max(30, Math.floor(width / 15)));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end justify-center gap-[2px] px-4">
      {Array.from({ length: barCount }).map((_, i) => {
        // Calculate gradient hue (Blue -> Purple -> Orange)
        // Blue is ~220, Orange is ~30. We transition from 220 to 30.
        const ratio = i / barCount;
        const hue = 220 - (190 * ratio);
        const color = `hsl(${hue}, 80%, 60%)`;
        
        // Bell curve to make edges shorter
        const distRatio = Math.abs((i / barCount) - 0.5) * 2; 
        const bellCurve = Math.max(0.2, 1 - Math.pow(distRatio, 2));

        return (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying 
                ? [
                    `${(10 + Math.random() * 70) * bellCurve}%`, 
                    `${(20 + Math.random() * 80) * bellCurve}%`, 
                    `${(10 + Math.random() * 70) * bellCurve}%`
                  ] 
                : `${5 * bellCurve}%` 
            }}
            transition={{ 
              duration: 0.4 + Math.random() * 0.4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundColor: isPlaying ? color : '#334155',
              width: `${settings.thickness}px`,
              boxShadow: isPlaying ? `0 0 ${settings.intensity}px ${color}80` : 'none'
            }}
            className="rounded-t-full transition-colors duration-500"
          />
        );
      })}
    </div>
  );
}

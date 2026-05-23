import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

export function AudioVisualizer() {
  const { isPlaying } = usePlayer();
  const [settings, setSettings] = useState({
    color: '#3b82f6',
    intensity: 50,
    thickness: 5
  });

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

  useEffect(() => {
    const loadSettings = () => {
      setSettings({
        color: localStorage.getItem('visualizerColor') || '#3b82f6',
        intensity: parseInt(localStorage.getItem('visualizerIntensity') || '50'),
        thickness: parseInt(localStorage.getItem('visualizerThickness') || '5')
      });
    };
    loadSettings();
    window.addEventListener('settingsUpdated', loadSettings);
    return () => window.removeEventListener('settingsUpdated', loadSettings);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[60%] flex items-end justify-center gap-1 opacity-90 px-4">
      {Array.from({ length: barCount }).map((_, i) => {
        // Rainbow color logic based on index
        const hue = (i / barCount) * 360; 
        
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
              backgroundColor: isPlaying ? `hsl(${hue}, 80%, 60%)` : '#334155',
              width: `${settings.thickness}px`,
              boxShadow: isPlaying ? `0 0 ${settings.intensity / 2}px ${settings.intensity / 5}px hsl(${hue}, 80%, 60%)` : 'none'
            }}
            className="rounded-t-full transition-colors duration-500"
          />
        );
      })}
    </div>
  );
}

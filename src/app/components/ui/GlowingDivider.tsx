import { useState, useEffect } from 'react';

export function GlowingDivider({ className = '' }: { className?: string }) {
  const [thickness, setThickness] = useState('1');
  const [glowIntensity, setGlowIntensity] = useState('20');

  useEffect(() => {
    const loadSettings = () => {
      setThickness(localStorage.getItem('dividerThickness') || '1');
      setGlowIntensity(localStorage.getItem('dividerGlow') || '20');
    };
    
    loadSettings();
    window.addEventListener('settingsUpdated', loadSettings);
    return () => window.removeEventListener('settingsUpdated', loadSettings);
  }, []);

  return (
    <div 
      className={`w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500 ${className}`}
      style={{
        height: `${thickness}px`,
        boxShadow: `0 0 ${glowIntensity}px rgba(59,130,246,0.8)`
      }}
    />
  );
}

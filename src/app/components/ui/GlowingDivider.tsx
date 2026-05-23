import { useSettings } from '../../context/SettingsContext';

export function GlowingDivider({ className = '' }: { className?: string }) {
  const { settings } = useSettings();
  const thickness = settings.dividerThickness || '1';
  const glowIntensity = settings.dividerGlow || '20';

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

interface PlayPauseIconProps {
  type: 'play' | 'pause';
  size?: number;
}

export function PlayPauseIcon({ type, size = 64 }: PlayPauseIconProps) {
  if (type === 'play') {
    return (
      <svg width={size} height={size} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="playGradient" x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Rounded Triangle Base */}
        <path 
          d="M214.5 106.3C228.3 114.3 228.3 134.4 214.5 142.4L58.5 232.4C44.7 240.4 27.4 230.4 27.4 214.4L27.4 34.3C27.4 18.3 44.7 8.3 58.5 16.3L214.5 106.3Z" 
          fill="url(#playGradient)" 
          stroke="white" 
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Inner Play Icon */}
        <path d="M100 80L160 124L100 168V80Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
      <defs>
        <linearGradient id="pauseGradient" x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Rounded Triangle Base */}
      <path 
        d="M214.5 106.3C228.3 114.3 228.3 134.4 214.5 142.4L58.5 232.4C44.7 240.4 27.4 230.4 27.4 214.4L27.4 34.3C27.4 18.3 44.7 8.3 58.5 16.3L214.5 106.3Z" 
        fill="url(#pauseGradient)" 
        stroke="white" 
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Inner Pause Icon (Bars) */}
      <rect x="95" y="80" width="12" height="88" rx="4" fill="white" />
      <rect x="135" y="80" width="12" height="88" rx="4" fill="white" />
    </svg>
  );
}

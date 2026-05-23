import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';

type PlayerType = 'audio' | 'video';

interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  activePlayer: PlayerType;
  setActivePlayer: (player: PlayerType) => void;
  volume: number;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePlayer, setActivePlayer] = useState<PlayerType>('video'); // Padrão vídeo como no esboço
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { settings } = useSettings();
  const streamUrl = settings.audioStreamUrl || "https://link.radio.br:18630/stream";

  // Auto-play ao alternar
  useEffect(() => {
    setIsPlaying(true);
  }, [activePlayer]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && activePlayer === 'audio') {
        audioRef.current.play().catch(err => {
          console.error("Erro ao reproduzir áudio:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activePlayer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      setIsPlaying,
      activePlayer,
      setActivePlayer,
      volume,
      setVolume,
      audioRef
    }}>
      {children}
      <audio ref={audioRef} src={activePlayer === 'audio' ? streamUrl : ''} />
    </PlayerContext.Provider>
  );
}


export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

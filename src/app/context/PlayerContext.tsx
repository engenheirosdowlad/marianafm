import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';
import { Capacitor } from '@capacitor/core';

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

const isNative = Capacitor.isNativePlatform();

// Acessa o plugin nativo de forma segura através do objeto de plugins do Capacitor
const NativeAudio = (Capacitor.Plugins as any).NativeAudio;

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePlayer, setActivePlayer] = useState<PlayerType>('video'); // Padrão vídeo como no esboço
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { settings } = useSettings();
  const streamUrl = settings.audioStreamUrl || "https://link.radio.br:18630/stream";

  // Configura o áudio nativo uma vez no início se o plugin estiver disponível
  useEffect(() => {
    if (isNative && NativeAudio) {
      NativeAudio.configure({
        backgroundPlayback: true,
        showNotification: true,
        focus: true
      }).catch((err: any) => {
        console.error("Erro ao configurar NativeAudio:", err);
      });
    }
  }, []);

  // Auto-play ao alternar
  useEffect(() => {
    setIsPlaying(true);
  }, [activePlayer]);

  // Gerenciamento da reprodução (Natividade vs Web)
  useEffect(() => {
    if (isNative && NativeAudio) {
      const handleNativePlay = async () => {
        try {
          if (isPlaying && activePlayer === 'audio') {
            // Tenta descarregar se já existir para limpar
            try {
              await NativeAudio.unload({ assetId: 'live_stream' });
            } catch (e) {}

            // Prepara a transmissão
            await NativeAudio.preload({
              assetId: 'live_stream',
              assetPath: streamUrl,
              isUrl: true,
              volume: volume,
              audioChannelNum: 1
            });

            // Toca a rádio
            await NativeAudio.play({ assetId: 'live_stream' });
          } else {
            // Para a rádio nativa
            try {
              await NativeAudio.stop({ assetId: 'live_stream' });
              await NativeAudio.unload({ assetId: 'live_stream' });
            } catch (e) {}
          }
        } catch (err) {
          console.error("Erro no controle do NativeAudio:", err);
        }
      };
      handleNativePlay();
    } else {
      // Navegador / Web normal
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
    }
  }, [isPlaying, activePlayer, streamUrl]);

  // Controle de volume
  useEffect(() => {
    if (isNative && NativeAudio) {
      NativeAudio.setVolume({ assetId: 'live_stream', volume: volume }).catch(() => {});
    } else if (audioRef.current) {
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
      {/* O elemento HTML5 só executa se não for nativo ou se o áudio nativo não estiver ativo */}
      {(!isNative || !NativeAudio) && (
        <audio ref={audioRef} src={activePlayer === 'audio' ? streamUrl : ''} />
      )}
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

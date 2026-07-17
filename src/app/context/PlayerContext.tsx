import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSettings } from './SettingsContext';
import { Capacitor } from '@capacitor/core';
import { useLocation } from 'react-router';

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
  const [activePlayer, setActivePlayer] = useState<PlayerType>('audio'); // Padrão áudio para tocar no início
  const [volume, setVolume] = useState(0.7);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstRender = useRef(true);
  const { settings } = useSettings();
  const streamUrl = settings.audioStreamUrl || "https://link.radio.br:17304/stream";
  const location = useLocation();

  // Pausa o player automaticamente ao entrar em rotas administrativas (/admin)
  useEffect(() => {
    if (location.pathname.startsWith('/admin')) {
      setIsPlaying(false);
    }
  }, [location.pathname]);
 
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
            console.warn("Autoplay block or audio play error:", err);
            setIsAutoplayBlocked(true);
          });
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [isPlaying, activePlayer, streamUrl]);
 
  // Recupera reprodução no primeiro toque/clique caso o autoplay seja bloqueado pelo navegador
  useEffect(() => {
    if (isNative && NativeAudio) return;
 
    const handleInteraction = () => {
      if (isPlaying && activePlayer === 'audio' && audioRef.current) {
        if (audioRef.current.paused) {
          audioRef.current.play()
            .then(() => {
              console.log("Áudio iniciado com sucesso após interação do usuário.");
              setIsAutoplayBlocked(false);
              cleanup();
            })
            .catch(err => {
              console.warn("Falha ao iniciar áudio após interação:", err);
            });
        } else {
          // Se já está tocando, removemos os listeners
          setIsAutoplayBlocked(false);
          cleanup();
        }
      }
    };
 
    const events = ['click', 'pointerdown', 'keydown', 'touchstart'];
    
    const cleanup = () => {
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
 
    if (isPlaying && activePlayer === 'audio') {
      events.forEach(event => {
        window.addEventListener(event, handleInteraction, { passive: true });
      });
    }
 
    return cleanup;
  }, [isPlaying, activePlayer]);
 
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

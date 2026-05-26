import React, { createContext, useContext, useState, useEffect } from 'react';

interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
}

interface SettingsContextData {
  settings: Record<string, string>;
  banners: Banner[];
  loading: boolean;
  saveSettings: (newSettings: Record<string, string>) => Promise<void>;
  saveBanners: (newBanners: Banner[]) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextData>({} as SettingsContextData);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const [settingsRes, bannersRes] = await Promise.all([
        fetch('/api/settings.php'),
        fetch('/api/banners.php')
      ]);

      if (settingsRes.ok) {
        const data = await settingsRes.json();
        const defaultSettings = {
          siteName: 'CIDADE FM 87,9 MHZ',
          audioStreamUrl: 'https://link.radio.br:18630/stream',
          videoStreamUrl: 'https://link.radio.br:18630/video',
          whatsappNumber: '(91) 98273-6292',
          whatsappUrl: 'https://wa.me/5591982736292',
          instagramUrl: 'https://www.instagram.com/marianafmdigital',
          facebookUrl: 'https://www.facebook.com/jpscardoso88',
          youtubeUrl: 'https://www.youtube.com/@LaMarianaFMProgramas',
          headerTitle: 'Seja bem-vindo a Cidade FM',
          headerSubtitle: 'onde nasce o sucesso',
          dividerThickness: '4',
          dividerGlow: '20',
          visualizerIntensity: '100',
          visualizerThickness: '10',
          rssSources: JSON.stringify([
            { name: 'ENTRETENIMENTO', url: 'https://g1.globo.com/rss/g1/pop-arte/' },
            { name: 'ESPORTE', url: 'https://jovempan.com.br/esportes/feed' },
            { name: 'POLÍTICA', url: 'https://g1.globo.com/rss/g1/politica/' }
          ])
        };
        setSettings({ ...defaultSettings, ...data });
      }

      if (bannersRes.ok) {
        const bData = await bannersRes.json();
        setBanners(bData);
      }
    } catch (error) {
      console.error('Failed to load settings from API:', error);
      // Fallback for visual settings if API fails
      setSettings({
        siteName: 'CIDADE FM 87,9 MHZ',
        audioStreamUrl: 'https://link.radio.br:18630/stream',
        videoStreamUrl: 'https://link.radio.br:18630/video',
        whatsappNumber: '(91) 98273-6292',
        whatsappUrl: 'https://wa.me/5591982736292',
        instagramUrl: 'https://www.instagram.com/marianafmdigital',
        facebookUrl: 'https://www.facebook.com/jpscardoso88',
        youtubeUrl: 'https://www.youtube.com/@LaMarianaFMProgramas',
        headerTitle: 'Seja bem-vindo a Cidade FM',
        headerSubtitle: 'onde nasce o sucesso',
        dividerThickness: '4',
        dividerGlow: '20',
        bannerInterval: '5',
        visualizerColor: '#3b82f6',
        visualizerIntensity: '100',
        visualizerThickness: '10',
        rssSources: JSON.stringify([
          { name: 'ENTRETENIMENTO', url: 'https://g1.globo.com/rss/g1/pop-arte/' },
          { name: 'ESPORTE', url: 'https://jovempan.com.br/esportes/feed' },
          { name: 'POLÍTICA', url: 'https://g1.globo.com/rss/g1/politica/' }
        ])
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async (newSettings: Record<string, string>) => {
    try {
      const response = await fetch('/api/settings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });
      if (response.ok) {
        setSettings(prev => ({ ...prev, ...newSettings }));
        window.dispatchEvent(new Event('settingsUpdated'));
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  };

  const saveBanners = async (newBanners: Banner[]) => {
    try {
      const response = await fetch('/api/banners.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBanners),
      });
      if (response.ok) {
        setBanners(newBanners);
      }
    } catch (error) {
      console.error('Failed to save banners:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, banners, loading, saveSettings, saveBanners, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

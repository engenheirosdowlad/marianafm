import { useState, useEffect } from 'react';
import { Save, Info, Upload, AlignLeft, AlignCenter, AlignRight, AlignJustify, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import defaultLogo from '../../../assets/logo.png';

export default function AdminAbout() {
  const { settings, saveSettings } = useSettings();
  
  const [aboutText, setAboutText] = useState('');
  const [aboutTitle, setAboutTitle] = useState('Quem Somos');
  const [aboutImageUrl, setAboutImageUrl] = useState('');
  const [aboutImageSize, setAboutImageSize] = useState('192');
  const [aboutTextSize, setAboutTextSize] = useState('16');
  const [aboutTextFont, setAboutTextFont] = useState('sans');
  const [aboutTextAlign, setAboutTextAlign] = useState('left');
  const [aboutTextColor, setAboutTextColor] = useState('#cbd5e1');
  const [aboutCardBgColor, setAboutCardBgColor] = useState('rgba(15, 23, 42, 0.5)');

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.aboutText) setAboutText(settings.aboutText);
    setAboutTitle(settings.aboutTitle || 'Quem Somos');
    if (settings.aboutImageUrl) setAboutImageUrl(settings.aboutImageUrl);
    if (settings.aboutImageSize) setAboutImageSize(settings.aboutImageSize);
    if (settings.aboutTextSize) setAboutTextSize(settings.aboutTextSize);
    if (settings.aboutTextFont) setAboutTextFont(settings.aboutTextFont);
    if (settings.aboutTextAlign) setAboutTextAlign(settings.aboutTextAlign);
    if (settings.aboutTextColor) setAboutTextColor(settings.aboutTextColor);
    if (settings.aboutCardBgColor) setAboutCardBgColor(settings.aboutCardBgColor);
  }, [settings]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveSettings({
        aboutText,
        aboutTitle,
        aboutImageUrl,
        aboutImageSize,
        aboutTextSize,
        aboutTextFont,
        aboutTextAlign,
        aboutTextColor,
        aboutCardBgColor
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert('Erro ao salvar as configurações da página Sobre.');
    } finally {
      setLoading(false);
    }
  };

  const fontMap: Record<string, string> = {
    sans: "'Outfit', 'Inter', sans-serif",
    system: "system-ui, -apple-system, sans-serif",
    mono: "monospace"
  };
  const selectedFont = fontMap[aboutTextFont] || fontMap.sans;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-white font-black text-2xl uppercase tracking-wider">Página Institucional (Sobre)</h1>
          <p className="text-slate-400 text-sm">Gerencie o conteúdo sobre a rádio e personalize a exibição com padrão ouro.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
            saved 
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <>Salvo com sucesso!</>
          ) : (
            <><Save size={20} /> Salvar Alterações</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
              <Info className="text-blue-500" size={18} /> Conteúdo Institucional
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Título da Seção
                </label>
                <button 
                  type="button" 
                  onClick={() => setAboutTitle('Quem Somos')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <input
                type="text"
                value={aboutTitle}
                onChange={(e) => setAboutTitle(e.target.value)}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: Quem Somos"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  História da Rádio
                </label>
                <button 
                  type="button" 
                  onClick={() => setAboutText('A rádio Cidade FM 87,9 MHZ é líder em audiência em Barcarena, Pará, trazendo o melhor da música, jornalismo e entretenimento para todos os nossos ouvintes. Onde nasce o sucesso!')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={6}
                className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors resize-y"
                placeholder="Escreva sobre a rádio..."
              />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl p-6 space-y-6">
            <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
              <ImageIcon className="text-blue-500" size={18} /> Mídia e Personalização
            </h2>

             {/* Custom Image */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                  Imagem da Seção Sobre (URL ou Upload)
                </label>
                <button 
                  type="button" 
                  onClick={() => setAboutImageUrl('')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aboutImageUrl}
                  onChange={(e) => setAboutImageUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white text-sm focus:border-blue-500 outline-none transition-colors font-mono"
                  placeholder="Cole um link ou faça upload ->"
                />
                <label className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg cursor-pointer transition-colors shrink-0" title="Fazer upload">
                  <Upload size={18} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setAboutImageUrl(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                </label>
              </div>
            </div>

            {/* Image Size Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                  <span>Tamanho da Imagem</span>
                  <span className="text-blue-400">{aboutImageSize}px</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => setAboutImageSize('192')}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                  title="Restaurar valor padrão"
                >
                  <RotateCcw size={10} /> Padrão
                </button>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="10"
                value={aboutImageSize}
                onChange={(e) => setAboutImageSize(e.target.value)}
                className="w-full h-8 accent-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider flex justify-between w-full pr-4">
                    <span>Tamanho da Fonte</span>
                    <span className="text-blue-400">{aboutTextSize}px</span>
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setAboutTextSize('16')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors shrink-0"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <input
                  type="range"
                  min="12"
                  max="28"
                  value={aboutTextSize}
                  onChange={(e) => setAboutTextSize(e.target.value)}
                  className="w-full h-8 accent-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Tipo da Fonte
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setAboutTextFont('sans')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <select
                  value={aboutTextFont}
                  onChange={(e) => setAboutTextFont(e.target.value)}
                  className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="sans">Sans-serif Moderno</option>
                  <option value="system">Sistema Padrão</option>
                  <option value="mono">Monospace Digital</option>
                </select>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Alinhamento do Texto
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setAboutTextAlign('left')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-white/5">
                  {[
                    { align: 'left', icon: AlignLeft },
                    { align: 'center', icon: AlignCenter },
                    { align: 'right', icon: AlignRight },
                    { align: 'justify', icon: AlignJustify }
                  ].map((btn) => (
                    <button
                      key={btn.align}
                      onClick={() => setAboutTextAlign(btn.align)}
                      className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${
                        aboutTextAlign === btn.align 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <btn.icon size={16} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Cor do Texto
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setAboutTextColor('#cbd5e1')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={aboutTextColor}
                    onChange={(e) => setAboutTextColor(e.target.value)}
                    className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                  />
                  <input
                    type="text"
                    value={aboutTextColor}
                    onChange={(e) => setAboutTextColor(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    placeholder="#cbd5e1"
                  />
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-400 text-xs font-black uppercase tracking-wider">
                    Cor do Fundo do Card
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setAboutCardBgColor('rgba(15, 23, 42, 0.5)')}
                    className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    title="Restaurar valor padrão"
                  >
                    <RotateCcw size={10} /> Padrão
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={aboutCardBgColor.startsWith('rgba') ? '#0f172a' : aboutCardBgColor}
                    onChange={(e) => setAboutCardBgColor(e.target.value)}
                    className="w-12 h-10 bg-slate-900 border border-white/5 rounded-lg cursor-pointer p-0 border-0"
                  />
                  <input
                    type="text"
                    value={aboutCardBgColor}
                    onChange={(e) => setAboutCardBgColor(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-white text-sm outline-none font-mono"
                    placeholder="rgba(15, 23, 42, 0.5)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-slate-400 font-black text-xs uppercase tracking-wider">Visualização em Tempo Real</h3>
          <div className="bg-slate-950 rounded-2xl border border-white/5 p-6 shadow-inner relative overflow-hidden h-max flex items-center justify-center min-h-[300px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
            
            <div 
              style={{ backgroundColor: aboutCardBgColor }}
              className="w-full border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-6"
            >
              <div 
                style={{ 
                  width: `${aboutImageSize}px`, 
                  height: `${aboutImageSize}px` 
                }}
                className="rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center p-4 shrink-0 shadow-lg"
              >
                <img 
                  src={aboutImageUrl || defaultLogo} 
                  alt="Preview Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                />
              </div>

              <div className="w-full space-y-4">
                <h4 className="text-white font-bold text-lg tracking-tight text-center">{aboutTitle || 'Quem Somos'}</h4>
                <div 
                  style={{ 
                    fontFamily: selectedFont,
                    fontSize: `${aboutTextSize}px`,
                    color: aboutTextColor,
                    textAlign: aboutTextAlign as any
                  }}
                  className="leading-relaxed whitespace-pre-wrap transition-all"
                >
                  {aboutText || 'A rádio Cidade FM 87,9 MHZ...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

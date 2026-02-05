import React, { useState } from 'react';
import type { ColorType, GradientType } from '../../types';
import {
  Palette,
  RotateCcw,
  RefreshCw,
  Info,
  Layers,
  QrCode,
  Eye,
  EyeOff,
  Monitor
} from 'lucide-react';
import { Accordion } from '../Accordion';
import { Tooltip } from '../ui/Tooltip';
import { RotationSlider } from '../ui/RotationSlider';
import { ColorInput } from '../ui/ColorInput';
import { QrDesignState } from '../../types';

export interface ColorSettingsProps {
  colorType: ColorType;
  setColorType: (type: ColorType) => void;
  gradientType: GradientType;
  setGradientType: (type: GradientType) => void;
  gradientColor1: string;
  setGradientColor1: (color: string) => void;
  gradientColor2: string;
  setGradientColor2: (color: string) => void;
  gradientRotation: number;
  setGradientRotation: (rotation: number) => void;
  customEyeColor: boolean;
  setCustomEyeColor: (custom: boolean) => void;
  eyeFrameColor: string;
  setEyeFrameColor: (color: string) => void;
  eyeBallColor: string;
  setEyeBallColor: (color: string) => void;
  design: QrDesignState;
  setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
  isDarkMode: boolean;
}

export const ColorSettings: React.FC<ColorSettingsProps> = ({
  colorType, setColorType,
  gradientType, setGradientType,
  gradientColor1, setGradientColor1,
  gradientColor2, setGradientColor2,
  gradientRotation, setGradientRotation,
  customEyeColor, setCustomEyeColor,
  eyeFrameColor, setEyeFrameColor,
  eyeBallColor, setEyeBallColor,
  design, setDesign,
  isDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'body' | 'eyes' | 'bg'>('body');

  const backgroundColor = design.backgroundOptions.color;
  const isGradient = colorType === 'gradient';

  // Preset color schemes
  const colorPresets = [
    { name: 'Preto', fg: '#000000', bg: '#FFFFFF' },
    { name: 'Branco', fg: '#FFFFFF', bg: '#000000' },
    { name: 'Azul', fg: '#3B82F6', bg: '#FFFFFF' },
    { name: 'Vermelho', fg: '#EF4444', bg: '#FFFFFF' },
    { name: 'Verde', fg: '#10B981', bg: '#FFFFFF' },
    { name: 'Roxo', fg: '#8B5CF6', bg: '#FFFFFF' },
    { name: 'Rosa', fg: '#EC4899', bg: '#FFFFFF' },
  ];

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setColorType('single');
    setGradientColor1(preset.fg);
    setGradientColor2(preset.fg);
    setDesign(prev => ({ ...prev, backgroundOptions: { color: preset.bg } }));
    if (customEyeColor) {
      setEyeFrameColor(preset.fg);
      setEyeBallColor(preset.fg);
    }
  };

  const resetColors = () => {
    setColorType('single');
    setGradientType('linear');
    setGradientColor1('#000000');
    setGradientColor2('#000000');
    setGradientRotation(0);
    setCustomEyeColor(false);
    setEyeFrameColor('#000000');
    setEyeBallColor('#000000');
    setDesign(prev => ({ ...prev, backgroundOptions: { color: '#FFFFFF' } }));
  };

  const invertColors = () => {
    const newBg = gradientColor1;
    const newFg = backgroundColor;
    setGradientColor1(newFg);
    setGradientColor2(newFg);
    setDesign(prev => ({ ...prev, backgroundOptions: { color: newBg } }));
    if (customEyeColor) {
      setEyeFrameColor(newFg);
      setEyeBallColor(newFg);
    }
  };

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="hidden md:block space-y-6">
      {/* Presets Section */}
      <div className={`rounded-xl p-4 border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>PRESETS</span>
          <Tooltip content="Cores predefinidas para uso rápido" isDarkMode={isDarkMode}>
            <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg border hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all ${isDarkMode
                ? 'border-[#2a2a2a] bg-[#1a1a1a]'
                : 'border-gray-200 bg-white'
                }`}>
              <div
                className={`w-5 h-5 rounded border ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`}
                style={{ backgroundColor: preset.fg }}
              />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <button
          onClick={resetColors}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${isDarkMode
            ? 'text-white bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#252525] hover:border-[#333333]'
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
          <RotateCcw className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          Resetar Cores
        </button>
        <button
          onClick={invertColors}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${isDarkMode
            ? 'text-white bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#252525] hover:border-[#333333]'
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
        >
          <RefreshCw className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          Inverter Cores
        </button>
      </div>

      {/* Gradient Toggle */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <Layers className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
        <label className="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="checkbox"
            checked={isGradient}
            onChange={(e) => setColorType(e.target.checked ? 'gradient' : 'single')}
            className={`w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-300'}`}
          />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Usar Gradiente</span>
        </label>
        {isGradient && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGradientType('linear')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${gradientType === 'linear'
                ? 'bg-emerald-500/20 text-emerald-400'
                : isDarkMode
                  ? 'bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a]'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
            >
              Linear
            </button>
            <button
              onClick={() => setGradientType('radial')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${gradientType === 'radial'
                ? 'bg-emerald-500/20 text-emerald-400'
                : isDarkMode
                  ? 'bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a]'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
            >
              Radial
            </button>
          </div>
        )}
      </div>

      {isGradient && gradientType === 'linear' && (
        <RotationSlider
          value={gradientRotation}
          onChange={setGradientRotation}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Main Colors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ColorInput
          value={gradientColor1}
          onChange={setGradientColor1}
          label={isGradient ? 'Cor Inicial' : 'Cor do Corpo'}
          tooltip="A cor principal dos pixels que formam o QR Code"
          isDarkMode={isDarkMode}
        />

        {isGradient && (
          <ColorInput
            value={gradientColor2}
            onChange={setGradientColor2}
            label="Cor Final"
            tooltip="A segunda cor do gradiente"
            isDarkMode={isDarkMode}
          />
        )}

        <ColorInput
          value={backgroundColor}
          onChange={(v) => setDesign(prev => ({ ...prev, backgroundOptions: { ...prev.backgroundOptions, color: v } }))}
          label="Cor de Fundo"
          tooltip="O espaço vazio entre os pixels do QR Code"
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Eye Colors Toggle */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        <label className="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="checkbox"
            checked={customEyeColor}
            onChange={(e) => setCustomEyeColor(e.target.checked)}
            className={`w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-300'}`}
          />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Cores Personalizadas para Olhos</span>
        </label>
        <Tooltip content="Permite definir cores diferentes para os três cantos do QR Code" isDarkMode={isDarkMode}>
          <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
        </Tooltip>
      </div>

      {/* Eye Colors (when enabled) */}
      {customEyeColor && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <ColorInput
            value={eyeFrameColor}
            onChange={setEyeFrameColor}
            label="Frame (Borda)"
            tooltip="O quadrado externo dos três olhos do QR Code"
            isDarkMode={isDarkMode}
          />
          <ColorInput
            value={eyeBallColor}
            onChange={setEyeBallColor}
            label="Ball (Miolo)"
            tooltip="O círculo interno dos três olhos do QR Code"
            isDarkMode={isDarkMode}
          />
        </div>
      )}
    </div>
  );

  // Mobile Layout
  const MobileLayout = () => (
    <div className="md:hidden space-y-4">
      {/* Presets */}
      <div className={`rounded-xl p-3 border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Presets</span>
        <div className="grid grid-cols-4 gap-2">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border hover:border-emerald-500/50 ${isDarkMode ? 'border-[#2a2a2a] bg-[#1a1a1a]' : 'border-gray-200 bg-gray-50'}`}
            >
              <div
                className={`w-8 h-8 rounded border ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`}
                style={{ backgroundColor: preset.fg }}
              />
              <span className={`text-[10px] font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={resetColors}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg ${isDarkMode ? 'text-white bg-[#1a1a1a] border border-[#2a2a2a]' : 'text-gray-700 bg-white border border-gray-200'}`}
        >
          <RotateCcw className={`w-4 h-4 ${isDarkMode ? '' : 'text-gray-500'}`} />
          Resetar
        </button>
        <button
          onClick={invertColors}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg ${isDarkMode ? 'text-white bg-[#1a1a1a] border border-[#2a2a2a]' : 'text-gray-700 bg-white border border-gray-200'}`}
        >
          <RefreshCw className={`w-4 h-4 ${isDarkMode ? '' : 'text-gray-500'}`} />
          Inverter
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex p-1 rounded-xl ${isDarkMode ? 'bg-[#000] border border-[#2a2a2a]' : 'bg-gray-100'}`}>
        {[
          { id: 'body', label: 'Corpo', icon: QrCode },
          { id: 'eyes', label: 'Olhos', icon: Eye },
          { id: 'bg', label: 'Fundo', icon: Monitor }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as 'body' | 'eyes' | 'bg')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === id
              ? isDarkMode
                ? 'bg-[#1a1a1a] text-white shadow-sm border border-[#2a2a2a]'
                : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              : isDarkMode
                ? 'text-gray-300'
                : 'text-gray-600'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'body' && (
          <>
            {/* Gradient Toggle */}
            <label className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
              <input
                type="checkbox"
                checked={isGradient}
                onChange={(e) => setColorType(e.target.checked ? 'gradient' : 'single')}
                className="w-5 h-5 text-emerald-600"
              />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Usar Gradiente</span>
            </label>

            {isGradient && gradientType === 'linear' && (
              <RotationSlider value={gradientRotation} onChange={setGradientRotation} isDarkMode={isDarkMode} />
            )}

            <ColorInput
              value={gradientColor1}
              onChange={setGradientColor1}
              label={isGradient ? 'Cor Inicial' : 'Cor Principal'}
              tooltip="Cor dos pixels do QR Code"
              isDarkMode={isDarkMode}
            />

            {isGradient && (
              <ColorInput
                value={gradientColor2}
                onChange={setGradientColor2}
                label="Cor Final"
                tooltip="Segunda cor do gradiente"
                isDarkMode={isDarkMode}
              />
            )}
          </>
        )}

        {activeTab === 'eyes' && (
          <>
            <label className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
              <input
                type="checkbox"
                checked={customEyeColor}
                onChange={(e) => setCustomEyeColor(e.target.checked)}
                className="w-5 h-5 text-emerald-600"
              />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Personalizar Cores dos Olhos</span>
            </label>

            {customEyeColor ? (
              <>
                <ColorInput
                  value={eyeFrameColor}
                  onChange={setEyeFrameColor}
                  label="Borda (Frame)"
                  tooltip="Quadrado externo dos olhos"
                  isDarkMode={isDarkMode}
                />
                <ColorInput
                  value={eyeBallColor}
                  onChange={setEyeBallColor}
                  label="Miolo (Ball)"
                  tooltip="Círculo interno dos olhos"
                  isDarkMode={isDarkMode}
                />
              </>
            ) : (
              <div className={`p-4 rounded-xl border border-dashed text-center ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'}`}>
                <EyeOff className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Olhos usam a mesma cor do corpo</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'bg' && (
          <ColorInput
            value={backgroundColor}
            onChange={(v) => setDesign(prev => ({ ...prev, backgroundOptions: { ...prev.backgroundOptions, color: v } }))}
            label="Cor de Fundo"
            tooltip="Espaço entre os pixels"
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );

  return (
    <Accordion title="Personalizar Cores" icon={Palette} isDarkMode={isDarkMode}>
      <div className="p-2">
        <DesktopLayout />
        <MobileLayout />
      </div>
    </Accordion>
  );
};

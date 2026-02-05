import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ContentType } from '../../types';

/**
 * ==========================================
 * COMPONENTE LOGO TOGGLE
 * ==========================================
 * Toggle para adicionar logo pré-definido ao QR Code
 */

interface LogoToggleProps {
  /** Tipo de conteúdo atual */
  contentType: ContentType;
  /** Estado do design do QR Code */
  design: any;
  /** Função para atualizar o design */
  setDesign: any;
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
}

/**
 * Componente LogoToggle
 * 
 * Permite adicionar logotipos pré-definidos ao QR Code:
 * - Logos disponíveis: WiFi, WhatsApp, Instagram
 * - Só mostra logos relevantes para o tipo de conteúdo
 * - Botão para adicionar ou remover logo
 */
export function LogoToggle({ contentType, design, setDesign, isDarkMode }: LogoToggleProps) {
  const [showPresets, setShowPresets] = useState(false);

  /**
   * URLs dos logos pré-definidos
   * PNGs são preferidos para segurança do canvas cross-origin
   */
  const LOGOS = {
    WIFI: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/WiFi_Logo.svg/1024px-WiFi_Logo.svg.png',
    WHATSAPP: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png',
    INSTAGRAM: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png',
  };

  /**
   * Determina qual logo mostrar baseado no tipo de conteúdo
   */
  const getLogoForType = (type: ContentType): string | null => {
    switch (type) {
      case 'wifi':
        return LOGOS.WIFI;
      case 'whatsapp':
        return LOGOS.WHATSAPP;
      case 'instagram':
        return LOGOS.INSTAGRAM;
      default:
        return null;
    }
  };

  /**
   * Adiciona o logo pré-definido ao QR Code
   */
  const addPresetLogo = () => {
    const logoUrl = getLogoForType(contentType);
    if (logoUrl) {
      setDesign(prev => ({ 
        ...prev, 
        image: logoUrl,
        imageOptions: {
          ...prev.imageOptions,
          crossOrigin: 'anonymous',
        }
      }));
      setShowPresets(false);
    }
  };

  /**
   * Remove o logo atual do QR Code
   */
  const removeLogo = () => {
    setDesign(prev => ({ 
      ...prev, 
      image: undefined,
      imageOptions: {
        ...prev.imageOptions,
        crossOrigin: 'anonymous',
      }
    }));
  };

  // Só mostra se há logo disponível para este tipo
  const availableLogo = getLogoForType(contentType);
  if (!availableLogo) return null;

  return (
    <div className={`p-4 rounded-xl border ${
      isDarkMode 
        ? 'bg-[#1a1a1a] border-[#2a2a2a]' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Logo Pré-definido
          </span>
          {design.image && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              isDarkMode
                ? 'bg-emerald-900 text-emerald-400 border border-emerald-700'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            }`}>
              <Check className="w-3 h-3 mr-1" />
              Ativo
            </span>
          )}
        </div>
      </div>

      {showPresets && !design.image && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          <button
            onClick={addPresetLogo}
            className={`p-3 rounded-lg border transition-all ${
              isDarkMode
                ? 'border-[#2a2a2a] hover:border-emerald-500 hover:bg-[#0f0f0f]'
                : 'border-gray-300 hover:border-emerald-500 hover:bg-gray-100'
            }`}
          >
            <img src={availableLogo} alt="Logo" className="w-8 h-8 mx-auto object-contain" />
          </button>
        </div>
      )}

      <div className="flex gap-2">
        {!design.image ? (
          <button
            onClick={() => setShowPresets(!showPresets)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              isDarkMode
                ? 'bg-[#252525] text-gray-300 hover:bg-[#333333] hover:text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Adicionar Logo
          </button>
        ) : (
          <button
            onClick={removeLogo}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
            }`}
          >
            <X className="w-4 h-4" />
            Remover Logo
          </button>
        )}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Link as LinkIcon, Wifi, Smartphone, Instagram, CreditCard, Image as ImageIcon } from 'lucide-react';
import { Accordion } from '../Accordion';
import { QrContentState, ContentType, QrDesignState, ValidationError } from '../../types';
import type { Dispatch, SetStateAction } from 'react';
import { useToast } from '../Toast';
import { CountrySelect } from './CountrySelect';
import { LogoToggle } from './LogoToggle';
import { UrlContent } from './content-types/UrlContent';
import { WifiContent } from './content-types/WifiContent';
import { WhatsAppContent } from './content-types/WhatsAppContent';
import { InstagramContent } from './content-types/InstagramContent';
import { PixContent } from './content-types/PixContent';
import { generatePixPayload } from '../../services/pixService';

/**
 * Refatorado com componentes separados para cada tipo
 */

/**
 * Ícone customizado do PIX que segue o estilo das abas
 */
const PixIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256.4 0L159.2 97.2l97.2 97.2 97.2-97.2L256.4 0zM97.2 159.2L0 256.4l97.2 97.2 97.2-97.2-97.2-97.2zm318 0l-97.2 97.2 97.2 97.2 97.2-97.2-97.2-97.2zM256.4 318L159.2 415.2l97.2 97.2 97.2-97.2-97.2-97.2z" />
  </svg>
);

/**
 * Props do componente ContentSettings
 */
export interface ContentSettingsProps {
  content: QrContentState;
  setContent: Dispatch<SetStateAction<QrContentState>>;
  design: QrDesignState;
  setDesign: Dispatch<SetStateAction<QrDesignState>>;
  validationErrors: ValidationError[];
  showValidation: boolean;
  setShowValidation: (show: boolean) => void;
  isDarkMode: boolean;
}

/**
 * Componente ContentSettings
 * 
 * Fornece interface para configurar o conteúdo do QR Code:
 * - Seleção do tipo de conteúdo (URL, WiFi, WhatsApp, Instagram, PIX)
 * - Campos de entrada específicos para cada tipo
 * - Validação de campos com mensagens de erro
 * - Upload de logo customizado
 * - Logos pré-definidos para cada tipo
 * 
 * Usa componentes separados para cada tipo de conteúdo
 */
export function ContentSettings({
  content,
  setContent,
  design,
  setDesign,
  validationErrors,
  showValidation,
  setShowValidation,
  isDarkMode,
}: ContentSettingsProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  /**
   * Obtém mensagem de erro para um campo específico
   */
  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find(e => e.field === field)?.message;
  };

  /**
   * Verifica se um campo tem erro
   */
  const hasFieldError = (field: string): boolean => {
    return validationErrors.some(e => e.field === field);
  };

  /**
   * Copia o código PIX (se for tipo PIX) para área de transferência
   */
  const handleCopyPix = () => {
    if (content.type !== 'pix') return;

    const payload = generatePixPayload(content.pix);
    if (!payload) return;

    navigator.clipboard.writeText(payload);
    setCopied(true);
    showToast('Código PIX copiado para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Seleção do tipo de conteúdo
   * Ícones e labels para cada opção
   */
  const contentTypes: Array<{ value: ContentType; icon: ReactNode; label: string }> = [
    { value: 'url', icon: <LinkIcon className="w-5 h-5" />, label: 'URL' },
    { value: 'wifi', icon: <Wifi className="w-5 h-5" />, label: 'Wi-Fi' },
    { value: 'whatsapp', icon: <Smartphone className="w-5 h-5" />, label: 'WhatsApp' },
    { value: 'instagram', icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
    { value: 'pix', icon: <PixIcon className="w-5 h-5" />, label: 'PIX' },
  ];

  return (
    <Accordion
      title="Conteúdo"
      icon={LinkIcon}
      isDarkMode={isDarkMode}
      defaultOpen={true}
    >
      <div className="space-y-6">
        {/* Seleção do tipo de conteúdo (Tabs originais) */}
        <div className={`flex flex-wrap border-b ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
          {contentTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setContent(prev => ({ ...prev, type: type.value }));
                if (design.image) {
                  setDesign(prev => ({ ...prev, image: undefined }));
                }
              }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${content.type === type.value
                ? `border-emerald-500 ${isDarkMode ? 'text-emerald-400 bg-[#252525]' : 'text-emerald-600 bg-emerald-50'}`
                : `${isDarkMode ? 'border-transparent text-gray-300 hover:text-emerald-400 hover:bg-[#1a1a1a]' : 'border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-100'}`
                }`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>

        {/* Campos específicos para cada tipo de conteúdo */}
        {content.type === 'url' && (
          <UrlContent
            content={content}
            setContent={setContent}
            design={design}
            setDesign={setDesign}
            validationErrors={validationErrors}
            showValidation={showValidation}
            isDarkMode={isDarkMode}
          />
        )}

        {content.type === 'wifi' && (
          <WifiContent
            content={content}
            setContent={setContent}
            design={design}
            setDesign={setDesign}
            isDarkMode={isDarkMode}
          />
        )}

        {content.type === 'whatsapp' && (
          <WhatsAppContent
            content={content}
            setContent={setContent}
            design={design}
            setDesign={setDesign}
            validationErrors={validationErrors}
            showValidation={showValidation}
            isDarkMode={isDarkMode}
          />
        )}

        {content.type === 'instagram' && (
          <InstagramContent
            content={content}
            setContent={setContent}
            design={design}
            setDesign={setDesign}
            validationErrors={validationErrors}
            showValidation={showValidation}
            isDarkMode={isDarkMode}
          />
        )}

        {content.type === 'pix' && (
          <PixContent
            content={content}
            setContent={setContent}
            validationErrors={validationErrors}
            showValidation={showValidation}
            copied={copied}
            onCopyPix={handleCopyPix}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Campos específicos para cada tipo de conteúdo */}
      </div>
    </Accordion>
  );
}

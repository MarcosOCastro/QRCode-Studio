import type { ComponentType, SVGProps } from 'react';

/**
 * ==========================================
 * TIPOS DE ESTILO DO QR CODE
 * ==========================================
 * Definem os formatos visuais disponíveis para personalização
 */

/** Tipos de pontos/dots do QR Code */
export type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';

/** Tipos de formato para os olhos quadrados (cantos externos) */
export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';

/** Tipos de formato para os olhos pontos (cantos internos) */
export type CornerDotType = 'dot' | 'square' | 'extra-rounded';

/**
 * ==========================================
 * ESTADO DE DESIGN DO QR CODE
 * ==========================================
 * Configuração visual completa do QR Code
 */
export interface QrDesignState {
  width: number;
  height: number;
  margin: number;
  image?: string;
  dotsOptions: {
    type: DotType;
    color: string;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: { offset: number; color: string }[];
    } | null;
  };
  backgroundOptions: {
    color: string;
  };
  imageOptions: {
    crossOrigin: string;
    margin: number;
    imageSize: number;
    hideBackgroundDots: boolean;
  };
  cornersSquareOptions: {
    type: CornerSquareType;
    color: string;
  };
  cornersDotOptions: {
    type: CornerDotType;
    color: string;
  };
}

/**
 * ==========================================
 * TIPOS DE CONTEÚDO
 * ==========================================
 * Definem os diferentes tipos de dados que o QR Code pode conter
 */

/** Tipos de conteúdo suportados pelo gerador */
export type ContentType = 'url' | 'wifi' | 'whatsapp' | 'instagram' | 'pix';

/** Dados de configuração Wi-Fi */
export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WPA3' | 'WEP' | 'nopass';
  hidden: boolean;
}

/** Dados de pagamento PIX (padrão EMVCo) */
export interface PixData {
  key: string;
  name: string;
  city: string;
  amount: string;
  id: string;
}

/** Dados de link WhatsApp com mensagem */
export interface WhatsAppData {
  countryCode: string;
  phoneNumber: string;
  message: string;
}

/** Estado completo do conteúdo do QR Code */
export interface QrContentState {
  type: ContentType;
  value: string;
  wifi: WifiData;
  pix: PixData;
  rawUrl: string;
  whatsapp: WhatsAppData;
  instagram: string;
}

/**
 * ==========================================
 * VALIDAÇÃO
 * ==========================================
 * Tipos para sistema de validação de formulários
 */

/** Representa um erro de validação em um campo específico */
export interface ValidationError {
  field: string;
  message: string;
}

/** Resultado da validação de um formulário ou campo */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * ==========================================
* COMPONENTES UI
 * ==========================================
 * Tipos para componentes reutilizáveis
 */

/** Props padrão para componentes que suportam tema */
export interface ThemedProps {
  isDarkMode: boolean;
}

/** Props para seleção de país no WhatsApp */
export interface CountryOption {
  code: string;
  name: string;
  Flag: ComponentType<SVGProps<SVGSVGElement>>;
}

/**
 * ==========================================
 * CONFIGURAÇÃO DE CORES
 * ==========================================
 * Estados e tipos para personalização de cores
 */

/** Tipo de configuração de cor: única ou gradiente */
export type ColorType = 'single' | 'gradient';

/** Tipo de gradiente: linear ou radial */
export type GradientType = 'linear' | 'radial';

/**
 * ==========================================
 * DOWNLOAD E EXPORTAÇÃO
 * ==========================================
 */

/** Formatos de download suportados */
export type DownloadFormat = 'png' | 'svg';

/**
 * ==========================================
 * COMPONENTES DE FORMULÁRIO
 * ==========================================
 */

/** Props para campos de formulário com tema */
export interface FormFieldProps extends ThemedProps {
  label: string;
  required?: boolean;
  error?: string;
  showError?: boolean;
}

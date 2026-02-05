/**
 * Interface para a biblioteca QRCodeStyling carregada via CDN
 * Define a estrutura esperada do objeto global window.QRCodeStyling
 */
export interface QRCodeStylingLibrary {
  new (options: QRCodeStylingOptions): QRCodeStylingInstance;
}

/**
 * Opções de configuração para criação de QR Code
 * Usado pela biblioteca QRCodeStyling
 */
export interface QRCodeStylingOptions {
  width: number;
  height: number;
  type: 'svg' | 'canvas';
  margin?: number;
  data: string;
  image?: string;
  dotsOptions: {
    type: string;
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
    crossOrigin?: string;
    margin: number;
    imageSize: number;
    hideBackgroundDots: boolean;
  };
  cornersSquareOptions: {
    type: string;
    color: string;
  };
  cornersDotOptions: {
    type: string;
    color: string;
  };
}

/**
 * Instância criada da biblioteca QRCodeStyling
 * Fornece métodos para manipular o QR Code gerado
 */
export interface QRCodeStylingInstance {
  append(container: HTMLElement): void;
  download(options: { name: string; extension: 'png' | 'svg' }): void;
  applyExtension(extension: (svg: SVGSVGElement, options: QRCodeStylingOptions) => void): void;
}

/**
 * Declaração de tipo global para window
 * Adiciona a propriedade QRCodeStyling ao objeto window
 */
declare global {
  interface Window {
    QRCodeStyling: QRCodeStylingLibrary;
  }
}

export {};

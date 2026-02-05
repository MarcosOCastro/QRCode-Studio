import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';
import { generatePixPayload } from '../services/pixService';
import { extraRoundedDotExtension } from '../services/qrExtension';
import type { QrContentState, QrDesignState } from '../types';
import type { QRCodeStylingInstance, QRCodeStylingOptions } from '../types/qrcode';

/**
 * Interface de retorno do hook useQRCode
 * Fornece dados do QR Code e estado de carregamento
 */
interface UseQRCodeReturn {
  /** Dados formatados do QR Code prontos para renderização */
  qrCodeData: string;
  /** Referência para o container DOM onde o QR será renderizado */
  qrRef: RefObject<HTMLDivElement | null>;
  /** Função para forçar recriação do QR Code */
  refreshQRCode: () => void;
}

/**
 * Hook personalizado para gerenciamento do QR Code
 * 
 * Centraliza toda a lógica de:
 * - Geração de dados do QR Code baseado no tipo de conteúdo
 * - Renderização usando a biblioteca QRCodeStyling
 * - Aplicação de extensões customizadas (extra-rounded)
 * - Atualização quando design ou conteúdo mudam
 * 
 * @param content - Estado do conteúdo do QR Code (URL, WiFi, PIX, etc.)
 * @param design - Configurações visuais do QR Code
 * @returns Objeto com dados do QR, ref para container e função de refresh
 */
export function useQRCode(
  content: QrContentState,
  design: QrDesignState
): UseQRCodeReturn {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStylingInstance | null>(null);
  const [qrKey, setQrKey] = useState(0);

  /**
   * Gera os dados formatados do QR Code baseado no tipo de conteúdo selecionado
   * Converte diferentes tipos de dados (URL, WiFi, WhatsApp, etc.) em string formatada
   */
  const qrCodeData = ((): string => {
    switch (content.type) {
      case 'url':
        return content.rawUrl;

      case 'wifi': {
        const { ssid, password, encryption, hidden } = content.wifi;
        if (!ssid) return '';
        return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden};;`;
      }

      case 'whatsapp': {
        const { countryCode, phoneNumber, message } = content.whatsapp;
        const cleanPhone = phoneNumber.replace(/\D/g, '');
        if (!cleanPhone) return '';
        const baseUrl = `https://wa.me/${countryCode}${cleanPhone}`;
        if (message.trim()) {
          const encodedMessage = encodeURIComponent(message);
          return `${baseUrl}?text=${encodedMessage}`;
        }
        return baseUrl;
      }

      case 'instagram': {
        const user = content.instagram.replace('@', '');
        return user ? `https://instagram.com/${user}` : '';
      }

      case 'pix':
        return generatePixPayload(content.pix);

      default:
        return content.value || '';
    }
  })();

  /**
   * Recria o QR Code quando design, dados ou key mudam
   * Limpa instância anterior e cria nova com configurações atualizadas
   */
  useEffect(() => {
    if (!window.QRCodeStyling || !qrRef.current) return;

    qrCodeInstance.current = null;
    qrRef.current.innerHTML = '';

    if (!qrCodeData) return;

    try {
      const options: QRCodeStylingOptions = {
        width: design.width,
        height: design.height,
        type: 'svg',
        data: qrCodeData,
        image: design.image,
        dotsOptions: design.dotsOptions,
        backgroundOptions: design.backgroundOptions,
        imageOptions: design.imageOptions,
        cornersSquareOptions: design.cornersSquareOptions,
        cornersDotOptions: design.cornersDotOptions,
      };

      qrCodeInstance.current = new window.QRCodeStyling(options);
      qrCodeInstance.current.append(qrRef.current);

      if (design.cornersDotOptions.type === 'extra-rounded') {
        qrCodeInstance.current.applyExtension(extraRoundedDotExtension);
      }
    } catch (error) {
      console.error('Erro ao criar QR Code:', error);
    }
  }, [
    qrCodeData,
    qrKey,
    design.width,
    design.height,
    design.image,
    design.dotsOptions.type,
    design.dotsOptions.color,
    design.dotsOptions.gradient?.type,
    design.dotsOptions.gradient?.rotation,
    design.dotsOptions.gradient?.colorStops[0]?.color,
    design.dotsOptions.gradient?.colorStops[1]?.color,
    design.cornersSquareOptions.type,
    design.cornersSquareOptions.color,
    design.cornersDotOptions.type,
    design.cornersDotOptions.color,
    design.backgroundOptions.color,
    design.imageOptions,
  ]);

  /**
   * Força recriação do QR Code alterando a key
   * Útil quando precisa garantir renderização atualizada
   */
  const refreshQRCode = useCallback(() => {
    setQrKey(prev => prev + 1);
  }, []);

  return { qrCodeData, qrRef, refreshQRCode };
}

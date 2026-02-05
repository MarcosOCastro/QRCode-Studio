import { useState, useEffect, useRef, useCallback } from 'react';
import type { ChangeEvent } from 'react';

/**
 * ==========================================
 * IMPORTAÇÃO DE SERVIÇOS
 * ==========================================
 * Funções utilitárias para geração e manipulação de QR Code
 */
import { extraRoundedDotExtension } from './services/qrExtension';

/**
 * ==========================================
 * IMPORTAÇÃO DE TIPOS
 * ==========================================
 * Definições TypeScript para tipagem segura
 */
import type { QrContentState, QrDesignState, ValidationError } from './types';

/**
 * ==========================================
 * IMPORTAÇÃO DE HOOKS CUSTOMIZADOS
 * ==========================================
 * Hooks reutilizáveis para lógica compartilhada
 */
import { useTheme } from './hooks/useTheme';
import { useQRCode } from './hooks/useQRCode';

/**
 * ==========================================
 * IMPORTAÇÃO DE COMPONENTES DE LAYOUT
 * ==========================================
 * Estrutura base da aplicação
 */
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

/**
 * ==========================================
 * IMPORTAÇÃO DE COMPONENTES DE CONFIGURAÇÃO
 * ==========================================
 * Painéis de configuração do QR Code
 */
import { ContentSettings } from './components/settings/ContentSettings';
import { ColorSettings } from './components/settings/ColorSettings';
import { DesignSettings } from './components/settings/DesignSettings';
import { LogoSettings } from './components/settings/LogoSettings';

/**
 * ==========================================
 * IMPORTAÇÃO DE COMPONENTES DE VISUALIZAÇÃO
 * ==========================================
 * Painel de preview e componentes auxiliares
 */
import { PreviewPanel } from './components/PreviewPanel';
import { ToastProvider } from './components/Toast';

/**
 * ==========================================
 * IMPORTAÇÃO DE CONTEÚDO
 * ==========================================
 * Seções informativas e de apoio
 */
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { SupportSection } from './components/SupportSection';
import { SupportModal } from './components/SupportModal';

export default function App() {
  /**
   * ==========================================
   * HOOKS DE TEMA
   * ==========================================
   */
  const { isDarkMode, toggleTheme } = useTheme();

  /**
   * ==========================================
   * ESTADO DO CONTEÚDO DO QR CODE
   * ==========================================
   * Armazena todos os dados que serão codificados no QR Code
   * Inclui: URL, WiFi, WhatsApp, Instagram, PIX
   */
  const [content, setContent] = useState<QrContentState>({
    type: 'url',
    value: '',
    rawUrl: '',
    wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    pix: { key: '', name: '', city: '', amount: '', id: '' },
    whatsapp: { countryCode: '55', phoneNumber: '', message: '' },
    instagram: '',
  });

  /**
   * ==========================================
   * ESTADO DO DESIGN DO QR CODE
   * ==========================================
   * Configurações visuais aplicadas ao QR Code gerado
   */
  const [design, setDesign] = useState<QrDesignState>({
    width: 300,
    height: 300,
    margin: 10,
    dotsOptions: { type: 'square', color: '#000000', gradient: null },
    backgroundOptions: { color: '#ffffff' },
    imageOptions: { crossOrigin: 'anonymous', margin: 5, imageSize: 0.4, hideBackgroundDots: true },
    cornersSquareOptions: { type: 'square', color: '#000000' },
    cornersDotOptions: { type: 'square', color: '#000000' },
  });

  /**
   * ==========================================
   * HOOK DE QR CODE
   * ==========================================
   */
  const { qrCodeData, qrRef, refreshQRCode } = useQRCode(content, design);

  /**
   * ==========================================
   * ESTADO DE CORES AVANÇADAS
   * ==========================================
   * Controle de tipo de cor (única/gradiente) e cores dos olhos
   */
  const [colorType, setColorType] = useState<'single' | 'gradient'>('single');
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [gradientColor1, setGradientColor1] = useState('#000000');
  const [gradientColor2, setGradientColor2] = useState('#37B4AA');
  const [gradientRotation, setGradientRotation] = useState(0);

  const [customEyeColor, setCustomEyeColor] = useState(false);
  const [eyeFrameColor, setEyeFrameColor] = useState('#000000');
  const [eyeBallColor, setEyeBallColor] = useState('#000000');

  /**
   * ==========================================
   * ESTADO DE DOWNLOAD
   * ==========================================
   * Configurações para exportação do QR Code
   */
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');
  const [quality, setQuality] = useState(2000);

  /**
   * ==========================================
   * ESTADO DE VALIDAÇÃO
   * ==========================================
   * Armazena erros de validação dos campos de entrada
   */
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  /**
   * ==========================================
   * ESTADO DO MODAL DE APOIO
   * ==========================================
   * Controla visibilidade do modal de doação
   */
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  /**
   * ==========================================
   * REFERÊNCIAS DOM
   * ==========================================
   * Refs para acesso direto a elementos HTML
   */
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * ==========================================
   * VALIDAÇÃO DE CONTEÚDO
   * ==========================================
   * Efeito que valida o conteúdo sempre que ele muda
   * Atualiza lista de erros para exibição na UI
   */
  useEffect(() => {
    async function validateContentWrapper() {
      const module = await import('./services/validationService');
      const result = module.validateContent(content);
      setValidationErrors(result.errors);
    }
    validateContentWrapper();
  }, [content]);

  /**
   * ==========================================
   * SINCRONIZAÇÃO DE CORES DOS OLHOS
   * ==========================================
   * Quando cor customizada dos olhos está desabilitada,
   * sincroniza automaticamente com a cor primária do QR Code
   */
  useEffect(() => {
    if (!customEyeColor) {
      setEyeFrameColor(gradientColor1);
      setEyeBallColor(gradientColor1);
    }
  }, [customEyeColor, gradientColor1]);

  /**
   * ==========================================
   * SINCRONIZAÇÃO DE CORES CUSTOMIZADAS
   * ==========================================
   * Aplica cores dos olhos ao estado de design sempre que mudam
   */
  useEffect(() => {
    setDesign(prev => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, color: eyeFrameColor },
      cornersDotOptions: { ...prev.cornersDotOptions, color: eyeBallColor }
    }));
  }, [eyeFrameColor, eyeBallColor]);

  /**
   * ==========================================
   * SINCRONIZAÇÃO DE CORES PRINCIPAIS
   * ==========================================
   * Aplica cor principal e gradiente ao estado de design
   * Calcula rotação do gradiente em radianos para a biblioteca
   */
  useEffect(() => {
    setDesign(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        color: gradientColor1,
        gradient: colorType === 'gradient' ? {
          type: gradientType,
          rotation: gradientRotation * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: gradientColor1 },
            { offset: 1, color: gradientColor2 }
          ]
        } : null
      }
    }));
  }, [colorType, gradientColor1, gradientColor2, gradientType, gradientRotation]);

  /**
   * ==========================================
   * DEBOUNCE DE DESIGN
   * ==========================================
   * Atrasa a atualização do QR Code em 150ms durante interações
   * Evita recriação excessiva durante arraste de sliders
   */
  const [debouncedDesign, setDebouncedDesign] = useState<QrDesignState>(design);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedDesign(design);
      refreshQRCode();
    }, 150);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [design, refreshQRCode]);

  /**
   * ==========================================
   * HANDLER DE UPLOAD DE LOGO
   * ==========================================
   * Processa arquivo de imagem selecionado pelo usuário
   * Converte para base64 e aplica ao design do QR Code
   */
  const handleLogoUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDesign(prev => ({
        ...prev,
        image: reader.result as string,
        imageOptions: {
          ...prev.imageOptions,
          crossOrigin: undefined,
        }
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  /**
   * ==========================================
   * HANDLER DE DOWNLOAD
   * ==========================================
   * Gera QR Code em alta resolução para download
   * Aplica margem proporcional à qualidade selecionada
   */
  const handleDownload = useCallback(() => {
    if (!window.QRCodeStyling || !qrCodeData) return;

    try {
      const margin = Math.max(20, Math.round(quality * 0.04));

      const downloadQrCode = new window.QRCodeStyling({
        width: quality,
        height: quality,
        type: 'svg',
        margin: margin,
        data: qrCodeData,
        image: design.image,
        dotsOptions: design.dotsOptions,
        backgroundOptions: design.backgroundOptions,
        imageOptions: design.imageOptions,
        cornersSquareOptions: design.cornersSquareOptions,
        cornersDotOptions: design.cornersDotOptions,
      });

      if (design.cornersDotOptions.type === 'extra-rounded') {
        downloadQrCode.applyExtension(extraRoundedDotExtension);
      }

      downloadQrCode.download({
        name: "qrcode-generator",
        extension: downloadFormat
      });
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
    }
  }, [qrCodeData, quality, downloadFormat, design]);

  /**
   * ==========================================
   * RENDERIZAÇÃO
   * ==========================================
   * Estrutura da aplicação com todos os componentes
   */
  return (
    <ToastProvider>
      <div
        className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}
        style={{ transform: 'translateZ(0)', isolation: 'isolate' }}
      >
        {/* Cabeçalho com logo e toggle de tema */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Conteúdo principal da aplicação */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ contain: 'layout' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8" style={{ isolation: 'isolate' }}>

            {/* Mobile: Preview primeiro (order-1) / Desktop: Settings (order-2) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4 lg:space-y-6 order-2 lg:order-1">
              {/* Configuração de conteúdo (URL, WiFi, WhatsApp, etc.) */}
              <ContentSettings
                content={content}
                setContent={setContent}
                design={design}
                setDesign={setDesign}
                validationErrors={validationErrors}
                showValidation={showValidation}
                setShowValidation={setShowValidation}
                isDarkMode={isDarkMode}
              />

              {/* Configuração de cores (única, gradiente, olhos) */}
              <ColorSettings
                colorType={colorType}
                setColorType={setColorType}
                gradientType={gradientType}
                setGradientType={setGradientType}
                gradientColor1={gradientColor1}
                setGradientColor1={setGradientColor1}
                gradientColor2={gradientColor2}
                setGradientColor2={setGradientColor2}
                gradientRotation={gradientRotation}
                setGradientRotation={setGradientRotation}
                customEyeColor={customEyeColor}
                setCustomEyeColor={setCustomEyeColor}
                eyeFrameColor={eyeFrameColor}
                setEyeFrameColor={setEyeFrameColor}
                eyeBallColor={eyeBallColor}
                setEyeBallColor={setEyeBallColor}
                design={design}
                setDesign={setDesign}
                isDarkMode={isDarkMode}
              />

              {/* Configuração de design (formatos, bordas) */}
              <DesignSettings
                design={design}
                setDesign={setDesign}
                isDarkMode={isDarkMode}
              />

              {/* Upload de logo (só aparece se não houver logo e não for PIX) */}
              {!design.image && content.type !== 'pix' && (
                <LogoSettings
                  design={design}
                  setDesign={setDesign}
                  handleLogoUpload={handleLogoUpload}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>

            {/* Mobile: Preview primeiro (order-1) / Desktop: Preview (order-2) */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
              <PreviewPanel
                qrRef={qrRef}
                contentType={content.type}
                quality={quality}
                setQuality={setQuality}
                downloadFormat={downloadFormat}
                setDownloadFormat={setDownloadFormat}
                onDownload={handleDownload}
                qrCodeData={qrCodeData}
                backgroundColor={design.backgroundOptions.color}
                isDarkMode={isDarkMode}
              />
            </div>

          </div>
        </main>

        {/* Seção explicativa de como funciona */}
        <HowItWorks isDarkMode={isDarkMode} />

        {/* Seção de perguntas frequentes */}
        <FAQ isDarkMode={isDarkMode} />

        {/* Seção de apoio/doação (inline) */}
        <SupportSection isDarkMode={isDarkMode} />

        {/* Rodapé com links sociais */}
        <Footer
          isDarkMode={isDarkMode}
          onOpenSupport={() => setIsSupportModalOpen(true)}
        />

        {/* Modal de apoio (acessado via ícone no footer) */}
        <SupportModal
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </ToastProvider>
  );
}

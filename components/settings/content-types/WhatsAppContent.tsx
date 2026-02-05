import React from 'react';
import { CountrySelect } from '../CountrySelect';
import { Input, TextArea } from '../../ui/FormInput';
import { InlineLogoToggle } from '../InlineLogoToggle';
import { QrContentState, ValidationError, QrDesignState } from '../../../types';

/**
 * ==========================================
 * COMPONENTE WHATSAPP CONTENT
 * ==========================================
 * Campos para configuração de QR Code de WhatsApp
 */

interface WhatsAppContentProps {
  content: QrContentState;
  setContent: React.Dispatch<React.SetStateAction<QrContentState>>;
  design: QrDesignState;
  setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
  validationErrors: ValidationError[];
  showValidation: boolean;
  isDarkMode: boolean;
}

export function WhatsAppContent({ content, setContent, design, setDesign, validationErrors, showValidation, isDarkMode }: WhatsAppContentProps) {
  const WHATSAPP_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png';
  const phoneError = validationErrors.find(e => e.field === 'phone')?.message;

  return (
    <div className="space-y-4">
      <CountrySelect
        value={content.whatsapp.countryCode}
        onChange={(code) => setContent(prev => ({ ...prev, whatsapp: { ...prev.whatsapp, countryCode: code } }))}
        isDarkMode={isDarkMode}
      />

      <Input
        label="Número de Telefone"
        type="tel"
        placeholder="99999999999"
        value={content.whatsapp.phoneNumber}
        onChange={(e) => {
          const phone = e.target.value.replace(/\D/g, '');
          setContent(prev => ({ ...prev, whatsapp: { ...prev.whatsapp, phoneNumber: phone } }));
        }}
        error={phoneError}
        showError={showValidation && !!phoneError}
        isDarkMode={isDarkMode}
      />

      <TextArea
        label="Mensagem (opcional)"
        placeholder="Digite sua mensagem aqui..."
        rows={3}
        value={content.whatsapp.message}
        onChange={(e) => setContent(prev => ({ ...prev, whatsapp: { ...prev.whatsapp, message: e.target.value } }))}
        isDarkMode={isDarkMode}
      />

      <InlineLogoToggle
        label="WhatsApp"
        url={WHATSAPP_LOGO}
        design={design}
        setDesign={setDesign}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

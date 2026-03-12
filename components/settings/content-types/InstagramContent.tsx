import React from 'react';
import { Input } from '../../ui/FormInput';
import { InlineLogoToggle } from '../InlineLogoToggle';
import { QrContentState, ValidationError, QrDesignState } from '../../../types';

/**
 * ==========================================
 * COMPONENTE INSTAGRAM CONTENT
 * ==========================================
 * Campos para configuração de QR Code de Instagram
 */

interface InstagramContentProps {
  content: QrContentState;
  setContent: React.Dispatch<React.SetStateAction<QrContentState>>;
  design: QrDesignState;
  setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
  validationErrors: ValidationError[];
  showValidation: boolean;
  isDarkMode: boolean;
}

export function InstagramContent({ content, setContent, design, setDesign, validationErrors, showValidation, isDarkMode }: InstagramContentProps) {
  const INSTAGRAM_LOGO = '/instagram-logo.png';
  const usernameError = validationErrors.find(e => e.field === 'instagram')?.message;

  return (
    <div className="space-y-4">
      <Input
        label="Nome de Usuário"
        type="text"
        placeholder="@usuario"
        value={content.instagram}
        onChange={(e) => setContent(prev => ({ ...prev, instagram: e.target.value }))}
        error={usernameError}
        showError={showValidation && !!usernameError}
        isDarkMode={isDarkMode}
      />

      <InlineLogoToggle
        label="Instagram"
        url={INSTAGRAM_LOGO}
        design={design}
        setDesign={setDesign}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

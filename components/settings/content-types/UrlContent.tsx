import React from 'react';
import { Input } from '../../ui/FormInput';
import { QrContentState, ValidationError, QrDesignState } from '../../../types';

/**
 * ==========================================
 * COMPONENTE URL CONTENT
 * ==========================================
 * Campos para configuração de QR Code de URL
 */

interface UrlContentProps {
  content: QrContentState;
  setContent: React.Dispatch<React.SetStateAction<QrContentState>>;
  design: QrDesignState;
  setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
  validationErrors: ValidationError[];
  showValidation: boolean;
  isDarkMode: boolean;
}

export function UrlContent({ content, setContent, design, setDesign, validationErrors, showValidation, isDarkMode }: UrlContentProps) {
  const urlError = validationErrors.find(e => e.field === 'url')?.message;

  return (
    <div className="space-y-4">
      <Input
        label="URL do Site"
        type="url"
        placeholder="https://exemplo-seusite.com.br"
        value={content.rawUrl}
        onChange={(e) => setContent(prev => ({ ...prev, rawUrl: e.target.value, value: e.target.value }))}
        error={urlError}
        showError={showValidation && !!urlError}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

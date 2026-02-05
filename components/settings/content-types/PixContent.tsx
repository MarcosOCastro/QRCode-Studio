import React from 'react';
import { Input } from '../../ui/FormInput';
import { Copy, Check, CreditCard } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { generatePixPayload } from '../../../services/pixService';
import { QrContentState, ValidationError } from '../../../types';

/**
 * ==========================================
 * COMPONENTE PIX CONTENT
 * ==========================================
 * Campos para configuração de QR Code de PIX
 */

interface PixContentProps {
  content: QrContentState;
  setContent: React.Dispatch<React.SetStateAction<QrContentState>>;
  validationErrors: ValidationError[];
  showValidation: boolean;
  copied: boolean;
  onCopyPix: () => void;
  isDarkMode: boolean;
}

export function PixContent({ content, setContent, validationErrors, showValidation, copied, onCopyPix, isDarkMode }: PixContentProps) {
  const keyError = validationErrors.find(e => e.field === 'pixKey')?.message;
  const nameError = validationErrors.find(e => e.field === 'pixName')?.message;
  const cityError = validationErrors.find(e => e.field === 'pixCity')?.message;
  const amountError = validationErrors.find(e => e.field === 'pixAmount')?.message;

  const pixPayload = generatePixPayload(content.pix);

  return (
    <div className="space-y-4">
      <Input
        label="Chave PIX"
        type="text"
        placeholder="email@exemplo.com ou CPF ou Telefone ou chave aleatória"
        value={content.pix.key}
        onChange={(e) => setContent(prev => ({ ...prev, pix: { ...prev.pix, key: e.target.value } }))}
        error={keyError}
        showError={showValidation && !!keyError}
        required
        isDarkMode={isDarkMode}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome do Beneficiário"
          type="text"
          placeholder="João Silva"
          value={content.pix.name}
          onChange={(e) => setContent(prev => ({ ...prev, pix: { ...prev.pix, name: e.target.value } }))}
          error={nameError}
          showError={showValidation && !!nameError}
          required
          isDarkMode={isDarkMode}
        />

        <Input
          label="Cidade"
          type="text"
          placeholder="São Paulo"
          value={content.pix.city}
          onChange={(e) => setContent(prev => ({ ...prev, pix: { ...prev.pix, city: e.target.value } }))}
          error={cityError}
          showError={showValidation && !!cityError}
          required
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Valor (opcional)"
          type="number"
          placeholder="0.00"
          step="0.01"
          value={content.pix.amount}
          onChange={(e) => setContent(prev => ({ ...prev, pix: { ...prev.pix, amount: e.target.value } }))}
          error={amountError}
          showError={showValidation && !!amountError}
          isDarkMode={isDarkMode}
        />

        <Input
          label="ID da Transação (opcional)"
          type="text"
          placeholder="***"
          value={content.pix.id}
          onChange={(e) => setContent(prev => ({ ...prev, pix: { ...prev.pix, id: e.target.value } }))}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Código PIX Copia e Cola (Original Design) */}
      {content.pix.key && content.pix.name && content.pix.city && (
        <div className="mt-4 pt-4 border-t border-dashed border-gray-600">
          <label className={`block text-sm font-medium mb-1 flex items-center justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <span>Código PIX (Copia e Cola)</span>
          </label>
          <div className="relative">
            <textarea
              value={pixPayload}
              readOnly
              rows={3}
              className={`w-full px-3 py-2 pr-12 rounded-md text-xs font-mono resize-none ${isDarkMode
                ? 'border border-[#2a2a2a] bg-[#0f0f0f] text-gray-300'
                : 'border border-gray-300 bg-gray-100 text-gray-700'
                }`}
            />
            <button
              type="button"
              onClick={onCopyPix}
              className={`absolute right-2 top-2 p-2 rounded-md transition-colors ${isDarkMode
                ? 'bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#252525] hover:border-[#333333]'
                : 'bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              title="Copiar código PIX"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {copied ? 'Código copiado!' : 'Você pode copiar este código e colar diretamente no app do seu banco.'}
          </p>
        </div>
      )}
    </div>
  );
}

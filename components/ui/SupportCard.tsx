import { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { useToast } from '../Toast';
import { cn } from '../../utils/cn';
import { PIX_DONATION_CODE, CURRENT_YEAR } from '../../constants';

/**
 * ==========================================
 * COMPONENTE SUPPORT CARD
 * ==========================================
 * Card de apoio/doação reutilizável
 * Usado tanto no SupportSection (inline) quanto no SupportModal
 */

/**
 * Props do componente SupportCard
 */
interface SupportCardProps {
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
  /** Classes CSS adicionais para o container */
  className?: string;
}

/**
 * Componente SupportCard
 * 
 * Exibe card completo de doação com:
 * - Ícone de coração e título
 * - Descrição explicativa
 * - Logo PIX + QR Code para doação
 * - Botão "Copiar Código" PIX
 * - Footer com créditos
 * 
 * Componente puro (sem lógica de modal) - pode ser usado em qualquer contexto
 */
export function SupportCard({ isDarkMode, className }: SupportCardProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  /**
   * Copia código PIX para área de transferência
   * Exibe toast de confirmação ao copiar
   */
  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_DONATION_CODE);
    setCopied(true);
    showToast('Chave PIX copiada para a área de transferência!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-2xl border shadow-2xl overflow-hidden',
        isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200',
        className
      )}
    >
      {/* Conteúdo principal */}
      <div className="p-8 text-center">
        {/* Ícone de coração */}
        <div className="flex justify-center mb-6">
          <div
            className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center',
              isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100'
            )}
          >
            <Heart className={cn('w-8 h-8', isDarkMode ? 'text-emerald-400' : 'text-emerald-600')} />
          </div>
        </div>

        {/* Título */}
        <h2 className={cn('text-2xl font-bold mb-3', isDarkMode ? 'text-white' : 'text-gray-900')}>
          Apoie o Projeto
        </h2>

        {/* Descrição */}
        <p className={cn('text-sm mb-8 leading-relaxed', isDarkMode ? 'text-gray-400' : 'text-gray-600')}>
          Gostou do app? Considere fazer uma doação para apoiar o desenvolvimento contínuo.
        </p>

        {/* Card do QR Code PIX */}
        <div
          className={cn(
            'rounded-2xl p-6 mb-6',
            isDarkMode
              ? 'bg-[#0f0f0f] border border-[#2a2a2a]'
              : 'bg-gray-50 border border-gray-200'
          )}
        >
          {/* Logo PIX */}
          <div className="flex justify-center mb-4">
            <img src="/PIX_Logo.png" alt="PIX Logo" className="h-8 object-contain" />
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <img
              src="/qrcodepix.png"
              alt="QR Code PIX para Doação"
              className="w-48 h-48 rounded-lg"
            />
          </div>
        </div>

        {/* Label informativo */}
        <p className={cn('text-xs uppercase tracking-wider mb-3', isDarkMode ? 'text-gray-500' : 'text-gray-400')}>
          Chave PIX Copia e Cola
        </p>

        {/* Botão copiar código */}
        <button
          onClick={handleCopyPix}
          className={cn(
            'w-full py-4 px-6 rounded-xl font-semibold transition-all',
            'flex items-center justify-center gap-2',
            isDarkMode
              ? 'bg-[#252525] border border-[#333333] text-white hover:bg-[#333333] hover:border-[#444444]'
              : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 hover:border-gray-400'
          )}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-emerald-500" />
              <span>Código Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              <span>Copiar Código</span>
            </>
          )}
        </button>
      </div>

      {/* Footer com créditos */}
      <div
        className={cn(
          'py-4 text-center border-t',
          isDarkMode ? 'bg-[#0f0f0f] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'
        )}
      >
        <p className={cn('text-xs', isDarkMode ? 'text-gray-500' : 'text-gray-400')}>
          DESENVOLVIDO POR MARCOS CASTRO • {CURRENT_YEAR}
        </p>
      </div>
    </div>
  );
}

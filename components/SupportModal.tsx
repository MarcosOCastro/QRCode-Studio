import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';
import { SupportCard } from './ui/SupportCard';

/**
 * ==========================================
 * COMPONENTE SUPPORT MODAL
 * ==========================================
 * Modal flutuante para apoio/doação
 * Usa SupportCard como conteúdo e adiciona overlay e botão de fechar
 */

/**
 * Props do componente SupportModal
 */
interface SupportModalProps {
  /** Indica se o modal está aberto */
  isOpen: boolean;
  /** Função chamada ao fechar o modal */
  onClose: () => void;
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
}

/**
 * Componente SupportModal
 * 
 * Renderiza SupportCard dentro de um modal flutuante:
 * - Overlay escuro semitransparente
 * - Botão X para fechar no canto superior direito
 * - Fecha ao clicar fora ou pressionar ESC
 * - Bloqueia scroll do body enquanto aberto
 * - Usa React Portal para renderizar no body (evita z-index issues)
 */
export function SupportModal({ isOpen, onClose, isDarkMode }: SupportModalProps) {
  const [mounted, setMounted] = useState(false);

  /**
   * Controla montagem/desmontagem do portal
   * Garante que o modal só renderize no client-side
   */
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  /**
   * Bloqueia scroll do body quando modal está aberto
   * Restaura scroll ao fechar
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Fecha modal ao pressionar ESC
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Não renderiza se não estiver aberto ou se não estiver montado (SSR safety)
  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onClick={onClose}
    >
      {/* Container do modal */}
      <div
        className={cn(
          'relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden',
          isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar no canto superior direito */}
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 p-2 rounded-lg transition-colors z-10',
            isDarkMode
              ? 'text-gray-400 hover:text-white hover:bg-[#252525]'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          )}
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conteúdo do modal - reutiliza SupportCard */}
        <SupportCard isDarkMode={isDarkMode} />
      </div>
    </div>
  );

  // Renderiza via portal diretamente no body
  return createPortal(modalContent, document.body);
}

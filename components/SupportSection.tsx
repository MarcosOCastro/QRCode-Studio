import { cn } from '../utils/cn';
import { SupportCard } from './ui/SupportCard';

/**
 * ==========================================
 * COMPONENTE SUPPORT SECTION
 * ==========================================
 * Seção inline de apoio/doação
 * Exibida no final da página, abaixo do FAQ
 */

/**
 * Props do componente SupportSection
 */
interface SupportSectionProps {
  /** Indica se o tema escuro está ativo */
  isDarkMode?: boolean;
}

/**
 * Componente SupportSection
 * 
 * Renderiza SupportCard em uma seção de página completa:
 * - Fundo diferenciado para destacar da página
 * - Centralizado com max-width para melhor legibilidade
 * - Reutiliza SupportCard para manter consistência com modal
 * 
 * Posicionado no fluxo da página, abaixo do FAQ e acima do Footer
 */
export function SupportSection({ isDarkMode = true }: SupportSectionProps) {
  return (
    <section className={cn('py-16', isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50')}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card de apoio centralizado */}
        <SupportCard isDarkMode={isDarkMode} />
      </div>
    </section>
  );
}

import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * ==========================================
 * COMPONENTE TOOLTIP
 * ==========================================
 * Dica de ferramenta que aparece ao passar o mouse
 * Usado para explicar funcionalidades em ícones e botões
 */

/**
 * Props do componente Tooltip
 */
interface TooltipProps {
  children: ReactNode;
  content: string;
  isDarkMode?: boolean;
}

/**
 * Componente Tooltip
 * 
 * Exibe uma dica flutuante quando o usuário passa o mouse sobre o elemento filho
 * Posiciona-se automaticamente acima do elemento com seta indicativa
 * 
 * Uso:
 * ```tsx
 * <Tooltip content="Clique para copiar" isDarkMode={true}>
 *   <button>Copiar</button>
 * </Tooltip>
 * ```
 */
export function Tooltip({ children, content, isDarkMode = true }: TooltipProps) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      
      {show && (
        <div 
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5',
            'text-xs rounded-lg shadow-lg whitespace-nowrap z-50 max-w-xs',
            isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-gray-900 text-white'
          )}
        >
          {content}
          {/* Seta indicadora do tooltip */}
          <div 
            className={cn(
              'absolute top-full left-1/2 -translate-x-1/2 -mt-1',
              'border-4 border-transparent',
              isDarkMode ? 'border-t-[#1a1a1a]' : 'border-t-gray-900'
            )}
          />
        </div>
      )}
    </div>
  );
}

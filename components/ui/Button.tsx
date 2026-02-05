import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * ==========================================
 * COMPONENTE BUTTON
 * ==========================================
 * Botão reutilizável com suporte a tema escuro/claro
 * Aceita variantes de estilo e estados (disabled, loading)
 */

/**
 * Props do componente Button
 * Extende as props nativas de botão HTML
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'> {
  children: ReactNode;
  isDarkMode: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  className?: string;
  disabled?: boolean;
}

/**
 * Componente Button reutilizável
 * 
 * Fornece estilos consistentes para botões em toda a aplicação
 * Suporta tema escuro/claro automaticamente
 * 
 * Uso básico:
 * ```tsx
 * <Button isDarkMode={true} variant="primary">
 *   Clique aqui
 * </Button>
 * ```
 */
export function Button({
  children,
  isDarkMode,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  ...props
}: ButtonProps) {
  /**
   * Configurações de estilo baseadas na variante
   * Cada variante tem cores diferentes para tema escuro e claro
   */
  const variants = {
    primary: isDarkMode
      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
      : 'bg-emerald-500 hover:bg-emerald-600 text-white',
    secondary: isDarkMode
      ? 'bg-[#252525] border border-[#333333] hover:bg-[#333333] text-white'
      : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-900',
    ghost: isDarkMode
      ? 'bg-transparent hover:bg-[#252525] text-gray-300 hover:text-white'
      : 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900',
  };

  /**
   * Configurações de tamanho
   * Define padding e tamanho da fonte
   */
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

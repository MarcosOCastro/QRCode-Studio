import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

/**
 * ==========================================
 * COMPONENTE FORM INPUT
 * ==========================================
 * Campo de entrada de formulário reutilizável
 * Suporta tema escuro/claro, estados de erro e labels
 */

/**
 * Props base para campos de formulário
 * Props comuns entre input e textarea
 */
interface BaseFormFieldProps {
  /** Label do campo (texto exibido acima) */
  label?: string;
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
  /** Mensagem de erro (exibida abaixo do campo) */
  error?: string;
  /** Indica se deve mostrar a mensagem de erro */
  showError?: boolean;
  /** Indica se o campo é obrigatório (asterisco vermelho) */
  required?: boolean;
}

/**
 * Props para componente Input
 * Combina props base com props nativas de input HTML
 */
interface InputProps extends BaseFormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Tipo do input (text, number, email, etc.) */
  type?: 'text' | 'number' | 'email' | 'url' | 'password' | 'tel';
}

/**
 * Props para componente TextArea
 * Combina props base com props nativas de textarea HTML
 */
interface TextAreaProps extends BaseFormFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Número de linhas visíveis */
  rows?: number;
}

/**
 * Componente Input reutilizável
 * 
 * Fornece campo de entrada com:
 * - Label opcional com indicador de obrigatório
 * - Mensagem de erro condicional
 * - Estilos consistentes para tema escuro/claro
 * 
 * Uso:
 * ```tsx
 * <Input
 *   label="Nome"
 *   isDarkMode={true}
 *   required
 *   error="Campo obrigatório"
 *   showError={true}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isDarkMode, error, showError, required, className, type = 'text', ...props }, ref) => {
    const hasError = error && showError;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-1',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            <span className="flex items-center gap-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2',
            isDarkMode
              ? 'bg-[#1a1a1a] text-white border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/20'
              : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20',
            hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />

        {hasError && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Componente TextArea reutilizável
 * 
 * Versão multilinha do Input
 * Mesmos recursos de label, erro e temas
 * 
 * Uso:
 * ```tsx
 * <TextArea
 *   label="Descrição"
 *   isDarkMode={true}
 *   rows={4}
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, isDarkMode, error, showError, required, className, rows = 3, ...props }, ref) => {
    const hasError = error && showError;

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-1',
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            )}
          >
            <span className="flex items-center gap-1">
              {label}
              {required && <span className="text-red-500">*</span>}
            </span>
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 resize-none',
            isDarkMode
              ? 'bg-[#1a1a1a] text-white border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/20'
              : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20',
            hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />

        {hasError && (
          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

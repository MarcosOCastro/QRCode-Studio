import { cn } from '../../utils/cn';

/**
 * ==========================================
 * COMPONENTE SLIDER
 * ==========================================
 * Controle deslizante reutilizável para valores numéricos
 * Usado para ajustar qualidade, tamanho e outras configurações numéricas
 */

/**
 * Props do componente Slider
 */
interface SliderProps {
  /** Valor atual do slider */
  value: number;
  /** Função chamada quando valor muda */
  onChange: (value: number) => void;
  /** Valor mínimo permitido */
  min: number;
  /** Valor máximo permitido */
  max: number;
  /** Incremento/decremento ao mover */
  step?: number;
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
  /** Label exibido acima do slider */
  label?: string;
  /** Valor formatado para exibição (ex: "2000px", "Alta") */
  displayValue?: string;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Componente Slider reutilizável
 * 
 * Fornece controle deslizante estilizado com:
 * - Label e valor formatado
 * - Suporte a tema escuro/claro
 * - Range configurável (min, max, step)
 * 
 * Uso:
 * ```tsx
 * <Slider
 *   value={quality}
 *   onChange={setQuality}
 *   min={200}
 *   max={2000}
 *   step={100}
 *   isDarkMode={true}
 *   label="Qualidade"
 *   displayValue={`${quality}px`}
 * />
 * ```
 */
export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  isDarkMode,
  label,
  displayValue,
  className,
}: SliderProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Cabeçalho com label e valor */}
      {(label || displayValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <label
              className={cn(
                'text-xs font-semibold uppercase tracking-wide',
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              )}
            >
              {label}
            </label>
          )}
          {displayValue && (
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded border',
                isDarkMode
                  ? 'text-emerald-400 bg-emerald-900 border-emerald-700'
                  : 'text-emerald-700 bg-emerald-100 border-emerald-300'
              )}
            >
              {displayValue}
            </span>
          )}
        </div>
      )}

      {/* Input range estilizado */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={cn(
          'w-full h-2 rounded-lg appearance-none cursor-pointer',
          'accent-emerald-500 hover:accent-emerald-400',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500/30',
          isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'
        )}
      />
    </div>
  );
}

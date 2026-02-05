import { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * ==========================================
 * COMPONENTE ROTATION SLIDER
 * ==========================================
 * Controle circular para ajuste de ângulo/rotação
 * Usado principalmente para controlar rotação de gradientes
 */

/**
 * Props do componente RotationSlider
 */
interface RotationSliderProps {
  /** Valor atual do ângulo (0-360) */
  value: number;
  /** Função chamada quando ângulo muda */
  onChange: (value: number) => void;
  /** Indica se o tema escuro está ativo */
  isDarkMode?: boolean;
}

/**
 * Componente RotationSlider
 * 
 * Fornece interface circular para seleção de ângulo:
 * - Círculo com track de progresso visual
 * - Handle arrastável (mouse e touch)
 * - Presets rápidos (0°, 90°, 180°, 270°)
 * - Marcadores de graus a cada 90°
 * 
 * Durante o arraste, atualiza apenas visualmente (local state)
 * Ao soltar, dispara onChange uma única vez (performance)
 */
export function RotationSlider({ value, onChange, isDarkMode = true }: RotationSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const circleRef = useRef<HTMLDivElement>(null);
  const currentAngleRef = useRef(value);

  // Dimensões do controle circular
  const size = 180;
  const center = size / 2;
  const radius = 65;
  const strokeWidth = 8;

  /**
   * Sincroniza valor local com prop quando não está arrastando
   * Evita conflitos entre arraste e atualizações externas
   */
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
      currentAngleRef.current = value;
    }
  }, [value, isDragging]);

  /**
   * Calcula ângulo baseado na posição do mouse/touch
   * Retorna valor entre 0-360 graus
   */
  const calculateAngle = (clientX: number, clientY: number): number => {
    if (!circleRef.current) return localValue;

    const rect = circleRef.current.getBoundingClientRect();
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;

    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = angle + 90; // Ajusta para 0° no topo (12 horas)
    if (angle < 0) angle += 360;

    return Math.round(angle);
  };

  /**
   * Calcula posição do handle baseado no ângulo atual
   * Usa trigonometria para posicionar no círculo
   */
  const getHandlePosition = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  /**
    * Inicia arraste com mouse
    * Configura listeners de movimento e soltura
    */
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setIsDragging(true);

    const updateVisualAngle = (clientX: number, clientY: number) => {
      const newAngle = calculateAngle(clientX, clientY);
      setLocalValue(newAngle);
      currentAngleRef.current = newAngle;
    };

    updateVisualAngle(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent: any) => {
      moveEvent.preventDefault();
      updateVisualAngle(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onChange(currentAngleRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  /**
    * Inicia arraste com touch (dispositivos móveis)
    * Mesma lógica do mouse, mas para eventos touch
    */
  const handleTouchStart = (e: any) => {
    e.preventDefault();
    setIsDragging(true);

    const updateVisualAngle = (clientX: number, clientY: number) => {
      const newAngle = calculateAngle(clientX, clientY);
      setLocalValue(newAngle);
      currentAngleRef.current = newAngle;
    };

    updateVisualAngle(e.touches[0].clientX, e.touches[0].clientY);

        const handleTouchMove = (moveEvent: any) => {
      moveEvent.preventDefault();
      updateVisualAngle(moveEvent.touches[0].clientX, moveEvent.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      onChange(currentAngleRef.current);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);
  };

  const handlePos = getHandlePosition(localValue);

  return (
    <div
      className={cn(
        'p-4 rounded-xl border',
        isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'
      )}
    >
      {/* Cabeçalho com label e valor atual */}
      <div className="flex items-center justify-between mb-3">
        <span className={cn('text-sm font-medium', isDarkMode ? 'text-white' : 'text-gray-900')}>
          Rotação
        </span>
        <span
          className={cn(
            'text-sm font-mono px-3 py-1 rounded border',
            isDarkMode
              ? 'text-gray-300 bg-[#1a1a1a] border-[#2a2a2a]'
              : 'text-gray-700 bg-gray-50 border-gray-200'
          )}
        >
          {localValue}°
        </span>
      </div>

      {/* Círculo interativo de seleção de ângulo */}
      <div
        ref={circleRef}
        className="relative mx-auto cursor-pointer select-none overflow-hidden"
        style={{ width: size, height: size, touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <svg width={size} height={size} className="absolute inset-0">
          {/* Track de fundo do círculo */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#333333"
            strokeWidth={strokeWidth}
          />

          {/* Arco de progresso mostrando valor atual */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#37B4AA"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(localValue / 360) * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
            transform={`rotate(-90 ${center} ${center})`}
          />

          {/* Marcadores de graus a cada 90° */}
          {[0, 90, 180, 270].map((deg) => {
            const pos = getHandlePosition(deg);
            return (
              <g key={deg}>
                <circle cx={pos.x} cy={pos.y} r={3} fill="#555555" />
                <text
                  x={pos.x}
                  y={pos.y - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#777777"
                >
                  {deg}°
                </text>
              </g>
            );
          })}
        </svg>

        {/* Handle arrastável */}
        <div
          className={cn(
            'absolute w-8 h-8 bg-white rounded-full shadow-lg border-3',
            'flex items-center justify-center',
            isDragging
              ? 'border-emerald-600 scale-110 shadow-xl'
              : 'border-emerald-500 hover:scale-105'
          )}
          style={{
            left: handlePos.x - 16,
            top: handlePos.y - 16,
            cursor: isDragging ? 'grabbing' : 'grab',
            borderWidth: '3px',
            transition: isDragging ? 'none' : 'transform 0.15s ease',
          }}
        >
          <div className="w-3 h-3 bg-emerald-500 rounded-full" />
        </div>

        {/* Indicador central */}
        <div
          className="absolute w-2 h-2 bg-slate-400 rounded-full"
          style={{ left: center - 4, top: center - 4 }}
        />
      </div>

      {/* Botões de preset rápido */}
      <div className="flex justify-between mt-4">
        {[0, 90, 180, 270].map((deg) => (
          <button
            key={deg}
            onClick={() => onChange(deg)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
              value === deg
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : isDarkMode
                  ? 'bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a] hover:border-emerald-500/50'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-emerald-500/50'
            )}
          >
            {deg}°
          </button>
        ))}
      </div>
    </div>
  );
}

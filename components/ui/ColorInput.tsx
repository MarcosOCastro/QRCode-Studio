import React, { useState, useEffect, useRef } from 'react';
import { Palette, ChevronUp, ChevronDown, Check, Info } from 'lucide-react';
import { ColorPickerPopover } from './ColorPickerPopover';
import { Tooltip } from './Tooltip';
import { isValidHex, normalizeHex } from '../../utils/colorUtils';

interface ColorInputProps {
    value: string;
    onChange: (v: string) => void;
    label: string;
    tooltip?: string;
    isDarkMode?: boolean;
}

/**
 * Componente de Input de Cor que combina:
 * - Botão color-picker (abre popover)
 * - Input HEX manual sincronizado
 */
export const ColorInput: React.FC<ColorInputProps> = ({ value, onChange, label, tooltip, isDarkMode = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [isValid, setIsValid] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Sincroniza o valor local quando a prop muda
    useEffect(() => {
        setInputValue(value);
        setIsValid(true);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        setInputValue(newValue);

        // Adiciona # se faltar enquanto digita
        if (newValue && !newValue.startsWith('#') && !newValue.startsWith(' ')) {
            newValue = '#' + newValue;
        }

        // Valida
        const valid = isValidHex(newValue);
        setIsValid(valid);

        // Só atualiza o estado global se for válido
        if (valid) {
            onChange(normalizeHex(newValue));
        }
    };

    const handleInputBlur = () => {
        if (!isValid) {
            // Volta para o último valor válido
            setInputValue(value);
            setIsValid(true);
        }
    };

    // Calcula se precisamos de uma borda escura para visibilidade em cores claras
    const needsDarkBorder = (hexColor: string): boolean => {
        if (!isValidHex(hexColor)) return false;
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.8; // Cores muito claras precisam de borda
    };

    return (
        <div className="relative">
            <div className={`flex items-start gap-4 p-4 rounded-xl border shadow-sm transition-colors ${isDarkMode
                ? 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#333333]'
                : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <label className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</label>
                        {tooltip && (
                            <Tooltip content={tooltip} isDarkMode={isDarkMode}>
                                <Info className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                            </Tooltip>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Botão de Cor */}
                        <button
                            ref={buttonRef}
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`group relative w-14 h-14 rounded-xl border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isOpen ? 'border-emerald-500 ring-2 ring-emerald-200' : ''
                                } ${needsDarkBorder(value) ? 'border-[#1a1a1a]' : 'border-gray-400'}`}
                            style={{
                                backgroundColor: value,
                                boxShadow: needsDarkBorder(value)
                                    ? 'inset 0 0 0 1px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)'
                                    : 'inset 0 0 0 1px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <span className="absolute inset-0 flex items-center justify-center transition-all group-hover:scale-110">
                                <Palette
                                    className={`w-6 h-6 transition-all ${needsDarkBorder(value) ? 'text-[#1a1a1a]' : 'text-white'} drop-shadow-md`}
                                    style={{
                                        opacity: 0.8,
                                    }}
                                />
                            </span>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md z-10 transition-transform group-hover:scale-110">
                                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </span>
                        </button>

                        {/* Input HEX */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue.toUpperCase()}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className={`w-full px-4 py-3 text-sm font-mono font-medium border-2 rounded-xl focus:outline-none transition-all ${isValid
                                        ? isDarkMode
                                            ? 'bg-[#1a1a1a] text-white border-[#333333] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
                                            : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'
                                        : 'border-red-300 bg-red-50 focus:border-red-500'
                                        }`}
                                    placeholder="#000000"
                                />
                                {isValid && (
                                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                )}
                            </div>
                            {!isValid && (
                                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                                    <Info className="w-3 h-3" />
                                    HEX inválido (ex: #FF0000)
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ColorPickerPopover
                color={value}
                onChange={onChange}
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                buttonRef={buttonRef}
                isDarkMode={isDarkMode}
            />
        </div>
    );
};

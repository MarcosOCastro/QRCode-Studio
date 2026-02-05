import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HexColorPicker } from 'react-colorful';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { isValidHex, normalizeHex } from '../../utils/colorUtils';

/**
 * ==========================================
 * COMPONENTE COLOR PICKER MODAL
 * ==========================================
 * Agora como uma camada isolada (Modal) para evitar fechamentos indesejados
 */

interface ColorPickerPopoverProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  isOpen: boolean;
  buttonRef?: any; // Mantido por compatibilidade de props, mas ignored no Modal
  isDarkMode?: boolean;
}

export function ColorPickerPopover({
  color,
  onChange,
  onClose,
  isOpen,
  isDarkMode = true
}: ColorPickerPopoverProps) {
  // Estado local para permitir "Cancelar"
  const [localColor, setLocalColor] = useState(color);
  const [inputValue, setInputValue] = useState(color);

  // Sincroniza quando abre
  useEffect(() => {
    if (isOpen) {
      setLocalColor(color);
      setInputValue(color);
    }
  }, [isOpen, color]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (isValidHex(val)) {
      setLocalColor(normalizeHex(val));
    }
  };

  const handleBlur = () => {
    if (isValidHex(inputValue)) {
      const normalized = normalizeHex(inputValue);
      setInputValue(normalized);
      setLocalColor(normalized);
    } else {
      setInputValue(localColor);
    }
  };

  const handleConfirm = () => {
    onChange(localColor);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop escurecido para isolamento total */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Container do Modal */}
      <div
        className={cn(
          "relative w-full max-w-[320px] p-6 rounded-3xl shadow-2xl border transition-all animate-in zoom-in slide-in-from-bottom-4 duration-300",
          isDarkMode
            ? "bg-[#121212] border-[#2a2a2a] text-white"
            : "bg-white border-gray-200 text-gray-900"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-80">Seletor de Cor</h3>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "hover:bg-[#252525] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Picker Visual */}
          <div className="flex justify-center modal-picker-container scale-110 my-4">
            <HexColorPicker color={localColor} onChange={(newColor) => {
              setLocalColor(newColor);
              setInputValue(newColor);
            }} />
          </div>

          {/* Input Manual */}
          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-wider", isDarkMode ? "text-gray-400" : "text-gray-500")}>
              CÓDIGO HEXADECIMAL
            </label>
            <div className="flex gap-3">
              <div
                className="w-14 h-14 rounded-2xl border-2 shadow-inner transition-transform"
                style={{ backgroundColor: localColor, borderColor: isDarkMode ? '#2a2a2a' : '#e2e8f0' }}
              />
              <input
                type="text"
                value={inputValue.toUpperCase()}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={cn(
                  "flex-1 px-4 py-2 rounded-2xl border-2 font-mono text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all",
                  isDarkMode
                    ? "bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    : "bg-[#f8fafc] border-gray-200"
                )}
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onClose}
              className={cn(
                "py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all",
                isDarkMode
                  ? "bg-[#252525] hover:bg-[#333333] text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              )}
            >
              CANCELAR
            </button>
            <button
              onClick={handleConfirm}
              className={cn(
                "py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]",
                "bg-emerald-500 hover:bg-emerald-600 text-white"
              )}
            >
              CONFIRMAR
            </button>
          </div>
        </div>

        <style>{`
          .modal-picker-container .react-colorful {
            width: 100%;
            height: 180px;
          }
          .modal-picker-container .react-colorful__saturation {
            border-radius: 16px 16px 0 0;
          }
          .modal-picker-container .react-colorful__hue {
            height: 14px;
            border-radius: 0 0 16px 16px;
            margin-top: 10px;
          }
          .modal-picker-container .react-colorful__pointer {
            width: 20px;
            height: 20px;
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
}

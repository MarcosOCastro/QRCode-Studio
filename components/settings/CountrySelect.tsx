import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import BR from 'country-flag-icons/react/3x2/BR';
import US from 'country-flag-icons/react/3x2/US';
import GB from 'country-flag-icons/react/3x2/GB';
import ES from 'country-flag-icons/react/3x2/ES';
import PT from 'country-flag-icons/react/3x2/PT';
import AR from 'country-flag-icons/react/3x2/AR';
import UY from 'country-flag-icons/react/3x2/UY';
import CL from 'country-flag-icons/react/3x2/CL';
import CO from 'country-flag-icons/react/3x2/CO';
import MX from 'country-flag-icons/react/3x2/MX';
import FR from 'country-flag-icons/react/3x2/FR';
import DE from 'country-flag-icons/react/3x2/DE';
import IT from 'country-flag-icons/react/3x2/IT';
import JP from 'country-flag-icons/react/3x2/JP';
import CN from 'country-flag-icons/react/3x2/CN';

/**
 * ==========================================
 * LISTA DE PAÍSES SUPORTADOS
 * ==========================================
 */
const countries = [
  { code: '55', name: 'Brasil', Flag: BR },
  { code: '1', name: 'Estados Unidos', Flag: US },
  { code: '44', name: 'Reino Unido', Flag: GB },
  { code: '34', name: 'Espanha', Flag: ES },
  { code: '351', name: 'Portugal', Flag: PT },
  { code: '54', name: 'Argentina', Flag: AR },
  { code: '598', name: 'Uruguai', Flag: UY },
  { code: '56', name: 'Chile', Flag: CL },
  { code: '57', name: 'Colômbia', Flag: CO },
  { code: '52', name: 'México', Flag: MX },
  { code: '33', name: 'França', Flag: FR },
  { code: '49', name: 'Alemanha', Flag: DE },
  { code: '39', name: 'Itália', Flag: IT },
  { code: '81', name: 'Japão', Flag: JP },
  { code: '86', name: 'China', Flag: CN },
];

/**
 * ==========================================
 * COMPONENTE COUNTRY SELECT
 * ==========================================
 * Seletor de país com bandeiras para WhatsApp
 */

interface CountrySelectProps {
  /** Código do país selecionado */
  value: string;
  /** Função chamada ao selecionar país */
  onChange: (code: string) => void;
  /** Indica se o tema escuro está ativo */
  isDarkMode: boolean;
}

/**
 * Componente CountrySelect
 * 
 * Dropdown estilizado com bandeiras dos países:
 * - Mostra bandeira e nome do país selecionado
 * - Dropdown com todos os países disponíveis
 * - Fecha ao clicar fora ou rolar página
 * - Posicionamento inteligente
 */
export function CountrySelect({ value, onChange, isDarkMode }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedCountry = countries.find(c => c.code === value) || countries[0];

  /**
   * Fecha dropdown ao clicar fora
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target || !target.closest || !target.closest('[data-country-dropdown]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  /**
   * Calcula posição do dropdown quando abre
   */
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className={cn('block text-sm font-medium mb-1', isDarkMode ? 'text-gray-300' : 'text-gray-700')}>
        País
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className={cn(
          'w-full px-3 py-2 border rounded-md text-left flex items-center justify-between',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500',
          isDarkMode
            ? 'border-[#2a2a2a] bg-[#1a1a1a] text-white hover:border-[#333333]'
            : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
        )}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-4 flex-shrink-0 overflow-hidden rounded-sm flex items-center justify-center">
            <selectedCountry.Flag />
          </span>
          <span className="text-sm">{selectedCountry.name} (+{selectedCountry.code})</span>
        </div>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen ? 'rotate-180' : '', isDarkMode ? 'text-gray-400' : 'text-gray-500')} />
      </button>

      {isOpen && (
        <div
          data-country-dropdown
          className={cn(
            'fixed rounded-md shadow-lg max-h-60 overflow-auto z-[9999]',
            isDarkMode
              ? 'bg-[#1a1a1a] border border-[#2a2a2a]'
              : 'bg-white border border-gray-200'
          )}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`
          }}
        >
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onChange(country.code);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-3 py-2 text-left flex items-center gap-3 focus:outline-none',
                isDarkMode
                  ? `hover:bg-[#252525] ${value === country.code ? 'bg-[#252525]' : ''}` 
                  : `hover:bg-gray-100 ${value === country.code ? 'bg-gray-100' : ''}`
              )}
            >
              <span className="w-6 h-4 flex-shrink-0 overflow-hidden rounded-sm flex items-center justify-center">
                <country.Flag />
              </span>
              <span className={cn('text-sm', isDarkMode ? 'text-gray-300' : 'text-gray-700')}>
                {country.name} (+{country.code})
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

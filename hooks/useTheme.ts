import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar o tema escuro/claro da aplicação
 * 
 * Fornece estado do tema e função para alternar entre os modos
 * O estado inicial é sempre dark mode (true)
 * 
 * @returns {Object} Estado do tema e função de toggle
 * @property {boolean} isDarkMode - true se tema escuro está ativo
 * @property {() => void} toggleTheme - Função para alternar entre os temas
 */
export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return { isDarkMode, toggleTheme };
}

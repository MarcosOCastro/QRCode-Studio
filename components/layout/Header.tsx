import React from 'react';
import { QrCode, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-[#0f0f0f] border-b border-[#2a2a2a]' : 'bg-white border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
            <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>QRCode</span>
            <span className="text-emerald-500"> Studio</span>
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 ${isDarkMode ? 'bg-[#252525] border border-[#333333] text-gray-300 hover:text-emerald-400 hover:border-emerald-500' : 'bg-gray-100 border border-gray-300 text-gray-600 hover:text-emerald-600 hover:border-emerald-500'}`}
          aria-label={isDarkMode ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};
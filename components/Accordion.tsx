import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';

interface AccordionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isDarkMode?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, icon: Icon, children, defaultOpen = false, isDarkMode: isDarkModeProp }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isDarkMode, setIsDarkMode] = useState(isDarkModeProp ?? true);

  useEffect(() => {
    // Só detecta tema automaticamente se isDarkMode não foi passado
    if (isDarkModeProp !== undefined) {
      setIsDarkMode(isDarkModeProp);
      return;
    }

    // Check initial theme
    const checkTheme = () => {
      const appDiv = document.querySelector('.min-h-screen');
      if (appDiv) {
        const hasDarkBg = appDiv.classList.contains('bg-[#0a0a0a]');
        setIsDarkMode(hasDarkBg);
      }
    };

    checkTheme();

    // Listen for class changes on app div
    const appDiv = document.querySelector('.min-h-screen');
    if (appDiv) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement;
            const hasDarkBg = target.classList.contains('bg-[#0a0a0a]');
            setIsDarkMode(hasDarkBg);
          }
        });
      });

      observer.observe(appDiv, { attributes: true, attributeFilter: ['class'] });

      return () => observer.disconnect();
    }
  }, [isDarkModeProp]);

  return (
    <div className={`rounded-xl mb-4 overflow-hidden transition-all duration-300 ${isDarkMode ? 'border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]' : 'border border-gray-200 bg-white hover:border-gray-300'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 transition-all duration-200 ${isDarkMode ? 'bg-[#1a1a1a] hover:bg-[#252525]' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isDarkMode ? 'bg-[#252525] border-[#333333]' : 'bg-gray-100 border-gray-200'}`}>
            <Icon className="w-5 h-5 text-emerald-500" />
          </div>
          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</span>
        </div>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isDarkMode ? 'bg-[#252525] border-[#333333]' : 'bg-gray-100 border-gray-200'}`}>
          {isOpen ? <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> : <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
        </div>
      </button>
      {isOpen && (
        <div className={`p-4 border-t ${isDarkMode ? 'border-[#2a2a2a] bg-[#0f0f0f]' : 'border-gray-200 bg-gray-50'}`}>
          {children}
        </div>
      )}
    </div>
  );
};
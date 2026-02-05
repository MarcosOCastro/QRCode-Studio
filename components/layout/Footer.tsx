import React from 'react';
import { Github, Linkedin, Instagram, Globe, Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
  onOpenSupport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = true, onOpenSupport }) => {
  return (
    <footer className={`py-8 border-t ${isDarkMode ? 'bg-[#0f0f0f] border-[#2a2a2a]' : 'bg-gray-50 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
         
         <p className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Desenvolvido por Marcos Castro • 2026
         </p>

         <div className="flex items-center gap-8">
             <a 
               href="https://github.com/marcosocastro" 
               target="_blank" 
               rel="noopener noreferrer"
               className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
               aria-label="GitHub"
             >
               <Github className="w-5 h-5" strokeWidth={2} />
             </a>
             <a 
               href="https://www.linkedin.com/in/marcosvocastro/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
               aria-label="LinkedIn"
             >
               <Linkedin className="w-5 h-5" strokeWidth={2} />
             </a>
             <a 
               href="https://www.instagram.com/marcosvocastro/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
               aria-label="Instagram"
             >
               <Instagram className="w-5 h-5" strokeWidth={2} />
             </a>
             <a 
               href="https://www.marcosocastro.com.br/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
               aria-label="Website"
             >
               <Globe className="w-5 h-5" strokeWidth={2} />
             </a>
             {onOpenSupport && (
               <button
                 onClick={onOpenSupport}
                 className={`transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
                 aria-label="Apoiar o projeto"
                 title="Apoiar o projeto"
               >
                 <Heart className="w-5 h-5" strokeWidth={2} />
               </button>
             )}
          </div>
      </div>
    </footer>
  );
};
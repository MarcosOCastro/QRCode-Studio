import React from 'react';
import { Link, Palette, QrCode, Download } from 'lucide-react';

interface HowItWorksProps {
  isDarkMode?: boolean;
}

const steps = [
  {
    number: 1,
    icon: Link,
    title: 'Defina o Conteúdo',
    description: 'Escolha entre URL, Wi-Fi, WhatsApp, Instagram ou PIX. Preencha os campos necessários para cada tipo de conteúdo.'
  },
  {
    number: 2,
    icon: Palette,
    title: 'Personalize o Design',
    description: 'Selecione cores personalizadas ou gradientes. Escolha estilos de pixel, borda e miolo. Adicione sua logo (opcional).'
  },
  {
    number: 3,
    icon: QrCode,
    title: 'Gere e Visualize',
    description: 'Visualize em tempo real no preview. Ajuste a qualidade e resolução desejada para obter o melhor resultado.'
  },
  {
    number: 4,
    icon: Download,
    title: 'Baixe e Use',
    description: 'Faça download em PNG ou SVG. Teste com seu celular antes de imprimir. Use onde quiser, sem limites!'
  }
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ isDarkMode = true }) => {
  return (
    <section className={`py-16 ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Como Funciona
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`relative p-6 rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a]' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`w-8 h-8 mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    <step.icon className="w-full h-full" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
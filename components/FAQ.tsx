import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FAQProps {
  isDarkMode?: boolean;
}

const faqData = {
  leftColumn: [
    {
      question: 'O que é um código QR?',
      answer: 'Código QR (Quick Response Code) é um tipo de código de barras bidimensional que pode ser escaneado por smartphones. Foi inventado pela Denso Wave em 1994 e permite armazenar diversos tipos de informações como URLs, textos, contatos e muito mais.'
    },
    {
      question: 'Posso usar os QR codes para fins comerciais?',
      answer: 'Sim! Todos os QR codes gerados são gratuitos e podem ser usados para qualquer finalidade, incluindo uso comercial. Não há restrições de licenciamento ou direitos autorais.'
    },
    {
      question: 'Os QR codes expiram?',
      answer: 'Não, os QR codes criados são estáticos e funcionam para sempre. Uma vez gerados, eles não param de funcionar após um tempo determinado. A única limitação é que você não pode editar o conteúdo depois de criado.'
    },
    {
      question: 'Existe limite de escaneamentos?',
      answer: 'Não há limite! O código QR funcionará para sempre e pode ser escaneado quantas vezes quiser, sem custos adicionais ou limitações de uso.'
    }
  ],
  rightColumn: [
    {
      question: 'Meu QR code não funciona, o que fazer?',
      answer: 'Primeiro, verifique seus dados digitados. Pequenos erros na URL podem quebrar o QR. Certifique-se de haver contraste suficiente entre o fundo e o primeiro plano. O primeiro plano deve sempre estar mais escuro que o fundo para melhor leitura.'
    },
    {
      question: 'Qual a diferença entre PNG e SVG?',
      answer: 'PNG é um formato rasterizado ideal para uso digital e impressão em tamanhos menores. SVG é um formato vetorial que permite redimensionar infinitamente sem perder qualidade, perfeito para impressão profissional em grandes formatos.'
    },
    {
      question: 'Posso editar o QR code depois de criado?',
      answer: 'Não, os QR codes estáticos não podem ser editados após a criação. Uma vez gerado, o conteúdo é fixo. Para QR codes editáveis (dinâmicos), você precisaria de um serviço pago de redirecionamento. Infelizmente, este serviço não é fornecido em nosso site.'
    },
    {
      question: 'Os dados são salvos no servidor?',
      answer: 'Não salvamos nem reutilizamos seus dados. Todo o processamento acontece no seu navegador (client-side). Seus dados e QR codes permanecem privados e seguros, sem armazenamento em nossos servidores.'
    }
  ]
};

export const FAQ: React.FC<FAQProps> = ({ isDarkMode = true }) => {
  return (
    <section className={`py-16 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className={`w-10 h-10 mx-auto mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Perguntas Frequentes
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tire suas dúvidas sobre o QRCode Studio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {faqData.leftColumn.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border ${isDarkMode
                    ? 'bg-[#1a1a1a] border-[#2a2a2a]'
                    : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.question}
                </h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {faqData.rightColumn.map((item, index) => (
              <div
                key={index}
                className={`p-5 rounded-xl border ${isDarkMode
                    ? 'bg-[#1a1a1a] border-[#2a2a2a]'
                    : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.question}
                </h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Layout, Check, Download, Smartphone, QrCode } from 'lucide-react';
import { ContentType } from '../types';

interface PreviewPanelProps {
    qrRef: React.RefObject<HTMLDivElement>;
    contentType: ContentType;
    quality: number;
    setQuality: (q: number) => void;
    downloadFormat: 'png' | 'svg';
    setDownloadFormat: (f: 'png' | 'svg') => void;
    onDownload: () => void;
    qrCodeData: string;
    backgroundColor: string;
    isDarkMode: boolean;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
    qrRef, contentType, quality, setQuality, downloadFormat, setDownloadFormat, onDownload, qrCodeData, backgroundColor, isDarkMode
}) => {
    return (
        <div className="lg:sticky lg:top-24 space-y-4 lg:space-y-6">
            <div className={`rounded-2xl shadow-2xl border overflow-hidden ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'}`}>
                <div className={`p-3 lg:p-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'}`}>
                    <h3 className={`font-semibold flex items-center gap-2 text-sm lg:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Layout className="w-4 h-4 text-emerald-500" />
                        Preview
                    </h3>
                    {contentType === 'pix' && qrCodeData && (
                        <span className={`inline-flex items-center px-2 lg:px-2.5 py-0.5 rounded-full text-xs font-medium border ${isDarkMode ? 'bg-emerald-900 text-emerald-400 border-emerald-700' : 'bg-emerald-100 text-emerald-700 border-emerald-300'}`}>
                            <Check className="w-3 h-3 mr-1" />
                            PIX Ativo
                        </span>
                    )}
                </div>

                <div
                    className="p-4 lg:p-8 flex items-center justify-center min-h-[280px] lg:min-h-[350px] relative transition-colors duration-300"
                    style={{ backgroundColor: qrCodeData ? backgroundColor : '#f5f5f5' }}
                >
                    {/* QR Container - Hidden if no data - library handles margin/quiet zone */}
                    <div
                        ref={qrRef}
                        className={`${!qrCodeData ? 'hidden' : 'block'} max-w-full`}
                        style={{ maxWidth: '100%' }}
                    />

                    {/* Empty State Message */}
                    {!qrCodeData && (
                        <div className="text-center max-w-[280px] p-4">
                            <div className="bg-gray-100 w-16 lg:w-20 h-16 lg:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 border border-gray-200">
                                <QrCode className="w-8 lg:w-10 h-8 lg:h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-900 font-semibold mb-2 text-base lg:text-lg">
                                Sem informações para gerar o QRCode
                            </p>
                            <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">
                                Digite as informações necessárias e visualize aqui o seu QRCode automaticamente.
                            </p>
                        </div>
                    )}
                </div>

                <div className={`p-4 lg:p-6 border-t space-y-4 lg:space-y-5 ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-gray-50 border-gray-200'}`}>
                    {/* Quality Slider */}
                    <div className={!qrCodeData ? 'opacity-50 pointer-events-none' : ''}>
                        <div className="flex justify-between mb-2">
                            <label className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Qualidade</label>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded border ${isDarkMode ? 'text-emerald-400 bg-emerald-900 border-emerald-700' : 'text-emerald-700 bg-emerald-100 border-emerald-300'}`}>
                                {quality < 1000 ? 'Baixa' : quality < 1500 ? 'Média' : 'Alta'}
                                <span className={`mx-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
                                {quality}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min="200"
                            max="2000"
                            step="100"
                            value={quality}
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                            className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 ${isDarkMode ? 'bg-[#252525]' : 'bg-gray-200'}`}
                        />
                    </div>

                    {/* Format Selection & Download */}
                    <div className="grid grid-cols-3 gap-2 lg:gap-3">
                        <div className={`col-span-3 flex gap-2 p-1 rounded-xl mb-1 lg:mb-2 border ${!qrCodeData ? 'opacity-50 pointer-events-none' : ''} ${isDarkMode ? 'bg-[#0f0f0f] border-[#333333]' : 'bg-gray-100 border-gray-200'}`}>
                            {['png', 'svg'].map(fmt => (
                                <button
                                    key={fmt}
                                    onClick={() => setDownloadFormat(fmt as 'png' | 'svg')}
                                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg uppercase transition-all ${downloadFormat === fmt
                                        ? isDarkMode
                                            ? 'bg-[#252525] text-emerald-400 border border-[#333333] shadow-inner'
                                            : 'bg-white text-emerald-600 border border-gray-300 shadow-sm'
                                        : isDarkMode
                                            ? 'text-gray-400 hover:text-gray-300'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {fmt}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={onDownload}
                            disabled={!qrCodeData}
                            className={`col-span-3 w-full py-3 lg:py-3.5 px-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm lg:text-base ${!qrCodeData
                                ? isDarkMode
                                    ? 'bg-[#252525] text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white active:scale-[0.98]'
                                }`}
                        >
                            <Download className="w-4 lg:w-5 h-4 lg:h-5" />
                            BAIXAR QR CODE
                        </button>
                    </div>
                </div>
            </div>

            {/* Tips - Hidden on mobile for cleaner UI */}
            <div className={`hidden lg:block rounded-2xl p-4 lg:p-5 shadow-lg border ${isDarkMode ? 'bg-[#1a1a1a] border-[#333333]' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border ${isDarkMode ? 'bg-emerald-900 border-emerald-700 text-emerald-400' : 'bg-emerald-100 border-emerald-300 text-emerald-600'}`}>
                        <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Antes de Imprimir</h4>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Sempre teste a leitura do QR Code com a câmera do seu celular e aplicativos de banco (no caso do PIX). Cores muito claras podem dificultar a leitura.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

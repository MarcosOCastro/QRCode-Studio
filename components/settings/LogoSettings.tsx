import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Accordion } from '../Accordion';
import { QrDesignState } from '../../types';

interface LogoSettingsProps {
    design: QrDesignState;
    setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
    handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDarkMode: boolean;
}

export const LogoSettings: React.FC<LogoSettingsProps> = ({ design, setDesign, handleLogoUpload, isDarkMode }) => {
    return (
        <Accordion title="Logotipo" icon={ImageIcon} isDarkMode={isDarkMode}>
            <div className="space-y-4">
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors group ${isDarkMode ? 'border-[#2a2a2a] hover:bg-[#1a1a1a]' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center">
                        {design.image ? (
                            <div className="relative mb-4">
                                <div className={`p-2 rounded-lg shadow-sm border ${isDarkMode ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
                                    <img
                                        src={design.image}
                                        alt="Logo"
                                        crossOrigin="anonymous"
                                        className="h-24 w-24 object-contain rounded"
                                    />
                                </div>
                                <button
                                    onClick={(e) => { e.preventDefault(); setDesign(prev => ({ ...prev, image: undefined })); }}
                                    className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 shadow-md transition-colors"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                        ) : (
                            <div className={`w-16 h-16 text-emerald-500 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border ${isDarkMode ? 'bg-[#252525] border-[#2a2a2a]' : 'bg-gray-100 border-gray-200'}`}>
                                <ImageIcon className="w-8 h-8" />
                            </div>
                        )}
                        <span className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Clique para enviar uma logo</span>
                        <span className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Recomendado: PNG Transparente</span>
                    </label>
                </div>

                {design.image && (
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-200'}`}>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tamanho</label>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{Math.round(design.imageOptions.imageSize * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="0.5"
                                step="0.05"
                                value={design.imageOptions.imageSize}
                                onChange={(e) => setDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) } }))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Margem</label>
                                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{design.imageOptions.margin}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={design.imageOptions.margin}
                                onChange={(e) => setDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, margin: parseInt(e.target.value) } }))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 ${isDarkMode ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${isDarkMode ? 'border border-[#2a2a2a] hover:bg-[#1a1a1a]' : 'border border-gray-200 hover:bg-gray-50'}`}>
                                <input
                                    type="checkbox"
                                    checked={design.imageOptions.hideBackgroundDots}
                                    onChange={(e) => setDesign(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, hideBackgroundDots: e.target.checked } }))}
                                    className={`w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500 ${isDarkMode ? 'border-[#2a2a2a]' : 'border-gray-300'}`}
                                />
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Remover pixels atrás da logo (Melhora leitura)</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </Accordion>
    );
};

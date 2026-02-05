import React from 'react';
import { Layout } from 'lucide-react';
import { Accordion } from '../Accordion';
import { QrDesignState } from '../../types';
import { BodyShapeIcon, FrameShapeIcon, BallShapeIcon } from '../icons/ShapeIcons';

interface DesignSettingsProps {
    design: QrDesignState;
    setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
    isDarkMode: boolean;
}

export const DesignSettings: React.FC<DesignSettingsProps> = ({ design, setDesign, isDarkMode }) => {

    const renderShapeButton = (
        isActive: boolean,
        onClick: () => void,
        Icon: React.ComponentType<{ className?: string, type: any }>,
        type: string,
        label: string
    ) => (
        <button
            onClick={onClick}
            className={`group relative p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2 ${isActive
                    ? isDarkMode
                        ? 'border-emerald-500 bg-[#252525] text-emerald-400'
                        : 'border-emerald-500 bg-emerald-50 text-emerald-600'
                    : isDarkMode
                        ? 'border-[#2a2a2a] hover:border-emerald-500 hover:bg-[#1a1a1a] text-gray-400'
                        : 'border-gray-200 hover:border-emerald-500 hover:bg-gray-50 text-gray-500'
                }`}
        >
            <div className="w-8 h-8">
                <Icon type={type} className={`w-full h-full transition-colors ${isActive ? 'text-emerald-500' : isDarkMode ? 'text-gray-400 group-hover:text-emerald-500' : 'text-gray-500 group-hover:text-emerald-500'}`} />
            </div>
            <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>{label}</span>
            {isActive && (
                <div className="absolute top-1 right-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
            )}
        </button>
    );

    return (
        <Accordion title="Personalizar Design" icon={Layout} defaultOpen={true}>
            <div className="space-y-8">

                {/* Body Shape */}
                <div>
                    <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Estilo do Pixel
                        <span className={`text-xs font-normal px-2 py-0.5 rounded-full border ${isDarkMode ? 'text-gray-400 bg-[#1a1a1a] border-[#2a2a2a]' : 'text-gray-600 bg-gray-100 border-gray-200'}`}>Corpo</span>
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {renderShapeButton(design.dotsOptions.type === 'square', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'square' } })), BodyShapeIcon, 'square', 'Quadrado')}
                        {renderShapeButton(design.dotsOptions.type === 'dots', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'dots' } })), BodyShapeIcon, 'dots', 'Pontos')}
                        {renderShapeButton(design.dotsOptions.type === 'rounded', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'rounded' } })), BodyShapeIcon, 'rounded', 'Arred.')}
                        {renderShapeButton(design.dotsOptions.type === 'extra-rounded', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'extra-rounded' } })), BodyShapeIcon, 'extra-rounded', 'Extra')}
                        {renderShapeButton(design.dotsOptions.type === 'classy', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'classy' } })), BodyShapeIcon, 'classy', 'Classy')}
                        {renderShapeButton(design.dotsOptions.type === 'classy-rounded', () => setDesign(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type: 'classy-rounded' } })), BodyShapeIcon, 'classy-rounded', 'Soft')}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Eye Frame Shape */}
                    <div>
                        <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Estilo da Borda
                            <span className={`text-xs font-normal px-2 py-0.5 rounded-full border ${isDarkMode ? 'text-gray-400 bg-[#1a1a1a] border-[#2a2a2a]' : 'text-gray-600 bg-gray-100 border-gray-200'}`}>Olhos</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                            {renderShapeButton(design.cornersSquareOptions.type === 'square', () => setDesign(prev => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, type: 'square' } })), FrameShapeIcon, 'square', 'Quadrado')}
                            {renderShapeButton(design.cornersSquareOptions.type === 'extra-rounded', () => setDesign(prev => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, type: 'extra-rounded' } })), FrameShapeIcon, 'extra-rounded', 'Arred.')}
                            {renderShapeButton(design.cornersSquareOptions.type === 'dot', () => setDesign(prev => ({ ...prev, cornersSquareOptions: { ...prev.cornersSquareOptions, type: 'dot' } })), FrameShapeIcon, 'dot', 'Círculo')}
                        </div>
                    </div>

                    {/* Eye Ball Shape */}
                    <div>
                        <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Estilo do Miolo
                            <span className={`text-xs font-normal px-2 py-0.5 rounded-full border ${isDarkMode ? 'text-gray-400 bg-[#1a1a1a] border-[#2a2a2a]' : 'text-gray-600 bg-gray-100 border-gray-200'}`}>Olhos</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                            {renderShapeButton(design.cornersDotOptions.type === 'square', () => setDesign(prev => ({ ...prev, cornersDotOptions: { ...prev.cornersDotOptions, type: 'square' } })), BallShapeIcon, 'square', 'Quadrado')}
                            {renderShapeButton(design.cornersDotOptions.type === 'dot', () => setDesign(prev => ({ ...prev, cornersDotOptions: { ...prev.cornersDotOptions, type: 'dot' } })), BallShapeIcon, 'dot', 'Círculo')}
                            {renderShapeButton(design.cornersDotOptions.type === 'extra-rounded', () => setDesign(prev => ({ ...prev, cornersDotOptions: { ...prev.cornersDotOptions, type: 'extra-rounded' } })), BallShapeIcon, 'extra-rounded', 'Arred.')}
                        </div>
                    </div>
                </div>
            </div>
        </Accordion>
    );
};

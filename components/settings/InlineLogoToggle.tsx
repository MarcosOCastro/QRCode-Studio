import { Image as ImageIcon } from 'lucide-react';

interface InlineLogoToggleProps {
    label: string;
    url: string;
    design: any;
    setDesign: any;
    isDarkMode: boolean;
}

export function InlineLogoToggle({ label, url, design, setDesign, isDarkMode }: InlineLogoToggleProps) {
    const isSelected = design.image === url;

    const handleSetDefaultLogo = (url: string) => {
        const isDataUrl = url.startsWith('data:image');

        setDesign((prev: any) => ({
            ...prev,
            image: url,
            imageOptions: {
                ...prev.imageOptions,
                crossOrigin: isDataUrl ? undefined : 'anonymous', // Only set crossOrigin for external URLs
                hideBackgroundDots: true, // Best practice for logos
                imageSize: 0.4,           // Reset to optimal size
                margin: 0                 // Reset margin for standard logos
            }
        }));
    };

    const toggle = () => {
        if (isSelected) {
            setDesign((prev: any) => ({ ...prev, image: undefined }));
        } else {
            handleSetDefaultLogo(url);
        }
    };

    return (
        <div className={`mt-4 flex items-center justify-between p-3 rounded-lg border transition-colors ${isDarkMode
                ? 'bg-[#252525] border-[#2a2a2a] hover:border-[#333333]'
                : 'bg-gray-50 border-gray-200 hover:border-gray-300'
            }`}>
            <span className={`text-sm font-medium flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                Adicionar Logo {label}
            </span>
            <button
                type="button"
                onClick={toggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${isSelected ? 'bg-emerald-500' : isDarkMode ? 'bg-[#333333]' : 'bg-gray-300'
                    }`}
                role="switch"
                aria-checked={isSelected}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isSelected ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
}

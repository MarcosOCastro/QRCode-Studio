import React from 'react';
import { Input } from '../../ui/FormInput';
import { InlineLogoToggle } from '../InlineLogoToggle';
import { QrContentState, QrDesignState } from '../../../types';

/**
 * ==========================================
 * COMPONENTE WIFI CONTENT
 * ==========================================
 * Campos para configuração de QR Code de Wi-Fi
 */

interface WifiContentProps {
  content: QrContentState;
  setContent: React.Dispatch<React.SetStateAction<QrContentState>>;
  design: QrDesignState;
  setDesign: React.Dispatch<React.SetStateAction<QrDesignState>>;
  isDarkMode: boolean;
}

export function WifiContent({ content, setContent, design, setDesign, isDarkMode }: WifiContentProps) {
  const WIFI_LOGO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/WiFi_Logo.svg/1024px-WiFi_Logo.svg.png';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome da Rede (SSID)"
          type="text"
          placeholder="MinhaWiFi"
          value={content.wifi.ssid}
          onChange={(e) => setContent(prev => ({ ...prev, wifi: { ...prev.wifi, ssid: e.target.value } }))}
          required
          isDarkMode={isDarkMode}
        />

        <Input
          label="Senha"
          type="text"
          placeholder="Senha123"
          value={content.wifi.password}
          onChange={(e) => setContent(prev => ({ ...prev, wifi: { ...prev.wifi, password: e.target.value } }))}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="space-y-2">
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Tipo de Criptografia
        </label>
        <select
          value={content.wifi.encryption}
          onChange={(e) => setContent(prev => ({ ...prev, wifi: { ...prev.wifi, encryption: e.target.value as any } }))}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode
            ? 'bg-[#1a1a1a] text-white border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/20'
            : 'bg-gray-50 text-gray-900 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20'
            }`}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WPA3">WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Sem senha</option>
        </select>
      </div>

      <label className={`flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <input
          type="checkbox"
          checked={content.wifi.hidden}
          onChange={(e) => setContent(prev => ({ ...prev, wifi: { ...prev.wifi, hidden: e.target.checked } }))}
          className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <span className="text-sm">Rede oculta</span>
      </label>

      <InlineLogoToggle
        label="Wi-Fi"
        url={WIFI_LOGO}
        design={design}
        setDesign={setDesign}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

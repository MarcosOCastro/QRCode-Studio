import { QrContentState, ContentType, WifiData, PixData, WhatsAppData, ValidationError, ValidationResult } from '../types';

export const validateUrl = (url: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!url.trim()) {
    errors.push({ field: 'url', message: 'URL é obrigatória' });
  } else {
    try {
      new URL(url);
    } catch {
      errors.push({ field: 'url', message: 'URL inválida. Ex: https://exemplo.com' });
    }
  }

  return { isValid: errors.length === 0, errors };
};

export const validateWifi = (wifi: WifiData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!wifi.ssid.trim()) {
    errors.push({ field: 'ssid', message: 'Nome da rede (SSID) é obrigatório' });
  } else if (wifi.ssid.length < 1 || wifi.ssid.length > 32) {
    errors.push({ field: 'ssid', message: 'SSID deve ter entre 1 e 32 caracteres' });
  }

  if (wifi.encryption !== 'nopass' && !wifi.password.trim()) {
    errors.push({ field: 'password', message: 'Senha é obrigatória para redes protegidas' });
  }

  return { isValid: errors.length === 0, errors };
};

export const validateWhatsApp = (whatsapp: WhatsAppData): ValidationResult => {
  const errors: ValidationError[] = [];

  const cleanPhone = whatsapp.phoneNumber.replace(/\D/g, '');

  if (!cleanPhone) {
    errors.push({ field: 'phone', message: 'Número de telefone é obrigatório' });
  } else if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    errors.push({ field: 'phone', message: 'Número deve ter entre 10 e 15 dígitos' });
  }

  return { isValid: errors.length === 0, errors };
};

export const validateInstagram = (username: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!username.trim()) {
    errors.push({ field: 'username', message: 'Nome de usuário é obrigatório' });
  } else if (!/^[a-zA-Z0-9._]+$/.test(username.replace('@', ''))) {
    errors.push({ field: 'username', message: 'Nome de usuário inválido. Use apenas letras, números, pontos e underlines' });
  }

  return { isValid: errors.length === 0, errors };
};

export const validatePix = (pix: PixData): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!pix.key.trim()) {
    errors.push({ field: 'key', message: 'Chave PIX é obrigatória' });
  } else {
    // Validar formato da chave
    const key = pix.key.replace(/[^a-zA-Z0-9]/g, '');
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pix.key);
    const isPhone = /^\d{10,11}$/.test(pix.key.replace(/\D/g, ''));
    const isCPF = /^\d{11}$/.test(pix.key.replace(/\D/g, ''));
    const isCNPJ = /^\d{14}$/.test(pix.key.replace(/\D/g, ''));
    const isRandomKey = /^[a-zA-Z0-9]{32,36}$/.test(key);

    if (!isEmail && !isPhone && !isCPF && !isCNPJ && !isRandomKey) {
      errors.push({ field: 'key', message: 'Formato de chave PIX inválido' });
    }
  }

  if (!pix.name.trim()) {
    errors.push({ field: 'name', message: 'Nome do beneficiário é obrigatório' });
  } else if (pix.name.length < 2) {
    errors.push({ field: 'name', message: 'Nome deve ter pelo menos 2 caracteres' });
  }

  if (!pix.city.trim()) {
    errors.push({ field: 'city', message: 'Cidade é obrigatória' });
  } else if (pix.city.length < 2) {
    errors.push({ field: 'city', message: 'Cidade deve ter pelo menos 2 caracteres' });
  }

  return { isValid: errors.length === 0, errors };
};

export const validateContent = (content: QrContentState): ValidationResult => {
  switch (content.type) {
    case 'url':
      return validateUrl(content.rawUrl);
    case 'wifi':
      return validateWifi(content.wifi);
    case 'whatsapp':
      return validateWhatsApp(content.whatsapp);
    case 'instagram':
      return validateInstagram(content.instagram);
    case 'pix':
      return validatePix(content.pix);
    default:
      return { isValid: true, errors: [] };
  }
};

export const getFieldError = (errors: ValidationError[], field: string): string | undefined => {
  return errors.find(e => e.field === field)?.message;
};

export const hasFieldError = (errors: ValidationError[], field: string): boolean => {
  return errors.some(e => e.field === field);
};

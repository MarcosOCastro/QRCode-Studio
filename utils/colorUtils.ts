/**
 * Utilitários para manipulação e validação de cores HEX
 */

/**
 * Verifica se uma string é um código HEX válido (#FFF ou #FFFFFF)
 */
export const isValidHex = (hex: string): boolean => {
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);
};

/**
 * Normaliza uma string HEX:
 * - Adiciona # se faltar
 * - Remove espaços
 * - Converte 3 dígitos para 6 (ex: #FFF -> #FFFFFF)
 * - Converte para maiúsculas
 */
export const normalizeHex = (hex: string): string => {
    let normalized = hex.trim().replace(/\s/g, '');
    if (!normalized.startsWith('#')) normalized = '#' + normalized;

    if (/^#([0-9A-Fa-f]{3})$/.test(normalized)) {
        normalized = '#' +
            normalized[1] + normalized[1] +
            normalized[2] + normalized[2] +
            normalized[3] + normalized[3];
    }

    return normalized.toUpperCase();
};

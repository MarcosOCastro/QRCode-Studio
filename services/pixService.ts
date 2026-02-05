/**
 * Generates the PIX payload string based on EMVCo standard (BR Code).
 */
import { PixData } from '../types';

function formatField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

function calculateCRC16(payload: string): string {
  // CRC-16-CCITT (0xFFFF initial value, 0x1021 polynomial)
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
    }
  }

  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const generatePixPayload = (data: PixData): string => {
  const { key, name, city, amount, id } = data;

  if (!key || !name || !city) return '';

  const cleanName = removeAccents(name).substring(0, 25);
  const cleanCity = removeAccents(city).substring(0, 15);
  const txId = id || '***';
  
  // 00 - Payload Format Indicator
  let payload = formatField('00', '01');

  // 26 - Merchant Account Information
  // 00 - GUI (br.gov.bcb.pix)
  // 01 - Key
  const merchantAccount = formatField('00', 'br.gov.bcb.pix') + formatField('01', key);
  payload += formatField('26', merchantAccount);

  // 52 - Merchant Category Code
  payload += formatField('52', '0000');

  // 53 - Transaction Currency (BRL = 986)
  payload += formatField('53', '986');

  // 54 - Transaction Amount (Optional)
  if (amount && parseFloat(amount) > 0) {
    const formattedAmount = parseFloat(amount).toFixed(2);
    payload += formatField('54', formattedAmount);
  }

  // 58 - Country Code
  payload += formatField('58', 'BR');

  // 59 - Merchant Name
  payload += formatField('59', cleanName);

  // 60 - Merchant City
  payload += formatField('60', cleanCity);

  // 62 - Additional Data Field Template
  // 05 - Reference Label (TxID)
  const additionalData = formatField('05', txId);
  payload += formatField('62', additionalData);

  // 63 - CRC16
  payload += '6304'; // Append ID and Length for CRC

  const crc = calculateCRC16(payload);
  
  return payload + crc;
};
import QRCode from 'qrcode';

/**
 * Generates a high-resolution base64 PNG data URL for a given URL or text.
 * Used for dynamic QR code rendering on screens, printouts, and Word exports.
 */
export async function generateQrCodeDataUrl(text: string): Promise<string> {
  if (!text || !text.trim()) {
    return '';
  }

  try {
    const dataUrl = await QRCode.toDataURL(text.trim(), {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 256,
      color: {
        dark: '#002C50', // Moser Blue
        light: '#FFFFFF',
      },
    });
    return dataUrl;
  } catch (error) {
    console.error('Erreur lors de la génération du QR Code:', error);
    return '';
  }
}

/**
 * Generates an SVG string of the QR Code for vector rendering.
 */
export async function generateQrCodeSvg(text: string): Promise<string> {
  if (!text || !text.trim()) {
    return '';
  }

  try {
    const svg = await QRCode.toString(text.trim(), {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 180,
      color: {
        dark: '#002C50',
        light: '#FFFFFF',
      },
    });
    return svg;
  } catch (error) {
    console.error('Erreur lors de la génération du QR Code SVG:', error);
    return '';
  }
}

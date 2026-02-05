import { QRCodeStylingOptions } from '../types/qrcode';

export const extraRoundedDotExtension = (svg: SVGSVGElement, options: QRCodeStylingOptions) => {
  if (options.cornersDotOptions?.type !== 'extra-rounded') {
    return;
  }

  try {
    const dotColor = options.cornersDotOptions?.color || options.dotsOptions?.color || '#000000';
    const width = options.width || 300;
    const margin = options.margin || 0;
    const qrSize = width - (margin * 2);

    // Encontrar todos os elementos que compõem os miolos
    // Na biblioteca 1.9.2, os miolos são desenhados como paths individuais
    // dentro de clipPaths específicos

    // Procurar clipPaths de corners-dot
    const clipPaths = svg.querySelectorAll('clipPath[id*="corners-dot"]');

    clipPaths.forEach((clipPath) => {
      const children = Array.from(clipPath.children);
      if (children.length === 0) return;

      // Calcular bounding box de todos os elementos
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

      children.forEach((child) => {
        try {
          // Tentar obter o bbox do elemento
          const bbox = (child as SVGGraphicsElement).getBBox();
          if (bbox && bbox.width > 0 && bbox.height > 0) {
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x + bbox.width);
            maxY = Math.max(maxY, bbox.y + bbox.height);
          }
        } catch (e) {
          // Fallback: tentar ler atributos diretamente
          if (child.tagName === 'rect') {
            const x = parseFloat(child.getAttribute('x') || '0');
            const y = parseFloat(child.getAttribute('y') || '0');
            const w = parseFloat(child.getAttribute('width') || '0');
            const h = parseFloat(child.getAttribute('height') || '0');
            if (w > 0 && h > 0) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x + w);
              maxY = Math.max(maxY, y + h);
            }
          } else if (child.tagName === 'circle') {
            const cx = parseFloat(child.getAttribute('cx') || '0');
            const cy = parseFloat(child.getAttribute('cy') || '0');
            const r = parseFloat(child.getAttribute('r') || '0');
            if (r > 0) {
              minX = Math.min(minX, cx - r);
              minY = Math.min(minY, cy - r);
              maxX = Math.max(maxX, cx + r);
              maxY = Math.max(maxY, cy + r);
            }
          }
        }
      });

      // Se encontramos uma área válida
      if (minX !== Infinity && maxX > minX) {
        const totalWidth = maxX - minX;
        const totalHeight = maxY - minY;

        // Criar um único rect arredondado
        const newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        newRect.setAttribute('x', String(minX));
        newRect.setAttribute('y', String(minY));
        newRect.setAttribute('width', String(totalWidth));
        newRect.setAttribute('height', String(totalHeight));
        // Usar rx/ry grandes para ficar bem arredondado
        const radius = Math.min(totalWidth, totalHeight) * 0.45;
        newRect.setAttribute('rx', String(radius));
        newRect.setAttribute('ry', String(radius));

        // Remover todos os elementos originais
        children.forEach(child => child.remove());

        // Adicionar o novo rect
        clipPath.appendChild(newRect);
      }
    });

    // SOLUÇÃO ALTERNATIVA: Se a abordagem acima não funcionar,
    // vamos desenhar os miolos diretamente no SVG fora dos clipPaths
    // e esconder os originais

    // Encontrar os rects de cornersSquare para posicionar os miolos
    const cornerRects = svg.querySelectorAll('rect[clip-path*="corners-square"]');
    if (cornerRects.length >= 3) {
      cornerRects.forEach((cornerRect, index) => {
        if (index >= 3) return; // Só os 3 primeiros olhos

        const x = parseFloat(cornerRect.getAttribute('x') || '0');
        const y = parseFloat(cornerRect.getAttribute('y') || '0');
        const w = parseFloat(cornerRect.getAttribute('width') || '0');
        const h = parseFloat(cornerRect.getAttribute('height') || '0');

        if (w > 0 && h > 0) {
          // Calcular posição e tamanho do miolo (cerca de 40% do tamanho da borda)
          const dotSize = w * 0.4;
          const dotX = x + (w - dotSize) / 2;
          const dotY = y + (h - dotSize) / 2;
          const radius = dotSize * 0.4;

          // Criar o miolo arredondado
          const dotRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          dotRect.setAttribute('x', String(dotX));
          dotRect.setAttribute('y', String(dotY));
          dotRect.setAttribute('width', String(dotSize));
          dotRect.setAttribute('height', String(dotSize));
          dotRect.setAttribute('rx', String(radius));
          dotRect.setAttribute('ry', String(radius));
          dotRect.setAttribute('fill', dotColor);
          // Sem clip-path, desenhado diretamente

          // Adicionar ao SVG
          svg.appendChild(dotRect);
        }
      });
    }

  } catch (error) {
    console.error('Erro na extensão extraRoundedDotExtension:', error);
  }
};

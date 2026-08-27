import { Injectable } from '@nestjs/common';

export type UrlRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface UrlAnalysisResult {
  url: string;
  riskLevel: UrlRiskLevel;
  score: number;
  signals: string[];
  recommendations: string[];
  domain: string | null;
  protocol: string | null;
}

@Injectable()
export class UrlAnalyzerService {
  analyze(url: string): UrlAnalysisResult {
    const signals: string[] = [];
    const recommendations: string[] = [];

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(url);
    } catch {
      return {
        url,
        riskLevel: 'HIGH',
        score: 90,
        signals: ['La URL no tiene un formato válido.'],
        recommendations: ['No abras el enlace hasta verificar su origen.'],
        domain: null,
        protocol: null,
      };
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    const protocol = parsedUrl.protocol.toLowerCase();

    let score = 0;

    // 1. HTTP sin cifrado
    if (protocol === 'http:') {
      score += 20;

      signals.push('El enlace utiliza HTTP en lugar de HTTPS.');

      recommendations.push(
        'Verifica que el sitio utilice HTTPS antes de ingresar información.',
      );
    }

    // 2. Uso de IP en lugar de dominio
    const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    if (isIpAddress) {
      score += 25;

      signals.push(
        'El enlace utiliza una dirección IP directamente en lugar de un dominio.',
      );

      recommendations.push(
        'Verifica cuidadosamente el origen del enlace antes de abrirlo.',
      );
    }

    // 3. Dominio con muchos subdominios
    const subdomainCount = hostname.split('.').length - 2;

    if (subdomainCount >= 3) {
      score += 15;

      signals.push('El dominio contiene una cantidad inusual de subdominios.');

      recommendations.push(
        'Revisa cuidadosamente el dominio principal antes de continuar.',
      );
    }

    // 4. Uso de @ en la URL
    if (parsedUrl.username || parsedUrl.password) {
      score += 30;

      signals.push(
        'La URL contiene información antes del dominio mediante el símbolo @.',
      );

      recommendations.push(
        'No abras el enlace hasta confirmar el dominio real.',
      );
    }

    // 5. Hostname con caracteres sospechosos
    if (hostname.includes('--')) {
      score += 10;

      signals.push(
        'El dominio contiene patrones que pueden requerir revisión.',
      );
    }

    // 6. Parámetros sensibles comunes
    const suspiciousParameters = [
      'redirect',
      'redirect_url',
      'redirect_uri',
      'return',
      'return_url',
      'next',
      'url',
      'target',
    ];

    const parameterNames = Array.from(parsedUrl.searchParams.keys()).map(
      (parameter) => parameter.toLowerCase(),
    );

    const hasRedirectParameter = suspiciousParameters.some((parameter) =>
      parameterNames.includes(parameter),
    );

    if (hasRedirectParameter) {
      score += 15;

      signals.push(
        'La URL contiene un parámetro que puede utilizarse para redirecciones.',
      );

      recommendations.push(
        'Verifica el destino final del enlace antes de abrirlo.',
      );
    }

    score = Math.min(score, 100);

    let riskLevel: UrlRiskLevel = 'LOW';

    if (score >= 60) {
      riskLevel = 'HIGH';
    } else if (score >= 30) {
      riskLevel = 'MEDIUM';
    }

    return {
      url,
      riskLevel,
      score,
      signals,
      recommendations,
      domain: hostname,
      protocol,
    };
  }
}

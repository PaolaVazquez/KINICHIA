import { Injectable } from '@nestjs/common';

import type { AnalysisContext } from '../types/analysis-context.type';
import type { AnalysisResult } from '../interfaces/analysis-result.interface';
import type { AnalysisEngine } from '../interfaces/analysis-engine.interface';

import type { FraudSignal } from '../interfaces/fraud-signal.interface';
@Injectable()
export class RuleBasedAnalyzer implements AnalysisEngine {
  async analyze(context: AnalysisContext): Promise<AnalysisResult> {
    const text = context.messages
      .map((message) => message.content)
      .join(' ')
      .toLowerCase();

    let score = 0;
    const signals: FraudSignal[] = [];

    if (
      /contraseña|password|otp|token|código de verificación|codigo de verificacion|código.{0,30}(llegó|llego|recibiste|recibir|enviar|envia)/i.test(
        text,
      )
    ) {
      score += 40;

      signals.push({
        type: 'CREDENTIAL_REQUEST',
        severity: 'HIGH',
        score: 40,
        evidence:
          'Se detectó una posible solicitud de credenciales o códigos de verificación.',
        recommendation:
          'No compartir contraseñas, códigos OTP ni tokens de autenticación.',
      });
    }

    if (
      /transferencia|depósito|deposito|cuenta bancaria|datos bancarios|número de cuenta|numero de cuenta/i.test(
        text,
      )
    ) {
      score += 25;

      signals.push({
        type: 'PAYMENT_REQUEST',
        severity: 'MEDIUM',
        score: 25,
        evidence:
          'Se detectó una posible solicitud relacionada con pagos o información bancaria.',
        recommendation:
          'Verificar la identidad del solicitante antes de realizar cualquier pago.',
      });
    }

    if (/https?:\/\/|www\./i.test(text)) {
      score += 20;

      signals.push({
        type: 'SUSPICIOUS_LINK',
        severity: 'MEDIUM',
        score: 20,
        evidence: 'Se detectó un enlace dentro de la conversación.',
        recommendation: 'Verificar el destino del enlace antes de abrirlo.',
      });
    }

    if (
      /urgente|urgencia|inmediatamente|ahora mismo|lo antes posible/i.test(text)
    ) {
      score += 10;

      signals.push({
        type: 'URGENCY',
        severity: 'LOW',
        score: 10,
        evidence:
          'Se detectó lenguaje asociado con urgencia o presión de tiempo.',
        recommendation: 'Verificar la solicitud antes de actuar bajo presión.',
      });
    }

    const normalizedScore = Math.min(score, 100);

    let riskLevel: AnalysisResult['riskLevel'] = 'LOW';

    if (normalizedScore >= 70) {
      riskLevel = 'HIGH';
    } else if (normalizedScore >= 30) {
      riskLevel = 'MEDIUM';
    }

    const summary =
      signals.length === 0
        ? 'No se detectaron señales de riesgo mediante las reglas actuales.'
        : `Se detectaron ${signals.length} señal(es) que requieren revisión.`;

    return {
      riskLevel,
      score: normalizedScore,
      summary,
      signals,
    };
  }
}

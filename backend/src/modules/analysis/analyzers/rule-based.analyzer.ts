import { Injectable } from '@nestjs/common';

import type { AnalysisContext } from '../types/analysis-context.type';
import type { AnalysisResult } from '../interfaces/analysis-result.interface';
import type { AnalysisEngine } from '../interfaces/analysis-engine.interface';

import type { FraudSignal } from '../interfaces/fraud-signal.interface';
@Injectable()
export class RuleBasedAnalyzer implements AnalysisEngine {
  // eslint-disable-next-line @typescript-eslint/require-await
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

    if (
      /comprobante|comprobante de pago|comprobante bancario|transferencia realizada|ya quedó pagado|ya quedo pagado|ya hice el pago|folio de rastreo/i.test(
        text,
      )
    ) {
      score += 30;

      signals.push({
        type: 'PAYMENT_PROOF',
        severity: 'MEDIUM',
        score: 30,
        evidence:
          'Se detectó una referencia a un comprobante o confirmación de pago.',
        recommendation:
          'Verificar que el pago esté acreditado directamente en la cuenta antes de entregar productos o servicios.',
      });
    }

    if (
      /chofer de uber|chofer de didi|uber|didi|recoger.*estacionamiento|estacionamiento.*recoger/i.test(
        text,
      ) &&
      /entrega|entregar|recoger|domicilio|dirección|direccion/i.test(text)
    ) {
      score += 35;

      signals.push({
        type: 'IRREGULAR_DELIVERY',
        severity: 'HIGH',
        score: 35,
        evidence:
          'Se detectó una solicitud de entrega mediante un tercero o en un punto distinto al domicilio registrado.',
        recommendation:
          'Verificar la identidad del comprador y confirmar el domicilio de entrega antes de liberar el pedido.',
      });
    }

    const thirdPartyPayment =
      /tarjeta.*(socio|otra persona|jefe|director|titular)|socio.*(tarjeta|pago)|pago.*(en nombre de|por cuenta de)|en nombre de.*(compra|pago)|tarjeta.*(empresa|corporativa)/i.test(
        text,
      );

    const irregularPaymentContext =
      /fuera del país|fuera del pais|otra dirección|otra direccion|dirección diferente|direccion diferente|chofer|uber|didi|estacionamiento|recoger.*(producto|pedido)|entregar.*(tercero)|tercero.*(entrega|recoger)/i.test(
        text,
      );

    if (thirdPartyPayment && irregularPaymentContext) {
      score += 30;

      signals.push({
        type: 'THIRD_PARTY_PAYMENT',
        severity: 'HIGH',
        score: 30,
        evidence:
          'Se detectó un pago realizado por un tercero acompañado de circunstancias irregulares en la entrega o gestión del pedido.',
        recommendation:
          'Verificar la identidad del comprador, del titular del medio de pago y las condiciones de entrega antes de liberar el pedido.',
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
      /urgente|urgencia|me urge|inmediatamente|ahora mismo|lo antes posible/i.test(
        text,
      )
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
    if (
      /suspensión|suspender|suspendida|infracción|infraccion|derechos de autor|verificación de propiedad|verificar propiedad|cuenta comercial|soporte meta|administrador/i.test(
        text,
      ) &&
      /código|codigo|autenticación|autenticacion|otp|sms/i.test(text)
    ) {
      score += 40;

      signals.push({
        type: 'ACCOUNT_IMPERSONATION',
        severity: 'HIGH',
        score: 40,
        evidence:
          'Se detectó un posible intento de suplantación de soporte para obtener acceso o códigos de autenticación.',
        recommendation:
          'No compartir códigos de autenticación. Verificar el contacto directamente mediante los canales oficiales de la plataforma.',
      });
    }
    if (
      /pagué de más|pague de más|transferí de más|transferi de más|me equivoqué|me equivoque|se equivocó|se equivoco|error de mi contador|error de contabilidad|sobrepago|sobrepago/i.test(
        text,
      ) &&
      /devuelve|devuélveme|devuelveme|regresa|regresando|devolución|devolucion|reembolso|diferencia/i.test(
        text,
      )
    ) {
      score += 40;

      signals.push({
        type: 'SUSPICIOUS_REFUND',
        severity: 'HIGH',
        score: 40,
        evidence:
          'Se detectó un posible sobrepago acompañado de una solicitud de devolución de dinero.',
        recommendation:
          'No devolver fondos hasta confirmar el depósito directamente con la institución financiera y verificar al solicitante.',
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

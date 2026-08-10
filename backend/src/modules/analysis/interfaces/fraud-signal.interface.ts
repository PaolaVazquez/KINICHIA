export type FraudSignalType =
  | 'CREDENTIAL_REQUEST'
  | 'PAYMENT_REQUEST'
  | 'SUSPICIOUS_LINK'
  | 'URGENCY'
  | 'CONCEALMENT';

export type FraudSignalSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FraudSignal {
  type: FraudSignalType;
  severity: FraudSignalSeverity;
  score: number;
  evidence: string;
  recommendation: string;
}

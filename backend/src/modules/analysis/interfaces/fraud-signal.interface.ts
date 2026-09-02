export type FraudSignalType =
  | 'CREDENTIAL_REQUEST'
  | 'PAYMENT_REQUEST'
  | 'SUSPICIOUS_LINK'
  | 'URGENCY'
  | 'ACCOUNT_IMPERSONATION'
  | 'SUSPICIOUS_REFUND'
  | 'CONCEALMENT'
  | 'PAYMENT_PROOF'
  | 'IRREGULAR_DELIVERY'
  | 'THIRD_PARTY_PAYMENT';

export type FraudSignalSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FraudSignal {
  type: FraudSignalType;
  severity: FraudSignalSeverity;
  score: number;
  evidence: string;
  recommendation: string;
}

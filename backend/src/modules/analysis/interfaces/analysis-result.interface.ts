import type { FraudSignal } from './fraud-signal.interface';

export interface AnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  summary: string;
  signals: FraudSignal[];
  provider?: string;
  modelName?: string;
  engineVersion?: string;
}
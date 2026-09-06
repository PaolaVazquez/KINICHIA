import type { FraudSignal } from './fraud-signal.interface';

export interface AnalysisUsage {
  promptTokenCount?: number;
  candidatesTokenCount?: number;
  thoughtsTokenCount?: number;
  totalTokenCount?: number;
}

export interface AnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  summary: string;
  signals: FraudSignal[];
  recommendations?: string[];
  provider?: string;
  modelName?: string;
  engineVersion?: string;
  usage?: AnalysisUsage;
}

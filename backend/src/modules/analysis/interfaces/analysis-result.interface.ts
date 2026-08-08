export interface AnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';

  score: number;

  summary: string;

  reasons: string[];

  recommendations: string[];
}

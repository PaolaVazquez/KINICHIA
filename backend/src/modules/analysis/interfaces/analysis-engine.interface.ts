import type { AnalysisContext } from '../types/analysis-context.type';
import type { AnalysisResult } from './analysis-result.interface';

export interface AnalysisEngine {
  analyze(context: AnalysisContext): Promise<AnalysisResult>;
}

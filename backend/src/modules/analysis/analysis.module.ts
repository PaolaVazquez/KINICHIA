import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { RuleBasedAnalyzer } from './analyzers/rule-based.analyzer';
import { KinichiaGeminiAnalyzer } from './analyzers/kinichia-gemini.analyzer';

@Module({
  providers: [AnalysisService, RuleBasedAnalyzer, KinichiaGeminiAnalyzer],
  controllers: [AnalysisController],
  exports: [AnalysisService],
})
export class AnalysisModule {}

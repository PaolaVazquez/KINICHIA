import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { RuleBasedAnalyzer } from './analyzers/rule-based.analyzer';

@Module({
  providers: [AnalysisService, RuleBasedAnalyzer],
  controllers: [AnalysisController],
  exports: [AnalysisService],
})
export class AnalysisModule {}

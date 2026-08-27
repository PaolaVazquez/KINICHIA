import { Module } from '@nestjs/common';

import { UrlAnalysisController } from './url-analysis.controller';
import { UrlExtractorService } from './url-extractor.service';
import { UrlAnalyzerService } from './url-analyzer.service';

@Module({
  controllers: [UrlAnalysisController],
  providers: [UrlExtractorService, UrlAnalyzerService],
  exports: [UrlExtractorService, UrlAnalyzerService],
})
export class UrlAnalysisModule {}

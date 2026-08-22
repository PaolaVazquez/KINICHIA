import { Module } from '@nestjs/common';
import { UrlExtractorService } from './url-extractor.service';
import { UrlAnalysisController } from './url-analysis.controller';

@Module({
  controllers: [UrlAnalysisController],
  providers: [UrlExtractorService],
  exports: [UrlExtractorService],
})
export class UrlAnalysisModule {}

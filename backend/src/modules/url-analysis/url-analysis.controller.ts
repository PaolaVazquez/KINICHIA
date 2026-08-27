import { Body, Controller, Post } from '@nestjs/common';

import { UrlAnalyzerService } from './url-analyzer.service';
import { UrlExtractorService } from './url-extractor.service';

import { ExtractUrlDto } from './dto/extract-url.dto';

@Controller('url-analysis')
export class UrlAnalysisController {
  constructor(
    private readonly urlExtractorService: UrlExtractorService,
    private readonly urlAnalyzerService: UrlAnalyzerService,
  ) {}

  @Post('extract')
  extractUrls(@Body() body: ExtractUrlDto) {
    return {
      content: body.content,
      urls: this.urlExtractorService.extractUrls(body.content),
    };
  }

  @Post('analyze')
  analyzeUrl(@Body() body: ExtractUrlDto) {
    const urls = this.urlExtractorService.extractUrls(body.content);

    return {
      results: urls.map((url) => this.urlAnalyzerService.analyze(url)),
    };
  }
}

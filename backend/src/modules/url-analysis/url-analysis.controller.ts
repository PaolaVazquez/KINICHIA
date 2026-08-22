import { Body, Controller, Post } from '@nestjs/common';
import { UrlExtractorService } from './url-extractor.service';
import { ExtractUrlDto } from './dto/extract-url.dto';

@Controller('url-analysis')
export class UrlAnalysisController {
  constructor(private readonly urlExtractorService: UrlExtractorService) {}

  @Post('extract')
  extractUrls(@Body() body: ExtractUrlDto) {
    return {
      content: body.content,
      urls: this.urlExtractorService.extractUrls(body.content),
    };
  }
}

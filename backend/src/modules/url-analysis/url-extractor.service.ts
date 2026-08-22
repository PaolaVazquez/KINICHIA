import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlExtractorService {
  private readonly urlRegex = /https?:\/\/[^\s<>"'`]+/gi;

  extractUrls(content: string): string[] {
    if (!content) {
      return [];
    }

    const matches = content.match(this.urlRegex);

    if (!matches) {
      return [];
    }

    return matches.map((url: string) => url.replace(/[.,!?;:]+$/, ''));
  }
}

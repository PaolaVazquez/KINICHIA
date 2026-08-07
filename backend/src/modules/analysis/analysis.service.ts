import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisService {
  scheduleAnalysis(conversationId: string) {
    console.log(
      `🧠 Programando análisis para la conversación ${conversationId}`,
    );
  }
}

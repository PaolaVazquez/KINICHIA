import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import type { AnalysisContext } from './types/analysis-context.type';

import type { AnalysisResult } from './interfaces/analysis-result.interface';
import { RuleBasedAnalyzer } from './analyzers/rule-based.analyzer';

@Injectable()
export class AnalysisService {
  private pendingAnalyses = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly analyzer: RuleBasedAnalyzer,
  ) {}

  scheduleAnalysis(conversationId: string) {
    const existingTimer = this.pendingAnalyses.get(conversationId);

    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      void this.analyzeConversation(conversationId);
    }, 10_000);

    this.pendingAnalyses.set(conversationId, timer);
  }

  private async analyzeConversation(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            sentAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      console.log(`⚠️ No se encontró la conversación ${conversationId}`);

      this.pendingAnalyses.delete(conversationId);

      return;
    }

    console.log(`🧠 Conversación recuperada: ${conversation.id}`);

    console.log(`💬 Mensajes: ${conversation.messages.length}`);

    this.pendingAnalyses.delete(conversationId);

    const context = this.buildAnalysisContext(conversation);

    const result = await this.analyzer.analyze(context);

    console.log('🛡️ Resultado del análisis:', result);

    await this.prisma.analysis.create({
      data: {
        conversationId: conversation.id,
        riskLevel: result.riskLevel,
        score: result.score,
        summary: result.summary,
        reasons: result.signals.map((signal) => signal.evidence),
        recommendations: result.signals.map((signal) => signal.recommendation),
        provider: 'MOCK',
        modelName: 'mock-analysis',
        engineVersion: '1.0.0',
      },
    });

    await this.prisma.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        lastAnalyzedAt: new Date(),
      },
    });
  }
  private buildAnalysisContext(conversation: {
    source: string;
    contactName: string | null;
    contactIdentifier: string;
    messages: {
      sender: string;
      content: string;
      sentAt: Date;
    }[];
  }): AnalysisContext {
    return {
      source: conversation.source,
      contactName: conversation.contactName,
      contactIdentifier: conversation.contactIdentifier,
      messages: conversation.messages.map((message) => ({
        sender: message.sender,
        content: message.content,
        sentAt: message.sentAt,
      })),
    };
  }
}

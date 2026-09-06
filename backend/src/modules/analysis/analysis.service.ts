import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';
import type { AnalysisContext } from './types/analysis-context.type';
import { RuleBasedAnalyzer } from './analyzers/rule-based.analyzer';
import { KinichiaGeminiAnalyzer } from './analyzers/kinichia-gemini.analyzer';

import { AnalysisResult } from './interfaces/analysis-result.interface';

@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);
  private pendingAnalyses = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly ruleAnalyzer: RuleBasedAnalyzer,
    private readonly geminiAnalyzer: KinichiaGeminiAnalyzer,
  ) {}

  scheduleAnalysis(conversationId: string) {
    const existingTimer = this.pendingAnalyses.get(conversationId);
    if (existingTimer) clearTimeout(existingTimer);
    const timer = setTimeout(() => {
      void this.analyzeConversation(conversationId);
    }, 10_000);
    this.pendingAnalyses.set(conversationId, timer);
  }

  private async analyzeConversation(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: { orderBy: { sentAt: 'asc' } } },
    });
    if (!conversation) {
      this.logger.warn(`No se encontró la conversación ${conversationId}`);
      this.pendingAnalyses.delete(conversationId);
      return;
    }

    this.pendingAnalyses.delete(conversationId);
    const context = this.buildAnalysisContext(conversation);
    let result: AnalysisResult;
    try {
      result = await this.geminiAnalyzer.analyze(context);
    } catch (error) {
      this.logger.error(
        'Gemini no pudo completar el análisis. Usando motor de respaldo.',
        error instanceof Error ? error.stack : undefined,
      );
      result = await this.ruleAnalyzer.analyze(context);
    }

    await this.prisma.analysis.create({
      data: {
        conversationId: conversation.id,
        riskLevel: result.riskLevel,
        score: result.score,
        summary: result.summary,
        reasons: result.signals as unknown as Prisma.InputJsonValue,
        recommendations:
          result.recommendations ??
          result.signals.map((signal) => signal.recommendation),
        provider: result.provider ?? 'RULE_BASED',
        modelName: result.modelName ?? 'rule-based',
        engineVersion: result.engineVersion ?? '1.0.0',
        promptTokenCount: result.usage?.promptTokenCount ?? null,
        candidatesTokenCount: result.usage?.candidatesTokenCount ?? null,
        thoughtsTokenCount: result.usage?.thoughtsTokenCount ?? null,
        totalTokenCount: result.usage?.totalTokenCount ?? null,
        analyzedAt: new Date(),
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastAnalyzedAt: new Date() },
    });
    this.logger.log(
      `Análisis ${conversation.id}: ${result.riskLevel} (${result.score})` +
        (result.usage
          ? ` | tokens: ${result.usage.totalTokenCount ?? 0}`
          : ''),
    );
  }

  private buildAnalysisContext(conversation: {
    source: string;
    contactName: string | null;
    contactIdentifier: string;
    messages: { sender: string; content: string; sentAt: Date }[];
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

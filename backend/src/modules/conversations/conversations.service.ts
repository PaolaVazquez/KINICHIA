import { Injectable, NotFoundException } from '@nestjs/common';

import { ImportConversationDto } from './dto/import-conversation.dto';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../../database/prisma.service';
import { AnalysisService } from '../analysis/analysis.service';
import { UrlExtractorService } from '../url-analysis/url-extractor.service';

import { UrlAnalyzerService } from '../url-analysis/url-analyzer.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analysisService: AnalysisService,
    private readonly urlExtractorService: UrlExtractorService,
    private readonly urlAnalyzerService: UrlAnalyzerService,
  ) {}
  async importConversation(user: JwtPayload, dto: ImportConversationDto) {
    let conversation = await this.prisma.conversation.findFirst({
      where: {
        companyId: user.companyId,
        source: dto.source,
        contactIdentifier: dto.contactIdentifier,
      },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          companyId: user.companyId,
          source: dto.source,
          contactName: dto.contactName,
          contactIdentifier: dto.contactIdentifier,
        },
      });
    }
    for (const message of dto.messages) {
      await this.prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: message.sender,
          content: message.content,
          sentAt: message.sentAt ? new Date(message.sentAt) : new Date(),
        },
      });
    }
    const lastMessage = dto.messages.at(-1);

    await this.prisma.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        lastMessageAt: lastMessage?.sentAt
          ? new Date(lastMessage.sentAt)
          : new Date(),
      },
    });
    this.analysisService.scheduleAnalysis(conversation.id);

    return {
      message: 'Conversación preparada correctamente.',
      conversation,
    };
  }

  async findAll(user: JwtPayload, search?: string, filter?: string) {
    const normalizedSearch = search?.trim();

    const conversations = await this.prisma.conversation.findMany({
      where: {
        companyId: user.companyId,

        ...(filter === 'threats'
          ? {
              analysis: {
                some: {
                  riskLevel: 'HIGH',
                },
              },
            }
          : {}),

        ...(normalizedSearch
          ? {
              OR: [
                {
                  contactName: {
                    contains: normalizedSearch,
                    mode: 'insensitive',
                  },
                },
                {
                  contactIdentifier: {
                    contains: normalizedSearch,
                    mode: 'insensitive',
                  },
                },
                {
                  messages: {
                    some: {
                      content: {
                        contains: normalizedSearch,
                        mode: 'insensitive',
                      },
                    },
                  },
                },
              ],
            }
          : {}),
      },

      include: {
        messages: {
          orderBy: {
            sentAt: 'desc',
          },
          take: 1,
        },
      },

      orderBy: {
        lastMessageAt: 'desc',
      },
    });

    // Si no estamos buscando, devolvemos la respuesta normal.
    if (!normalizedSearch) {
      return conversations.map((conversation) => ({
        id: conversation.id,
        companyId: conversation.companyId,
        source: conversation.source,
        contactName: conversation.contactName,
        contactIdentifier: conversation.contactIdentifier,
        status: conversation.status,
        lastMessageAt: conversation.lastMessageAt,
        lastAnalyzedAt: conversation.lastAnalyzedAt,
        lastMessage: conversation.messages[0]?.content ?? null,
        searchMatches: [],
      }));
    }

    // Buscamos hasta 5 mensajes que coincidan
    // dentro de cada conversación encontrada.
    const conversationsWithMatches = await Promise.all(
      conversations.map(async (conversation) => {
        const searchMatches = await this.prisma.message.findMany({
          where: {
            conversationId: conversation.id,
            content: {
              contains: normalizedSearch,
              mode: 'insensitive',
            },
          },
          orderBy: {
            sentAt: 'desc',
          },
          take: 5,
          select: {
            id: true,
            content: true,
            sender: true,
            sentAt: true,
          },
        });

        return {
          id: conversation.id,
          companyId: conversation.companyId,
          source: conversation.source,
          contactName: conversation.contactName,
          contactIdentifier: conversation.contactIdentifier,
          status: conversation.status,
          lastMessageAt: conversation.lastMessageAt,
          lastAnalyzedAt: conversation.lastAnalyzedAt,
          lastMessage: conversation.messages[0]?.content ?? null,
          searchMatches,
        };
      }),
    );

    return conversationsWithMatches;
  }

  async findOne(id: string, user: JwtPayload) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id,
        companyId: user.companyId,
      },
      include: {
        messages: {
          orderBy: {
            sentAt: 'asc',
          },
        },
        analysis: true,
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversación no encontrada.');
    }

    return {
      ...conversation,
      messages: conversation.messages.map((message) => {
        const urls = this.urlExtractorService.extractUrls(message.content);

        return {
          ...message,
          urls,
          urlAnalysis: urls.map((url) => this.urlAnalyzerService.analyze(url)),
        };
      }),
    };
  }
}

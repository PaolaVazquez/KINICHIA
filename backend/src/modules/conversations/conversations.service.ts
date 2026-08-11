import { Injectable, NotFoundException } from '@nestjs/common';

import { ImportConversationDto } from './dto/import-conversation.dto';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../../database/prisma.service';
import { AnalysisService } from '../analysis/analysis.service';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly analysisService: AnalysisService,
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

  async findAll(user: JwtPayload) {
    return this.prisma.conversation.findMany({
      where: {
        companyId: user.companyId,
      },
      orderBy: {
        lastMessageAt: 'desc',
      },
    });
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

    return conversation;
  }
}

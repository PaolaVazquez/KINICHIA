import { Injectable } from '@nestjs/common';

import { ImportConversationDto } from './dto/import-conversation.dto';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}
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

    return {
      message: 'Conversación preparada correctamente.',
      conversation,
    };
  }
}

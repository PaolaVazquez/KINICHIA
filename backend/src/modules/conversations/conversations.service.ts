import { Injectable } from '@nestjs/common';

import { ImportConversationDto } from './dto/import-conversation.dto';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class ConversationsService {
  importConversation(user: JwtPayload, dto: ImportConversationDto) {
    return {
      message: 'Conversación recibida correctamente.',
      companyId: user.companyId,
      data: dto,
    };
  }
}

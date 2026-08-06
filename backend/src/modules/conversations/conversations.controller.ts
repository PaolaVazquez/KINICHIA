import { Body, Controller, Post } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { ImportConversationDto } from './dto/import-conversation.dto';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('import')
  @UseGuards(JwtAuthGuard)
  importConversation(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ImportConversationDto,
  ) {
    return this.conversationsService.importConversation(user, dto);
  }
}

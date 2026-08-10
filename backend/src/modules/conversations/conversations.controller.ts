import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { ImportConversationDto } from './dto/import-conversation.dto';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('import')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  importConversation(
    @CurrentUser() user: JwtPayload,
    @Body() dto: ImportConversationDto,
  ) {
    return this.conversationsService.importConversation(user, dto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  getConversations(@CurrentUser() user: JwtPayload) {
    return this.conversationsService.findAll(user);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  getConversation(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.conversationsService.findOne(id, user);
  }
}

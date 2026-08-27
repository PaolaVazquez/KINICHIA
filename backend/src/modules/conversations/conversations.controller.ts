import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { ImportConversationDto } from './dto/import-conversation.dto';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Busca por nombre, número o contenido de los mensajes',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filtra las conversaciones por estado o nivel de riesgo',
  })
  @UseGuards(JwtAuthGuard)
  getConversations(
    @CurrentUser() user: JwtPayload,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ) {
    return this.conversationsService.findAll(user, search, filter);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  getConversation(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.conversationsService.findOne(id, user);
  }
}

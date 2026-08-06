import {
  IsArray,
  IsEnum,
  IsOptional,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum ConversationSource {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  CALL = 'CALL',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
}

enum MessageSender {
  CLIENT = 'CLIENT',
  COMPANY = 'COMPANY',
}

class ImportMessageDto {
  @IsEnum(MessageSender)
  sender!: MessageSender;

  @IsString()
  content!: string;

  @IsOptional()
  @IsDateString()
  sentAt?: string;
}

export class ImportConversationDto {
  @IsEnum(ConversationSource)
  source!: ConversationSource;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsString()
  contactIdentifier!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportMessageDto)
  messages!: ImportMessageDto[];
}

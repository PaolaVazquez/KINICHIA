import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { AnalysisModule } from '../analysis/analysis.module';
import { UrlAnalysisModule } from '../url-analysis/url-analysis.module';

@Module({
  imports: [AnalysisModule, UrlAnalysisModule],
  providers: [ConversationsService],
  controllers: [ConversationsController],
})
export class ConversationsModule {}

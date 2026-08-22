import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { AnalysisModule } from './modules/analysis/analysis.module';

import { UrlAnalysisModule } from './modules/url-analysis/url-analysis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    DatabaseModule,

    CompaniesModule,

    UsersModule,

    AuthModule,

    RolesModule,

    ConversationsModule,

    AnalysisModule,

    UrlAnalysisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

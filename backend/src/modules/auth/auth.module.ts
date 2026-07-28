import { Module } from '@nestjs/common';

import { CompaniesModule } from '../companies/companies.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [CompaniesModule, UsersModule, RolesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CompaniesModule } from '../companies/companies.module';
import { RolesModule } from '../roles/roles.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CompaniesModule,
    UsersModule,
    RolesModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { PrismaClientOrTransaction } from '../../shared/types/prisma-client';

import { CreateUserData } from '../../shared/types/user.types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string, db: PrismaClientOrTransaction = this.prisma) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }

  create(data: CreateUserData, db: PrismaClientOrTransaction = this.prisma) {
    return db.user.create({
      data,
    });
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { PrismaClientOrTransaction } from '../../shared/types/prisma-client';

import { CreateCompanyData } from '../../shared/types/company.types';
@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string, db: PrismaClientOrTransaction = this.prisma) {
    return db.company.findUnique({
      where: {
        email,
      },
    });
  }

  create(data: CreateCompanyData, db: PrismaClientOrTransaction = this.prisma) {
    return db.company.create({
      data,
    });
  }
}

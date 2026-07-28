import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';
import { PrismaClientOrTransaction } from '../../shared/types/prisma-client';

import { RoleFilters } from '../../shared/types/role.types';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(filters: RoleFilters, db: PrismaClientOrTransaction = this.prisma) {
    return db.role.findFirst({
      where: filters,
    });
  }
}

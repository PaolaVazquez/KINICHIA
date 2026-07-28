import { Injectable } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';

import { ConflictException, NotFoundException } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { PrismaService } from 'src/database/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}
  async register(dto: RegisterDto) {
    const company = await this.companiesService.findByEmail(dto.companyEmail);

    if (company) {
      throw new ConflictException(
        'Ya existe una empresa registrada con ese correo.',
      );
    }
    const user = await this.usersService.findByEmail(dto.email);

    if (user) {
      throw new ConflictException(
        'Ya existe un usuario registrado con ese correo.',
      );
    }
    const ownerRole = await this.rolesService.findOne({
      name: 'OWNER',
    });
    if (!ownerRole) {
      throw new NotFoundException('No existe el rol OWNER.');
    }
    return this.prisma.$transaction(async (db) => {
      const company = await this.companiesService.create(
        {
          name: dto.companyName,
          email: dto.companyEmail,
        },
        db,
      );
      const hashedPassword = await bcrypt.hash(dto.password, 12);
      const user = await this.usersService.create(
        {
          companyId: company.id,
          roleId: ownerRole.id,
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
        db,
      );

      return company;
    });
  }
}

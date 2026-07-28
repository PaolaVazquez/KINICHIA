import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = [
    {
      name: 'OWNER',
      description: 'Propietario de la empresa',
    },
    {
      name: 'ADMIN',
      description: 'Administrador de la empresa',
    },
    {
      name: 'USER',
      description: 'Usuario de la empresa',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }

  console.log('✅ Roles creados');
}

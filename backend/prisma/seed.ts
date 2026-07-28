import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/role.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  await seedRoles();

  console.log('✅ Seed finalizado');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

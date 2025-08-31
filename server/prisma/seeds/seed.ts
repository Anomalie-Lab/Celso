import { PrismaClient } from '@prisma/client';
import { seedRoles } from './roles.seed';
import { seedProducts } from './products.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeds...');

  try {
    // Seed de roles
    await seedRoles();

    // Seed de produtos
    await seedProducts();

    console.log('✅ Todos os seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante execução dos seeds:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
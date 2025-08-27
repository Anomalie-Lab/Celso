import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedRoles = async () => {
  await prisma.role.createMany({
    data: [{ name: "ADMIN" }, { name: "USER" }],
    skipDuplicates: true,
  });

  const adminRole = await prisma.role.findFirst({ where: { name: 'ADMIN' } });
  if (adminRole) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
      where: { email: 'admin@admin.com' },
      update: {},
      create: {
        fullname: 'Admin',
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role_id: adminRole.id,
        enable_2fa: false,
      }
    });
  }
};
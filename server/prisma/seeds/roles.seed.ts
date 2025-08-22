import { PrismaClient } from "@prisma/client";
import { RoleEnum } from "@prisma/client";
const prisma = new PrismaClient();

export const seedRoles = async () => {
  await prisma.role.createMany({
    data: [{ name: RoleEnum.ADMIN }, { name: RoleEnum.USER }],
  });
};
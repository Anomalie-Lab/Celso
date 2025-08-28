import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: { select: { id: true, fullname: true, avatar: true } },
          },
        },
      },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { brand: { contains: query } },
          { description: { contains: query } },
        ],
      },
      orderBy: { created_at: "desc" },
    });
  }

  async findDiscountedProducts() {
    return this.prisma.product.findMany({
      where: {
        AND: [
          { last_price: { gt: 0 } },
          { stock: { gt: 0 } },
        ],
      },
      orderBy: { created_at: "desc" },
      take: 10,
    });
  }

  async findBestSellers() {
    return this.prisma.product.findMany({
      orderBy: { created_at: "desc" },
      take: 10,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { created_at: "desc" },
    });
  }
}

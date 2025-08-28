import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: { select: { id: true, fullname: true, avatar: true } },
          },
        },
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return product;
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
      orderBy: { created_at: 'desc' },
    });
  }

  async findDiscountedProducts() {
    return this.prisma.product.findMany({
      where: {
        last_price: { gt: 0 },
        price: { lt: this.prisma.product.fields.last_price },
        stock: { gt: 0 },
      },
      orderBy: { created_at: 'desc' },
      take: 10,
    });
  }

  async findBestSellers() {
    return this.prisma.product.findMany({
      orderBy: { created_at: 'desc' },
      take: 10,
    });
  }
}

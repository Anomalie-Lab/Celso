import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../../services/prisma.service';
import {CreateProductDto, UpdateProductDto} from 'src/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                avatar: true,
              },
            },
          },
        },
        cart_items: true,
        invoices: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {id},
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                fullname: true,
                avatar: true,
              },
            },
          },
        },
        cart_items: true,
        invoices: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: createProductDto.title,
        summary: createProductDto.summary,
        description: createProductDto.description,
        brand: createProductDto.brand,
        price: createProductDto.price,
        last_price: createProductDto.last_price,
        installments: createProductDto.installments,
        blur: createProductDto.blur,
        details: createProductDto.details,
        flags: createProductDto.flags,
        categories: createProductDto.categories,
        sizes: createProductDto.sizes,
        stock: createProductDto.stock,
      },
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({where: {id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: {id},
      data: {
        title: updateProductDto.title,
        summary: updateProductDto.summary,
        description: updateProductDto.description,
        brand: updateProductDto.brand,
        price: updateProductDto.price,
        last_price: updateProductDto.last_price,
        installments: updateProductDto.installments,
        blur: updateProductDto.blur,
        details: updateProductDto.details,
        flags: updateProductDto.flags,
        categories: updateProductDto.categories,
        sizes: updateProductDto.sizes,
        stock: updateProductDto.stock,
      },
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({where: {id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: {id},
    });
  }

  async updateStock(id: number, stock: number) {
    const product = await this.prisma.product.findUnique({where: {id}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: {id},
      data: {stock},
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [{title: {contains: query}}, {brand: {contains: query}}, {description: {contains: query}}],
      },
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}

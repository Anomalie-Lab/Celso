import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";

interface SearchParams {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number | string) {
    return this.prisma.product.findUnique({
      where: { id: Number(id) },
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

  async searchProducts(params: SearchParams) {
    const { query, category, brand, minPrice, maxPrice, sort, page = 1, limit = 12 } = params;
    
    const skip = (page - 1) * limit;
    
    // Construir filtros
    const where: any = {};
    
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { brand: { contains: query } },
        { description: { contains: query } },
      ];
    }
    
    if (category) {
      // Busca por categoria - simplificado para compatibilidade
      where.categories = { array_contains: [category] };
    }
    
    if (brand) {
      where.brand = { contains: brand };
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    
    // Construir ordenação
    let orderBy: any = { created_at: "desc" };
    if (sort) {
      switch (sort) {
        case 'price_asc':
          orderBy = { price: 'asc' };
          break;
        case 'price_desc':
          orderBy = { price: 'desc' };
          break;
        case 'name_asc':
          orderBy = { title: 'asc' };
          break;
        case 'name_desc':
          orderBy = { title: 'desc' };
          break;
        case 'newest':
          orderBy = { created_at: 'desc' };
          break;
        case 'oldest':
          orderBy = { created_at: 'asc' };
          break;
      }
    }
    
    // Buscar produtos
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          summary: true,
          description: true,
          brand: true,
          price: true,
          last_price: true,
          installments: true,
          blur: true,
          details: true,
          flags: true,
          categories: true,
          images: true,
          sizes: true,
          stock: true,
          views: true,
          added_to_cart: true,
          added_to_wishlist: true,
          created_at: true,
          updated_at: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);
    
    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
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

  async getCategories() {
    const products = await this.prisma.product.findMany({
      select: { categories: true },
    });
    
    // Contar produtos por categoria
    const categoryCount: { [key: string]: number } = {};
    products.forEach(product => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((cat: string) => {
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
      }
    });
    
    // Ordenar por quantidade de produtos e pegar as top 5
    const topCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count], index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        count
      }));
    
    return topCategories;
  }

  async getBrands() {
    const products = await this.prisma.product.findMany({
      select: { brand: true },
      distinct: ['brand'],
    });
    
    return products.map(p => p.brand).filter(Boolean);
  }
}

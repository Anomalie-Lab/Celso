import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateAnalyticsDto } from '../../dtos/analytics.dto';

@Injectable()
export class AnalyticsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAnalyticsDto) {
    console.log('💾 Analytics Repository: Criando registro', data);
    try {
      const result = await this.prisma.productAnalytics.create({
        data: {
          product_id: data.product_id,
          action: data.action,
          source: data.source,
          user_agent: data.user_agent,
          referrer: data.referrer,
          ip_address: data.ip_address,
          session_id: data.session_id,
          user_id: data.user_id,
          metadata: data.metadata,
        },
      });
      console.log('💾 Analytics Repository: Registro criado', result);
      return result;
    } catch (error) {
      console.error('💾 Analytics Repository: Erro ao criar registro', error);
      throw error;
    }
  }

  async getProductAnalytics(productId: number, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.prisma.productAnalytics.findMany({
      where: {
        product_id: productId,
        created_at: {
          gte: startDate,
        },
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getAnalyticsSummary(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      totalViews,
      totalWishlist,
      totalCart,
      totalPurchases,
      topProducts,
      actionStats,
    ] = await Promise.all([
      // Total de visualizações
      this.prisma.productAnalytics.count({
        where: {
          action: 'view',
          created_at: { gte: startDate },
        },
      }),

      // Total de adições à wishlist
      this.prisma.productAnalytics.count({
        where: {
          action: 'wishlist_add',
          created_at: { gte: startDate },
        },
      }),

      // Total de adições ao carrinho
      this.prisma.productAnalytics.count({
        where: {
          action: 'cart_add',
          created_at: { gte: startDate },
        },
      }),

      // Total de compras
      this.prisma.productAnalytics.count({
        where: {
          action: 'purchase',
          created_at: { gte: startDate },
        },
      }),

      // Top produtos mais visualizados
      this.prisma.productAnalytics.groupBy({
        by: ['product_id'],
        where: {
          action: 'view',
          created_at: { gte: startDate },
        },
        _count: {
          product_id: true,
        },
        orderBy: {
          _count: {
            product_id: 'desc',
          },
        },
        take: 10,
      }),

      // Estatísticas por ação
      this.prisma.productAnalytics.groupBy({
        by: ['action'],
        where: {
          created_at: { gte: startDate },
        },
        _count: {
          action: true,
        },
      }),
    ]);

    // Buscar detalhes dos produtos mais visualizados
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.product_id },
          select: {
            id: true,
            title: true,
            price: true,
            images: true,
          },
        });
        return {
          ...item,
          product,
        };
      })
    );

    return {
      summary: {
        totalViews,
        totalWishlist,
        totalCart,
        totalPurchases,
        conversionRate: totalViews > 0 ? (totalPurchases / totalViews) * 100 : 0,
        wishlistRate: totalViews > 0 ? (totalWishlist / totalViews) * 100 : 0,
        cartRate: totalViews > 0 ? (totalCart / totalViews) * 100 : 0,
      },
      topProducts: topProductsWithDetails,
      actionStats,
    };
  }

  async getAnalyticsByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.productAnalytics.findMany({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            fullname: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async getProductConversionFunnel(productId: number, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [views, wishlist, cart, purchases] = await Promise.all([
      this.prisma.productAnalytics.count({
        where: {
          product_id: productId,
          action: 'view',
          created_at: { gte: startDate },
        },
      }),
      this.prisma.productAnalytics.count({
        where: {
          product_id: productId,
          action: 'wishlist_add',
          created_at: { gte: startDate },
        },
      }),
      this.prisma.productAnalytics.count({
        where: {
          product_id: productId,
          action: 'cart_add',
          created_at: { gte: startDate },
        },
      }),
      this.prisma.productAnalytics.count({
        where: {
          product_id: productId,
          action: 'purchase',
          created_at: { gte: startDate },
        },
      }),
    ]);

    return {
      views,
      wishlist,
      cart,
      purchases,
      viewToWishlist: views > 0 ? (wishlist / views) * 100 : 0,
      viewToCart: views > 0 ? (cart / views) * 100 : 0,
      viewToPurchase: views > 0 ? (purchases / views) * 100 : 0,
      cartToPurchase: cart > 0 ? (purchases / cart) * 100 : 0,
    };
  }
}

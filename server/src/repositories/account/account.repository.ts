import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateUpdateAddressDto, UpdateUserDto } from 'src/dtos/account.dto';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(data: UpdateUserDto, id: number) {
    return await this.prisma.user.update({
      data: { ...data, birthdate: new Date(data.birthdate) },
      where: { id },
    });
  }

  async getAddress({ user_id }: { user_id: number }) {
    return await this.prisma.address.findMany({
      where: { user_id },
      orderBy: { created_at: 'desc' },
    });
  }

  async createAddress(data: { user_id: number; dto: CreateUpdateAddressDto }) {
    if (data.dto.primary) {
      await this.prisma.address.updateMany({
        where: { user_id: data.user_id },
        data: { primary: false },
      });
    }
    return await this.prisma.address.create({
      data: { ...data.dto, user_id: data.user_id },
    });
  }

  async updateAddress(data: {
    user_id: number;
    id: number;
    dto: CreateUpdateAddressDto;
  }) {
    if (data.dto.primary) {
      await this.prisma.address.updateMany({
        where: { user_id: data.user_id, id: { not: data.id } },
        data: { primary: false },
      });
    }

    return await this.prisma.address.update({
      where: { id: data.id },
      data: { ...data.dto, user_id: data.user_id },
    });
  }

  async deleteAddress(data: { user_id: number; id: number }) {
    return await this.prisma.address.delete({ where: { id: data.id } });
  }

  async findAll({ ids }: { ids?: number[] }) {
    return await this.prisma.user.findMany({
      where: { id: { in: ids ?? [] } },
    });
  }

  async getUserStats(userId: number) {
    const [ordersCount, wishlistItemsCount, addressesCount, totalSpent] =
      await Promise.all([
        this.prisma.transaction.count({ where: { user_id: userId } }),
        this.prisma.wishlistItem.count({
          where: { wishlist: { user_id: userId } },
        }),
        this.prisma.address.count({ where: { user_id: userId } }),
        this.prisma.invoice.aggregate({
          where: { transaction: { user_id: userId } },
          _sum: { total_amount: true },
        }),
      ]);

    const totalSpentAmount = Number(totalSpent._sum.total_amount ?? 0);
    const points = Math.floor(totalSpentAmount * 10);

    return {
      orders_count: ordersCount,
      wishlist_count: wishlistItemsCount,
      addresses_count: addressesCount,
      points: points,
      total_spent: totalSpentAmount,
    };
  }

  async getUserActivities(userId: number) {
    const [recentOrders, recentWishlistItems, recentAddresses] =
      await Promise.all([
        this.prisma.transaction.findMany({
          where: { user_id: userId },
          orderBy: { created_at: 'desc' },
          take: 3,
          include: { histories: { orderBy: { created_at: 'desc' }, take: 1 } },
        }),
        this.prisma.wishlistItem.findMany({
          where: { wishlist: { user_id: userId } },
          orderBy: { created_at: 'desc' },
          take: 3,
          include: {
            product: { select: { title: true } },
          },
        }),
        this.prisma.address.findMany({
          where: { user_id: userId },
          orderBy: { created_at: 'desc' },
          take: 2,
        }),
      ]);

    const activities: Array<{
      type: string;
      action: string;
      created_at: Date;
    }> = [];

    recentOrders.forEach((order) => {
      const status = order.histories[0]?.status ?? 'PENDING';
      const statusText =
        status === 'COMPLETED'
          ? 'entregue'
          : status === 'SHIPPED'
            ? 'enviado'
            : status === 'APPROVED'
              ? 'aprovado'
              : 'pendente';

      activities.push({
        type: 'order',
        action: `Pedido #${order.id} ${statusText}`,
        created_at: order.created_at,
      });
    });

    recentWishlistItems.forEach((wishlistItem) => {
      activities.push({
        type: 'wishlist',
        action: `Produto "${wishlistItem.product.title}" adicionado à lista de desejos`,
        created_at: wishlistItem.created_at,
      });
    });

    recentAddresses.forEach((address) => {
      activities.push({
        type: 'address',
        action: 'Novo endereço cadastrado',
        created_at: address.created_at,
      });
    });

    return activities
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5);
  }

  async getOrderById(id: number) {
    const order = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, fullname: true, email: true } },
        invoices: { include: { items: { include: { product: true } } } },
        histories: { orderBy: { created_at: 'asc' } },
      },
    });

    return order;
  }

  async getUserOrders(userId: number) {
    return await this.prisma.transaction.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: {
        invoices: {
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
        histories: {
          orderBy: { created_at: 'asc' },
        },
      },
    });
  }
}

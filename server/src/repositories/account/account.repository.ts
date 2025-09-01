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

  // Cart methods
  async getUserCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
                stock: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return await this.prisma.cart.create({
        data: { user_id: userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  price: true,
                  images: true,
                  stock: true,
                },
              },
            },
          },
        },
      });
    }

    return cart;
  }

  async addToCart(userId: number, dto: any) {
    const { product_id, quantity = 1, size = 'M', color = 'Default' } = dto;

    let cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { user_id: userId },
      });
    }

    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cart_id: cart.id,
        product_id: product_id,
        size: size,
        color: color,
      },
    });

    if (existingItem) {
      return await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
      });
    }

    return await this.prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        product_id: product_id,
        quantity: quantity,
        size: size,
        color: color,
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            images: true,
            stock: true,
          },
        },
      },
    });
  }

  async updateCartItem(userId: number, itemId: number, dto: any) {
    const { quantity } = dto;

    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { user_id: userId },
      },
    });

    if (!item) {
      throw new Error('Cart item not found');
    }

    if (quantity <= 0) {
      return await this.prisma.cartItem.delete({
        where: { id: itemId },
      });
    }

    return await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            images: true,
            stock: true,
          },
        },
      },
    });
  }

  async removeFromCart(userId: number, itemId: number) {
    const item = await this.prisma.cartItem.findFirst({
      where: {
        id: +itemId,
        cart: { user_id: userId },
      },
    });

    if (!item) {
      throw new Error('Cart item not found');
    }

    return await this.prisma.cartItem.delete({
      where: { id: +itemId },
    });
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
    });

    if (!cart) {
      return { message: 'Cart is already empty' };
    }

    await this.prisma.cartItem.deleteMany({
      where: { cart_id: cart.id },
    });

    return { message: 'Cart cleared successfully' };
  }

  async getUserWishlist(userId: number) {
    let wishlist = await this.prisma.wishlist.findFirst({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
                stock: true,
                brand: true,
                categories: true,
                flags: true
              }
            }
          }
        }
      }
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { user_id: userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  title: true,
                  price: true,
                  images: true,
                  stock: true,
                  brand: true,
                  categories: true,
                  flags: true
                }
              }
            }
          }
        }
      });
    }

    return wishlist;
  }

  async addToWishlist(userId: number, productId: number) {
    let wishlist = await this.prisma.wishlist.findFirst({
      where: { user_id: userId }
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { user_id: userId }
      });
    }

    const existingItem = await this.prisma.wishlistItem.findFirst({
      where: {
        wishlist_id: wishlist.id,
        product_id: productId
      }
    });

    if (existingItem) {
      throw new Error('Produto já está na lista de desejos');
    }

    const wishlistItem = await this.prisma.wishlistItem.create({
      data: {
        wishlist_id: wishlist.id,
        product_id: productId
      },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            images: true,
            stock: true,
            brand: true,
            categories: true,
            flags: true
          }
        }
      }
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        added_to_wishlist: {
          increment: 1
        }
      }
    });

    return wishlistItem;
  }

  async removeFromWishlist(userId: number, itemId: number) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { user_id: userId },
      include: { items: true }
    });

    if (!wishlist) {
      throw new Error('Lista de desejos não encontrada');
    }

    const item = await this.prisma.wishlistItem.findFirst({
      where: {
        id: itemId,
        wishlist_id: wishlist.id
      },
      include: { product: true }
    });

    if (!item) {
      throw new Error('Item não encontrado na lista de desejos');
    }

    await this.prisma.wishlistItem.delete({
      where: { id: itemId }
    });

    await this.prisma.product.update({
      where: { id: item.product_id },
      data: {
        added_to_wishlist: {
          decrement: 1
        }
      }
    });

    return { message: 'Item removido da lista de desejos' };
  }

  async clearWishlist(userId: number) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: { user_id: userId },
      include: { items: true }
    });

    if (wishlist) {
      await this.prisma.wishlistItem.deleteMany({
        where: { wishlist_id: wishlist.id }
      });
    }

    return { message: 'Lista de desejos limpa com sucesso' };
  }
}

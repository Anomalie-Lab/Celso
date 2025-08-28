import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from '../../services/prisma.service';
import {MailerService} from '../../services/mailer.sevice';
import {CreateProductDto, UpdateProductDto} from 'src/dtos/products.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService
  ) {}

  async getDashboardStats() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const startOfPrevMonth = new Date(startOfMonth);
    startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);
    const formatChange = (current: number, prev: number) => {
      if (prev === 0 && current === 0) return '0%';
      if (prev === 0) return '+100%';
      const pct = ((current - prev) / prev) * 100;
      const rounded = Math.round(pct);
      return `${rounded >= 0 ? '+' : ''}${rounded}%`;
    };
    const totalProductsPromise = this.prisma.product.count();
    const totalUsersPromise = this.prisma.user.count();
    const todayOrdersPromise = this.prisma.transaction.count({where: {created_at: {gte: startOfToday}}});
    const [productsThisMonth, productsLastMonth, usersThisMonth, usersLastMonth, ordersThisMonth, ordersLastMonth, revenueAggThis, revenueAggLast, totalProducts, totalUsers, todayOrders] = await Promise.all([
      this.prisma.product.count({where: {created_at: {gte: startOfMonth}}}),
      this.prisma.product.count({where: {created_at: {gte: startOfPrevMonth, lt: startOfMonth}}}),
      this.prisma.user.count({where: {created_at: {gte: startOfMonth}}}),
      this.prisma.user.count({where: {created_at: {gte: startOfPrevMonth, lt: startOfMonth}}}),
      this.prisma.transaction.count({where: {created_at: {gte: startOfMonth}}}),
      this.prisma.transaction.count({where: {created_at: {gte: startOfPrevMonth, lt: startOfMonth}}}),
      this.prisma.invoice.aggregate({where: {created_at: {gte: startOfMonth}}, _sum: {total_amount: true}}),
      this.prisma.invoice.aggregate({where: {created_at: {gte: startOfPrevMonth, lt: startOfMonth}}, _sum: {total_amount: true}}),
      totalProductsPromise,
      totalUsersPromise,
      todayOrdersPromise,
    ]);

    const monthlyRevenue = Number(revenueAggThis._sum.total_amount ?? 0);
    const lastMonthRevenue = Number(revenueAggLast._sum.total_amount ?? 0);

    const productsChange = formatChange(productsThisMonth, productsLastMonth);
    const usersChange = formatChange(usersThisMonth, usersLastMonth);
    const ordersChange = formatChange(ordersThisMonth, ordersLastMonth);
    const revenueChange = formatChange(monthlyRevenue, lastMonthRevenue);

    return {
      totalProducts,
      activeUsers: totalUsers,
      todayOrders,
      monthlyRevenue,
      productsChange,
      usersChange,
      ordersChange,
      revenueChange,
    };
  }

  async getRecentActivity() {
    const [lastTransaction, lastProduct, lastUser] = await Promise.all([this.prisma.transaction.findFirst({orderBy: {created_at: 'desc'}}), this.prisma.product.findFirst({orderBy: {created_at: 'desc'}}), this.prisma.user.findFirst({orderBy: {created_at: 'desc'}})]);

    const now = new Date();
    function minutesAgo(date?: Date | null) {
      if (!date) return 'agora';
      const diff = Math.max(0, Math.floor((now.getTime() - new Date(date).getTime()) / 60000));
      return `${diff || 1} min atrás`;
    }

    const items = [] as Array<{action: string; time: string; type: 'order' | 'product' | 'user' | 'alert'}>;
    if (lastTransaction) items.push({action: `Novo pedido #${lastTransaction.id}`, time: minutesAgo(lastTransaction.created_at), type: 'order'});
    if (lastProduct) items.push({action: `Produto '${lastProduct.title}' criado`, time: minutesAgo(lastProduct.created_at), type: 'product'});
    if (lastUser) items.push({action: `Usuário '${lastUser.fullname}' cadastrado`, time: minutesAgo(lastUser.created_at), type: 'user'});

    while (items.length < 5) {
      items.push({action: 'Estoque baixo detectado', time: '20 min atrás', type: 'alert'});
    }

    return items.slice(0, 5);
  }

  async getTopProducts() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const items = await this.prisma.invoiceItem.groupBy({
      by: ['product_id'],
      _sum: {quantity: true, price: true},
      where: {created_at: {gte: startOfMonth}},
      orderBy: {_sum: {quantity: 'desc'}},
      take: 5,
    });

    const productIds = items.map((i) => i.product_id);
    const products = await this.prisma.product.findMany({where: {id: {in: productIds}}, select: {id: true, title: true}});
    const idToName = new Map(products.map((p) => [p.id, p.title] as const));

    return items.map((i) => ({
      id: i.product_id,
      name: idToName.get(i.product_id) ?? `Produto ${i.product_id}`,
      sales: Number(i._sum.quantity ?? 0),
      revenue: `R$ ${Number(i._sum.price ?? 0).toLocaleString('pt-BR')}`,
      trend: 'up' as const,
    }));
  }

  async getOrders() {
    const orders = await this.prisma.transaction.findMany({
      orderBy: {created_at: 'desc'},
      include: {
        user: {select: {id: true, fullname: true, email: true}},
        invoices: {select: {id: true, total_amount: true, created_at: true}},
        histories: true,
      },
    });

    return orders.map((o) => ({
      id: o.id,
      user: o.user,
      total_amount: Number(o.invoices[0]?.total_amount ?? 0),
      status: o.histories[o.histories.length - 1]?.status ?? 'PENDING',
      payment_method: 'PIX',
      created_at: o.created_at,
    }));
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
        addresses: true,
        cards: true,
        notifications: true,
        comments: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        carts: {
          include: {
            items: true,
          },
        },
        transactions: {
          include: {
            invoices: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return users.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {id},
      include: {
        role: true,
        addresses: true,
        cards: true,
        notifications: true,
        comments: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        carts: {
          include: {
            items: true,
          },
        },
        transactions: {
          include: {
            invoices: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
  }

  async searchUsers(query: string) {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [{fullname: {contains: query}}, {username: {contains: query}}, {email: {contains: query}}],
      },
      include: {
        role: true,
        addresses: true,
        cards: true,
        notifications: true,
        comments: true,
        carts: true,
        transactions: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return users.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });
  }

  // Products Management Methods
  async getAllProducts() {
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

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({ where: { id } });
  }

  async updateProductStock(id: number, stock: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data: { stock },
      include: {
        comments: true,
        cart_items: true,
        invoices: true,
      },
    });
  }
}

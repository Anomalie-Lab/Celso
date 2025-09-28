import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";
import { CreateProductDto, UpdateProductDto } from "../../dtos/products.dto";

@Injectable()
export class AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const startOfPrevMonth = new Date(startOfMonth);
    startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);

    const totalProductsPromise = this.prisma.product.count();
    const totalUsersPromise = this.prisma.user.count();
    const todayOrdersPromise = this.prisma.transaction.count({ where: { created_at: { gte: startOfToday } } });

    const [productsThisMonth, productsLastMonth, usersThisMonth, usersLastMonth, ordersThisMonth, ordersLastMonth, revenueAggThis, revenueAggLast, totalProducts, totalUsers, todayOrders] = await Promise.all([
      this.prisma.product.count({ where: { created_at: { gte: startOfMonth } } }),
      this.prisma.product.count({ where: { created_at: { gte: startOfPrevMonth, lt: startOfMonth } } }),
      this.prisma.user.count({ where: { created_at: { gte: startOfMonth } } }),
      this.prisma.user.count({ where: { created_at: { gte: startOfPrevMonth, lt: startOfMonth } } }),
      this.prisma.transaction.count({ where: { created_at: { gte: startOfMonth } } }),
      this.prisma.transaction.count({ where: { created_at: { gte: startOfPrevMonth, lt: startOfMonth } } }),
      this.prisma.invoice.aggregate({ where: { created_at: { gte: startOfMonth } }, _sum: { total_amount: true } }),
      this.prisma.invoice.aggregate({ where: { created_at: { gte: startOfPrevMonth, lt: startOfMonth } }, _sum: { total_amount: true } }),
      totalProductsPromise,
      totalUsersPromise,
      todayOrdersPromise,
    ]);

    const monthlyRevenue = Number(revenueAggThis._sum.total_amount ?? 0);
    const lastMonthRevenue = Number(revenueAggLast._sum.total_amount ?? 0);

    return {
      totalProducts,
      totalUsers,
      todayOrders,
      monthlyRevenue,
      productsThisMonth,
      productsLastMonth,
      usersThisMonth,
      usersLastMonth,
      ordersThisMonth,
      ordersLastMonth,
      lastMonthRevenue,
    };
  }

  async getRecentActivity() {
    const [lastTransaction, lastProduct, lastUser] = await Promise.all([
      this.prisma.transaction.findFirst({ orderBy: { created_at: "desc" } }),
      this.prisma.product.findFirst({ orderBy: { created_at: "desc" } }),
      this.prisma.user.findFirst({ orderBy: { created_at: "desc" } }),
    ]);

    return { lastTransaction, lastProduct, lastUser };
  }

  async getTopProducts() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const items = await this.prisma.invoiceItem.groupBy({
      by: ["product_id"],
      _sum: { quantity: true, price: true },
      where: { created_at: { gte: startOfMonth } },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    const productIds = items.map((i) => i.product_id);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, title: true },
    });

    return { items, products };
  }

  async getOrders() {
    return this.prisma.transaction.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { id: true, fullname: true, email: true } },
        invoices: { select: { id: true, total_amount: true, created_at: true } },
        histories: true,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
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
        created_at: "desc",
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
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
  }

  async searchUsers(query: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { fullname: { contains: query } },
          { username: { contains: query } },
          { email: { contains: query } },
        ],
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
        created_at: "desc",
      },
    });
  }

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
        created_at: "desc",
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
    return this.prisma.product.delete({ where: { id } });
  }

  async updateProductStock(id: number, stock: number) {
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

  async findProductById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}

import {Injectable, NotFoundException} from '@nestjs/common';
import {MailerService} from '../../services/mailer.sevice';
import {CreateProductDto, UpdateProductDto} from 'src/dtos/products.dto';
import {AdminRepository} from '../../repositories/admin/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly mailer: MailerService
  ) {}

  async getDashboardStats() {
    const formatChange = (current: number, prev: number) => {
      if (prev === 0 && current === 0) return '0%';
      if (prev === 0) return '+100%';
      const pct = ((current - prev) / prev) * 100;
      const rounded = Math.round(pct);
      return `${rounded >= 0 ? '+' : ''}${rounded}%`;
    };

    const stats = await this.adminRepository.getDashboardStats();

    const productsChange = formatChange(stats.productsThisMonth, stats.productsLastMonth);
    const usersChange = formatChange(stats.usersThisMonth, stats.usersLastMonth);
    const ordersChange = formatChange(stats.ordersThisMonth, stats.ordersLastMonth);
    const revenueChange = formatChange(stats.monthlyRevenue, stats.lastMonthRevenue);

    return {
      totalProducts: stats.totalProducts,
      activeUsers: stats.totalUsers,
      todayOrders: stats.todayOrders,
      monthlyRevenue: stats.monthlyRevenue,
      productsChange,
      usersChange,
      ordersChange,
      revenueChange,
    };
  }

  async getRecentActivity() {
    const { lastTransaction, lastProduct, lastUser } = await this.adminRepository.getRecentActivity();

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
    const { items, products } = await this.adminRepository.getTopProducts();
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
    const orders = await this.adminRepository.getOrders();

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
    const users = await this.adminRepository.getAllUsers();

    return users.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });
  }

  async getUserById(id: number) {
    const user = await this.adminRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
  }

  async searchUsers(query: string) {
    const users = await this.adminRepository.searchUsers(query);

    return users.map((user) => {
      const {password, ...userWithoutPassword} = user;
      return userWithoutPassword;
    });
  }

  // Products Management Methods
  async getAllProducts() {
    return await this.adminRepository.getAllProducts();
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.adminRepository.createProduct(createProductDto);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.adminRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.adminRepository.updateProduct(id, updateProductDto);
  }

  async deleteProduct(id: number) {
    const product = await this.adminRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.adminRepository.deleteProduct(id);
  }

  async updateProductStock(id: number, stock: number) {
    const product = await this.adminRepository.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return await this.adminRepository.updateProductStock(id, stock);
  }
}

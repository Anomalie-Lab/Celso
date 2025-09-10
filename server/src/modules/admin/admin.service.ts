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

  async createOrder(userId: number, orderData: any) {
    const order = await this.adminRepository.createOrder(userId, orderData);
    
    try {
      const orderItems = this.formatOrderItemsForEmail(order.invoices[0]?.items || []);
      const orderTotal = order.invoices[0]?.total_amount || 0;
      
      await this.mailer.sendOrderCreatedEmail({
        userName: order.user.fullname,
        userEmail: order.user.email,
        orderNumber: `#${order.id.toString().padStart(6, '0')}`,
        orderDate: new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(order.created_at),
        orderStatus: 'Aguardando Pagamento',
        orderTotal: `R$ ${Number(orderTotal).toFixed(2).replace('.', ',')}`,
        orderItems,
        orderTrackingUrl: `${process.env.FRONTEND_URL}/minha-conta/pedidos/${order.id}`,
      });
    } catch (emailError) {
      // Não falha a criação do pedido se o email falhar
    }

    return order;
  }

  async updateOrderStatus(transactionId: number, status: string, statusText: string, additionalData?: any) {
    const order = await this.adminRepository.updateOrderStatus(transactionId, status, statusText, additionalData);
    
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    try {
      const histories = order.histories || [];
      const currentHistory = histories[0];
      const previousHistory = histories[1];
      
      const statusDescriptions = {
        'PENDING': 'Seu pedido foi recebido e está aguardando confirmação de pagamento.',
        'APPROVED': 'Pagamento aprovado! Seu pedido está sendo preparado para envio.',
        'SHIPPED': 'Seu pedido foi enviado e está a caminho!',
        'RECEIVED': 'Seu pedido foi entregue com sucesso.',
        'COMPLETED': 'Pedido finalizado. Obrigado por comprar conosco!'
      };

      await this.mailer.sendOrderStatusUpdateEmail({
        userName: order.user.fullname,
        userEmail: order.user.email,
        orderNumber: `#${order.id.toString().padStart(6, '0')}`,
        previousStatus: previousHistory?.text || 'Status anterior',
        newStatus: currentHistory?.text || statusText,
        updateDate: new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
        statusDescription: statusDescriptions[status] || 'Status do pedido foi atualizado.',
        deliveryCompany: additionalData?.deliveryCompany,
        estimatedDelivery: additionalData?.estimatedDelivery,
        trackingCode: additionalData?.trackingCode,
        pickupInfo: additionalData?.pickupInfo,
        nextSteps: additionalData?.nextSteps,
        orderTrackingUrl: `${process.env.FRONTEND_URL}/minha-conta/pedidos/${order.id}`,
      });
    } catch (emailError) {
      // Não falha a atualização se o email falhar
    }

    return order;
  }

  async getOrderById(transactionId: number) {
    const order = await this.adminRepository.getOrderById(transactionId);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return order;
  }

  private formatOrderItemsForEmail(items: any[]): string {
    return items
      .map((item) => {
        const itemTotal = item.quantity * Number(item.price);
        const productImage = item.product.images && item.product.images.length > 0 
          ? item.product.images[0] 
          : '/placeholder.svg';
          
        return `
          <div style="padding: 16px 0; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center;">
            <img src="${productImage}" alt="${item.product.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; margin-right: 16px;">
            <div style="flex: 1;">
              <h4 style="margin: 0 0 4px 0; color: #1E2939; font-size: 16px; font-weight: 600;">${item.product.title}</h4>
              <p style="margin: 0; color: #64748B; font-size: 14px;">Quantidade: ${item.quantity}</p>
              <p style="margin: 4px 0 0 0; color: #64748B; font-size: 14px;">Preço unitário: R$ ${Number(item.price).toFixed(2).replace('.', ',')}</p>
            </div>
            <div style="text-align: right;">
              <span style="color: #03624C; font-weight: 600; font-size: 16px;">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        `;
      })
      .join('');
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

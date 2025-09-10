import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { MailerService } from './mailer.sevice';

@Injectable()
export class CartSchedulerService {
  private readonly logger = new Logger(CartSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  @Cron('0 */30 * * * *')
  async checkAbandonedCarts() {
    try {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      const abandonedCarts = await this.prisma.cart.findMany({
        where: {
          updated_at: {
            lte: oneHourAgo,
          },
          abandonment_email_sent: false,
          items: {
            some: {},
          },
        },
        include: {
          user: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      for (const cart of abandonedCarts) {
        await this.sendAbandonmentEmail(cart);
      }
    } catch (error) {
      this.logger.error('Erro ao verificar carrinhos abandonados:', error);
    }
  }

  private async sendAbandonmentEmail(cart: any) {
    try {
      const cartTotal = cart.items.reduce((total: number, item: any) => {
        return total + (item.quantity * item.product.price);
      }, 0);

      const cartItemsHtml = cart.items
        .map((item: any) => {
          const itemTotal = item.quantity * item.product.price;
          return `
            <div style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: between;">
              <div style="flex: 1;">
                <h4 style="margin: 0 0 4px 0; color: #1E2939; font-size: 14px; font-weight: 600;">${item.product.name}</h4>
                <p style="margin: 0; color: #64748B; font-size: 12px;">Quantidade: ${item.quantity}</p>
              </div>
              <div style="text-align: right;">
                <span style="color: #03624C; font-weight: 600; font-size: 14px;">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          `;
        })
        .join('');

      const cartUpdatedAt = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(cart.updatedAt);

      const emailData = {
        userName: cart.user.name,
        userEmail: cart.user.email,
        cartItems: cartItemsHtml,
        cartTotal: `R$ ${cartTotal.toFixed(2).replace('.', ',')}`,
        checkoutUrl: `${process.env.FRONTEND_URL}/checkout`,
        cartUpdatedAt,
      };

      await this.mailerService.sendCartAbandonmentEmail(emailData);

      await this.prisma.cart.update({
        where: { id: cart.id },
        data: { abandonment_email_sent: true },
      });
    } catch (error) {
      this.logger.error(`Erro ao enviar email de carrinho abandonado para ${cart.user?.email}:`, error);
    }
  }

  async sendTestAbandonmentEmail(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        items: {
          some: {},
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (cart) {
      await this.sendAbandonmentEmail(cart);
      return { success: true, message: 'Email de teste enviado com sucesso' };
    } else {
      return { success: false, message: 'Carrinho não encontrado ou vazio' };
    }
  }
}

import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {
  WelcomeEmailHtml,
  AccountUpdatedEmailHtml,
  OrderCreatedEmailHtml,
  OrderStatusUpdateEmailHtml,
  PasswordResetEmailNew,
  SecurityAlertEmailHtml,
  CartAbandonmentEmailHtml,
  PasswordChangedEmailHtml,
  PasswordResetHtml,
  WelcomeEmailData,
  AccountUpdatedEmailData,
  OrderCreatedEmailData,
  OrderStatusUpdateEmailData,
  PasswordResetEmailData,
  SecurityAlertEmailData,
  CartAbandonmentEmailData,
  PasswordChangedEmailData
} from '../templates/index';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: Number(process.env.NODE_MAILER_PORT),
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
  }

  async Send({email, html, subject}: {html: string; email: string; subject: string}): Promise<void> {
    try {
      const options = {from: process.env.NODE_MAILER_USER, to: email, subject, html};
      await this.transporter.sendMail(options);
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
    const html = WelcomeEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: 'Bem-vindo ao Medicine Shop! 🎉'
    });
  }

  async sendAccountUpdatedEmail(data: AccountUpdatedEmailData): Promise<void> {
    const html = AccountUpdatedEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: 'Conta atualizada - Medicine Shop'
    });
  }

  async sendOrderCreatedEmail(data: OrderCreatedEmailData): Promise<void> {
    const html = OrderCreatedEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: `Pedido #${data.orderNumber} confirmado! 📦`
    });
  }

  async sendOrderStatusUpdateEmail(data: OrderStatusUpdateEmailData): Promise<void> {
    const html = OrderStatusUpdateEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: `Pedido #${data.orderNumber} - Status atualizado: ${data.newStatus}`
    });
  }

  async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<void> {
    const html = PasswordResetEmailNew(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: 'Redefinir sua senha - Medicine Shop 🔐'
    });
  }

  async sendPasswordResetLegacy(email: string, resetLink: string): Promise<void> {
    const html = await PasswordResetHtml(resetLink);
    await this.Send({
      email,
      html,
      subject: 'Redefinir sua senha - Medicine Shop'
    });
  }

  async sendPasswordChangedEmail(data: PasswordChangedEmailData): Promise<void> {
    const html = PasswordChangedEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: 'Senha alterada com sucesso - Medicine Shop ✅'
    });
  }

  async sendSecurityAlertEmail(data: SecurityAlertEmailData): Promise<void> {
    const html = SecurityAlertEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: '🚨 Alerta de Segurança - Medicine Shop'
    });
  }

  async sendCartAbandonmentEmail(data: CartAbandonmentEmailData): Promise<void> {
    const html = CartAbandonmentEmailHtml(data);
    await this.Send({
      email: data.userEmail,
      html,
      subject: '🛒 Esqueceu algo? Complete sua compra - Medicine Shop'
    });
  }
}

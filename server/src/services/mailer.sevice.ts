import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as path from "path";

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

  async Send({ email, html, subject }: { html: string; email: string; subject: string }): Promise<void> {
    try {
      const options = { from: process.env.NODE_MAILER_USER, to: email, subject, html };

      await this.transporter.sendMail(options);
    } catch (error) {
      console.log(error);

      throw new Error("Failed to send email");
    }
  }

  async sendWelcomeEmail({ email, userName }: { email: string; userName: string }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'welcome-email-template.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{loginUrl}}/g, `${process.env.FRONTEND_URL}/login`);

      const subject = "🎉 Bem-vindo ao Celso!";

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de boas-vindas enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de boas-vindas:', error);
      throw new Error("Failed to send welcome email");
    }
  }

  async sendAccountUpdatedEmail({ 
    email, 
    userName, 
    changesSummary 
  }: { 
    email: string; 
    userName: string; 
    changesSummary: string; 
  }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'account-updated-email.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{changesSummary}}/g, changesSummary)
        .replace(/{{loginUrl}}/g, `${process.env.FRONTEND_URL}/login`);

      const subject = "Conta Atualizada - Celso";

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de conta atualizada enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de conta atualizada:', error);
      throw new Error("Failed to send account updated email");
    }
  }

  async sendOrderCreatedEmail({ 
    email, 
    userName, 
    orderNumber, 
    orderDate, 
    orderStatus, 
    orderTotal, 
    orderItems, 
    orderTrackingUrl 
  }: { 
    email: string; 
    userName: string; 
    orderNumber: string; 
    orderDate: string; 
    orderStatus: string; 
    orderTotal: string; 
    orderItems: string; 
    orderTrackingUrl: string; 
  }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'order-created-email.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{orderNumber}}/g, orderNumber)
        .replace(/{{orderDate}}/g, orderDate)
        .replace(/{{orderStatus}}/g, orderStatus)
        .replace(/{{orderTotal}}/g, orderTotal)
        .replace(/{{orderItems}}/g, orderItems)
        .replace(/{{orderTrackingUrl}}/g, orderTrackingUrl);

      const subject = `Pedido Confirmado - #${orderNumber}`;

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de pedido criado enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de pedido criado:', error);
      throw new Error("Failed to send order created email");
    }
  }

  async sendOrderStatusUpdateEmail({ 
    email, 
    userName, 
    orderNumber, 
    previousStatus, 
    newStatus, 
    updateDate, 
    statusDescription, 
    estimatedDelivery, 
    orderTrackingUrl,
    deliveryCompany,
    trackingCode,
    pickupInfo,
    nextSteps
  }: { 
    email: string; 
    userName: string; 
    orderNumber: string; 
    previousStatus: string; 
    newStatus: string; 
    updateDate: string; 
    statusDescription: string; 
    estimatedDelivery?: string; 
    orderTrackingUrl: string;
    deliveryCompany?: string;
    trackingCode?: string;
    pickupInfo?: string;
    nextSteps?: string;
  }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'order-status-update-email.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{orderNumber}}/g, orderNumber)
        .replace(/{{previousStatus}}/g, previousStatus)
        .replace(/{{newStatus}}/g, newStatus)
        .replace(/{{updateDate}}/g, updateDate)
        .replace(/{{statusDescription}}/g, statusDescription)
        .replace(/{{orderTrackingUrl}}/g, orderTrackingUrl)
        .replace(/{{deliveryCompany}}/g, deliveryCompany || 'Não informado')
        .replace(/{{trackingCode}}/g, trackingCode || '')
        .replace(/{{pickupInfo}}/g, pickupInfo || '')
        .replace(/{{nextSteps}}/g, nextSteps || '');

      // Processar condicionais
      if (estimatedDelivery) {
        htmlTemplate = htmlTemplate
          .replace(/{{#if estimatedDelivery}}/g, '')
          .replace(/{{estimatedDelivery}}/g, estimatedDelivery)
          .replace(/{{/if}}/g, '');
      } else {
        htmlTemplate = htmlTemplate
          .replace(/{{#if estimatedDelivery}}[\s\S]*?{{estimatedDelivery}}[\s\S]*?{{\/if}}/g, '');
      }

      if (trackingCode) {
        htmlTemplate = htmlTemplate
          .replace(/{{#if trackingCode}}/g, '')
          .replace(/{{trackingCode}}/g, trackingCode)
          .replace(/{{/if}}/g, '');
      } else {
        htmlTemplate = htmlTemplate
          .replace(/{{#if trackingCode}}[\s\S]*?{{trackingCode}}[\s\S]*?{{\/if}}/g, '');
      }

      if (pickupInfo) {
        htmlTemplate = htmlTemplate
          .replace(/{{#if pickupInfo}}/g, '')
          .replace(/{{pickupInfo}}/g, pickupInfo)
          .replace(/{{/if}}/g, '');
      } else {
        htmlTemplate = htmlTemplate
          .replace(/{{#if pickupInfo}}[\s\S]*?{{pickupInfo}}[\s\S]*?{{\/if}}/g, '');
      }

      if (nextSteps) {
        htmlTemplate = htmlTemplate
          .replace(/{{#if nextSteps}}/g, '')
          .replace(/{{nextSteps}}/g, nextSteps)
          .replace(/{{/if}}/g, '');
      } else {
        htmlTemplate = htmlTemplate
          .replace(/{{#if nextSteps}}[\s\S]*?{{nextSteps}}[\s\S]*?{{\/if}}/g, '');
      }

      const subject = `Status do Pedido Atualizado - #${orderNumber}`;

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de atualização de status enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de atualização de status:', error);
      throw new Error("Failed to send order status update email");
    }
  }

  async sendPasswordResetEmail({ 
    email, 
    userName, 
    resetPasswordUrl 
  }: { 
    email: string; 
    userName: string; 
    resetPasswordUrl: string; 
  }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'password-reset-email.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{resetPasswordUrl}}/g, resetPasswordUrl);

      const subject = "Redefinir Senha - Celso";

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de reset de senha enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de reset de senha:', error);
      throw new Error("Failed to send password reset email");
    }
  }

  async sendSecurityAlertEmail({ 
    email, 
    userName, 
    activityType, 
    activityDate, 
    location, 
    device, 
    changePasswordUrl, 
    accountSettingsUrl 
  }: { 
    email: string; 
    userName: string; 
    activityType: string; 
    activityDate: string; 
    location: string; 
    device: string; 
    changePasswordUrl: string; 
    accountSettingsUrl: string; 
  }): Promise<void> {
    try {
      const templatePath = path.join(process.cwd(), 'security-alert-email.html');
      let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

      htmlTemplate = htmlTemplate
        .replace(/{{userName}}/g, userName)
        .replace(/{{userEmail}}/g, email)
        .replace(/{{activityType}}/g, activityType)
        .replace(/{{activityDate}}/g, activityDate)
        .replace(/{{location}}/g, location)
        .replace(/{{device}}/g, device)
        .replace(/{{changePasswordUrl}}/g, changePasswordUrl)
        .replace(/{{accountSettingsUrl}}/g, accountSettingsUrl);

      const subject = "🚨 Alerta de Segurança - Celso";

      await this.Send({
        email,
        html: htmlTemplate,
        subject
      });

      console.log(`Email de alerta de segurança enviado para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar email de alerta de segurança:', error);
      throw new Error("Failed to send security alert email");
    }
  }
}

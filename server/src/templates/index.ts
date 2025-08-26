// Email Templates Export
export { WelcomeEmailHtml } from './welcome-email';
export { AccountUpdatedEmailHtml } from './account-updated-email';
export { OrderCreatedEmailHtml } from './order-created-email';
export { OrderStatusUpdateEmailHtml } from './order-status-update-email';
export { PasswordResetEmailHtml as PasswordResetEmailNew } from './password-reset-email';
export { SecurityAlertEmailHtml } from './security-alert-email';

// Legacy password reset (mantido para compatibilidade)
export { PasswordResetHtml } from './password-reset';

// Types
export type WelcomeEmailData = {
  userName: string;
  userEmail: string;
  loginUrl: string;
};

export type AccountUpdatedEmailData = {
  userName: string;
  userEmail: string;
  changesSummary: string;
  loginUrl: string;
};

export type OrderCreatedEmailData = {
  userName: string;
  userEmail: string;
  orderNumber: string;
  orderDate: string;
  orderStatus: string;
  orderTotal: string;
  orderItems: string;
  orderTrackingUrl: string;
};

export type OrderStatusUpdateEmailData = {
  userName: string;
  userEmail: string;
  orderNumber: string;
  previousStatus: string;
  newStatus: string;
  updateDate: string;
  deliveryCompany?: string;
  statusDescription: string;
  estimatedDelivery?: string;
  trackingCode?: string;
  pickupInfo?: string;
  nextSteps?: string;
  orderTrackingUrl: string;
};

export type PasswordResetEmailData = {
  userName: string;
  userEmail: string;
  resetPasswordUrl: string;
};

export type SecurityAlertEmailData = {
  userName: string;
  userEmail: string;
  activityType: string;
  activityDate: string;
  location: string;
  device: string;
  changePasswordUrl: string;
  accountSettingsUrl: string;
};

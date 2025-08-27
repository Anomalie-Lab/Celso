interface SecurityAlertEmailData {
  userName: string;
  userEmail: string;
  activityType: string;
  activityDate: string;
  location: string;
  device: string;
  changePasswordUrl: string;
  accountSettingsUrl: string;
}

export function SecurityAlertEmailHtml(data: SecurityAlertEmailData): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerta de Segurança - Medicine Shop</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFAFA; line-height: 1.6;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #DC2626; color: white; padding: 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🚨 Alerta de Segurança</h1>
                            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Atividade suspeita detectada na sua conta</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Message -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center; margin-bottom: 30px;">
                                        <h2 style="color: #1E2939; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">Olá, ${data.userName}!</h2>
                                        <p style="color: #64748B; font-size: 16px; line-height: 1.6; margin: 0; max-width: 480px; margin-left: auto; margin-right: auto;">
                                            Detectamos uma atividade suspeita na sua conta. Por favor, verifique os detalhes abaixo:
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alert Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEF2F2; padding: 24px; border: 1px solid #DC2626;">
                                        <h3 style="color: #DC2626; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Detalhes da Atividade</h3>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #FCA5A5;">
                                                    <span style="color: #64748B; font-size: 14px; font-weight: 600;">Tipo de Atividade:</span>
                                                    <span style="color: #DC2626; font-size: 14px; margin-left: 8px; font-weight: 600;">${data.activityType}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #FCA5A5;">
                                                    <span style="color: #64748B; font-size: 14px; font-weight: 600;">Data/Hora:</span>
                                                    <span style="color: #1E2939; font-size: 14px; margin-left: 8px;">${data.activityDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #FCA5A5;">
                                                    <span style="color: #64748B; font-size: 14px; font-weight: 600;">Localização:</span>
                                                    <span style="color: #1E2939; font-size: 14px; margin-left: 8px;">${data.location}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span style="color: #64748B; font-size: 14px; font-weight: 600;">Dispositivo:</span>
                                                    <span style="color: #1E2939; font-size: 14px; margin-left: 8px;">${data.device}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Required -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B;">
                                        <h4 style="color: #92400E; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">⚠️ Ação Necessária</h4>
                                        <p style="color: #92400E; margin: 0; font-size: 14px; line-height: 1.5;">
                                            Se você não reconhece esta atividade, recomendamos que você:
                                        </p>
                                        <ul style="color: #92400E; margin: 12px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                                            <li>Altere sua senha imediatamente</li>
                                            <li>Ative a autenticação de dois fatores</li>
                                            <li>Verifique se há outras sessões ativas</li>
                                            <li>Entre em contato conosco se necessário</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Buttons -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${data.changePasswordUrl}" style="display: inline-block; background-color: #DC2626; color: white; text-decoration: none; padding: 16px 32px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 8px;">
                                            Alterar Senha
                                        </a>
                                        <a href="${data.accountSettingsUrl}" style="display: inline-block; background-color: #03624C; color: white; text-decoration: none; padding: 16px 32px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 8px;">
                                            Configurações
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- This Was Me -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #64748B; font-size: 14px; margin: 0; line-height: 1.5;">
                                            Se esta atividade foi realizada por você, pode ignorar este alerta.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Divider -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="border-top: 1px solid #E2E8F0; height: 1px;"></td>
                                </tr>
                            </table>
                            
                            <!-- Support Text -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #64748B; font-size: 13px; margin: 0; line-height: 1.5;">
                                            Se você tiver dúvidas sobre a segurança da sua conta, entre em contato conosco imediatamente: <strong style="color: #DC2626;">suporte@medicineshop.com</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1E2939; color: white; padding: 30px 40px; text-align: center;">
                            <p style="font-size: 12px; color: #94A3B8; margin: 0; line-height: 1.5;">
                                Este email foi enviado para: ${data.userEmail}<br>
                                © 2024 Medicine Shop. Todos os direitos reservados.
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>`;
}

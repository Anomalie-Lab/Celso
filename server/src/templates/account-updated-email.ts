interface AccountUpdatedEmailData {
  userName: string;
  userEmail: string;
  changesSummary: string;
  loginUrl: string;
}

export function AccountUpdatedEmailHtml(data: AccountUpdatedEmailData): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conta Atualizada - Medicine Shop</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFAFA; line-height: 1.6;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #03624C; color: white; padding: 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Conta Atualizada</h1>
                            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Suas informações foram modificadas com sucesso</p>
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
                                            Sua conta foi atualizada com sucesso. Aqui está um resumo das alterações realizadas:
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Changes Summary -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FAFAFA; padding: 24px; border: 1px solid #E2E8F0;">
                                        <h3 style="color: #03624C; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Alterações Realizadas</h3>
                                        <div style="color: #64748B; font-size: 14px; line-height: 1.6;">
                                            ${data.changesSummary}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Security Notice -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B;">
                                        <h4 style="color: #92400E; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⚠️ Importante</h4>
                                        <p style="color: #92400E; margin: 0; font-size: 14px; line-height: 1.5;">
                                            Se você não realizou essas alterações, entre em contato conosco imediatamente através do email: <strong>suporte@medicineshop.com</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${data.loginUrl}" style="display: inline-block; background-color: #03624C; color: white; text-decoration: none; padding: 16px 32px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Acessar Minha Conta
                                        </a>
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
                                            Se você tiver alguma dúvida, entre em contato conosco através do email: <strong style="color: #03624C;">suporte@medicineshop.com</strong>
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

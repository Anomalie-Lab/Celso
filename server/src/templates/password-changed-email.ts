interface PasswordChangedEmailData {
  userName: string;
  userEmail: string;
  changeDate: string;
  location: string;
  device: string;
  supportUrl: string;
}

export function PasswordChangedEmailHtml(data: PasswordChangedEmailData): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senha Alterada - Medicine Shop</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFAFA; line-height: 1.6;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #10B981; color: white; padding: 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">✅ Senha Alterada</h1>
                            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Sua senha foi alterada com sucesso</p>
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
                                            Sua senha foi alterada com sucesso. Sua conta agora está protegida com a nova senha.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Change Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #ECFDF5; padding: 24px; border: 1px solid #10B981;">
                                        <h3 style="color: #10B981; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Detalhes da Alteração</h3>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #A7F3D0;">
                                                    <span style="color: #64748B; font-size: 14px; font-weight: 600;">Data/Hora:</span>
                                                    <span style="color: #1E2939; font-size: 14px; margin-left: 8px;">${data.changeDate}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #A7F3D0;">
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
                            
                            <!-- Success Message -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #ECFDF5; padding: 20px; border-left: 4px solid #10B981;">
                                        <h4 style="color: #10B981; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">🔐 Sua conta está segura</h4>
                                        <p style="color: #1E2939; margin: 0; font-size: 14px; line-height: 1.6;">
                                            Sua nova senha está ativa e sua conta está protegida. Você pode fazer login normalmente usando a nova senha.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Security Tips -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #E8F5F2; padding: 20px; border-left: 4px solid #03624C;">
                                        <h4 style="color: #03624C; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">💡 Dicas de Segurança</h4>
                                        <ul style="color: #1E2939; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                                            <li>Não compartilhe sua senha com ninguém</li>
                                            <li>Use uma senha única para cada conta</li>
                                            <li>Considere usar um gerenciador de senhas</li>
                                            <li>Ative a autenticação de dois fatores quando disponível</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Not You Alert -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B;">
                                        <h4 style="color: #92400E; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⚠️ Não foi você?</h4>
                                        <p style="color: #92400E; margin: 0; font-size: 14px; line-height: 1.5;">
                                            Se você não alterou sua senha, entre em contato conosco imediatamente através do nosso suporte.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${data.supportUrl}" style="display: inline-block; background-color: #03624C; color: white; text-decoration: none; padding: 16px 32px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            Entrar em Contato
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
                                            Se você tiver alguma dúvida sobre a segurança da sua conta, entre em contato conosco: <strong style="color: #03624C;">suporte@medicineshop.com</strong>
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

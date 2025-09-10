interface CartAbandonmentEmailData {
  userName: string;
  userEmail: string;
  cartItems: string;
  cartTotal: string;
  checkoutUrl: string;
  cartUpdatedAt: string;
}

export function CartAbandonmentEmailHtml(data: CartAbandonmentEmailData): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete seu Pedido - Medicine Shop</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAFAFA; line-height: 1.6;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #03624C; color: white; padding: 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🛒 Esqueceu algo?</h1>
                            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Seus produtos estão esperando por você</p>
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
                                            Notamos que você adicionou alguns produtos ao seu carrinho, mas não finalizou a compra. Que tal finalizar seu pedido agora?
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Cart Items -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FAFAFA; padding: 24px; border: 1px solid #E2E8F0;">
                                        <h3 style="color: #03624C; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Seus Produtos</h3>
                                        ${data.cartItems}
                                        
                                        <!-- Total -->
                                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; padding-top: 16px; border-top: 2px solid #03624C;">
                                            <tr>
                                                <td style="text-align: right;">
                                                    <span style="color: #64748B; font-size: 16px; font-weight: 600;">Total: </span>
                                                    <span style="color: #03624C; font-size: 20px; font-weight: 700;">${data.cartTotal}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Special Offer -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #FEF3C7; padding: 24px; text-align: center; border: 1px solid #F59E0B;">
                                        <h3 style="color: #92400E; margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">🎯 Oferta Especial</h3>
                                        <p style="color: #92400E; margin: 0 0 16px 0; font-size: 14px;">Complete sua compra nas próximas 24 horas e ganhe:</p>
                                        
                                        <div style="background-color: #F59E0B; color: white; padding: 12px 20px; font-weight: 600; font-size: 16px; display: inline-block; margin: 8px 0;">
                                            FRETE GRÁTIS
                                        </div>
                                        
                                        <p style="color: #92400E; margin: 12px 0 0 0; font-size: 14px; font-weight: 600;">Em compras acima de R$ 99,00</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="${data.checkoutUrl}" style="display: inline-block; background-color: #03624C; color: white; text-decoration: none; padding: 18px 40px; font-weight: 600; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 4px;">
                                            Finalizar Compra
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Why Choose Us -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1E2939; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-align: center;">Por que escolher a Medicine Shop?</h3>
                                    </td>
                                </tr>
                                
                                <!-- Feature 1 -->
                                <tr>
                                    <td style="padding: 16px; background-color: #FAFAFA; margin: 8px 0; border-left: 4px solid #03624C;">
                                        <h4 style="color: #03624C; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">🚚 Entrega Rápida</h4>
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.5;">Receba seus produtos em até 2 dias úteis</p>
                                    </td>
                                </tr>
                                
                                <!-- Feature 2 -->
                                <tr>
                                    <td style="padding: 16px; background-color: #FAFAFA; margin: 8px 0; border-left: 4px solid #03624C;">
                                        <h4 style="color: #03624C; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">🔒 Pagamento Seguro</h4>
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.5;">Transações protegidas e dados criptografados</p>
                                    </td>
                                </tr>
                                
                                <!-- Feature 3 -->
                                <tr>
                                    <td style="padding: 16px; background-color: #FAFAFA; margin: 8px 0; border-left: 4px solid #03624C;">
                                        <h4 style="color: #03624C; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">💊 Produtos Originais</h4>
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.5;">100% originais com garantia de qualidade</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Cart Info -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="background-color: #E8F5F2; padding: 20px; border-left: 4px solid #03624C;">
                                        <h4 style="color: #03624C; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">⏰ Seus produtos estão reservados</h4>
                                        <p style="color: #1E2939; margin: 0; font-size: 14px; line-height: 1.5;">
                                            Última atualização do carrinho: <strong>${data.cartUpdatedAt}</strong><br>
                                            Finalize sua compra para garantir a disponibilidade dos produtos.
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
                                            Precisa de ajuda? Entre em contato conosco: <strong style="color: #03624C;">suporte@medicineshop.com</strong>
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
                                Você está recebendo este email porque tem produtos em seu carrinho.<br>
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

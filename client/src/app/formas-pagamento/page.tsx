"use client"
import { useState } from 'react';
import { LuCreditCard, LuQrCode, LuReceipt } from 'react-icons/lu';
import PageLayout from '@/components/support/pageLayout';

export default function FormasPagamentoPage() {
  const [selectedPayment, setSelectedPayment] = useState('credit-card');

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Cartão de crédito',
      icon: LuCreditCard,
      selected: selectedPayment === 'credit-card',
      onClick: () => setSelectedPayment('credit-card')
    },
    {
      id: 'boleto',
      name: 'Boleto',
      icon: LuReceipt,
      selected: selectedPayment === 'boleto',
      onClick: () => setSelectedPayment('boleto')
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: LuQrCode,
      selected: selectedPayment === 'pix',
      onClick: () => setSelectedPayment('pix')
    }
  ];

  const renderPaymentContent = () => {
    switch (selectedPayment) {
      case 'credit-card':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              Para pagar com cartão de crédito, você deve fornecer os dados do seu cartão para autorização. 
              O processo é 100% seguro, com criptografia e sistemas modernos de segurança.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>A Hospitalar Distribuidora</strong> aceita todos os cartões de crédito e permite 
                parcelamento em até 10x sem juros.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Mais segurança em suas compras
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A <strong>Braspag</strong> é uma plataforma de pagamento online que oferece um serviço de 
                "compras inteligente" e checkout seguro com sistema antifraudes.
              </p>
              <p className="text-gray-700 leading-relaxed">
                De acordo com nossa política de privacidade, dados pessoais, bancários ou de cartão de crédito 
                não podem ser acessados por terceiros, salvo se autorizado ou por ordem judicial.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Processamento de Pagamento
              </h3>
              <p className="text-gray-700 leading-relaxed">
                O processamento de pagamento envolve procedimentos como análise de risco e compensação bancária, 
                que variam de acordo com a forma de pagamento escolhida.
              </p>
            </div>
          </div>
        );

      case 'boleto':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              O boleto bancário é uma forma de pagamento tradicional e segura. Após a confirmação do pedido, 
              você receberá um boleto para pagamento.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Vencimento:</strong> 3 dias úteis após a geração
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Como pagar com boleto
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Imprima o boleto ou copie o código de barras</li>
                <li>• Pague em qualquer banco, casa lotérica ou pela internet</li>
                <li>• Guarde o comprovante de pagamento</li>
                <li>• Aguarde a confirmação do pagamento</li>
              </ul>
            </div>
          </div>
        );

      case 'pix':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              O PIX é o sistema de pagamento instantâneo do Banco Central. Rápido, seguro e disponível 24h por dia.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Pagamento:</strong> Instantâneo e gratuito
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Como pagar com PIX
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Escaneie o QR Code ou copie a chave PIX</li>
                <li>• Abra o app do seu banco</li>
                <li>• Escolha a opção PIX</li>
                <li>• Confirme o pagamento</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Powered by</span>
              <span className="font-semibold">Banco Central</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout title="Formas de Pagamentos">
      {/* Métodos de Pagamento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={method.onClick}
              className={`p-6 rounded-lg border-1 transition-all cursor-pointer ${
                method.selected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${
                  method.selected ? 'text-primary' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  method.selected ? 'text-primary' : 'text-gray-700'
                }`}>
                  {method.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Conteúdo do Método Selecionado */}
      <div className="pt-6">
        {renderPaymentContent()}
      </div>
    </PageLayout>
  );
}

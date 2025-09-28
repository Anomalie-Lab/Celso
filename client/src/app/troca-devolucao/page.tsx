"use client"
import { useState } from 'react';
import { LuPackage, LuRefreshCw, LuShield } from 'react-icons/lu';
import PageLayout from '@/components/support/pageLayout';

export default function TrocaDevolucaoPage() {
  const [selectedOption, setSelectedOption] = useState('troca');

  const exchangeOptions = [
    {
      id: 'troca',
      name: 'Troca de Produto',
      icon: LuRefreshCw,
      selected: selectedOption === 'troca',
      onClick: () => setSelectedOption('troca')
    },
    {
      id: 'devolucao',
      name: 'Devolução',
      icon: LuPackage,
      selected: selectedOption === 'devolucao',
      onClick: () => setSelectedOption('devolucao')
    },
    {
      id: 'garantia',
      name: 'Garantia',
      icon: LuShield,
      selected: selectedOption === 'garantia',
      onClick: () => setSelectedOption('garantia')
    }
  ];

  const renderExchangeContent = () => {
    switch (selectedOption) {
      case 'troca':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              Para solicitar a troca de um produto, você deve entrar em contato conosco dentro do prazo de 7 dias úteis 
              após o recebimento. O produto deve estar em perfeitas condições, na embalagem original e com todos os acessórios.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>A Hospitalar Distribuidora</strong> oferece troca gratuita para produtos com defeito de fabricação 
                ou erro no pedido, respeitando as condições estabelecidas.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Condições para Troca
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Produto deve estar em perfeito estado de conservação</li>
                <li>• Embalagem original intacta</li>
                <li>• Todos os acessórios e manuais incluídos</li>
                <li>• Prazo máximo de 7 dias úteis após recebimento</li>
                <li>• Nota fiscal ou comprovante de compra</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Processo de Troca
              </h3>
              <p className="text-gray-700 leading-relaxed">
                O processo de troca envolve a análise do produto retornado, verificação das condições e, 
                após aprovação, o envio do novo produto ou reembolso conforme sua preferência.
              </p>
            </div>
          </div>
        );

      case 'devolucao':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              Caso não esteja satisfeito com o produto recebido, você pode solicitar a devolução e reembolso 
              dentro do prazo de 7 dias úteis após o recebimento.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Prazo:</strong> 7 dias úteis após o recebimento
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Como solicitar devolução
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Entre em contato através do nosso SAC</li>
                <li>• Informe o número do pedido</li>
                <li>• Descreva o motivo da devolução</li>
                <li>• Aguarde a autorização</li>
                <li>• Envie o produto conforme instruções</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Reembolso
              </h3>
              <p className="text-gray-700 leading-relaxed">
                O reembolso será processado após a recepção e análise do produto. O valor será devolvido 
                na mesma forma de pagamento utilizada na compra, em até 2 dias úteis após a aprovação.
              </p>
            </div>
          </div>
        );

      case 'garantia':
        return (
          <div className="space-y-6 text-justify">
            <p className="text-gray-700 leading-relaxed">
              Todos os nossos produtos possuem garantia de fábrica conforme especificado em cada item. 
              A garantia cobre defeitos de fabricação e funcionamento.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Garantia:</strong> Varia conforme o produto (consulte a descrição de cada item)
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Cobertura da Garantia
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Defeitos de fabricação</li>
                <li>• Problemas de funcionamento</li>
                <li>• Peças com defeito</li>
                <li>• Reparo ou substituição gratuita</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Processo de Garantia
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Para acionar a garantia, entre em contato conosco informando o problema e o número do pedido. 
                Nossa equipe técnica avaliará o caso e orientará sobre os próximos passos.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageLayout title="Trocas e Devoluções">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {exchangeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={option.onClick}
              className={`p-6 rounded-lg border-1 transition-all cursor-pointer ${
                option.selected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${
                  option.selected ? 'text-primary' : 'text-gray-600'
                }`} />
                <span className={`font-medium ${
                  option.selected ? 'text-primary' : 'text-gray-700'
                }`}>
                  {option.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="pt-4">
        {renderExchangeContent()}
      </div>
      <div className="mt-10 bg-primary rounded-lg p-8 text-center text-white">
        <h3 className="text-xl font-bold mb-4">
          Precisa de Ajuda?
        </h3>
        <p className="text-primary-100 mb-6 text-sm">
          Nossa equipe está pronta para auxiliar você em qualquer dúvida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1832212232"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-white rounded-lg hover:bg-white hover:text-primary transition-colors font-medium cursor-pointer"
            >
              (18) 3221-2232
            </a>
        </div>
      </div>
    </PageLayout>
  );
}

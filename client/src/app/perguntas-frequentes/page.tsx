"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { LuChevronDown, LuChevronUp, LuSearch } from 'react-icons/lu';
import PageLayout from '@/components/support/pageLayout';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function PerguntasFrequentesPage() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Como faço para rastrear meu pedido?",
      answer: "Você pode rastrear seu pedido através do código de rastreamento enviado por email ou acessando sua conta em 'Meus Pedidos'. O rastreamento fica disponível 24h após a confirmação do pagamento.",
      category: "pedidos"
    },
    {
      id: 2,
      question: "Qual o prazo de entrega?",
      answer: "O prazo de entrega varia de acordo com sua localização. Para a região Sudeste: 1-3 dias úteis. Região Sul: 2-4 dias úteis. Demais regiões: 3-7 dias úteis. Frete grátis para compras acima de R$ 170 nas regiões Sudeste e Sul.",
      category: "entrega"
    },
    {
      id: 3,
      question: "Posso cancelar meu pedido?",
      answer: "Sim, você pode cancelar seu pedido até 2 horas após a confirmação do pagamento. Após esse período, o pedido já estará em processamento e não poderá ser cancelado.",
      category: "pedidos"
    },
    {
      id: 4,
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), cartões de débito, PIX, boleto bancário e transferência bancária. Parcelamento em até 10x sem juros nos cartões de crédito.",
      category: "pagamento"
    },
    {
      id: 5,
      question: "Como funciona a garantia dos produtos?",
      answer: "Todos os nossos produtos possuem garantia de 30 dias contra defeitos de fabricação. Para produtos com garantia estendida do fabricante, o prazo pode ser maior.",
      category: "garantia"
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas as categorias' },
    { id: 'pedidos', name: 'Pedidos' },
    { id: 'entrega', name: 'Entrega' },
    { id: 'pagamento', name: 'Pagamento' },
    { id: 'garantia', name: 'Garantia' }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout title="Perguntas Frequentes">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="space-y-6 p-3">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 text-center">Filtrar por categoria:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredFAQ.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <h3 className="text-lg font-medium text-gray-900 pr-4">
                {item.question}
              </h3>
              {openItems.includes(item.id) ? (
                <LuChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <LuChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openItems.includes(item.id) && (
              <div className="px-6 pb-4">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 bg-primary rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Não encontrou o que procurava?
          </h2>
          <p className="text-primary-100 mb-6 text-sm">
            Nossa equipe está pronta para ajudar você. Entre em contato conosco.
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
      </div>
    </PageLayout>
  );
}

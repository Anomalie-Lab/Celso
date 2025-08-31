import Image from "next/image";
import { Check,Trash2, X } from "lucide-react";
import { PiBasketLight } from "react-icons/pi";
import { useState } from "react";

interface OrderSummaryItem {
  id: number;
  productName: string;
  currentPrice: string;
  originalPrice: string;
  image: string;
  discount: string;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: OrderSummaryItem[];
  deliveryMethod: 'delivery' | 'store';
  currentStep: number;
  onRemoveItem?: (id: number) => void;
  onContinueShopping?: () => void;
}

export default function OrderSummary({ 
  cartItems, 
  deliveryMethod, 
  currentStep, 
  onRemoveItem,
  onContinueShopping 
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const parsePrice = (price: string) => {
    const cleanPrice = price.replace('R$', '').trim();
    const normalizedPrice = cleanPrice.includes(',') 
      ? cleanPrice.replace(',', '.') 
      : cleanPrice;
    return parseFloat(normalizedPrice);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.currentPrice) * item.quantity, 0);
  const discount = cartItems.reduce((sum, item) => {
    const original = parsePrice(item.originalPrice) * item.quantity;
    const current = parsePrice(item.currentPrice) * item.quantity;
    return sum + (original - current);
  }, 0);
  const shipping = deliveryMethod === 'delivery' ? 15 : 0;
  const total = subtotal + shipping - couponDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      if (couponCode.toUpperCase() === 'PRIMEIRA10') {
        setAppliedCoupon(couponCode.toUpperCase());
        setCouponDiscount(subtotal * 0.1); 
        setCouponCode('');
      } else {
        alert('Cupom inválido!');
      }
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponDiscount(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 sticky top-8 w-[450px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <PiBasketLight className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Resumo do Pedido</h3>
          <p className="text-gray-600 text-xs">Confira os detalhes da sua compra</p>
        </div>
      </div>
      <div className="mb-6">
        <button
          onClick={onContinueShopping}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <PiBasketLight className="w-4 h-4" />
          <span className="text-sm font-medium">Continuar Comprando</span>
        </button>
      </div>
      
      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl relative">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm truncate">{item.productName}</h4>
              <div className="flex flex-col items-start gap-3 mt-2">
                <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-gray-900">{item.currentPrice}</span>
                <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {item.discount}
                </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">Qtd: {item.quantity}</span>
              </div>
            </div>
            {/* Botão Excluir */}
            <button
              onClick={() => onRemoveItem?.(item.id)}
              className="absolute top-3 right-5 w-8 h-8 border border-gray-200 hover:bg-primary group rounded-full flex items-center justify-center cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        ))}
      </div>

      {/* Cupom de Desconto */}
      <div className="mb-6 p-6 rounded-xl border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">%</span>
          </div>
          <span className="text-sm font-semibold text-primary">Cupom de Desconto</span>
        </div>
        
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Digite seu cupom"
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Aplicar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Cupom {appliedCoupon} aplicado!</span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <p className="text-xs text-gray-600 mt-3">
          Use o código <span className="font-bold text-primary">PRIMEIRA10</span> e ganhe 10% de desconto
        </p>
      </div>

      <div className="space-y-4 border-t border-gray-200 py-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-semibold">R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Desconto Produtos</span>
          <span className="text-green-600 font-semibold">-R$ {discount.toFixed(2)}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Desconto Cupom</span>
            <span className="text-green-600 font-semibold">-R$ {couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Frete</span>
          <span className="text-gray-900 font-semibold">{shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4">
          <span className="text-gray-900">Total</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {currentStep === 4 && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
          <div className="flex items-center gap-3 text-green-800 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Pedido processado com sucesso!</span>
          </div>
          <p className="text-green-700 text-sm mb-3">
            Número do pedido: <span className="font-bold">#12345</span>
          </p>
          <p className="text-green-600 text-xs">
            Você receberá um e-mail de confirmação em breve
          </p>
        </div>
      )}

      {/* Informações de Segurança */}
      <div className="mt-8 p-2">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Segurança da Compra</h4>
        <p className="text-xs text-gray-400 leading-relaxed text-justify">
          Sua compra está protegida. Utilizamos conexão segura (SSL) e criptografia de dados para garantir a confidencialidade das suas informações durante todo o processo de pagamento.
        </p>
      </div>
    </div>
  );
}


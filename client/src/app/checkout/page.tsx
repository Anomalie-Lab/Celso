"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CreditCard, Truck, Mail, Phone, User, ShoppingBag,} from "lucide-react";
import { useCheckout } from "@/hooks/useCheckout";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import OrderSummary from "@/components/checkout/OrderSummary";
import { PiBarcode, PiPixLogo } from "react-icons/pi";



export default function CheckoutPage() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    steps,
    updateFormData,
    validateStep,
    nextStep,
    prevStep,
  } = useCheckout();

  const cartItems = [
    {
      id: 1,
      productName: "Diuretik Black MI",
      currentPrice: "R$ 120,32",
      originalPrice: "R$ 240,64",
      image: "/images/productImg.webp",
      discount: "50% OFF",
      quantity: 2,
    },
  ];

  const handleRemoveItem = (id: number) => {
    console.log('Remover item:', id);
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-white p-16">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-6">
        {/* Header Elegante */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">Finalizar Compra</h1>
                <p className="text-gray-500 mt-1">Complete seu pedido em poucos passos</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Progress Steps */}
        <CheckoutSteps steps={steps} currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>
                      <p className="text-gray-600 text-sm">Preencha seus dados para continuar</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Nome
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Sobrenome
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Seu sobrenome"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <label className="block text-sm font-semibold text-gray-700">
                      E-mail
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-6">
                    <label className="block text-sm font-semibold text-gray-700">
                      Telefone
                    </label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery */}
              {currentStep === 2 && (
                <div className="p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Método de Entrega</h2>
                      <p className="text-gray-600 text-sm">Escolha como receber seu pedido</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <button
                      onClick={() => updateFormData('deliveryMethod', 'delivery')}
                      className={`p-6 border rounded-2xl transition-all duration-300 group cursor-pointer ${
                        formData.deliveryMethod === 'delivery'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          formData.deliveryMethod === 'delivery' ? 'bg-primary' : 'bg-gray-100 group-hover:bg-primary/10'
                        }`}>
                          <Truck className={`w-6 h-6 ${
                            formData.deliveryMethod === 'delivery' ? 'text-white' : 'text-gray-600 group-hover:text-primary'
                          }`} />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">Entrega em Casa</p>
                          <p className="text-sm text-gray-500">Receba no conforto do seu lar</p>
                        </div>
                      </div>
                    </button>

                  </div>

                  {formData.deliveryMethod === 'delivery' && (
                    <div className="space-y-6  p-6 rounded-2xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Endereço de Entrega</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">CEP</label>
                          <input
                            type="text"
                            value={formData.cep}
                            onChange={(e) => updateFormData('cep', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            placeholder="00000-000"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Cidade</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateFormData('city', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            placeholder="Sua cidade"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Endereço</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                          placeholder="Rua, número, complemento"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Bairro</label>
                          <input
                            type="text"
                            value={formData.neighborhood}
                            onChange={(e) => updateFormData('neighborhood', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            placeholder="Seu bairro"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Estado</label>
                          <select 
                            value={formData.state}
                            onChange={(e) => updateFormData('state', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                          >
                            <option value="">Selecione o estado</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="PR">Paraná</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.deliveryMethod === 'store' && (
                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
                      <h3 className="text-lg font-semibold text-gray-900">Selecionar Loja</h3>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Loja mais próxima</label>
                        <select 
                          value={formData.storeLocation || ''}
                          onChange={(e) => updateFormData('storeLocation', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                        >
                          <option value="">Selecione uma loja</option>
                          <option value="shopping-paulista">Shopping Paulista - São Paulo</option>
                          <option value="shopping-morumbi">Shopping Morumbi - São Paulo</option>
                          <option value="shopping-west-plaza">Shopping West Plaza - São Paulo</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Método de Pagamento</h2>
                      <p className="text-gray-600 text-sm">Escolha a forma de pagamento</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <button
                      onClick={() => updateFormData('paymentMethod', 'card')}
                      className={`w-full p-6 border rounded-2xl transition-all duration-300 group cursor-pointer ${
                        formData.paymentMethod === 'card'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                          <CreditCard className={`w-6 h-6 ${
                            formData.paymentMethod === 'card' ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                          }`} />
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">Cartão de Crédito</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard, Elo</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => updateFormData('paymentMethod', 'pix')}
                      className={`w-full p-6 border rounded-2xl transition-all duration-300 group cursor-pointer ${
                        formData.paymentMethod === 'pix'
                          ? 'border-primary bg-primary/5 '
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                      <PiPixLogo className={`w-8 h-8 ${formData.paymentMethod === 'pix' ? 'text-primary' : 'text-gray-400'}`}/>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">PIX</p>
                          <p className="text-sm text-gray-500">Pagamento instantâneo</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => updateFormData('paymentMethod', 'boleto')}
                      className={`w-full p-6 border rounded-2xl transition-all duration-300 group cursor-pointer ${
                        formData.paymentMethod === 'boleto'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                      <PiBarcode className={`w-8 h-8 ${formData.paymentMethod === 'boleto' ? 'text-primary' : 'text-gray-400'}`}/>
                        <div className="text-left">
                          <p className="font-semibold text-gray-900">Boleto Bancário</p>
                          <p className="text-sm text-gray-500">Vencimento em 3 dias</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-6 p-10 rounded-2xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Dados do Cartão</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Número do Cartão</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => updateFormData('cardNumber', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Validade</label>
                            <input
                              type="text"
                              value={formData.cardExpiry}
                              onChange={(e) => updateFormData('cardExpiry', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                              placeholder="MM/AA"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">CVV</label>
                            <input
                              type="text"
                              value={formData.cardCvv}
                              onChange={(e) => updateFormData('cardCvv', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">Nome no Cartão</label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => updateFormData('cardName', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                            placeholder="Nome como está no cartão"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'pix' && (
                    <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
                      <div className="flex items-center gap-3 mb-3">
                      <PiPixLogo className="w-6 h-6 text-primary"/>
                        <h3 className="text-lg font-semibold text-green-800">Pagamento PIX</h3>
                      </div>
                      <p className="text-green-700 text-sm">
                        Após confirmar o pedido, você receberá o QR Code do PIX para pagamento instantâneo.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'boleto' && (
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-3">
                      <PiBarcode className="w-6 h-6 text-blue-800"/>
                        <h3 className="text-lg font-semibold text-blue-800">Boleto Bancário</h3>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Após confirmar o pedido, você receberá o boleto bancário com vencimento em 3 dias úteis.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="p-12 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pedido Confirmado!</h2>
                  <p className="text-gray-600 text-sm mb-8">Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.</p>
                  
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-200 max-w-md mx-auto">
                    <p className="text-green-800 font-semibold">Número do pedido: #12345</p>
                    <p className="text-green-700 text-sm mt-1">Guarde este número para acompanhar seu pedido</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between p-8 pt-6 border-t border-gray-100">
                {currentStep > 1 && currentStep < 4 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-3 px-8 py-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semiboldtext-sm cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </button>
                )}
                
                {currentStep < 4 && (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ml-auto text-sm cursor-pointer"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                  {currentStep >=4 && (
                    <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className="flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ml-auto text-sm cursor-pointer"
                  >
                    Acompanhar Pedido
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary 
            cartItems={cartItems}
            deliveryMethod={formData.deliveryMethod}
            currentStep={currentStep}
            onRemoveItem={handleRemoveItem}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </div>
    </div>
  );
}

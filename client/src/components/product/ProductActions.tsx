"use client";

import { LuHeart, LuShare2, LuLoader, LuPlus, LuMinus, LuTruck, LuMapPin } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ShieldCheck } from "lucide-react";
import { useShipping } from "@/hooks/shipping.hook";

interface ProductActionsProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
  onShare: () => void;
  isAddingToCart: boolean;
  isInWishlist: boolean;
  isItemAdding: boolean;
  isItemRemoving: boolean;
  productId: number;
}

export function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
  onWishlistToggle,
  onShare,
  isAddingToCart,
  isInWishlist,
  isItemAdding,
  isItemRemoving
}: ProductActionsProps) {
  const { cep, shippingInfo, isLoading: isCalculatingShipping, handleCepChange, getShippingCost } = useShipping();
  const handleQuantityIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const isWishlistLoading = isItemAdding || isItemRemoving;

  return (
    <div className="space-y-6">
      {/* Quantidade */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quantidade</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowe cursor-pointer"
          >
            <LuMinus className="w-4 h-4" />
          </button>
          <span className="w-16 text-center font-medium">{quantity}</span>
          <button
            onClick={handleQuantityIncrease}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer"
          >
            <LuPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CEP e Frete */}
      <div className="py-3">
        <p className="text-sm font-semibold text-gray-800 mb-2">Calcular frete</p>
        <InputOTP maxLength={8} value={cep} onChange={handleCepChange} disabled={isCalculatingShipping}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="border-gray-300" />
            <InputOTPSlot index={1} className="border-gray-300" />
            <InputOTPSlot index={2} className="border-gray-300" />
            <InputOTPSlot index={3} className="border-gray-300" />
            <InputOTPSlot index={4} className="border-gray-300" />
            <InputOTPSlot index={5} className="border-gray-300" />
            <InputOTPSlot index={6} className="border-gray-300" />
            <InputOTPSlot index={7} className="border-gray-300" />
          </InputOTPGroup>
        </InputOTP>

        {isCalculatingShipping && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <LuLoader className="w-4 h-4 animate-spin text-primary" />
            Calculando frete...
          </div>
        )}

        {shippingInfo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
            <div className="flex items-start gap-2">
              <LuMapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  {shippingInfo.localidade} - {shippingInfo.bairro}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Frete: R$ {getShippingCost().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {cep.length === 8 && !shippingInfo && !isCalculatingShipping && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-red-600">
              CEP não encontrado. Verifique e tente novamente.
            </p>
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="space-y-3">
        <Button
          onClick={onAddToCart}
          disabled={isAddingToCart}
          className="w-full h-14 cursor-pointer text-md font-medium rounded-lg bg-primary text-white "
        >
          {isAddingToCart ? (
            <>
              <LuLoader className="w-7 h-7 animate-spin mr-2" />
              Adicionando...
            </>
          ) : (
            <>
              <PiBasketLight className="w-7 h-7 mr-2" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onWishlistToggle}
            disabled={isWishlistLoading}
            className="flex-1 h-12 cursor-pointer rounded-lg border-gray-300"
          >
            {isWishlistLoading ? (
              <LuLoader className="w-5 h-5 animate-spin" />
            ) : (
              <LuHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
            )}
          </Button>
          <Button variant="outline" onClick={onShare} className="flex-1 cursor-pointer rounded-lg border-gray-300 h-12">
            <LuShare2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <LuTruck className="w-5 h-5" />
          <span>Frete grátis para compras acima de <strong>R$ 99</strong></span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <ShieldCheck className="w-5 h-5" />
          <span>Garantia de <strong>30 dias</strong></span>
        </div>
      </div>
    </div>
  );
}

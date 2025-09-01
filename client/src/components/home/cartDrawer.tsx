"use client";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LuX, LuTrash2, LuPlus, LuMinus, LuMapPin, LuTruck } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { useDrawer } from "@/hooks/useDrawer";
import { useCart } from "@/hooks/cart.hook";
import { useShipping } from "@/hooks/shipping.hook";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { CartDrawerSkeleton } from "@/components/ui/cartDrawerSkeleton";

interface CartProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

export default function Cart({ isOpen, toggleDrawer }: CartProps) {
  useDrawer(isOpen);
  const { cart, isLoading, cartTotal, cartItemsCount, updateCartItem, removeFromCart, clearCart, isUpdatingCart, isRemovingFromCart } = useCart();

  const { cep, shippingInfo, isCalculatingShipping, handleCepChange, getShippingCost } = useShipping();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleQuantityChange = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateCartItem(itemId, { quantity: newQuantity });
    } else {
      removeFromCart(itemId);
    }
  };

  if (isLoading) {
    return (
      <Drawer open={isOpen} onClose={toggleDrawer} size={450} direction="right" className="!bg-white drawer-panel" overlayClassName="drawer-overlay">
        <CartDrawerSkeleton />
      </Drawer>
    );
  }

  return (
    <Drawer open={isOpen} onClose={toggleDrawer} size={450} direction="right" className="!bg-white drawer-panel" overlayClassName="drawer-overlay">
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Meu Carrinho</h2>
            {cartItemsCount > 0 && <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{cartItemsCount}</span>}
          </div>
          <button onClick={toggleDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <LuX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto drawer-content">
          {!cart?.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <PiBasketLight className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Seu carrinho está vazio</h3>
              <p className="text-gray-500 text-sm">Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.product.images?.[0] || "/placeholder-product.jpg"} width={64} height={64} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm truncate">{item.product.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.size} • {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={isUpdatingCart} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">
                          {isUpdatingCart ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                          ) : (
                            <LuMinus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity, 1)} disabled={isUpdatingCart} className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">
                          {isUpdatingCart ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                          ) : (
                            <LuPlus className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{formatPrice(Number(item.product.price) * item.quantity)}</p>
                        <p className="text-xs text-gray-500">{formatPrice(Number(item.product.price))} cada</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} disabled={isRemovingFromCart} className="text-gray-400 hover:text-red-500 p-1 disabled:opacity-50">
                    {isRemovingFromCart ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <LuTrash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart?.items && cart.items.length > 0 && (
          <div className="p-8 border-t border-gray-200 flex-shrink-0">
            <div className="flex flex-col gap-4">
              <div>
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
              </div>

              {isCalculatingShipping && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Calculando frete...
                </div>
              )}

              {shippingInfo && shippingInfo.found && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <LuMapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">
                        {shippingInfo.city} - {shippingInfo.neighborhood}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {shippingInfo && !shippingInfo.found && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">CEP não encontrado. Verifique e tente novamente.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 mt-6">
              <span className="text-sm font-semibold text-gray-800">Subtotal</span>
              <span className="text-md font-semibold text-gray-800">{formatPrice(cartTotal)}</span>
            </div>

            {shippingInfo && shippingInfo.found && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Frete</span>
                <span className="text-sm font-medium text-gray-800">R$ 9,99</span>
              </div>
            )}

            <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <span className="text-lg font-semibold text-gray-800">{formatPrice(cartTotal + getShippingCost())}</span>
            </div>

            <button className="w-full bg-primary text-white py-4 px-4 rounded-full font-regular flex items-center justify-center gap-3 text-sm cursor-pointer hover:bg-primary-600 transition-colors">
              <PiBasketLight className="w-5 h-5" />
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}

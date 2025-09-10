"use client";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LuX, LuTrash2, LuPlus, LuMinus, LuMapPin, LuLoader, LuHeart } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { useDrawer } from "@/hooks/useDrawer";
import { useCart } from "@/hooks/cart.hook";
import { useShipping } from "@/hooks/shipping.hook";
import { useUser } from "@/hooks/user.hook";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CartDrawerSkeleton } from "@/components/ui/cartDrawerSkeleton";
import { ModalAuth } from "../auth/modal.auth";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/hooks/wishlist.hook";

interface UnifiedCartItem {
  id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
  };
}

interface CartProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

type AuthPage = "Login" | "Register" | "ForgotPass";

export default function Cart({ isOpen, toggleDrawer }: CartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("Login");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useDrawer(isOpen);
  const { 
    cart, 
    isLoading, 
    cartTotal, 
    cartItemsCount, 
    updateCartItem, 
    removeFromCart, 
    isItemLoading,
    isItemRemoving: isCartItemRemoving
  } = useCart();
  const { user } = useUser();
  const { cep, shippingInfo, isLoading: isCalculatingShipping, handleCepChange, getShippingCost } = useShipping();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleQuantityChange = (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateCartItem({ itemId, data: { quantity: newQuantity } });
    } else {
      removeFromCart(itemId);
    }
  };

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  
  const toggleAuthPage = (authPage: AuthPage) => {
    setAuthPage(authPage);
  };

  const { addToWishlist, removeFromWishlist, isInWishlist, isItemAdding, isItemRemoving, wishlist } = useWishlist();


  // Não renderizar o Drawer até que o componente esteja montado no cliente
  if (!isMounted) {
    return null;
  }

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
                  {!user ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-gray-500 text-sm mb-6 px-5"> Faça login para salvar seus itens e continuar comprando de onde parou</p>
                      <button 
                        onClick={() => {
                          toggleDialog();
                          toggleAuthPage("Login");
                        }}
                          className="py-3 px-8 bg-primary text-white rounded-full font-medium transition-colors text-sm cursor-pointer flex items-center justify-center gap-2 active:scale-105"
                      >
                        <LogIn className="w-4 h-4" />
                        Fazer Login
                      </button>   
                    </div>     
                  ) : (
                    <p className="text-gray-500 text-sm mb-6">Adicione produtos para começar suas compras</p>
                  )}
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item: UnifiedCartItem) => (
                <div key={item.id} className="group rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-300 cursor-pointer bg-white relative">
                  <div className="flex p-3">
                    <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0 flex items-center justify-center rounded-lg" onClick={() => {router.push(`/produto/${item.product.id}`);toggleDrawer()}}>
                      <Image 
                        src={item.product.images?.[0] || "/placeholder-product.jpg"} 
                        width={80} 
                        height={80} 
                        alt={item.product.title} 
                        className="max-w-full max-h-full object-contain" 
                      />    
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(item.product.id)) {
                            const wishlistItem = wishlist?.items?.find((wishItem: { id: number; product: { id: number } }) => wishItem.product.id === item.product.id);
                            if (wishlistItem) {
                              removeFromWishlist(wishlistItem.id);
                            }
                          } else {
                            addToWishlist({
                              product_id: item.product.id,
                              product: {
                                title: item.product.title,
                                price: item.product.price,
                                images: item.product.images
                              }
                            });
                          }
                        }}
                        disabled={isItemAdding(item.product.id) || isItemRemoving(item.product.id)}
                        className={`absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-30 cursor-pointer shadow-sm ${isInWishlist(item.product.id) ? 'text-red-500' : 'text-gray-800'} ${(isItemAdding(item.product.id) || isItemRemoving(item.product.id)) ? 'opacity-50' : ''}`}
                      >
                        {(isItemAdding(item.product.id) || isItemRemoving(item.product.id)) ? (
                          <LuLoader className="w-3 h-3 animate-spin" />
                        ) : (
                          <LuHeart className={`w-3 h-3 ${isInWishlist(item.product.id) ? 'fill-current' : ''}`} />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex-1 p-3 min-w-0">
                      <div className="mb-2">
                        <Link href={`/produto/${item.product.id}`} className="font-medium text-gray-800 text-sm leading-tight line-clamp-2 mb-1 hover:underline" onClick={() => toggleDrawer()}>
                          {item.product.title}
                        </Link>
                        <p className="text-gray-500 text-xs">
                          {item.size} • {item.color}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-bold text-sm">
                              {formatPrice(Number(item.product.price) * item.quantity)}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs">
                            {formatPrice(Number(item.product.price))} cada
                          </p>
                        </div>
                        
                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)} 
                            disabled={isItemLoading(item.id)} 
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                          >
                            {isItemLoading(item.id) ? (
                              <LuLoader className="w-3 h-3 animate-spin text-gray-600" />
                            ) : (
                              <LuMinus className="w-3 h-3" />
                            )}
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)} 
                            disabled={isItemLoading(item.id)} 
                            className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                          >
                            {isItemLoading(item.id) ? (
                              <LuLoader className="w-3 h-3 animate-spin text-gray-600" />
                            ) : (
                              <LuPlus className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      disabled={isCartItemRemoving(item.id)} 
                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-30 cursor-pointer shadow-sm text-gray-400 hover:text-red-500 disabled:opacity-50"
                    >
                      {isCartItemRemoving(item.id) ? (
                        <LuLoader className="w-3 h-3 animate-spin text-red-500" />
                      ) : (
                        <LuTrash2 className="w-3 h-3" />
                      )}
                    </button>
                  </div>
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
                  <LuLoader className="w-4 h-4 animate-spin text-primary" />
                  Calculando frete...
                </div>
              )}

              {shippingInfo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <LuMapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">
                        {shippingInfo.localidade} - {shippingInfo.bairro}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {cep.length === 8 && !shippingInfo && !isCalculatingShipping && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">CEP não encontrado. Verifique e tente novamente.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4 mt-6">
              <span className="text-sm font-semibold text-gray-800">Subtotal</span>
              <span className="text-md font-semibold text-gray-800">{formatPrice(cartTotal)}</span>
            </div>

            {shippingInfo && (
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
      <ModalAuth isOpen={isDialogOpen} toggleDialog={toggleDialog} authPage={authPage} onAuthPageChange={toggleAuthPage} />
    </Drawer>
  );
}

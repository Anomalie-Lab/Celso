"use client";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LuX, LuHeart, LuLoader, LuEye } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { useDrawer } from "@/hooks/useDrawer";
import { useWishlist } from "@/hooks/wishlist.hook";
import { useCart } from "@/hooks/cart.hook";
import Image from "next/image";
import { WishlistDrawerSkeleton } from "@/components/ui/wishlistDrawerSkeleton";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface WishListProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function WishListDrawer({ isOpen, toggleDrawer }: WishListProps) {
    useDrawer(isOpen);
    const { wishlist, isLoading, wishlistItemsCount, removeFromWishlist, isItemRemoving } = useWishlist();
    const { addToCart, isAddingToCart } = useCart();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleAddToCart = (item: { product: { id: number; title: string; price: number; images?: string[] } }) => {
        addToCart({ 
            product_id: item.product.id,
            product: {
                title: item.product.title,
                price: item.product.price,
                images: item.product.images
            }
        });
        toast.success('Produto adicionado ao carrinho!');
    };

    const handleAddAllToCart = () => {
        if (wishlist?.items) {
            wishlist.items.forEach(item => {
                addToCart({ 
                    product_id: item.product.id,
                    product: {
                        title: item.product.title,
                        price: item.product.price,
                        images: item.product.images
                    }
                });
            });
            toast.success('Todos os produtos adicionados ao carrinho!');
        }
    };

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            size={450}
            direction='right'
            className="!bg-white drawer-panel"
            overlayClassName="drawer-overlay"
        >
            <div className="h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Minha Lista de Desejos</h2>
                        {wishlistItemsCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{wishlistItemsCount}</span>}
                    </div>
                    <button 
                        onClick={toggleDrawer}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <LuX className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto drawer-content">
                    {isLoading ? (
                        <WishlistDrawerSkeleton />
                    ) : !wishlist?.items || wishlist.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <LuHeart className="w-16 h-16 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                Sua lista de desejos está vazia
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Adicione produtos que você gostaria de comprar
                            </p>
                            <button 
                                className="py-3 px-6 border border-gray-200 text-gray-600 rounded-full font-medium transition-colors text-sm cursor-pointer"
                            >
                                Explorar Produtos
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {wishlist.items.map((item: { id: number; product: { id: number; title: string; price: number; images?: string[]; brand?: string; last_price?: number; installments?: number } }) => (
                                <div key={item.id} className="group rounded-lg border border-gray-200 overflow-hidden hover:border-gray-200 transition-all duration-300 cursor-pointer bg-white relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                        <div className="absolute bottom-3 right-3 flex gap-2">
                                            <button 
                                                className="bg-white/90 backdrop-blur-sm text-gray-800 py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white hover:scale-105 text-xs cursor-pointer"
                                                onClick={() => {
                                                    router.push(`/produto/${item.product.id}`);
                                                    toggleDrawer();
                                                }}
                                            >
                                                <LuEye className="w-4 h-4 text-gray-500" />
                                                Ver
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleAddToCart(item)}
                                                disabled={isAddingToCart}
                                                className="bg-primary text-white py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-primary-600 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs"
                                            >
                                                {isAddingToCart ? (
                                                    <LuLoader className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <PiBasketLight className="w-4 h-4" />
                                                )}
                                                {isAddingToCart ? 'Adicionando...' : 'Adicionar'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex p-2">
                                        <div className="relative w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                            <Image 
                                                src={item.product.images?.[0] || "/placeholder-product.jpg"} 
                                                width={96} 
                                                height={96} 
                                                alt={item.product.title} 
                                                className="max-w-full max-h-full object-contain"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/placeholder-product.jpg';
                                                }}
                                            />
                                            
                                            <button 
                                                onClick={() => removeFromWishlist(item.id)}
                                                disabled={isItemRemoving(item.id)}
                                                className={`absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-30 shadow-sm cursor-pointer ${isItemRemoving(item.id) ? 'opacity-50' : ''}`}
                                            >
                                                {isItemRemoving(item.id) ? (
                                                    <LuLoader className="w-3 h-3 animate-spin text-red-500" />
                                                ) : (
                                                    <LuHeart className="w-3 h-3 fill-current text-red-500" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex-1 p-3 min-w-0">
                                            <div className="mb-2">
                                                <h3 className="font-regular text-gray-800 text-sm leading-tight line-clamp-2 mb-1">
                                                    {item.product.title}
                                                </h3>
                                                {item.product.brand && (
                                                    <p className="text-gray-500 text-xs">{item.product.brand}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-800 font-bold text-md">
                                                            {formatPrice(Number(item.product.price))}
                                                        </span>
                                                        {item.product.last_price && Number(item.product.last_price) > Number(item.product.price) && (
                                                            <span className="text-gray-400 text-xs line-through">
                                                                {formatPrice(Number(item.product.last_price))}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-500 text-xs mb-3">
                                                        ou {item.product.installments || 12}x de {formatPrice(Number(item.product.price) / (item.product.installments || 12))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {wishlist?.items && wishlist.items.length > 0 && (
                    <div className="p-6 border-t border-gray-200 flex-shrink-0">
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handleAddAllToCart}
                                disabled={isAddingToCart}
                             className="w-full bg-primary text-white py-4 px-4 rounded-full font-regular flex items-center justify-center gap-3 text-sm cursor-pointer hover:bg-primary-600 transition-colors"
                            >
                                {isAddingToCart ? (
                                    <LuLoader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <PiBasketLight className="w-4 h-4" />
                                )}
                                {isAddingToCart ? 'Adicionando...' : 'Adicionar Todos ao Carrinho'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Drawer>
    );
}

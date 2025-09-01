"use client";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LuX, LuHeart, LuTrash2, LuLoader } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { useDrawer } from "@/hooks/useDrawer";
import { useWishlist } from "@/hooks/wishlist.hook";
import { useCart } from "@/hooks/cart.hook";
import Image from "next/image";
import { WishlistDrawerSkeleton } from "@/components/ui/wishlistDrawerSkeleton";
import { toast } from "sonner";

interface WishListProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function WishListDrawer({ isOpen, toggleDrawer }: WishListProps) {
    useDrawer(isOpen);
    const { wishlist, isLoading, wishlistItemsCount, removeFromWishlist, isItemRemoving } = useWishlist();
    const { addToCart, isAddingToCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleAddToCart = (item: any) => {
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
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {wishlist.items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image 
                                            src={item.product.images?.[0] || "/placeholder-product.jpg"} 
                                            width={64} 
                                            height={64} 
                                            alt={item.product.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-800 text-sm truncate">{item.product.title}</h4>
                                        <p className="text-gray-500 text-xs mt-1">{item.product.brand}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-sm font-medium text-gray-800">
                                                {formatPrice(Number(item.product.price))}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleAddToCart(item)}
                                                    disabled={isAddingToCart}
                                                    className="text-primary hover:text-primary-600 p-1 disabled:opacity-50 cursor-pointer"
                                                >
                                                    {isAddingToCart ? (
                                                        <LuLoader className="w-4 h-4 animate-spin text-primary" />
                                                    ) : (
                                                        <PiBasketLight className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button 
                                                    onClick={() => removeFromWishlist(item.id)}
                                                    disabled={isItemRemoving(item.id)}
                                                    className="text-gray-400 hover:text-red-500 p-1 disabled:opacity-50 cursor-pointer"
                                                >
                                                    {isItemRemoving(item.id) ? (
                                                        <LuLoader className="w-4 h-4 animate-spin text-red-500" />
                                                    ) : (
                                                        <LuTrash2 className="w-4 h-4" />
                                                    )}
                                                </button>
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
                                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-3 text-sm cursor-pointer hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

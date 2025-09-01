"use client"

import { useWishlist } from "@/hooks/wishlist.hook";
import { useCart } from "@/hooks/cart.hook";
import Image from "next/image";
import { LuHeart, LuTrash2, LuLoader } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { toast } from "sonner";
import { useState } from "react";
import { WishlistSkeleton } from "@/components/ui/wishlistSkeleton";
import { WishlistItem } from "@/api/wishlist.api";

export default function WishesPage() {
  const { wishlist, isLoading, wishlistItemsCount, removeFromWishlist, isRemovingFromWishlist } = useWishlist();
  const { addToCart, isAddingToCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlistItemsCount) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist?.items?.map((item: WishlistItem) => item.id) || []);
    }
  };

  const handleSelectItem = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(itemId => {
      removeFromWishlist(itemId);
    });
    setSelectedItems([]);
    toast.success('Produtos removidos da lista de desejos!');
  };

  const handleAddToCart = (item: WishlistItem) => {
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

  const handleRemoveFromWishlist = (itemId: number) => {
    removeFromWishlist(itemId);
    toast.success('Produto removido da lista de desejos!');
  };

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lista de Desejos</h1>
          <p className="text-gray-600">Seus produtos favoritos salvos</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{wishlistItemsCount} produtos</span>
        </div>
      </div>

      {wishlist?.items && wishlist.items.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                checked={selectedItems.length === wishlistItemsCount && wishlistItemsCount > 0}
                onChange={handleSelectAll}
              />
              <span className="text-sm font-regular text-gray-700 cursor-pointer">Selecionar Todos</span>
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRemoveSelected}
              disabled={selectedItems.length === 0 || isRemovingFromWishlist}
              className="px-4 py-3 border border-gray-300 rounded-lg transition-colors text-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRemovingFromWishlist ? (
                <LuLoader className="w-4 h-4 animate-spin" />
              ) : (
                <LuTrash2 className="w-4 h-4 text-gray-500" />
              )}
              Remover Selecionados ({selectedItems.length})
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.items?.map((item: WishlistItem) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <Image
                src={item.product.images?.[0] || "/placeholder-product.jpg"}
                width={1080}
                height={1080}
                alt={item.product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-product.jpg';
                }}
              />
              <div className="absolute top-3 right-3">
                <button 
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  disabled={isRemovingFromWishlist}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isRemovingFromWishlist ? (
                    <LuLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LuHeart className="w-4 h-4 text-red-500 fill-current" />
                  )}
                </button>
              </div>
              <div className="absolute top-3 left-3">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {item.product.title}
                </h3>
                <button 
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  disabled={isRemovingFromWishlist}
                  className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isRemovingFromWishlist ? (
                    <LuLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LuTrash2 className="w-4 h-4" />
                  )}
                </button>
              </div>

              {item.product.brand && (
                <p className="text-gray-500 text-xs mb-3">{item.product.brand}</p>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-800">
                  {formatPrice(Number(item.product.price))}
                </span>
                {item.product.last_price && Number(item.product.last_price) > Number(item.product.price) && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(Number(item.product.last_price))}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleAddToCart(item)}
                  disabled={isAddingToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg transition-colors text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <LuLoader className="w-4 h-4 animate-spin" />
                  ) : (
                    <PiBasketLight className="w-4 h-4" />
                  )}
                  {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!wishlist?.items || wishlist.items.length === 0) && (
        <div className="text-center py-12">
          <LuHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Sua lista de desejos está vazia</h3>
          <p className="text-gray-500 mb-6">
            Adicione produtos à sua lista de desejos para encontrá-los facilmente depois
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer">
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
}

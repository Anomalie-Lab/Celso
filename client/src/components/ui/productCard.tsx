import Image from "next/image";
import { LuHeart, LuLoader } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { useCart } from "@/hooks/cart.hook";
import { useWishlist } from "@/hooks/wishlist.hook";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductCard({ data }: { data: Product.SimpleI }) {
  const router = useRouter();
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isItemAdding, isItemRemoving, wishlist } = useWishlist();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getProductImage = () => {
    return data.images?.[0] || '/placeholder-product.jpg';
  };

  // const getCategoryBadge = () => {
  //   if (data.categories && data.categories.length > 0) {
  //     const categoryColors = {
  //       'MEDICAMENTOS': 'bg-red-100 text-red-600',
  //       'EQUIPAMENTOS': 'bg-blue-100 text-blue-600',
  //       'CONSUMIVEIS': 'bg-green-100 text-green-600',
  //       'SUPLEMENTOS': 'bg-purple-100 text-purple-600',
  //       'COSMETICOS': 'bg-pink-100 text-pink-600',
  //       'HIGIENE': 'bg-yellow-100 text-yellow-600'
  //     };
      
  //     const mainCategory = Array.isArray(data.categories) ? data.categories[0] : data.categories;
  //     return categoryColors[mainCategory as keyof typeof categoryColors] || 'bg-gray-100 text-gray-600';
  //   }
  //   return data.flags?.[0] ? 'bg-primary-100 text-primary-500' : '';
  // };

  const getMainCategory = () => {
    if (data.categories && data.categories.length > 0) {
      return Array.isArray(data.categories) ? data.categories[0] : data.categories;
    }
    return null;
  };

  return (
    <div className="rounded-lg h-[350px] md:h-[450px] lg:h-[470px] p-3 sm:p-4 md:p-6 lg:p-8 relative w-full transition-shadow cursor-pointer border border-gray-200 flex flex-col">

      {!getMainCategory() && data.flags?.[0] && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary-100 text-primary-500 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full z-10">
          {data.flags[0]}
        </div>
      )}

      <button 
        onClick={() => {
          if (isInWishlist(data.id)) {
            const wishlistItem = wishlist?.items?.find((item: { id: number; product: { id: number } }) => item.product.id === data.id);
            if (wishlistItem) {
              removeFromWishlist(wishlistItem.id);
            }
          } else {
            addToWishlist({ 
              product_id: data.id,
              product: {
                title: data.title,
                price: data.price,
                images: data.images
              }
            });
          }
        }}
        disabled={isItemAdding(data.id) || isItemRemoving(data.id)}
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 shadow-sm active:scale-110 cursor-pointer ${isInWishlist(data.id) ? 'text-red-500' : 'text-gray-800'} ${(isItemAdding(data.id) || isItemRemoving(data.id)) ? 'opacity-50' : ''}`}
      >
        {(isItemAdding(data.id) || isItemRemoving(data.id)) ? (
          <LuLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : (
          <LuHeart className={`text-gray-500 w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist(data.id) ? 'fill-current text-red-500' : ''}`} />
        )}
      </button>

      <div className="relative mb-2 sm:mb-3 md:mb-4">
        <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48 bg-gray-100 rounded-lg overflow-hidden relative" onClick={() => router.push(`/produto/${data.id}`)}>
          <Image
            src={getProductImage()}
            width={300}
            height={300}
            alt={data.title}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {data.brand && (
            <p className="text-gray-500 text-xs mb-1 sm:mb-2">{data.brand}</p>
          )}
          <Link href={`/produto/${data.id}`} className="text-gray-800 font-semibold text-xs sm:text-sm mb-2 leading-tight line-clamp-2 hover:underline">{data.title}</Link>

          <div className="space-y-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-gray-800 font-bold text-base sm:text-lg">{formatPrice(Number(data.price))}</span>
              {data.last_price && Number(data.last_price) > Number(data.price) && (
                <span className="text-gray-400 text-xs sm:text-sm line-through">{formatPrice(Number(data.last_price))}</span>
              )}
            </div>
            <p className="text-gray-500 text-xs">
              ou {data.installments || 12}x de {formatPrice(Number(data.price) / (data.installments || 12))}
            </p>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6">
          <button 
            onClick={() => addToCart({ 
              product_id: data.id,
              product: {
                title: data.title,
                price: data.price,
                images: data.images
              }
            })}
            disabled={isAddingToCart}
            className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-full font-medium flex items-center justify-center gap-2 sm:gap-3 transition-colors hover:bg-primary-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-105 text-xs sm:text-sm"
          >
            {isAddingToCart ? (
              <LuLoader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <PiBasketLight className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            {isAddingToCart ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}

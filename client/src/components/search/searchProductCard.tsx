import Image from "next/image";
import { LuHeart, LuLoader, LuShoppingCart } from "react-icons/lu";
import { useCart } from "@/hooks/cart.hook";
import { useWishlist } from "@/hooks/wishlist.hook";

export default function SearchProductCard({ data }: { data: Product.SimpleI }) {
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

  const getCategoryBadge = () => {
    if (data.categories && data.categories.length > 0) {
      const categoryColors = {
        'MEDICAMENTOS': 'bg-red-100 text-red-600',
        'EQUIPAMENTOS': 'bg-blue-100 text-blue-600',
        'CONSUMIVEIS': 'bg-green-100 text-green-600',
        'SUPLEMENTOS': 'bg-purple-100 text-purple-600',
        'COSMETICOS': 'bg-pink-100 text-pink-600',
        'HIGIENE': 'bg-yellow-100 text-yellow-600',
        'VITAMINAS': 'bg-orange-100 text-orange-600',
        'PROBIOTICOS': 'bg-teal-100 text-teal-600',
        'ANALGESICOS': 'bg-indigo-100 text-indigo-600',
        'ANTI_INFLAMATORIOS': 'bg-rose-100 text-rose-600',
        'DIAGNOSTICO': 'bg-cyan-100 text-cyan-600',
        'PROTECAO': 'bg-emerald-100 text-emerald-600',
        'INJETAVEIS': 'bg-violet-100 text-violet-600',
        'OMEGA': 'bg-amber-100 text-amber-600'
      };
      
      const mainCategory = Array.isArray(data.categories) ? data.categories[0] : data.categories;
      return categoryColors[mainCategory as keyof typeof categoryColors] || 'bg-gray-100 text-gray-600';
    }
    return data.flags?.[0] ? 'bg-primary-100 text-primary-500' : '';
  };

  const getMainCategory = () => {
    if (data.categories && data.categories.length > 0) {
      return Array.isArray(data.categories) ? data.categories[0] : data.categories;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        {/* Imagem do produto */}
        <div className="relative h-32 bg-gray-100">
          <Image
            src={getProductImage()}
            width={300}
            height={300}
            alt={data.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
          
          {/* Badge de categoria */}
          {getMainCategory() && (
            <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full z-10 ${getCategoryBadge()}`}>
              {getMainCategory()}
            </div>
          )}

          {/* Botão de wishlist */}
          <button 
            onClick={() => {
              if (isInWishlist(data.id)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const wishlistItem = wishlist?.items?.find((item: any) => item.product.id === data.id);
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
            className={`absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 shadow-sm ${isInWishlist(data.id) ? 'text-red-500' : 'text-gray-800'} ${(isItemAdding(data.id) || isItemRemoving(data.id)) ? 'opacity-50' : ''}`}
          >
            {(isItemAdding(data.id) || isItemRemoving(data.id)) ? (
              <LuLoader className="w-4 h-4 animate-spin" />
            ) : (
              <LuHeart className={`w-4 h-4 ${isInWishlist(data.id) ? 'fill-current' : ''}`} />
            )}
          </button>
        </div>

        {/* Informações do produto */}
        <div className="p-3">
          {/* Nome e marca */}
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-1">
              {data.title}
            </h3>
            {data.brand && (
              <p className="text-gray-500 text-xs">{data.brand}</p>
            )}
          </div>

          {/* Preços */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-800 font-bold text-base">
              {formatPrice(Number(data.price))}
            </span>
            {data.last_price && Number(data.last_price) > Number(data.price) && (
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(Number(data.last_price))}
              </span>
            )}
          </div>

          {/* Parcelas */}
          <p className="text-gray-500 text-xs mb-3">
            ou {data.installments || 12}x de {formatPrice(Number(data.price) / (data.installments || 12))}
          </p>

          {/* Botão de adicionar ao carrinho */}
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
            className="w-full bg-primary text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors hover:bg-primary-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isAddingToCart ? (
              <LuLoader className="w-4 h-4 animate-spin" />
            ) : (
              <LuShoppingCart className="w-4 h-4" />
            )}
            {isAddingToCart ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { LuEye, LuHeart, LuLoader} from "react-icons/lu";
import { useCart } from "@/hooks/cart.hook";
import { useWishlist } from "@/hooks/wishlist.hook";
import { PiBasketLight } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function SearchHorizontalCard({ data, toggleDrawer }: { data: Product.SimpleI, toggleDrawer: () => void }) {
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isItemAdding, isItemRemoving, wishlist } = useWishlist();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getProductImage = () => {
    return data.images?.[0] || '/placeholder-product.jpg';
  };



  return (
    <div className="group rounded-lg border border-gray-200 overflow-hidden hover:border-gray-200 transition-all duration-300 cursor-pointer bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button 
            className="bg-white/90 backdrop-blur-sm text-gray-800 py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white hover:scale-105 text-xs cursor-pointer"
            onClick={() => {
              router.push(`/produto/${data.id}`);
              toggleDrawer();
            }}
          >
            <LuEye className="w-4 h-4 text-gray-500" />
            Ver
          </button>    
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
            className="bg-primary text-white py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:bg-primary-600 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs "
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
            src={getProductImage()}
            width={96}
            height={96}
            alt={data.title}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
          
          {/* Badge de categoria */}
          {/* {getMainCategory() && (
            <div className={`absolute top-1 left-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10 ${getCategoryBadge()}`}>
              {getMainCategory()}
            </div>
          )} */}

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
            className={`absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-30 cursor-pointer shadow-sm ${isInWishlist(data.id) ? 'text-red-500' : 'text-gray-800'} ${(isItemAdding(data.id) || isItemRemoving(data.id)) ? 'opacity-50' : ''}`}
          >
            {(isItemAdding(data.id) || isItemRemoving(data.id)) ? (
              <LuLoader className="w-3 h-3 animate-spin" />
            ) : (
              <LuHeart className={`w-3 h-3 ${isInWishlist(data.id) ? 'fill-current' : ''}`} />
            )}
          </button>
        </div>
        <div className="flex-1 p-3 min-w-0">
          <div className="mb-2">
            <h3 className="font-regylar text-gray-800 text-sm leading-tight line-clamp-2 mb-1">
              {data.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-bold text-md">
                {formatPrice(Number(data.price))}
              </span>
              {data.last_price && Number(data.last_price) > Number(data.price) && (
                <span className="text-gray-400 text-xs line-through">
                  {formatPrice(Number(data.last_price))}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-xs mb-3">
              ou {data.installments || 12}x de {formatPrice(Number(data.price) / (data.installments || 12))}
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

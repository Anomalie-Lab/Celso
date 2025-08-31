import Image from "next/image";
import { LuHeart, LuStar } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";

export default function ProductCard({ data }: { data: Product.SimpleI }) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <LuStar 
          key={i} 
          className={`w-3 h-3 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-yellow-400 fill-current opacity-50'}`} 
        />
      );
    }
    return stars;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getProductImage = () => {
    // Usa images[0] ou fallback
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
        'HIGIENE': 'bg-yellow-100 text-yellow-600'
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
    <div className="bg-white rounded-lg p-4 relative w-full transition-shadow cursor-pointer hover:shadow-lg border border-gray-100">
      {/* Badge de categoria */}
      {getMainCategory() && (
        <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full z-10 ${getCategoryBadge()}`}>
          {getMainCategory()}
        </div>
      )}

      {/* Badge de flag (se não tiver categoria) */}
      {!getMainCategory() && data.flags?.[0] && (
        <div className="absolute top-3 left-3 bg-primary-100 text-primary-500 text-[10px] font-bold px-2 py-1 rounded-full z-10">
          {data.flags[0]}
        </div>
      )}

      <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 cursor-pointer shadow-sm">
        <LuHeart className="w-4 h-4 text-gray-800" />
      </button>

      {/* Imagem do produto */}
      <div className="relative mb-4">
        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
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

      {/* Botão Adicionar */}
      <button className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-colors mb-4 hover:bg-primary-600 cursor-pointer">
        <PiBasketLight className="w-5 h-5" />
        Adicionar
      </button>

      {/* Título do produto */}
      <h3 className="text-gray-800 font-semibold text-sm mb-2 leading-tight line-clamp-2">{data.title}</h3>

      {/* Marca */}
      {data.brand && (
        <p className="text-gray-500 text-xs mb-2">{data.brand}</p>
      )}



      {/* Preços */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-bold text-lg">{formatPrice(Number(data.price))}</span>
          {data.last_price && Number(data.last_price) > Number(data.price) && (
            <span className="text-gray-400 text-sm line-through">{formatPrice(Number(data.last_price))}</span>
          )}
        </div>
        <p className="text-gray-500 text-xs">
          ou {data.installments || 12}x de {formatPrice(Number(data.price) / (data.installments || 12))}
        </p>
      </div>
    </div>
  );
}

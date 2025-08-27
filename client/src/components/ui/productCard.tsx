import { Product } from "@/types/productTypes";
import Image from "next/image";
import { LuHeart, LuStar } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";


export default function ProductCard({
  discount = "10% OFF",
  productName,
  rating,
  reviews,
  description,
  currentPrice,
  originalPrice,
  color,
  image,
  additionalInfo
}: Product) {
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

  return (
    <div className="bg-white rounded-lg p-4 relative w-full transition-shadow cursor-pointer">

      <div className="absolute top-10 left-10 bg-primary-100 text-primary-500 text-[10px] font-bold px-2 py-1 rounded-full z-10">
        {discount}
      </div>

      <button className="absolute top-10 right-10 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 cursor-pointer">
        <LuHeart className="w-4 h-4 text-gray-800" />
      </button>

      {/* Imagem do produto */}
      <div className="relative mb-4">
        <div className="w-full h-68 bg-gray-100 rounded-lg overflow-hidden relative">
          <Image
            src={image}
            width={100}
            height={100}
            alt="Imagem de fundo"
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
      </div>

      {/* Botão Adicionar */}
      <button className="w-full bg-primary text-white py-3 rounded-lg font-regular flex items-center justify-center gap-3 transition-colors mb-4 hover:bg-primary-500 cursor-pointer">
        <PiBasketLight className="w-5 h-5" />
        Adicionar
      </button>

      {/* Título do produto */}
      <h3 className="text-gray-800 font-semibold text-md mb-2 leading-tight">
        {productName}
      </h3>

      {/* Avaliação */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center">
          {renderStars(rating)}
        </div>
        <span className="text-gray-500 text-sm">{rating.toFixed(1)} ({reviews} Avaliações)</span>
      </div>

      {/* Preços */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-bold text-xl">{currentPrice}</span>
          <span className="text-gray-400 text-sm line-through">{originalPrice}</span>
        </div>
        <p className="text-gray-500 text-sm">ou 1x de {currentPrice}</p>
      </div>
    </div>
  );
}
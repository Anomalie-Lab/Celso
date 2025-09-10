"use client";
import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  title: string;
  price: number;
  lastPrice?: number;
  installments?: number;
  description: string;
  comments?: Product.CommentI[];
  categories?: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ProductInfo({
  title,
  price,
  lastPrice,
  installments = 12,
  description,
  categories = [],
  selectedColor,
  onColorChange
}: ProductInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };


  const hasCategories = categories.length > 0;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h1>
      </div>
       <div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

    {hasCategories && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Categoria</h3>
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedColor === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onColorChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Preço */}
      <div className="space-y-2 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            {formatPrice(price)}
          </span>
          {lastPrice && lastPrice > price && (
            <span className="text-lg sm:text-xl text-gray-500 line-through">
              {formatPrice(lastPrice)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">
          ou {installments}x de {formatPrice(price / installments)} sem juros
        </p>
      </div>
    </div>
  );
}

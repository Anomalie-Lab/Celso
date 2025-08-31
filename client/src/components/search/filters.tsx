"use client";

interface PriceRange {
  label: string;
}

interface FiltersProps {
  filteredCategory?: string[];
  filteredPrices?: PriceRange[];
  selectedPrice?: string;
  selectedCategory?: string;
  filteredDiscount?: string[];
  selectedDiscount?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedBrand?: string;
  colors?: string[];
  sizes?: string[];
  brands?: string[];
  onChangeCategory?: (category: string) => void;
  onChangeDiscount?: (discount: string) => void;
  onChangePrice?: (price: string) => void;
  onChangeColor?: (color: string) => void;
  onChangeSize?: (size: string) => void;
  onChangeBrand?: (brand: string) => void;
}

export function FilterSearch({ 
  filteredDiscount, 
  filteredCategory, 
  selectedCategory, 
  selectedDiscount, 
  filteredPrices, 
  selectedPrice,
  selectedColor,
  selectedSize,
  selectedBrand,
  colors,
  sizes,
  brands,
  onChangeDiscount, 
  onChangeCategory, 
  onChangePrice,
  onChangeColor,
  onChangeSize,
  onChangeBrand
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Categorias */}
      {filteredCategory &&
        filteredCategory.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              value={category} 
              id={category} 
              checked={selectedCategory === category} 
              onChange={() => onChangeCategory?.(category)} 
              className="w-4 h-4 accent-primary ml-2 cursor-pointer rounded-full" 
            />
            <label className={`hover:text-primary ${selectedCategory === category ? "text-primary" : "text-gray-600"}`}>
              {category}
            </label>
          </div>
        ))}

      {/* Marcas */}
      {brands &&
        brands.map((brand) => (
          <div key={brand} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id={brand}
                checked={selectedBrand === brand}
                onChange={() => onChangeBrand?.(brand)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label className={`text-sm cursor-pointer ${selectedBrand === brand ? "text-primary font-medium" : "text-gray-600"}`}>
                {brand}
              </label>
            </div>
            <span className="text-xs text-gray-400">(06)</span>
          </div>
        ))}

      {/* Cores */}
      {colors &&
        colors.map((color) => (
          <div key={color} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id={color}
                checked={selectedColor === color}
                onChange={() => onChangeColor?.(color)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label className={`text-sm cursor-pointer ${selectedColor === color ? "text-primary font-medium" : "text-gray-600"}`}>
                {color}
              </label>
            </div>
            <span className="text-xs text-gray-400">(06)</span>
          </div>
        ))}

      {/* Tamanhos */}
      {sizes &&
        sizes.map((size) => (
          <div key={size} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id={size}
                checked={selectedSize === size}
                onChange={() => onChangeSize?.(size)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label className={`text-sm cursor-pointer ${selectedSize === size ? "text-primary font-medium" : "text-gray-600"}`}>
                {size}
              </label>
            </div>
            <span className="text-xs text-gray-400">(06)</span>
          </div>
        ))}

      {/* Descontos */}
      {filteredDiscount &&
        filteredDiscount.map((discount) => (
          <div key={discount} className="flex items-center gap-2 ml-2">
            <input 
              type="checkbox" 
              value={discount} 
              id={discount} 
              onChange={() => onChangeDiscount?.(discount)} 
              checked={selectedDiscount === discount} 
              className="w-4 h-4 accent-primary cursor-pointer" 
            />
            <label className={`hover:text-primary ${selectedDiscount === discount ? "text-primary" : "text-gray-600"}`}>
              {discount}
            </label>
          </div>
        ))}

      {/* Preços */}
      {filteredPrices &&
        filteredPrices.map((prices) => (
          <div key={prices.label} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={selectedPrice === prices.label} 
              value={prices.label} 
              onChange={() => onChangePrice?.(prices.label)} 
              className="w-4 h-4 ml-2 accent-primary cursor-pointer" 
            />
            <label className={`hover:text-primary ${selectedPrice === prices.label ? "text-primary" : "text-gray-600"}`}>
              {prices.label}
            </label>
          </div>
        ))}
    </div>
  );
}

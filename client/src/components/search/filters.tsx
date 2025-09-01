"use client";

interface PriceRange {
  label: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface FiltersProps {
  filteredCategory?: string[];
  filteredPrices?: PriceRange[];
  selectedPrice?: string;
  selectedCategory?: string;
  selectedCategories?: string[];
  selectedDiscount?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedBrand?: string;
  selectedBrands?: string[];
  selectedSort?: string;
  colors?: string[];
  sizes?: string[];
  brands?: string[];
  sortOptions?: SortOption[];
  onChangeCategory?: (category: string) => void;
  onChangeCategories?: (category: string) => void;
  onChangeDiscount?: (discount: string) => void;
  onChangePrice?: (price: string) => void;
  onChangeColor?: (color: string) => void;
  onChangeSize?: (size: string) => void;
  onChangeBrand?: (brand: string) => void;
  onChangeBrands?: (brand: string) => void;
  onChangeSort?: (sort: string) => void;
}

export function FilterSearch({ 
  filteredDiscount, 
  filteredCategory, 
  selectedCategory, 
  selectedCategories, 
  selectedDiscount, 
  filteredPrices, 
  selectedPrice,
  selectedColor,
  selectedSize,
  selectedBrand,
  selectedBrands,
  selectedSort,
  colors,
  sizes,
  brands,
  sortOptions,
  onChangeDiscount, 
  onChangeCategory, 
  onChangeCategories, 
  onChangePrice,
  onChangeColor,
  onChangeSize,
  onChangeBrand,
  onChangeBrands,
  onChangeSort
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Categorias */}
      {filteredCategory &&
        filteredCategory.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id={`category-${category}`} 
              checked={selectedCategories ? selectedCategories.includes(category) : selectedCategory === category} 
              onChange={() => {
                if (onChangeCategories) {
                  onChangeCategories(category);
                } else if (onChangeCategory) {
                  onChangeCategory(category);
                }
              }} 
              className="w-4 h-4 accent-primary ml-2 cursor-pointer" 
            />
            <label 
              htmlFor={`category-${category}`}
              className={`hover:text-primary cursor-pointer ${(selectedCategories ? selectedCategories.includes(category) : selectedCategory === category) ? "text-primary font-medium" : "text-gray-600"}`}
            >
              {category}
            </label>
          </div>
        ))}

      {/* Marcas */}
      {brands && brands.length > 0 &&
        brands.map((brand) => (
          <div key={brand} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id={`brand-${brand}`}
                checked={selectedBrands ? selectedBrands.includes(brand) : selectedBrand === brand}
                onChange={() => {
                  if (onChangeBrands) {
                    onChangeBrands(brand);
                  } else if (onChangeBrand) {
                    onChangeBrand(brand);
                  }
                }}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label 
                htmlFor={`brand-${brand}`}
                className={`text-sm cursor-pointer ${(selectedBrands ? selectedBrands.includes(brand) : selectedBrand === brand) ? "text-primary font-medium" : "text-gray-600"}`}
              >
                {brand}
              </label>
            </div>
            <span className="text-xs text-gray-400">(06)</span>
          </div>
        ))}

      {/* Opções de Ordenação */}
      {sortOptions && sortOptions.length > 0 &&
        sortOptions.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input 
              type="radio" 
              name="sort"
              id={`sort-${option.value}`}
              value={option.value}
              checked={selectedSort === option.value}
              onChange={() => onChangeSort?.(option.value)}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            <label 
              htmlFor={`sort-${option.value}`}
              className={`text-sm cursor-pointer ${selectedSort === option.value ? "text-primary font-medium" : "text-gray-600"}`}
            >
              {option.label}
            </label>
          </div>
        ))}

      {/* Cores */}
      {colors &&
        colors.map((color) => (
          <div key={color} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="radio" 
                name="color"
                id={`color-${color}`}
                value={color}
                checked={selectedColor === color}
                onChange={() => onChangeColor?.(color)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label 
                htmlFor={`color-${color}`}
                className={`text-sm cursor-pointer ${selectedColor === color ? "text-primary font-medium" : "text-gray-600"}`}
              >
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
                type="radio" 
                name="size"
                id={`size-${size}`}
                value={size}
                checked={selectedSize === size}
                onChange={() => onChangeSize?.(size)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <label 
                htmlFor={`size-${size}`}
                className={`text-sm cursor-pointer ${selectedSize === size ? "text-primary font-medium" : "text-gray-600"}`}
              >
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
              type="radio" 
              name="discount"
              value={discount} 
              id={`discount-${discount}`} 
              onChange={() => onChangeDiscount?.(discount)} 
              checked={selectedDiscount === discount} 
              className="w-4 h-4 accent-primary cursor-pointer" 
            />
            <label 
              htmlFor={`discount-${discount}`}
              className={`hover:text-primary cursor-pointer ${selectedDiscount === discount ? "text-primary font-medium" : "text-gray-600"}`}
            >
              {discount}
            </label>
          </div>
        ))}

      {/* Preços */}
      {filteredPrices &&
        filteredPrices.map((prices) => (
          <div key={prices.label} className="flex items-center gap-2">
            <input 
              type="radio" 
              name="price"
              checked={selectedPrice === prices.label} 
              value={prices.label} 
              onChange={() => onChangePrice?.(prices.label)} 
              className="w-4 h-4 ml-2 accent-primary cursor-pointer" 
            />
            <label 
              htmlFor={`price-${prices.label}`}
              className={`hover:text-primary cursor-pointer ${selectedPrice === prices.label ? "text-primary font-medium" : "text-gray-600"}`}
            >
              {prices.label}
            </label>
          </div>
        ))}
    </div>
  );
}

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
  onChangeCategory?: (category: string) => void;
  onChangeDiscount?: (discount: string) => void;
  onChangePrice?: (price: string) => void;
}

export function FilterSearch({ filteredDiscount, filteredCategory, selectedCategory, selectedDiscount, filteredPrices, selectedPrice, onChangeDiscount, onChangeCategory, onChangePrice }: FiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      {filteredCategory &&
        filteredCategory.map((category) => (
          <div key={category} className="flex items-center gap-2  ">
            <input type="checkbox" value={category} id={category} checked={selectedCategory === category} onChange={() => onChangeCategory?.(category)} className="w-4 h-4 accent-primary ml-2 cursor-pointer" />
            <label className={`hover:text-primary  ${selectedCategory === category ? "text-primary" : "text-gray-600"} `}>{category}</label>
          </div>
        ))}
   

      {filteredDiscount &&
        filteredDiscount.map((discount) => (
          <div key={discount} className="flex items-center gap-2 ml-2">
            <input type="checkbox" value={discount} id={discount} onChange={() => onChangeDiscount?.(discount)} checked={selectedDiscount === discount} className="w-4 h-4 accent-primary cursor-pointer" />
            <label className={`hover:text-primary  ${selectedDiscount === discount ? "text-primary" : "text-gray-600"}`}>{discount}</label>
          </div>
        ))}

      {filteredPrices &&
        filteredPrices.map((prices) => (
          <div key={prices.label} className="flex items-center gap-2">
            <input type="checkbox" checked={selectedPrice === prices.label} value={prices.label} onChange={() => onChangePrice?.(prices.label)} className="w-4 h-4  ml-2 accent-primary cursor-pointer" />

            <label className={`hover:text-primary  ${selectedPrice === prices.label ? "text-primary" : "text-gray-600"}`}>{prices.label}</label>
          </div>
        ))}

           <hr className="border-t border-gray-200 my-2" />
    </div>
  );
}

"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <RadioGroup value={selectedCategory} onValueChange={onChangeCategory}>
        {filteredCategory &&
          filteredCategory.map((category) => (
            <div key={category} className="flex items-center gap-2 ">
              <RadioGroupItem value={category} id={category} />
              <label>{category}</label>
            </div>
          ))}
      </RadioGroup>

      <RadioGroup value={selectedDiscount} onValueChange={onChangeDiscount}>
        {filteredDiscount &&
          filteredDiscount.map((discount) => (
            <div key={discount} className="flex items-center gap-2">
              <RadioGroupItem value={discount} id={discount} />
              <label>{discount}</label>
            </div>
          ))}
      </RadioGroup>

      <RadioGroup value={selectedPrice} onValueChange={onChangePrice}>
        {filteredPrices &&
          filteredPrices.map((prices) => (
            <div key={prices.label} className="flex items-center gap-2">
              <RadioGroupItem value={prices.label} id={prices.label} />
              <label>{prices.label}</label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
}

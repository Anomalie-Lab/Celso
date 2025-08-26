"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface FiltersProps {
  filteredCategory: string[];
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
  onClear: () => void;
}

export function FilterSearch({ filteredCategory, selectedCategory, onChangeCategory, onClear }: FiltersProps) {
  return (
    <div>
      <p className="my-2 font-medium ">Categoria</p>
      {filteredCategory.map((category) => (
        <RadioGroup key={category} value={selectedCategory} onValueChange={onChangeCategory} className="flex items-center gap-2">
          <RadioGroupItem className="my-2 accent-secondary" value={category} id={category} />
          <label>{category}</label>
        </RadioGroup>
      ))}
      <div className="bg-color-primary my-3"></div>
      <button onClick={onClear} className="bg-primary rounded- px-3.5 py-1 text-white rounded-sm cursor-pointer">
        Limpar filtro
      </button>
    </div>
  );
}

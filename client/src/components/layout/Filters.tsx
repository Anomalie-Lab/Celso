"use client";

interface FiltersProps {
  filteredCategory: string[];
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
  onClear: () => void;
}

export default function Filters({ filteredCategory, selectedCategory, onChangeCategory, onClear }: FiltersProps) {
  return (
    <div>
      <p className="my-2 font-medium ">Categoria</p>
      {filteredCategory.map((category) => (
        <div key={category} className="flex items-center gap-2">
          <input className="my-2" type="radio" name="category" value={category} onChange={() => onChangeCategory(category)} id={category} checked={selectedCategory === category} />
          <label>{category}</label>
        </div>
      ))}
      <div className="h-px bg-[var(--color-primary)] my-3"></div>
      <button onClick={onClear} className="bg-[var(--color-primary)] px-3.5 py-1 text-white rounded-[2px] cursor-pointer">
        Limpar filtro
      </button>
    </div>
  );
}

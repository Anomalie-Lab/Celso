"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts } from "@/utils/products";
import { Product } from "@/types/products";
import ProductCard from "@/components/ui/productCard";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [result, setResult] = useState<Product[]>([]);
  const [productCategory, setProductCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  function parseDiscount(discount: string): number {
    return Number(discount.replace("% OFF", "").trim()) || 0;
  }

  useEffect(() => {
    if (!q) {
      router.push("/");
      return;
    }
    let filteredProduct = searchProducts(q);

    if (filteredProduct.length === 0) {
      return;
    }

    setProductCategory([...new Set(filteredProduct.map((product) => product.category))]);

    if (selectedCategory) {
      filteredProduct = filteredProduct.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case "descont":
        filteredProduct.sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
        break;

      case "rating":
        filteredProduct.sort((a, b) => b.rating - a.rating);
        break;
    }

    setResult(filteredProduct);
  }, [q, selectedCategory, sortOption]);

  return (
    <main className="flex  w-full justify-center items-center">
      {/* Filtros */}
      <div className="flex w-full  px-24">
        <section className="w-60 p-4 rounded">
          <p className="font-bold text-lg">FILTROS</p>

          {/* categorias */}
          <div>
            <p className="my-2 font-medium">Por Categoria</p>
            {productCategory.length > 0 &&
              productCategory.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <input className="my-2" type="radio" name="category" value={category} onChange={(e) => handleChangeCategory(category)} id={category} />
                  <label>{category}</label>
                </div>
              ))}

            <div className="h-px bg-[var(--color-primary)] my-3"></div>
          </div>
          <button onClick={() => setSelectedCategory("")} className="bg-[var(--color-primary)] px-3.5 py-1 text-white rounded-[2px] cursor-pointer">
            limpar filtro
          </button>
        </section>

        {/* Produtos */}
        <section className="flex-1 ">
          <div className="flex justify-between">
            <h1 className="text-lg  mb-4">
              Resultados da pesquisa para:
              <span className="text-[var(--color-primary)]">{q}</span>
            </h1>

            <div className="flex flex-col">
              <select onChange={(e) => setSortOption(e.target.value)} id="sort" className="w-full max-w-[200px] outline-none" defaultValue="">
                <option value="" disabled>
                  Ordenar por
                </option>
                <option value="descont">Maior desconto</option>
                <option value="rating">Maior avaliação</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {result.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
            {result.length === 0 && q && <p>Nenhum produto encontrado 😢</p>}
          </div>
        </section>
      </div>
    </main>
  );
}

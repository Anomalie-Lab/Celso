"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts, getProductsByCategory, getProducts } from "@/utils/products";
import { Product } from "@/types/products";
import ProductCard from "@/components/ui/productCard";
import data from "@/data/products.json";

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [result, setResult] = useState<Product[]>([]);

  useEffect(() => {
    if (!q) {
      setResult([]);
      return;
    }
    let filteredProduct = searchProducts(q);

    if (filteredProduct.length === 0) {
      filteredProduct = getProductsByCategory(q);
    }

    if (filteredProduct.length === 0) {
      filteredProduct = getProducts();
    }
    setResult(filteredProduct);
  }, [q]);

  const discount = data.products.map((products) => products.discount);

  //não permite valores duplicados
  const filteredDiscount = [...new Set(discount)];

  return (
    <main className="flex  w-full justify-center items-center">
      {/* Filtros */}
      <div className="flex w-full  px-24">
        <section className="w-60 p-4 rounded">
          <p className="font-bold text-lg">FILTROS</p>

          <div>
            <p className="my-2 font-medium">Por Categoria</p>
            {data.categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <input type="checkbox" id={category.id} />
                <label>{category.name}</label>
              </div>
            ))}

            <div className="h-px bg-[var(--color-primary)] my-3"></div>
          </div>

          <div>
            <p className="font-medium my-2">Descontos</p>
            {filteredDiscount.map((discount) => (
              <div key={discount} className="flex items-center gap-2">
                <input type="checkbox" id={discount} />
                <label>{discount}</label>
              </div>
            ))}

            <div className="h-px bg-[var(--color-primary)] my-3"></div>
          </div>
        </section>

        {/* Produtos */}
        <section className="flex-1 ">
          <div className="flex justify-between">
            <h1 className="text-lg  mb-4">
              Resultados da pesquisa para: '<span className="text-[var(--color-primary)]">{q}</span>'
            </h1>

            <div className="flex flex-col">
              <label className="font-medium">Ordenar por:</label>
              <select id="sort" className="w-full max-w-[200px] outline-none">
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
                <option value="rating-desc">Avaliação: Maior para Menor</option>
                <option value="rating-asc">Avaliação: Menor para Maior</option>
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

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts } from "@/utils/products";
import { Product } from "@/types/products";
import ProductCard from "@/components/ui/productCard";
import { IoFilterOutline } from "react-icons/io5";
import Filter from "@/components/layout/Filters";
import { Order } from "@/components/ui/dropdown-menu";
import { DialogFilter } from "@/components/ui/dialog";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [result, setResult] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [filteredCategory, setFilteredCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [quantityProduct, setQuantityProduct] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const maxPerPage = 20;

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  function parseDiscount(discount: string): number {
    return Number(discount.replace("% OFF", "").trim()) || 0;
  }

  const fetchProduct = () => {
    if (!q) {
      router.push("/");
      return;
    }

    let filteredProduct = searchProducts(q);

    setFilteredCategory([...new Set(filteredProduct.map((product) => product.category))]);

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

      default:
        filteredProduct.sort((a, b) => a.id - b.id);
        break;
    }

    setTotalPage(Math.ceil(filteredProduct.length / maxPerPage));
    setQuantityProduct(filteredProduct.length);
    setResult(filteredProduct);
  };

  useEffect(() => {
    fetchProduct();
  }, [q, selectedCategory, sortOption]);

  return (
    <main className="flex  w-full justify-center items-center">
      <div className="flex w-full px-2 xl:px-24">
        {/* Filtros */}
        {showFilter && (
          <section className=" w-60 p-4 rounded hidden md:block">
            <div>
              <Filter filteredCategory={filteredCategory} selectedCategory={selectedCategory} onChangeCategory={handleChangeCategory} onClear={() => setSelectedCategory("")} />
            </div>
          </section>
        )}

        {/* Produtos */}
        <section className="flex-1 ">
          <div className="flex justify-between px-4">
            <h1 className="text-lg  mb-4">
              <span>
                {q?.toUpperCase()} ({quantityProduct})
              </span>
            </h1>

            <div className="flex items-center justify-center gap-5">
              <div className=" md:hidden">
                <DialogFilter
                  trigger={
                    <button className="flex items-center justify-center gap-2 hover:text-[var(--color-secondary)] cursor-pointer">
                      Filtros
                      <IoFilterOutline />
                    </button>
                  }
                >
                  <Filter filteredCategory={filteredCategory} selectedCategory={selectedCategory} onChangeCategory={handleChangeCategory} onClear={() => setSelectedCategory("")} />
                </DialogFilter>
              </div>
              <button onClick={() => setShowFilter(!showFilter)} className="hidden md:flex items-center justify-center gap-2 hover:text-[var(--color-secondary)] cursor-pointer">
                Filtros
                <IoFilterOutline />
              </button>

              <Order sortOption={sortOption} setSortOption={setSortOption} />
            </div>
          </div>

          <div className="grid gap-4  grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 ">
            {result.slice(page * maxPerPage, (page + 1) * maxPerPage).map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
            {result.length === 0 && q && <p>Nenhum produto encontrado </p>}
          </div>
          <div className="flex gap-2 m-6 justify-center">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 rounded ${i === page ? "bg-[var(--color-secondary)] text-white" : "bg-gray-200"}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

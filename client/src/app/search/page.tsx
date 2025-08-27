"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { searchProducts } from "@/utils/products";
import { Product } from "@/types/products";
import ProductCard from "@/components/ui/productCard";
import { IoFilterOutline } from "react-icons/io5";
import { FilterSearch } from "@/components/search/filters";
import { Order } from "@/components/ui/dropdown-menu";
import { AccordionSearch } from "@/components/ui/accordion";
import { priceRanges } from "@/data/pricesFilter";
import { Pagination } from "@/components/search/pagination";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [discount, setDiscount] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    discount: "",
    price: "",
    sort: "",
  });
  const q = searchParams.get("q");
  const [result, setResult] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const maxPerPage = 20;

  const handleFilterChange = (type: "discount" | "price" | "category" | "sort", value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const clearFilter = () => {
    setFilters({
      category: "",
      sort: "",
      discount: "",
      price: "",
    });
  };
  function parseDiscount(discount: string): number {
    return Number(discount.replace("% OFF", "").trim()) || 0;
  }

  function parseCurrentPrice(price: string): number {
    return Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", ".").trim());
  }

  const fetchProduct = () => {
    if (!q) return router.push("/");

    let filteredProduct = searchProducts(q);

    setCategories([...new Set(filteredProduct.map((product) => product.category))]);
    setDiscount([...new Set(filteredProduct.map((product) => product.discount))]);

    if (filters.category) filteredProduct = filteredProduct.filter((p) => p.category === filters.category);

    if (filters.discount) filteredProduct = filteredProduct.filter((p) => p.discount === filters.discount);

    // ordenação
    switch (filters.sort) {
      case "descont":
        filteredProduct.sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
        break;

      case "rating":
        filteredProduct.sort((a, b) => b.rating - a.rating);
        break;

      case "minPrice":
        filteredProduct.sort((a, b) => parseCurrentPrice(a.currentPrice) - parseCurrentPrice(b.currentPrice));
        break;
      case "maxPrice":
        filteredProduct.sort((a, b) => parseCurrentPrice(b.currentPrice) - parseCurrentPrice(a.currentPrice));
        break;

      case "relevancia":
        filteredProduct.sort((a, b) => a.id - b.id);
        break;

      default:
        filteredProduct.sort((a, b) => a.id - b.id);
    }

    if (filters.price) {
      filteredProduct = filteredProduct.filter((p) => {
        const price = Number(p.currentPrice.replace("R$ ", "").replace(/\./g, "").replace(",", ".").trim());
        switch (filters.price) {
          case "Até R$ 100":
            return price <= 100;
          case "R$ 100 - R$ 200":
            return price > 100 && price <= 200;
          case "R$ 200 - R$ 500":
            return price > 200 && price <= 500;
          case "R$ 500+":
            return price > 500;
          default:
            return true;
        }
      });
    }
    setTotalPage(Math.ceil(filteredProduct.length / maxPerPage));
    setResult(filteredProduct);
  };

  useEffect(() => {
    fetchProduct();
  }, [q, filters]);

  return (
    <main className="flex  w-full justify-center items-center">
      <div className="flex flex-col w-full px-2 lg:px-24">
        {/* Filtros */}
        <div className="flex w-full px-2">
          {showFilter && (
            <section className=" w-60  hidden 2xl:block">
              <div>
                <AccordionSearch nameFilter="Categorias" defaultOpen={true}>
                  <FilterSearch filteredCategory={categories} selectedCategory={filters.category} onChangeCategory={(value) => handleFilterChange("category", value)} />
                </AccordionSearch>

                <AccordionSearch nameFilter="Descontos">
                  <FilterSearch filteredDiscount={discount} selectedDiscount={filters.discount} onChangeDiscount={(value) => handleFilterChange("discount", value)} />
                </AccordionSearch>

                <AccordionSearch nameFilter="Preços">
                  <FilterSearch filteredPrices={priceRanges} selectedPrice={filters.price} onChangePrice={(value) => handleFilterChange("price", value)} />
                </AccordionSearch>
              </div>
              {showFilter && (
                <button onClick={clearFilter} className="bg-secondary rounded-sm px-4 text-white py-1 text-sm cursor-pointer">
                  Limpar filtro
                </button>
              )}
            </section>
          )}

          {/* Produtos */}
          <section className="flex-1 ">
            <div className="flex flex-row-reverse justify-between px-9">
              <h1 className="text-lg  mb-4">
                <span>Resultados da pesquisa para '{q}'</span>
              </h1>
              <div className="flex items-center justify-center gap-5">
                <button onClick={() => setShowFilter(!showFilter)} className="bg-secondary px-2 text-white py-1 rounded-sm hidden lg:flex items-center justify-center gap-2 cursor-pointer">
                  Filtros
                  <IoFilterOutline />
                </button>
                <Order sortOption={filters.sort} setSortOption={(value) => setFilters((prev) => ({ ...prev, sort: value }))} />
              </div>
            </div>
            <div className="grid gap-4  grid-cols-2  md:grid-cols-3 xl:grid-cols-4 px-4">
              {result.slice(page * maxPerPage, (page + 1) * maxPerPage).map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}

              {result.length === 0 && q && <p className="px-5">Nenhum produto encontrado </p>}
            </div>
            {result.length > 0 && <Pagination page={page} setPage={setPage} totalPage={totalPage} />}
          </section>
        </div>
      </div>
    </main>
  );
}
export default function Search() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}

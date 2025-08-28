"use client";
import { FilterSearch } from "@/components/search/filters";
import { AccordionSearch } from "@/components/ui/accordion";
import { Order } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductCard from "@/components/ui/productCard";
import { priceRanges } from "@/data/pricesFilter";
import { Product } from "@/types/productTypes";
import { searchProducts } from "@/utils/productUtils";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import { IoFilterOutline } from "react-icons/io5";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [discount, setDiscount] = useState<string[]>([]);
  const [quantity,setQuantity] = useState<number>(0);
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
    setFilters((prev) => ({ ...prev, [type]: prev[type] === value ? "" : value }));
  };

  function parseDiscount(discount: string): number {
    return Number(discount.replace("% OFF", "").trim()) || 0;
  }

  function parseCurrentPrice(price: string): number {
    return Number(price.replace("R$ ", "").replace(/\./g, "").replace(",", ".").trim());
  }

  const fetchProduct = useCallback(() => {
    if (!q) return router.push("/");

    let filteredProduct = searchProducts(q);

    setCategories([...new Set(filteredProduct.map((product) => product.category))]);
    setDiscount([...new Set(filteredProduct.map((product) => product.discount))].sort((a, b) => parseDiscount(a) - parseDiscount(b)));

    if (filters.category) filteredProduct = filteredProduct.filter((p) => p.category === filters.category);

    if (filters.discount) {
      filteredProduct = filteredProduct.filter((p) => p.discount === filters.discount);
    }

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
    setQuantity(filteredProduct.length)
    setResult(filteredProduct);
  }, [q, filters, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <main className="flex flex-col w-full justify-center items-center mt-10">
      
      <div className="flex flex-col w-full px-2 lg:px-24 justify-between items-center">
        {/* Filtros */}
       
        <div className="flex w-full px-2 ">
          {showFilter && (
            <section className=" w-60  hidden 2xl:block mt-2">
              <div>
                <AccordionSearch nameFilter="Categorias" defaultOpen={true}>
                  <FilterSearch filteredCategory={categories} selectedCategory={filters.category} onChangeCategory={(value) => handleFilterChange("category", value)} />
                </AccordionSearch>

                <AccordionSearch nameFilter="Descontos" defaultOpen={true}>
                  <FilterSearch filteredDiscount={discount} selectedDiscount={filters.discount} onChangeDiscount={(value) => handleFilterChange("discount", value)} />
                </AccordionSearch>

                <AccordionSearch nameFilter="Preços">
                  <FilterSearch filteredPrices={priceRanges} selectedPrice={filters.price} onChangePrice={(value) => handleFilterChange("price", value)} />
                </AccordionSearch>
              </div>
            </section>
          )}

          {/* Produtos */}
          <section className="flex-1 ">
            <div className =  "flex justify-between px-9 items-center">
              <div className="flex items-start justify-start gap-5 ">
                <button onClick={() => setShowFilter(!showFilter)} className="bg-[#F9F9F9] px-3 py-2 rounded-sm text-sm hidden lg:flex items-center justify-center gap-2 cursor-pointer">
                  Filtros
                  <IoFilterOutline />
                </button>
                <Order sortOption={filters.sort} setSortOption={(value) => setFilters((prev) => ({ ...prev, sort: value }))} />
              </div>
              <p className="underline underline-offset-4">{quantity} resultados para <span className="text-primary">{q}</span></p>
             
            </div>

            <div className="grid gap-4  grid-cols-2  md:grid-cols-3 xl:grid-cols-4 px-4">
              {result.slice(page * maxPerPage, (page + 1) * maxPerPage).map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}

              {result.length === 0 && q && <p className="px-9">Nenhum produto encontrado </p>}
            </div>
            {result.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setPage(Math.max(0, page - 1))} className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                  {Array.from({ length: totalPage }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink onClick={() => setPage(i)} isActive={page === i} className="cursor-pointer">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext onClick={() => setPage(Math.min(totalPage - 1, page + 1))} className={page === totalPage - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
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

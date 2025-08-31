"use client";
import { FilterSearch } from "@/components/search/filters";
import { AccordionSearch } from "@/components/ui/accordion";
import { Order } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductCard from "@/components/ui/productCard";
import { Product } from "@/types/productTypes";
import { getCategories, searchProducts } from "@/utils/productUtils";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import { IoFilterOutline, IoGridOutline, IoListOutline } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<string[]>([]);
  const [discount, setDiscount] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [filters, setFilters] = useState({
    category: "",
    discount: "",
    price: "",
    sort: "",
    color: "",
    size: "",
    brand: "",
    priceRange: [0, 1000],
  });
  const q = searchParams.get("q");
  const [result, setResult] = useState<Product[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const maxPerPage = 12;


  const allCategories = getCategories().map((category) => category.name);
  console.log(allCategories);
  const colors = ["Preto", "Branco", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa", "Cinza"];
  const sizes = ["P", "M", "G", "GG", "XG"];
  const brands = ["Nike", "Adidas", "Puma", "Under Armour", "New Balance", "Asics"];

  const handleFilterChange = (type: "discount" | "price" | "category" | "sort" | "color" | "size" | "brand", value: string) => {
    setFilters((prev) => ({ ...prev, [type]: prev[type] === value ? "" : value }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
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
    if (filters.discount) filteredProduct = filteredProduct.filter((p) => p.discount === filters.discount);
    if (filters.color) filteredProduct = filteredProduct.filter((p) => p.category === filters.color); // Simulação
    if (filters.size) filteredProduct = filteredProduct.filter((p) => p.category === filters.size); // Simulação
    if (filters.brand) filteredProduct = filteredProduct.filter((p) => p.category === filters.brand); // Simulação

    // Filtro por range de preço
    filteredProduct = filteredProduct.filter((p) => {
      const price = parseCurrentPrice(p.currentPrice);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

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
    setQuantity(filteredProduct.length);
    setResult(filteredProduct);
  }, [q, filters, router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <main className="flex flex-col w-full min-h-screen bg-white">
       <section className="w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 py-20 px-4 lg:px-24 relative overflow-hidden">
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
           style={{
             backgroundImage: "url('/images/banner2.jpg')"
           }}
         />   
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/30" />
         <div className="max-w-7xl mx-auto text-center relative z-10">
           {q && allCategories.includes(q) ? (
           <h1 className="text-4xl font-semibold text-white mb-4 leading-tight">
            { q }
           </h1>
           ) : (
            <h1 className="text-4xl font-semibold text-white mb-4 leading-tight">
              {q ? `Resultados para "${q}"` : "Busca de Produtos"}
           </h1>
           )}
           <p className="text-md font-medium text-white/90 max-w-3xl mx-auto">
             Descubra os melhores produtos com qualidade excepcional e preços imbatíveis. 
           </p>
         </div>
       </section>

      <div className="flex flex-col w-full px-4 lg:px-24 py-8">
        <div className="flex w-full gap-8">
          {showFilter && (
            <aside className="w-80 hidden 2xl:block">
              <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-10 space-y-6">
                <AccordionSearch nameFilter="CATEGORIAS" defaultOpen={true}>
                  <FilterSearch 
                    filteredCategory={categories} 
                    selectedCategory={filters.category} 
                    onChangeCategory={(value) => handleFilterChange("category", value)} 
                  />
                </AccordionSearch>
                <AccordionSearch nameFilter="MARCAS" defaultOpen={true}>
                  <FilterSearch 
                    brands={brands}
                    selectedBrand={filters.brand}
                    onChangeBrand={(value) => handleFilterChange("brand", value)}
                  />
                </AccordionSearch>
                <div className="space-y-4 py-4">
                  <h3 className="font-semibold text-gray-700 text-sm">PREÇO</h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={handlePriceRangeChange}
                        max={1000}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{formatCurrency(filters.priceRange[0])}</span>
                        <span>{formatCurrency(filters.priceRange[1])}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Mínimo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                          <input
                            type="number"
                            value={filters.priceRange[0]}
                            onChange={(e) => handlePriceRangeChange([Number(e.target.value), filters.priceRange[1]])}
                            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-colors"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-gray-300 rounded-full relative top-2"></div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Máximo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">R$</span>
                          <input
                            type="number"
                            value={filters.priceRange[1]}
                            onChange={(e) => handlePriceRangeChange([filters.priceRange[0], Number(e.target.value)])}
                            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-colors"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                    </div>
                    <button className="w-full border border-gray-300 text-gray-400 px-4 py-2 rounded-lg text-sm font-regular hover:bg-primary hover:text-white transition-colors cursor-pointer">
                      Aplicar Filtro
                    </button>
                  </div>
                </div>
                <AccordionSearch nameFilter="CORES">
                  <FilterSearch 
                    colors={colors}
                    selectedColor={filters.color}
                    onChangeColor={(value) => handleFilterChange("color", value)}
                  />
                </AccordionSearch>
                <AccordionSearch nameFilter="TAMANHOS">
                  <FilterSearch 
                    sizes={sizes}
                    selectedSize={filters.size}
                    onChangeSize={(value) => handleFilterChange("size", value)}
                  />
                </AccordionSearch>
                <AccordionSearch nameFilter="DESCONTOS">
                  <FilterSearch 
                    filteredDiscount={discount} 
                    selectedDiscount={filters.discount} 
                    onChangeDiscount={(value) => handleFilterChange("discount", value)} 
                  />
                </AccordionSearch>
              </div>
            </aside>
          )}
          <section className="flex-1">
            <div className="bg-white rounded-lg shadow-xs border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setShowFilter(!showFilter)} 
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-regular flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <IoFilterOutline />
                    {showFilter ? "Ocultar Filtros" : "Mostrar Filtros"}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 cursor-pointer rounded ${viewMode === "grid" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                    >
                      <IoGridOutline size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded cursor-pointer ${viewMode === "list" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                    >
                      <IoListOutline size={20} />
                    </button>
                  </div>
                  <Order 
                    sortOption={filters.sort} 
                    setSortOption={(value) => setFilters((prev) => ({ ...prev, sort: value }))} 
                  />
                </div>
                <div className="text-sm text-gray-600">
                  Mostrando {page * maxPerPage + 1}-{Math.min((page + 1) * maxPerPage, quantity)} de <span className="font-semibold">{quantity} resultados</span> 
                </div>
              </div>
            </div>
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {result.slice(page * maxPerPage, (page + 1) * maxPerPage).map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>

            {result.length === 0 && q && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado para &quot;{q}&quot;</p>
                <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou usar termos diferentes</p>
              </div>
            )}
            {result.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setPage(Math.max(0, page - 1))} 
                        className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPage }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          onClick={() => setPage(i)} 
                          isActive={page === i} 
                          className="cursor-pointer  border border-gray-200 rounded-md"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setPage(Math.min(totalPage - 1, page + 1))} 
                        className={page === totalPage - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
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

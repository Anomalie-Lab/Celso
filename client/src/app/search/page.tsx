"use client";
import { FilterSearch } from "@/components/search/filters";
import { AccordionSearch } from "@/components/ui/accordion";
import { Order } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductCard from "@/components/ui/productCard";
import { Products } from "@/api/products.api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { IoFilterOutline, IoGridOutline, IoListOutline } from "react-icons/io5";
import { Slider } from "@/components/ui/slider";
import { SearchSkeleton } from "@/components/search/searchSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { LuSearch } from "react-icons/lu";

function SearchContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string; count: number }[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: [0, 1000],
    sort: "",
  });
  const [page, setPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const maxPerPage = 12;

  const q = searchParams.get("q") || "";

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: Products.getCategories,
  });

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: Products.getBrands,
  });

  const { data: searchData, isLoading } = useQuery({
    queryKey: ["search-products", q],
    queryFn: () => Products.searchProducts({ q, page: 1, limit: 1000 }),
    enabled: !!q,
  });

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (brandsData) {
      setBrands(brandsData);
    }
  }, [brandsData]);

  const filteredProducts = useMemo(() => {
    if (!searchData?.products) return [];
    
    let filtered = [...searchData.products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.categories) return false;
        const productCategories = Array.isArray(product.categories) ? product.categories : [product.categories];
        return filters.categories.some(cat => productCategories.includes(cat));
      });
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && filters.brands.includes(product.brand)
      );
    }

    filtered = filtered.filter(product => {
      const price = Number(product.price);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    if (filters.sort) {
      filtered.sort((a, b) => {
        switch (filters.sort) {
          case "newest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "oldest":
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          case "price_asc":
            return Number(a.price) - Number(b.price);
          case "price_desc":
            return Number(b.price) - Number(a.price);
          case "name_asc":
            return a.title.localeCompare(b.title);
          case "name_desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [searchData?.products, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * maxPerPage;
    const endIndex = startIndex + maxPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page, maxPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / maxPerPage);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
    setPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sort }));
    setPage(1);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const categoryImage ={
    'MEDICAMENTOS': '/images/medicamento.jpg',
    'EQUIPAMENTOS': '/images/equipamento.jpg',
    'COSMETICOS': '/images/cosmetico.jpg',
    'HIGIENE PESSOAL': '/images/higiene.jpg',
    'ANALGESICOS': '/images/analgesico.jpg',
  }

  if (!q) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white mt-24">
        <section className="w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-24 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{
              backgroundImage: "url('/images/banner2.jpg')"
            }}
          />   
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/30" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4 leading-tight">
              Busca de Produtos
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 max-w-3xl mx-auto">
              Digite um termo de busca para encontrar produtos
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (isLoading) {
    return <SearchSkeleton />;
  }

  const total = filteredProducts.length;

  return (
    <main className="flex flex-col w-full min-h-screen bg-white mt-10 sm:mt-24 lg:mt-30">
       <section className="w-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-24 relative overflow-hidden">
       {q && categoriesData?.some(cat => cat.name === q) ? (
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
           style={{
             backgroundImage: `url(${categoryImage[q as keyof typeof categoryImage]})`
           }}
         />   
         ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{
              backgroundImage: "url('/images/banner2.jpg')"
            }}
          />   
         )}
         <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/30" />
         <div className="max-w-7xl mx-auto text-center relative z-10">
           {q && categoriesData?.some(cat => cat.name === q) ? (
           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4 leading-tight">
            { q }
           </h1>
           ) : (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4 leading-tight">
              {q ? `Resultados para "${q}"` : "Busca de Produtos"}
           </h1>
           )}
           <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 max-w-3xl mx-auto">
             Descubra os melhores produtos com qualidade excepcional e preços imbatíveis. 
           </p>
         </div>
       </section>

       <section className="flex-1 py-6 sm:py-8 px-4 sm:px-6 lg:px-24">
         <div className="">
           <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
             <div className={`lg:w-80 ${showFilter ? "block" : "hidden lg:block"}`}>
               <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-8">
                 <div className="flex items-center justify-between mb-4 sm:mb-6">
                   <h3 className="text-base sm:text-lg font-semibold text-gray-800">Filtros</h3>
                   <button onClick={() => setShowFilter(!showFilter)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                     <IoFilterOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                   </button>
                 </div>

                 <div className="space-y-6">
                   <AccordionSearch nameFilter="CATEGORIAS" defaultOpen={true}>
                     <FilterSearch 
                       filteredCategory={categories.map(cat => cat.name)} 
                       selectedCategories={filters.categories} 
                       onChangeCategories={handleCategoryChange} 
                     />
                   </AccordionSearch>

                   <AccordionSearch nameFilter="MARCAS">
                     <FilterSearch 
                       brands={brands}
                       selectedBrands={filters.brands}
                       onChangeBrands={handleBrandChange}
                     />
                   </AccordionSearch>

                     <div className="space-y-4">
                      <h3 className="text-sm md:text-md font-medium text-gray-600 uppercase">Preço</h3>
                       <div className="flex justify-between text-sm text-gray-600">
                         <span>{formatCurrency(filters.priceRange[0])}</span>
                         <span>{formatCurrency(filters.priceRange[1])}</span>
                       </div>
                       <Slider
                         value={filters.priceRange}
                         onValueChange={handlePriceRangeChange}
                         onValueCommit={(value) => {
                           setFilters(prev => ({ ...prev, priceRange: value }));
                           setPage(1);
                         }}
                         max={1000}
                         min={0}
                         step={10}
                         className="w-full"
                       />
                     </div>
                 </div>
               </div>
             </div>

             <div className="flex-1">
               <div className="flex flex-col gap-4 mb-4 sm:mb-6">
                 <div className="flex items-center justify-between">
                   <button onClick={() => setShowFilter(!showFilter)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                     <IoFilterOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                   </button>
                   
                   <div className="flex items-center gap-1 sm:gap-2">
                     <div className="flex items-center gap-1 sm:gap-2">
                       <button
                         onClick={() => setViewMode("grid")}
                         className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                       >
                         <IoGridOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                       </button>
                       <button
                         onClick={() => setViewMode("list")}
                         className={`p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                       >
                         <IoListOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                       </button>
                     </div>
                     <Order 
                       sortOption={filters.sort} 
                       setSortOption={handleSortChange} 
                     />
                   </div>
                 </div>
                 
                 <div className="flex justify-start">
                   <div className="text-xs sm:text-sm text-gray-600">
                     Mostrando {((page - 1) * maxPerPage) + 1}-{Math.min(page * maxPerPage, total)} de <span className="font-semibold">{total} resultados</span> 
                   </div>
                 </div>
               </div>

               <div className={`grid gap-4 sm:gap-6 ${
                 viewMode === "grid" 
                   ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                   : "grid-cols-1"
               }`}>
                 {paginatedProducts.map((product) => (
                   <ProductCard key={product.id} data={product} />
                 ))}
               </div>

               {paginatedProducts.length === 0 && q && (
                 <div className="text-center py-8 sm:py-12 flex flex-col items-center justify-center">
                  <LuSearch className="w-10 h-10 text-gray-300 mb-4" />
                   <p className="text-gray-500 text-base md:text-lg">Nenhum produto encontrado para &quot;{q}&quot;</p>
                   <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou usar termos diferentes</p>
                 </div>
               )}

               {totalPages > 1 && (
                 <div className="mt-6 sm:mt-8 flex justify-center">
                   <Pagination>
                     <PaginationContent>
                       <PaginationItem>
                         <PaginationPrevious 
                           onClick={() => setPage(Math.max(1, page - 1))} 
                           className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                         />
                       </PaginationItem>
                       {Array.from({ length: totalPages }, (_, i) => (
                         <PaginationItem key={i}>
                           <PaginationLink 
                             onClick={() => setPage(i + 1)} 
                             isActive={page === i + 1} 
                             className="cursor-pointer border border-gray-200 rounded-md"
                           >
                             {i + 1}
                           </PaginationLink>
                         </PaginationItem>
                       ))}
                       <PaginationItem>
                         <PaginationNext 
                           onClick={() => setPage(Math.min(totalPages, page + 1))} 
                           className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                         />
                       </PaginationItem>
                     </PaginationContent>
                   </Pagination>
                 </div>
               )}
             </div>
           </div>
         </div>
       </section>
     </main>
   );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}

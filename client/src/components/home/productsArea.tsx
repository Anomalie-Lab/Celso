"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "../ui/productCard";
import { Products } from "@/api/products.api";
import { ProductsAreaSkeleton } from "@/components/ui/productsAreaSkeleton";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductsAreaProps {
  titleArea: string;
  type: "all" | "discounted" | "bestSellers";
}

export default function ProductsArea({ titleArea, type }: ProductsAreaProps) {
  const router = useRouter();

  const getQueryKey = () => {
    switch (type) {
      case "discounted":
        return ["products", "discounted"];
      case "bestSellers":
        return ["products", "bestSellers"];
      default:
        return ["products", "all"];
    }
  };

  const getQueryFn = () => {
    switch (type) {
      case "discounted":
        return Products.getDiscounted;
      case "bestSellers":
        return Products.getBestSellers;
      default:
        return Products.getAll;
    }
  };

  const { data: products = [], isLoading, error } = useQuery<Product.SimpleI[]>({ queryKey: getQueryKey(), queryFn: getQueryFn() });

  const handleSeeAllClick = () => {
    switch (type) {
      case "discounted":
        router.push("/search?q=discounted");
        break;
      case "bestSellers":
        router.push("/search?q=bestSellers");
        break;
      default:
        router.push("/search");
        break;
    }
  };

  if (isLoading) {
    return <ProductsAreaSkeleton titleArea={titleArea} />;
  }

  if (error) {
    return (
      <div className="w-full container-responsive">
        <h1 className="text-center text-xl sm:text-2xl font-semibold mt-8 sm:mt-12 mb-6 sm:mb-8">{titleArea}</h1>
        <div className="text-center py-8 sm:py-12 text-gray-500">Erro ao carregar {titleArea.toLowerCase()}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full container-responsive">
        <h1 className="text-center text-xl sm:text-2xl font-semibold mt-8 sm:mt-12 mb-6 sm:mb-8">{titleArea}</h1>
        <div className="text-center py-8 sm:py-12 text-gray-500">Nenhum produto encontrado</div>
      </div>
    );
  }

  return (
    <div className="w-full container-responsive">
      <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8 mt-8 sm:mt-12 gap-4">
        <h1 className="text-left text-base md:text-xl font-bold text-black/90">{titleArea}</h1>
        <button
          onClick={handleSeeAllClick}
          className="flex border border-gray-200 rounded-full px-4 sm:px-7 py-2 sm:py-3 items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium text-xs cursor-pointer hover:bg-primary hover:text-white transition-colors active:scale-105 self-start sm:self-auto"
        >
          Veja Todos
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={product.id || index} className="pl-1 sm:pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                  <ProductCard data={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 sm:left-2 md:left-4 w-8 h-8 sm:w-10 sm:h-10" />
          <CarouselNext className="right-1 sm:right-2 md:right-4 w-8 h-8 sm:w-10 sm:h-10" />
        </Carousel>
      </div>                                        
    </div>
  );
}

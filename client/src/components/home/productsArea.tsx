"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "../ui/productCard";
import { Products } from "@/api/products.api";
import { Loader2 } from "lucide-react";

interface ProductsAreaProps {
  titleArea: string;
  type: "all" | "discounted" | "bestSellers";
}

export default function ProductsArea({ titleArea, type }: ProductsAreaProps) {
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

  if (isLoading) {
    return (
      <div className="w-full px-24">
        <h1 className="text-center text-2xl font-semibold mt-12 mb-8">{titleArea}</h1>
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-24">
        <h1 className="text-center text-2xl font-semibold mt-12 mb-8">{titleArea}</h1>
        <div className="text-center py-12 text-gray-500">Erro ao carregar {titleArea.toLowerCase()}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full px-24">
        <h1 className="text-center text-2xl font-semibold mt-12 mb-8">{titleArea}</h1>
        <div className="text-center py-12 text-gray-500">Nenhum produto encontrado</div>
      </div>
    );
  }

  return (
    <div className="w-full px-24">
      <h1 className="text-center text-2xl font-semibold mt-12 mb-8">{titleArea}</h1>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={product.id || index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="p-1">
                  <ProductCard data={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4" />
          <CarouselNext className="right-2 md:right-4" />
        </Carousel>
      </div>
    </div>
  );
}

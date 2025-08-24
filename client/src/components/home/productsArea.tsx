import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "../ui/productCard"
import productsData from "@/data/products.json"
import { Product } from "@/types/productTypes"

const products: Product[] = productsData.products as Product[];

export default function ProductsArea({titleArea}: {titleArea: string}) {
    return (
        <div className="w-full px-24">
            <h1 className="text-center text-3xl font-semibold mt-12 mb-8">{titleArea}</h1>
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
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <div className="p-1">
                                    <ProductCard {...product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 md:left-4" />
                    <CarouselNext className="right-2 md:right-4" />
                </Carousel>
            </div>
        </div>
    )
}
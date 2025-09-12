"use client"
import { useRouter } from "next/navigation";
import { BriefcaseMedical } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/api/products.api";



export default function CategoriesSection() {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/search?q=${categoryName}`);
  };

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: Products.getCategories,
  });

  const categoryImage ={
    'MEDICAMENTOS': '/images/medicamento.jpg',
    'EQUIPAMENTOS': '/images/equipamento.jpg',
    'COSMETICOS': '/images/cosmetico.jpg',
    'HIGIENE PESSOAL': '/images/higiene.jpg',
    'ANALGESICOS': '/images/analgesico.jpg',
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-primary-50 flex justify-center">
      <div className="w-3/4">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 items-start">
          <div className="w-full lg:w-auto lg:flex-shrink-0 text-center lg:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Categorias
            </h2>
            <div className="flex items-center gap-3 sm:mb-6 justify-center lg:justify-start">
              <BriefcaseMedical className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="text-gray-600 text-sm sm:text-base">
                200+ Produtos únicos
              </span>
            </div>
          </div>

          <div className="w-full lg:flex-1">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1 sm:-ml-2 md:-ml-4">
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="pl-1 sm:pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3">
                    <div
                      onClick={() => handleCategoryClick(category.name.toString())}
                      className="group cursor-pointer relative h-48 sm:h-56 lg:h-64 xl:h-72 rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: `url(${categoryImage[category.name as keyof typeof categoryImage]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />                    
                      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 text-white">
                        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-white drop-shadow-lg">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 sm:left-2 md:left-4 w-8 h-8 sm:w-10 sm:h-10" />
              <CarouselNext className="right-1 sm:right-2 md:right-4 w-8 h-8 sm:w-10 sm:h-10" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

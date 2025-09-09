"use client"
import { useRouter } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";
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

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/search?category=${categoryId}`);
  };

  const handleAllCategoriesClick = () => {
    router.push("/search");
  };


  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: Products.getCategories,
  });

  return (
    <section className="py-16 bg-primary-50 flex justify-center">
      <div className="w-3/4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Categorias
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseMedical className="w-6 h-6 text-primary" />
              <span className="text-gray-600">
                200+ Produtos únicos
              </span>
            </div>
            <button
              onClick={handleAllCategoriesClick}
              className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors font-medium cursor-pointer"
            >
              TODAS AS CATEGORIAS
              <LuArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:w-full ml-6">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="pl-2 md:pl-4 md:basis-1/3">
                    <div
                      onClick={() => handleCategoryClick(category.id.toString())}
                      className="group cursor-pointer relative h-72 rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: `url('/placeholder-category.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />                    
                      <div className="absolute bottom-6 right-6 text-white">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeroArea() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/heroBanner.png",
      link: "/produtos/manipulados"
    },
    {
      id: 2,
      image: "/images/heroBanner.png", 
      link: "/produtos/equipamentos"
    },
    {
      id: 3,
      image: "/images/heroBanner.png",
      link: "/produtos/cosmeticos"
    }
  ];

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative mt-28 !h-fit !mb-0 h-[500px] max-md:mt-12 max-md:h-[300px] overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0 h-full">
              <Link href={slide.link} className="block h-full w-full">
                <div className="relative w-full h-full overflow-hidden cursor-pointer group">
                  <img 
                    src={slide.image} 
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white z-20">
          <ChevronLeft className="w-6 h-6" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white z-20">
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 max-md:w-1 max-md:h-1 rounded-full transition-all duration-300 ${
              index === current - 1 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel/carouselLogin";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export const Sliders = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = ["/image-login/image-carousel.png", "/image-login/image-carousel.png", "/image-login/image-carousel.png"];

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel
      className="h-screen p-6"
      opts={{
        loop: true,
        watchDrag: false,
      }}
      plugins={[autoplay.current]}
      setApi={(api) => {
        if (!api) return;
        setActiveIndex(api.selectedScrollSnap());
        api.on("select", () => setActiveIndex(api.selectedScrollSnap()));
      }}
    >
      <CarouselContent className="h-screen">
        {images.map((src, index) => (
          <CarouselItem key={index} className="h-screen">
            <Image src={src} alt={`image ${index + 1}`} width={1920} height={1080} className="object-cover w-full h-[95%]" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Dots */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? "bg-white" : "bg-gray-400"}`} />
        ))}
      </div>
    </Carousel>
  );
};

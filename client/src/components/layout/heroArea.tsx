"use client"
import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function HeroArea() {
  const images = [
    '/images/heroBanner.png',
    '/images/heroBanner.png',
    '/images/heroBanner.png',
  ]

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


return (
    <div className="relative h-[720px] w-full overflow-hidden cursor-pointer">
      <Carousel 
        setApi={setApi} 
        className="h-full w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full w-full basis-full">
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`Hero banner ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20" />
        <CarouselNext className="right-4 z-20" />
      </Carousel>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 cursor-pointer rounded-full transition-opacity ${
              current === index + 1
                ? 'bg-white'
                : 'bg-white/30 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  )


}
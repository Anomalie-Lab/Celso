import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel/carouselLogin";
import Autoplay from "embla-carousel-autoplay";

export const Sliders = () => {
  const images = [
    "/image-login/image-carousel.png",
    "/image-login/image-carousel.png",
    "/image-login/image-carousel.png",
  ];

  return (
    <Carousel
      className="h-screen p-6"
      opts={{
        loop: true,
        watchDrag: false, // desabilita o arraste/touch
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="h-screen">
        {images.map((src, index) => (
          <CarouselItem key={index} className="h-screen">
            <img
              src={src}
              alt={`image ${index + 1}`}
              className="object-cover w-full h-[95%]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

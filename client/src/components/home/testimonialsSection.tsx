"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "São Paulo, SP",
    rating: 5,
    text: "Excelente atendimento e produtos de qualidade. A entrega foi super rápida e o preço muito justo. Recomendo para todos!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 2,
    name: "João Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Compro aqui há mais de 2 anos e nunca tive problemas. Os medicamentos sempre chegam dentro do prazo e com qualidade garantida.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "O suporte ao cliente é excepcional! Me ajudaram com todas as dúvidas sobre os medicamentos e ainda me deram dicas de uso.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    location: "Porto Alegre, RS",
    rating: 5,
    text: "Preços competitivos e produtos originais. A farmácia online mais confiável que já usei. Parabéns pelo excelente trabalho!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 5,
    name: "Fernanda Lima",
    location: "Salvador, BA",
    rating: 5,
    text: "Adorei a variedade de produtos e a facilidade de navegação no site. Comprei suplementos e cosméticos, tudo perfeito!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 6,
    name: "Roberto Alves",
    location: "Brasília, DF",
    rating: 5,
    text: "Entrega rápida e segura. Os produtos chegaram bem embalados e dentro do prazo. Virei cliente fiel da farmácia!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    verified: true
  }
];

export default function TestimonialsSection() {

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="flex justify-center items-center bg-primary-50 relative overflow-hidden h-[700px]">
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black/90 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 50.000 clientes satisfeitos confiam na nossa farmácia online
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto p-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 p-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 cursor-pointer">
                  <div className="h-full">
                    <div className="bg-white rounded-2xl p-10 h-full flex flex-col">
                      <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                          <Quote className="w-6 h-6 text-primary" />
                        </div>
                      </div>

                      <div className="flex justify-center mb-4">
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>

                      <blockquote className="text-gray-700 text-center mb-6 flex-grow leading-relaxed text-sm">
                        &quot;{testimonial.text}&quot;
                      </blockquote>

                      <div className="flex items-center justify-center space-x-4">
                        <div className="relative">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-xs text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:left-4" />
            <CarouselNext className="right-2 md:right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

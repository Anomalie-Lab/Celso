"use client"
import { useRouter } from "next/navigation";

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  discount: string;
  buttonText: string;
  link: string;
}

const banners: Banner[] = [
  {
    id: "equipamentos-medicos",
    title: "Equipamentos Médicos",
    subtitle: "20% OFF EM TODOS OS PEDIDOS",
    backgroundImage: "/images/medico.png",
    discount: "20% OFF",
    buttonText: "Comprar Agora",
    link: "/search?category=equipamentos-medicos"
  },
  {
    id: "estetica-avancada",
    title: "Estética Avançada",
    subtitle: "20% OFF EM TODOS OS PEDIDOS", 
    backgroundImage: "/images/estetica.png",
    discount: "20% OFF",
    buttonText: "Comprar Agora",
    link: "/search?category=estetica"
  }
];

export default function PromotionalBanners() {
  const router = useRouter();

  const handleBannerClick = (link: string) => {
    router.push(link);
  };

  return (
    <section className="py-12">
      <div className="mx-auto px-12 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-[500px] rounded-xl overflow-hidden group cursor-pointer cursor-pointer"
              onClick={() => handleBannerClick(banner.link)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${banner.backgroundImage})`
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
                {/* White Border Frame */}
                <div className="border-2 border-white/30 rounded-xl h-full w-full  flex flex-col justify-center items-center backdrop-blur-sm bg-white/5">
                  <div className="text-white/90 text-sm font-medium mb-2 tracking-wide">
                    {banner.subtitle}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-6">
                    {banner.title}
                  </h3>
                  <button className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors font-medium group-hover:scale-105 transform transition-transform cursor-pointer">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import ConditionsLayer from "@/components/home/conditionsLayer";
import Newsletter from "@/components/home/newsleatter";
import ProductsArea from "@/components/home/productsArea";
import HeroArea from "@/components/home/heroArea";
import TestimonialsSection from "@/components/home/testimonialsSection";
import CategoriesSection from "@/components/home/categoriesSection";
import PromotionalBanners from "@/components/home/promotionalBanners";

export default function Home() {
  return (
    <div className="h-[5300px] space-y-24 bg-background">
      <HeroArea/>
      <ConditionsLayer/>
      <CategoriesSection/>
      <ProductsArea titleArea="Produtos mais vendidos" type="bestSellers"/>
      <PromotionalBanners/>
      <ProductsArea titleArea="Mais buscados com 20% OFF" type="all"/>
      <TestimonialsSection/>
      <ProductsArea titleArea="Mais buscados com 20% OFF" type="all"/>
      <Newsletter/>
    </div>
  );
}

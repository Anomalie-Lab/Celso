import BannerPromo from "@/components/home/bannerPromo";
import ConditionsLayer from "@/components/home/conditionsLayer";
import Newsletter from "@/components/home/newsleatter";
import ProductsArea from "@/components/home/productsArea";
import HeroArea from "@/components/home/heroArea";

export default function Home() {
  return (
    <div className="h-[3400px] space-y-24 bg-background">
      <HeroArea/>
      <ConditionsLayer/>
      <ProductsArea titleArea="Produtos mais vendidos" type="bestSellers"/>
      <BannerPromo/>
      <ProductsArea titleArea="Mais buscados com 20% OFF" type="all"/>
      <Newsletter/>
    </div>
  );
}

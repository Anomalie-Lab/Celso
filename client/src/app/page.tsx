import BannerPromo from "@/sections/bannerPromo";
import ConditionsLayer from "@/sections/conditionsLayer";
import Newsletter from "@/sections/newsleatter";
import ProductsArea from "@/sections/productsArea";
import Main from "@/sections/main";

export default function Home() {
  return (
    <div className="h-[4200px] space-y-24 bg-background">
      <Main />
      <ConditionsLayer />
      <ProductsArea titleArea="Produtos mais vendidos" />
      <BannerPromo />
      <ProductsArea titleArea="Mais buscados com 20% OFF" />
      <Newsletter />
    </div>
  );
}

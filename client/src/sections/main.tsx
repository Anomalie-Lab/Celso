import Header from "@/components/layout/header";
import HeroArea from "@/components/layout/heroArea";
import NavHeaderMenu from "@/components/layout/navHeaderMenu";
import PromoLayer from "@/components/layout/promoLayer";

export default function Main() {
    return (
        <section className="h-screen">
            <PromoLayer/>
            <Header/>
            <NavHeaderMenu/>
            <HeroArea />
        </section>
    )
}
import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import {IoPeopleOutline } from "react-icons/io5";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const conditions = [
    {
        icon: Truck,
        title: "Frete grátis",
        description: "a partir de R$ 170 *"
    },
    {
        icon: CreditCard,
        title: "10x sem juros",
        description: "aceitamos cartões"
    },
    {
        icon: ShieldCheck,
        title: "Compra segura",
        description: "Dados protegidos"
    },
    {
        icon: IoPeopleOutline,
        title: "Suporte 24h",
        description: "Atendimento especializado"
    }
];

export default function ConditionsLayer() {
    return (
        <>
        <div className="flex justify-center px-2 md:px-4 hidden md:flex">
           <div className="flex bg-black container bg-white justify-between items-center rounded-lg p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5 items-center w-full sm:w-auto justify-center sm:justify-start">
                    <Truck className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-primary flex-shrink-0"/>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm lg:text-base xl:text-xl">Frete grátis</h3>
                        <p className="text-xs">a partir de R$ 170 *</p>	
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5 items-center w-full sm:w-auto justify-center sm:justify-start">
                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-primary flex-shrink-0"/>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm lg:text-base xl:text-xl">10x sem juros</h3>
                        <p className="text-xs">aceitamos cartões</p>	
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5 items-center w-full sm:w-auto justify-center sm:justify-start">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-primary flex-shrink-0"/>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm lg:text-base xl:text-xl">Compra segura</h3>
                        <p className="text-xs">Dados protegidos</p>	
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5 items-center w-full sm:w-auto justify-center sm:justify-start">
                    <IoPeopleOutline className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-primary flex-shrink-0"/>
                    <div className="flex flex-col min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm lg:text-base xl:text-xl">Suporte 24h</h3>
                        <p className="text-xs">Atendimento especializado</p>	
                    </div>
                </div>
           </div>
        </div>
        {/* Carousel para dispositivos sm */}
        <div className="block md:hidden px-2 cursor-pointer">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {conditions.map((condition, index) => {
                        const IconComponent = condition.icon;
                        return (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
                                <div className="flex gap-3 items-center bg-white border border-gray-200 rounded-lg p-3 h-full justify-around">
                                    <IconComponent className="w-6 h-6 text-primary flex-shrink-0"/>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-bold text-sm">{condition.title}</h3>
                                        <p className="text-xs text-gray-600">{condition.description}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
        </>
    )
}
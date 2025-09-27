import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import {IoPeopleOutline } from "react-icons/io5";

export default function ConditionsLayer() {
    return (
        <div className="flex justify-center">
           <div className="flex container h-24 bg-white justify-between items-center rounded-lg">
                <div className="flex gap-5">
                    <Truck className="w-12 h-12 text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Frete grátis</h3>
                        <p className="text-sm">a partir de R$ 170 *</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <CreditCard className="w-12 h-12 text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">10x sem juros</h3>
                        <p className="text-sm">aceitamos diversos tipos de cartões</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <ShieldCheck className="w-12 h-12 text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Compra 100% segura</h3>
                        <p className="text-sm">Seus dados protegidos</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <IoPeopleOutline className="text-4xl text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-xl">Suporte 24h</h3>
                        <p className="text-sm">Atendimento especializado</p>	
                    </div>
                </div>
           </div>
        </div>
    )
}
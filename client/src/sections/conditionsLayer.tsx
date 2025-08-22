import { CiDeliveryTruck } from "react-icons/ci";
import { IoCardOutline, IoPeopleOutline, IoShieldOutline } from "react-icons/io5";

export default function ConditionsLayer() {
    return (
        <div className="flex justify-center">
           <div className="flex container shadow-xs h-32 bg-white justify-around items-center rounded-lg">
                <div className="flex gap-5">
                    <CiDeliveryTruck className="text-4xl text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">Frete grátis</h3>
                        <p className="text-sm">a partir de R$ 170 *</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <IoCardOutline className="text-4xl text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">10 x sem juros</h3>
                        <p className="text-sm">aceitamos diversos tipos de cartões</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <IoShieldOutline className="text-4xl text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">Compra 100% segura</h3>
                        <p className="text-sm">Seus dados protegidos</p>	
                    </div>
                </div>
                <div className="flex gap-5">
                    <IoPeopleOutline className="text-4xl text-primary"/>
                    <div className="flex flex-col">
                        <h3 className="font-bold text-lg">Suporte 24h</h3>
                        <p className="text-sm">Atendimento especializado</p>	
                    </div>
                </div>
           </div>
        </div>
    )
}
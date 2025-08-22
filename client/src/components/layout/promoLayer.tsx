import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";

export default function PromoLayer() {
    return (
        <div className="bg-secondary h-12 text-2xl flex items-center justify-center text-white gap-4">
            <div className="flex items-center gap-1">
                <CiDiscount1 />
                <h1 className="text-[15px]"><span className="font-bold">10% OFF</span> na primeira compra</h1>
            </div>
            <TbPointFilled className="text-white text-xs" />
            <div className="flex items-center gap-1">
                <CiDeliveryTruck />
                <h1 className="text-[15px]">Frete Grátis</h1>
            </div>
        </div>
    )
}
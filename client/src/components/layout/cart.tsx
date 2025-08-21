"use client"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { LuX } from "react-icons/lu";
import { PiBasketLight } from 'react-icons/pi';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  

interface CartProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function Cart({ isOpen, toggleDrawer }: CartProps) {
    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            size={400}
            direction='right'
            className="!bg-white"
        >
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Meu Carrinho</h2>
                    </div>
                    <button 
                        onClick={toggleDrawer}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <LuX className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="flex-1 p-6">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <PiBasketLight className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                            Seu carrinho está vazio
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Adicione produtos para começar suas compras
                        </p>
                    </div>
                </div>
                <div className="p-8 border-t border-gray-200">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-gray-800">Calcular frete</p>
                    <InputOTP maxLength={9}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-gray-300"/>
                        <InputOTPGroup>
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                            <InputOTPSlot index={8} />
                        </InputOTPGroup>
                    </InputOTP>
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-6">
                        <span className="text-sm font-semibold text-gray-800">Subtotal</span>
                        <span className="text-md font-semibold text-gray-800">R$ 0,00</span>
                    </div>
                    <button 
                        className="w-full bg-primary text-white py-4 px-4 rounded-full font-medium flex items-center justify-center gap-4"
                    >
                        Finalizar Compra
                        <PiBasketLight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </Drawer>
    )
}
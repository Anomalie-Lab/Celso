"use client"
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { LuX } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { PiBasketLight, PiShareNetworkLight } from 'react-icons/pi';
import { useDrawer } from '@/hooks/useDrawer';

interface WishListProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function WishListDrawer({ isOpen, toggleDrawer }: WishListProps) {
    useDrawer(isOpen);

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            size={450}
            direction='right'
            className="!bg-white drawer-panel"
            overlayClassName="drawer-overlay"
        >
            <div className="h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Minha Lista de Desejos</h2>
                    </div>
                    <button 
                        onClick={toggleDrawer}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <LuX className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto drawer-content">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <LuHeart className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                            Sua lista de desejos está vazia
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Adicione produtos que você gostaria de comprar
                        </p>
                        <button 
                            className=" py-3 px-6 border border-gray-200 text-gray-600 rounded-full font-medium transition-colors text-sm cursor-pointer"
                        >
                            Explorar Produtos
                        </button>
                    </div>
                </div>
                
                <div className="p-8 border-t border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-800">Total de itens</span>
                        <span className="text-md font-semibold text-gray-800">0 itens</span>
                    </div>
                    
                    <div className="space-y-3">
                        <button 
                            className="w-full bg-primary text-white py-4 px-4 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors cursor-pointer text-sm"
                        >
                            <PiBasketLight className="w-5 h-5" />
                            Adicionar Todos ao Carrinho
                        </button>
                        
                        <button 
                            className="w-full border border-gray-300 text-gray-700 py-3 px-4 flex items-center justify-center gap-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <PiShareNetworkLight className="w-5 h-5 text-gray-500" />
                            Compartilhar Lista
                        </button>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

"use client";
import { BriefcaseMedical } from "lucide-react";
import Link from "next/link";
import { PiBasketLight } from "react-icons/pi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <BriefcaseMedical className="w-9 h-9 text-primary animate-bounce duration-900" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-primary/5 rounded-full animate-ping"></div>
        </div>

        <h1 className="text-9xl font-bold text-primary-50 mb-6 select-none">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Ops! Parece que não foi possível encontrar a página que você está procurando.
          Que tal continuar as compras?
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary-600 active:scale-105 cursor-pointer"
        >
          <PiBasketLight className="w-5 h-5" />
          Continuar Comprando
        </Link>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </main>
  );
}

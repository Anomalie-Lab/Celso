"use client"

import { getProducts } from "@/utils/productUtils";
import Image from "next/image";
import { LuHeart, LuTrash2 } from "react-icons/lu";
import { PiBasket } from "react-icons/pi";

export default function WishesPage() {
  const products = getProducts().slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lista de Desejos</h1>
          <p className="text-gray-600">Seus produtos favoritos salvos</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{products.length} produtos</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
            <span className="text-sm font-regular text-gray-700">Selecionar Todos</span>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-3 border border-gray-300 rounded-lg transition-colors text-sm flex items-center gap-2 cursor-pointer">
            <LuTrash2 className="w-4 h-4 text-gray-500" />
            Remover Selecionados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-100  overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <Image
                src={product.image}
                width={1080}
                height={1080}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
                  <LuHeart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {product.productName}
                </h3>
                <button className="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating.toFixed(1)} ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-800">{product.currentPrice}</span>
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg transition-colors text-sm cursor-pointer">
                  <PiBasket className="w-4 h-4" />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <LuHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Sua lista de desejos está vazia</h3>
          <p className="text-gray-500 mb-6">
            Adicione produtos à sua lista de desejos para encontrá-los facilmente depois
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Continuar Comprando
          </button>
        </div>
      )}
    </div>
  );
}

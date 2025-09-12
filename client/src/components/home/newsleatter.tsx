"use client"
import { useRouter } from "next/navigation";
import { LuInfo } from "react-icons/lu";

export default function Newsletter() {
  const router = useRouter();
  return (
    <section className="bg-secondary py-8 sm:py-12">
      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-6 sm:mb-8">
          <div className="space-y-3 py-8">
            <h2 className="text-2xl md:text-4xl text-center lg:text-left font-bold text-white">
              RECEBA NOVIDADES E PROMOÇÕES
            </h2>
            <p className="text-white text-center lg:text-left text-sm leading-relaxed">
              Cadastre-se e receba promoções exclusivas e saiba tudo antes de todo mundo !
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm sm:text-base"
              />
            </div>
            <button className="w-full bg-primary text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-colors cursor-pointer hover:bg-primary-600 text-sm sm:text-base">
              Cadastre-se
            </button>
            <p className="text-gray-400 text-xs sm:text-sm text-center mt-4">
              Ao se cadastrar você aceita nossa{" "}
              <button onClick={() => router.push('/politica-privacidade')} className="text-white underline hover:text-primary-500 transition-colors cursor-pointer">
                Política de Privacidade e Segurança
              </button>
              .
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mb-6 sm:mb-8"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="flex-shrink-0 hidden lg:block">
            <LuInfo className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center lg:text-left">
            <span className="font-bold text-gray-300">Atenção:</span>{" "}
            Segundo a Anvisa só é permitida a comercialização dos manipulados em site próprio e lojas físicas da marca. Não nos responsabilizamos por vendas em sites e lojas de terceiros.
          </div>
        </div>
      </div>
    </section>
  );
}
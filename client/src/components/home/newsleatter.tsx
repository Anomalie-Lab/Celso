import { LuInfo } from "react-icons/lu";

export default function Newsletter() {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">
              RECEBA NOVIDADES E PROMOÇÕES
            </h2>
            <p className="text-white text-sm leading-relaxed">
              Cadastre-se e receba promoções exclusivas e saiba tudo antes de todo mundo !
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:outline-none transition-colors"
              />
            </div>
            <button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-regular  transition-colors cursor-pointer">
              Cadastre-se
            </button>
            <p className="text-gray-400 text-sm text-center">
              Ao se cadastrar você aceita nossa{" "}
              <a href="#" className="text-white underline hover:text-primary-500 transition-colors">
                Política de Privacidade e Segurança
              </a>
              .
            </p>
          </div>
        </div>
        
        {/* Linha Separadora */}
        <div className="border-t border-gray-600 mb-8"></div>

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 mt-1">
            <LuInfo className="w-5 h-5 text-primary" />
          </div>
          <div className="text-gray-400 text-sm leading-relaxed">
            <span className="font-bold text-gray-300">Atenção:</span>{" "}
            Segundo a Anvisa só é permitida a comercialização dos manipulados em site próprio e lojas físicas da marca. Não nos responsabilizamos por vendas em sites e lojas de terceiros.
          </div>
        </div>
      </div>
    </section>
  );
}
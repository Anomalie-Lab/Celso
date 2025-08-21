import { LuPhone, LuMail, LuClock } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-100 flex items-center justify-center flex-col w-full">
      <div className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 bg-white p-10">
            <div>
            <Image src="/images/logo.png" width={150} height={150} alt="logo" className="text-black text-3xl font-bold"/>
            </div>

            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                <FaFacebookF className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                <FaInstagram className="w-5 h-5 text-primary" />
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LuPhone className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">(18) 3221 2232</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="w-5 h-5 text-secondary" />
                <span className="text-gray-700">(18) 99774 2232</span>
              </div>
              <div className="flex items-center space-x-3">
                <LuMail className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 text-sm">vendas@hospitalardistribuidora.com.br</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <LuClock className="w-5 h-5 text-secondary" />
                <span className="text-gray-700 font-semibold">Horário de Atendimento</span>
              </div>
              <div className="ml-8 space-y-1">
                <p className="text-gray-600 text-sm">Seg. à Sex. das 08:00h às 18:00h</p>
                <p className="text-gray-600 text-sm">Sábado das 08:00h às 12:00h</p>
              </div>
            </div>
          </div>
            
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Ajuda e suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Política de privacidade</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Perguntas Frequentes</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Formas de pagamento</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Troca ou devolução</a></li>
            </ul>
          </div>
          

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Minha Conta</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Meus Dados</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Meus Pedidos</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Login</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Categorias</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Autoclave</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Estética</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Micropigmentação</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blue-900 transition-colors">Macas</a></li>
            </ul>
          </div>
          
        </div>
      </div>

      <div className="border-t border-gray-250 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            
            {/* Pagamentos */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-primary">Pagamentos</h4>
              <div className="flex flex-wrap gap-2">
                {/* Mastercard */}
                <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded flex items-center justify-center">
                  <div className="w-6 h-4 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* Visa */}
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">VISA</span>
                </div>
                
                {/* Elo */}
                <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-green-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ELO</span>
                </div>
                
                {/* American Express */}
                <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AMEX</span>
                </div>
                
                {/* Pix */}
                <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PIX</span>
                </div>
                
                {/* Código de Barras */}
                <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <div className="w-8 h-4 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-primary">Segurança</h4>
              <div className="flex items-center space-x-2">
                <MdOutlineSecurity className="text-3xl text-secondary" />
                <span className="text-gray-500 text-sm">Site com criptografia SSL</span>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-gray-500 text-sm">
                COPYRIGHT © - Hospitalar Distribuidora - CNPJ: 03.375.328/0001-80
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

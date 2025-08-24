import { LuPhone, LuMail, LuClock, LuArrowRight } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <Image 
                src="/images/logo.png" 
                width={130} 
                height={140} 
                alt="logo"
              />
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Líder em equipamentos hospitalares de alta qualidade. 
              Comprometida com a excelência e inovação na área da saúde, 
              oferecendo produtos que fazem a diferença.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Informações</h3>
            <ul className="space-y-3">
              <li>
                <a href="/politica-privacidade" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/perguntas-frequentes" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="/formas-pagamento" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Formas de Pagamento
                </a>
              </li>
              <li>
                <a href="/troca-devolucao" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Troca ou Devolução
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Minha Conta</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Meus Dados
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Meus Pedidos
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                  Favoritos
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Autoclave
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Estética
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Micropigmentação
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                    Macas
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Fale Conosco</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LuPhone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">(18) 3221 2232</span>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">(18) 99774 2232</span>
              </div>
              <div className="flex items-center gap-3">
                <LuMail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">vendas@hospitalardistribuidora.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <LuClock className="w-4 h-4 text-gray-400" />
                <div className="text-gray-600 text-sm">
                  <p>Seg. à Sex. 08:00h às 18:00h</p>
                  <p>Sábado 08:00h às 12:00h</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Newsletter</h4>
              <p className="text-gray-600 text-sm mb-3">
                Receba ofertas exclusivas e novidades em primeira mão.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu email" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-white"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors">
                  <LuArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Ao se inscrever, você concorda com nossa 
                <a href="/politica-privacidade" className="text-primary hover:underline"> Política de Privacidade</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-gray-500 text-sm">
                © 2024 Hospitalar Distribuidora. CNPJ: 03.375.328/0001-80
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm mr-2">Formas de Pagamento:</span>
              <div className="flex items-center gap-4">            
                {/* Visa */}
                <img src="/images/visa.png" width={50} height={50} alt="Visa" />

                {/* Mastercard */}
                <img src="/images/mastercard.png" width={50} height={50} alt="Mastercard" />    

                {/* Pix */}
                <img src="/images/pix.png" width={50} height={50} alt="Pix" />    
                
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2">
              <MdOutlineSecurity className="w-5 h-5 text-primary" />
              <span className="text-gray-500 text-sm">Site Seguro SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client"
import { LuPhone, LuMail, LuClock, LuArrowRight } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";
import { useState } from "react";
import Cart from "../home/cartDrawer";
import WishListDrawer from "../home/wishListDrawer";
import { ModalAuth } from "../auth/modal.auth";
import { useRouter } from "next/navigation";
type AuthPage = "Login" | "Register" | "ForgotPass"

export default function Footer() {
  const navigate = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("Login");

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const toggleWishList = () => setIsWishListOpen(prev => !prev);
  const toggleAuth = () => setIsAuthOpen(prev => !prev);
  const toggleAuthPage = (page: AuthPage) => setAuthPage(page);

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <button onClick={() => navigate.push('/')} className="cursor-pointer">
              <Image 
                src="/images/logo.png" 
                width={130} 
                height={140} 
                alt="logo"
              />
            </button>
            
            <p className="text-gray-600 text-sm leading-relaxed mt-6">
              Líder em equipamentos hospitalares de alta qualidade. 
              Comprometida com a excelência e inovação na área da saúde, 
              oferecendo produtos que fazem a diferença.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Informações</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => navigate.push('/sobre-nos')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                  Sobre Nós
                </button>
              </li>
              <li>
                <button onClick={() => navigate.push('/troca-devolucao')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                  Troca ou Devolução
                </button>
              </li>
              <li>
                <button onClick={() => navigate.push('/politica-privacidade')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button onClick={() => navigate.push('/perguntas-frequentes')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                  Perguntas Frequentes
                </button>
              </li>
              <li>
                <button onClick={() => navigate.push('/formas-pagamento')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                  Formas de Pagamento
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Minha Conta</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => navigate.push('/minha-conta/pedidos')}
                  className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  Meus Dados
                </button>
              </li>
              <li>
                <button 
                  onClick={toggleCart}
                  className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  Meus Pedidos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { toggleAuth(); toggleAuthPage("Login"); }}
                  className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  Login
                </button>
              </li>
              <li>
                <button 
                  onClick={toggleWishList}
                  className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  Favoritos
                </button>
              </li>
            </ul>

            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Categorias</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate.push('/categorias/autoclave')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                    Autoclave
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/estetica')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                    Estética
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/micropigmentacao')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                    Micropigmentação
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/macas')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer">
                    Macas
                  </button>
                </li>
              </ul>
            </div>
          </div>

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
                <button className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors cursor-pointer">
                  <LuArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Ao se inscrever, você concorda com nossa 
                <button onClick={() => navigate.push('/politica-privacidade')} className="text-primary hover:underline cursor-pointer"> Política de Privacidade</button>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="text-center lg:text-left">
              <p className="text-gray-500 text-sm">
                © 2024 Hospitalar Distribuidora. CNPJ: 03.375.328/0001-80
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm mr-2">Formas de Pagamento:</span>
              <div className="flex items-center gap-4">            
                <Image src="/images/visa.png" width={50} height={50} alt="Visa" />

                <Image src="/images/mastercard.png" width={50} height={50} alt="Mastercard" />    

                <Image src="/images/pix.png" width={50} height={50} alt="Pix" />    
                
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdOutlineSecurity className="w-5 h-5 text-primary" />
              <span className="text-gray-500 text-sm">Site Seguro SSL</span>
            </div>
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} toggleDrawer={toggleCart} />
      <WishListDrawer isOpen={isWishListOpen} toggleDrawer={toggleWishList} />
      <ModalAuth 
        isOpen={isAuthOpen} 
        toggleDialog={toggleAuth} 
        authPage={authPage}
        onAuthPageChange={toggleAuthPage}
      />
    </footer>
  );
}

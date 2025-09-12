"use client"
import { LuPhone, LuMail, LuClock, LuArrowRight } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";
import { useState } from "react";
import Cart from "../home/cartDrawer";
import WishListDrawer from "../home/wishListDrawer";
import { ModalAuth } from "../auth/modal.auth";
import { useRouter } from "next/navigation";
import { AccordionSearch } from "../ui/accordion";
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
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <button onClick={() => navigate.push('/')} className="cursor-pointer flex items-center justify-center w-full md:justify-start relative md:right-10">
              <Image 
                src="/images/logo.png" 
                width={150} 
                height={150} 
                alt="logo"
                className="w-36 h-auto"
              />
            </button>
            
            <p className="text-gray-600 text-sm text-center md:text-left leading-relaxed">
              Líder em equipamentos hospitalares de alta qualidade. 
              Comprometida com a excelência e inovação na área da saúde, 
              oferecendo produtos que fazem a diferença.
            </p>

            <div className="flex space-x-1 md:space-x-4 items-center justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Seção Informações - Accordion para sm, layout normal para md+ */}
          <div className="space-y-6 lg:space-y-8">
            {/* Accordion para telas sm */}
            <div className="block sm:hidden px-6 text-sm">
              <AccordionSearch nameFilter="Informações">
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => navigate.push('/sobre-nos')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                      Sobre Nós
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate.push('/troca-devolucao')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                      Troca ou Devolução
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate.push('/politica-privacidade')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                      Política de Privacidade
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate.push('/perguntas-frequentes')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                      Perguntas Frequentes
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate.push('/formas-pagamento')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                      Formas de Pagamento
                    </button>
                  </li>
                </ul>
              </AccordionSearch>
            </div>

            {/* Layout normal para telas md+ */}
            <div className="hidden lg:block">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Informações</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => navigate.push('/sobre-nos')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Sobre Nós
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/troca-devolucao')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Troca ou Devolução
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/politica-privacidade')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Política de Privacidade
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/perguntas-frequentes')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Perguntas Frequentes
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/formas-pagamento')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Formas de Pagamento
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Minha Conta - Accordion para sm, layout normal para md+ */}
          <div className="space-y-6 lg:space-y-8">
            {/* Accordion para telas sm */}
            <div className="block lg:hidden px-6 text-sm">
              <AccordionSearch nameFilter="Minha Conta">
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => navigate.push('/minha-conta/pedidos')}
                      className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                    >
                      Meus Dados
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={toggleCart}
                      className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                    >
                      Meus Pedidos
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { toggleAuth(); toggleAuthPage("Login"); }}
                      className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={toggleWishList}
                      className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                    >
                      Favoritos
                    </button>
                  </li>
                </ul>
              </AccordionSearch>
            </div>

            {/* Layout normal para telas md+ */}
            <div className="hidden lg:block">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Minha Conta</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigate.push('/minha-conta/pedidos')}
                    className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                  >
                    Meus Dados
                  </button>
                </li>
                <li>
                  <button 
                    onClick={toggleCart}
                    className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                  >
                    Meus Pedidos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { toggleAuth(); toggleAuthPage("Login"); }}
                    className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button 
                    onClick={toggleWishList}
                    className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1"
                  >
                    Favoritos
                  </button>
                </li>
              </ul>
            </div>

            <div className="hidden lg:block">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Categorias</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => navigate.push('/categorias/autoclave')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Autoclave
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/estetica')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Estética
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/micropigmentacao')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Micropigmentação
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate.push('/categorias/macas')} className="text-gray-600 hover:text-primary transition-colors text-sm cursor-pointer block py-1">
                    Macas
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção Fale Conosco - Accordion para sm, layout normal para md+ */}
          <div className="space-y-6 lg:space-y-8">
            {/* Accordion para telas sm */}
            <div className="block xl:hidden px-6">
              <AccordionSearch nameFilter="Fale Conosco">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <LuPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">(18) 3221 2232</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">(18) 99774 2232</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <LuMail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">vendas@hospitalar.com.br</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <LuClock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="text-gray-600 text-sm">
                      <p>Seg. à Sex. 08:00h às 18:00h</p>
                      <p>Sábado 08:00h às 12:00h</p>
                    </div>
                  </div>
                </div>
              </AccordionSearch>
            </div>

            {/* Layout normal para telas md+ */}
            <div className="hidden lg:block">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Fale Conosco</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <LuPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">(18) 3221 2232</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">(18) 99774 2232</span>
                </div>
                <div className="flex items-start gap-3">
                  <LuMail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm break-all">vendas@hospitalardistribuidora.com.br</span>
                </div>
                <div className="flex items-start gap-3">
                  <LuClock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-600 text-sm">
                    <p>Seg. à Sex. 08:00h às 18:00h</p>
                    <p>Sábado 08:00h às 12:00h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <h4 className="text-base font-semibold text-gray-900 mb-4">Newsletter</h4>
              <p className="text-gray-600 text-sm mb-4">
                Receba ofertas exclusivas e novidades em primeira mão.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Seu email" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm bg-white"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center">
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
        <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
            
            <div className="text-center lg:text-left order-3 lg:order-1 hidden md:block">
              <p className="text-gray-500 text-xs sm:text-sm">
                © 2024 Hospitalar Distribuidora. CNPJ: 03.375.328/0001-80
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 order-1 lg:order-2">
              <span className="text-gray-500 text-xs sm:text-sm">Formas de Pagamento</span>
              <div className="flex items-center gap-2 sm:gap-4">            
                <Image 
                  src="/images/visa.png" 
                  width={40} 
                  height={25} 
                  alt="Visa"
                  className="w-8 h-5 sm:w-10 sm:h-6 object-contain"
                />
                <Image 
                  src="/images/mastercard.png" 
                  width={40} 
                  height={25} 
                  alt="Mastercard"
                  className="w-8 h-5 sm:w-10 sm:h-6 object-contain"
                />    
                <Image 
                  src="/images/pix.png" 
                  width={40} 
                  height={40} 
                  alt="Pix"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />    
              </div>
            </div>

            <div className="flex items-center gap-2 order-2 lg:order-3">
              <MdOutlineSecurity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-gray-500 text-xs sm:text-sm">Site Seguro SSL</span>
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

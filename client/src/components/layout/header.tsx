"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { LuSearch, LuHeart, LuX, LuShoppingCart } from "react-icons/lu";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import Cart from "../home/cartDrawer";
import { ModalAuth } from "../auth/modal.auth";
import WishListDrawer from "../home/wishListDrawer";
import SearchDrawer from "../home/searchDrawer";
import Notification from "./notification";
import { useUser } from "@/hooks/user.hook";
import { useCart } from "@/hooks/cart.hook";
import { useWishlist } from "@/hooks/wishlist.hook";
import Link from "next/link";
import { Menu } from "lucide-react";
type AuthPage = "Login" | "Register" | "ForgotPass";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("Login");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useUser();
  const { cartItemsCount } = useCart();
  const { wishlistItemsCount } = useWishlist();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const toggleWishList = () => {
    setIsWishListOpen((prevState) => !prevState);
  };

  const toggleAuthPage = (authPage: AuthPage) => {
    setAuthPage(authPage);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const category =['MEDICAMENTOS', 'EQUIPAMENTOS', 'COSMETICOS', 'HIGIENE PESSOAL', 'ANALGESICOS']

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="bg-primary text-white py-2 sm:py-3 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-xs sm:text-sm">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center gap-1 sm:gap-2 transition-colors cursor-pointer">
              <CiDiscount1 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">10% OFF</span>
              <span className="text-gray-100 hidden sm:inline">na primeira compra</span>
            </div>
            <TbPointFilled className="text-gray-200 text-xs" />
            <div className="flex items-center gap-1 sm:gap-2 transition-colors cursor-pointer">
              <CiDeliveryTruck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Frete Grátis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white h-14 md:h-20 py-2 sm:py-3 border-b border-gray-100 relative flex items-center justify-center">
        <div className="container-responsive">
          <div className="flex items-center justify-between relative">
            <button 
              onClick={toggleMenu}
              className="lg:hidden hover:bg-gray-100 rounded-full transition-colors z-10 cursor-pointer"
            >
             <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="hidden lg:flex items-center">
              <button onClick={() => router.push("/")} className="cursor-pointer">
                <Image 
                  src="/images/logo.png" 
                  width={120} 
                  height={120} 
                  alt="logo"
                  className="w-24 h-auto sm:w-28 lg:w-32 xl:w-36"
                />
              </button>
            </div>

            <div className="lg:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <button onClick={() => router.push("/")} className="cursor-pointer">
                <Image 
                  src="/images/logo.png" 
                  width={120} 
                  height={120} 
                  alt="logo"
                  className="w-24 h-auto sm:w-28"
                />
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              {category.map((category,index) => (
                <button key={index} onClick={() => router.push(`/search?q=${category}`)} className="text-gray-700 hover:text-primary transition-colors font-medium text-xs 2xl:text-sm cursor-pointer">
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              <div className="relative">
                <button onClick={toggleSearch} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <LuSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 p-2 rounded-full transition-colors group">
                <LiaUserSolid className="text-xl lg:text-2xl text-gray-600" />
                <div className="text-xs">
                  {user && <div className="text-gray-900 font-medium">Olá, {user.fullname.split(" ")[0]}</div>}
                  {user ? (
                    <Link href="/minha-conta" className="text-gray-500 font-medium hover:text-primary transition-colors">
                      Minha Conta
                    </Link>
                  ) : (
                    <div className="text-gray-900 font-medium">Minha Conta</div>
                  )}
                  <div className={`text-gray-500 ${user ? "hidden" : ""}`}>
                    <button
                      onClick={() => {
                        toggleDialog();
                        toggleAuthPage("Login");
                      }}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Entrar
                    </button>
                    <span className="ml-1 mr-1">/</span>
                    <button
                      onClick={() => {
                        toggleDialog();
                        toggleAuthPage("Register");
                      }}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>

              <button onClick={toggleWishList} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer">
                <LuHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-xs">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              <button onClick={toggleDrawer} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer">
                <LuShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <span
                    key={cartItemsCount}
                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-primary text-white text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center animate-pulse text-xs"
                    style={{
                      animation: "cartCountPulse 0.6s ease-in-out",
                    }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </button>
              {user && <Notification />}
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <ModalAuth isOpen={isDialogOpen} toggleDialog={toggleDialog} authPage={authPage} onAuthPageChange={toggleAuthPage} />
      <WishListDrawer isOpen={isWishListOpen} toggleDrawer={toggleWishList} />
      <SearchDrawer isOpen={isSearchOpen} toggleDrawer={toggleSearch} />

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white/20 backdrop-blur-md z-[99999] h-screen">
          <div className="bg-white h-full w-80 max-w-full shadow-xl">
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-8">
                <Image src="/images/logo.png" width={200} height={80} alt="logo" />
                <button onClick={toggleMenu} className="p-2 hover:bg-gray-100 rounded-full">
                  <LuX className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-4">
                <button onClick={() => router.push("/produtos")} className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100 w-full text-left">
                  Produtos
                </button>
                <button onClick={() => router.push("/categorias")} className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100 w-full text-left">
                  Categorias
                </button>
                <button onClick={() => router.push("/sobre-nos")} className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100 w-full text-left">
                  Sobre Nós
                </button>
                <button onClick={() => router.push("/fale-conosco")} className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100 w-full text-left">
                  Contato
                </button>
              </nav>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <LiaUserSolid className="text-xl text-gray-600" />
                  <div>
                    <div className="text-gray-900 font-medium">Minha Conta</div>
                    <div className="text-sm text-gray-500">
                      <button onClick={() => router.push("/login")} className="hover:text-primary transition-colors">
                        Entrar
                      </button>{" "}
                      /
                      <button onClick={() => router.push("/register")} className="hover:text-primary transition-colors">
                        {" "}
                        Cadastrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

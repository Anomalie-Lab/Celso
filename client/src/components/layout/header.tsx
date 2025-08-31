"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { LuSearch, LuHeart, LuX } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import Cart from "../home/cartDrawer";
import { ModalAuth } from "../auth/modal.auth";
import WishListDrawer from "../home/wishListDrawer";
import SearchDrawer from "../home/searchDrawer";
import Notification from "./notification";

type AuthPage = "Login" | "Register" | "ForgotPass";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("Login");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

    if (currentScrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    console.log(isScrolled);
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="bg-black/95 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
              <CiDiscount1 className="w-4 h-4" />
              <span className="font-medium">10% OFF</span>
              <span className="text-gray-300">na primeira compra</span>
            </div>
            <TbPointFilled className="text-gray-400 text-xs" />
            <div className="flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
              <CiDeliveryTruck className="w-4 h-4" />
              <span>Frete Grátis</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-2 border-b border-gray-100">
        <div className="">
          <div className="flex items-center justify-between px-24">
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => router.push("/search?q=Autoclave")} className="text-gray-700 hover:text-primary transition-colors font-medium text-sm cursor-pointer">
                Autoclave
              </button>
              <button onClick={() => router.push("/search?q=Estética")} className="text-gray-700 hover:text-primary transition-colors font-medium text-sm cursor-pointer">
                Estética
              </button>
              <button onClick={() => router.push("/search?q=Micropigmentação")} className="text-gray-700 hover:text-primary transition-colors font-medium text-sm cursor-pointer">
                Micropigmentação
              </button>
              <button onClick={() => router.push("/search?q=Macas")} className="text-gray-700 hover:text-primary transition-colors font-medium text-sm cursor-pointer">
                Macas
              </button>
            </div>
            <div className="">
              <button onClick={() => router.push("/")} className="cursor-pointer">
                <Image src="/images/logo.png" width={150} height={150} alt="logo" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={toggleSearch} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                  <LuSearch className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="hidden md:flex items-center gap-2 p-2 rounded-full transition-colors  group">
                <LiaUserSolid className="text-2xl text-gray-600 group-hover:text-primary transition-colors" />
                <div className="text-xs">
                  <div className="text-gray-900 font-medium">Minha Conta</div>
                  <div className="text-gray-500">
                    <button
                      onClick={() => {
                        toggleDialog();
                        toggleAuthPage("Login");
                      }}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      Entrar
                    </button>
                    <span className="ml-1 mr-1">/</span>
                    <button
                      onClick={() => {
                        toggleDialog();
                        toggleAuthPage("Register");
                      }}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      {" "}
                      Cadastrar
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={toggleWishList} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer">
                <LuHeart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </button>
              <button onClick={toggleDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer">
                <PiBasketLight className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </button>
              <Notification />
              {/* Mobile Menu
                            <button 
                                onClick={toggleMenu}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                {isMenuOpen ? (
                                    <LuX className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <LuMenu className="w-5 h-5 text-gray-600" />
                                )}
                            </button> */}
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-80 max-w-full shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Image src="/images/logo.png" width={120} height={40} alt="logo" />
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
      <Cart isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <ModalAuth isOpen={isDialogOpen} toggleDialog={toggleDialog} authPage={authPage} onAuthPageChange={toggleAuthPage} />
      <WishListDrawer isOpen={isWishListOpen} toggleDrawer={toggleWishList} />
      <SearchDrawer isOpen={isSearchOpen} toggleDrawer={toggleSearch} />
    </header>
  );
}

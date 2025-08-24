"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { LiaUserSolid } from "react-icons/lia";
import { LuSearch, LuMapPin, LuHeart, LuMenu, LuX, LuChevronDown } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import Cart from "../home/cart";
import { CiDeliveryTruck, CiDiscount1 } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleScroll = () => {
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
        setLastScrollY(currentScrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScrollY]);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            {/* Top Bar - Promoções e Informações */}
            <div className="bg-black/95 text-white py-3 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-center text-sm">
                    {/* Left - Promoções */}
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

            {/* Main Header */}
            <div className="bg-white py-2 border-b border-gray-100">
                <div className="">
                    <div className="flex items-center justify-between px-24">

                        {/* Left - Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                                Produtos
                            </a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                                Categorias
                            </a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                                Sobre Nós
                            </a>
                            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                                Contato
                            </a>
                        </div>

                        <div className="">
                            <a href="/" className="cursor-pointer">
                                <Image 
                                    src="/images/logo.png" 
                                    width={150} 
                                    height={150} 
                                    alt="logo" 
                                />
                            </a>
                        </div>


                        {/* Right - Actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative">
                                {isSearchOpen ? (
                                    <div className="absolute right-0 top-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="text" 
                                                placeholder="Buscar produtos..." 
                                                className="w-64 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                autoFocus
                                            />
                                            <button 
                                                onClick={toggleSearch}
                                                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                <LuX className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={toggleSearch}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <LuSearch className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                            </div>

                            {/* User Account */}
                            <div className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer group">
                                <LiaUserSolid className="text-2xl text-gray-600 group-hover:text-primary transition-colors" />
                                <div className="text-xs">
                                    <div className="text-gray-900 font-medium">Minha Conta</div>
                                    <div className="text-gray-500">
                                        <a href="/login" className="hover:text-primary transition-colors">Entrar</a> / 
                                        <a href="/register" className="hover:text-primary transition-colors"> Cadastrar</a>
                                    </div>
                                </div>
                            </div>

                            {/* Wishlist */}
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                <LuHeart className="w-5 h-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </button>

                            {/* Cart */}
                            <button 
                                onClick={toggleDrawer}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                            >
                                <PiBasketLight className="w-5 h-5 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    0
                                </span>
                            </button>

                            {/* Mobile Menu */}
                            <button 
                                onClick={toggleMenu}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                {isMenuOpen ? (
                                    <LuX className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <LuMenu className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="bg-white h-full w-80 max-w-full shadow-xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <Image 
                                    src="/images/logo.png" 
                                    width={120} 
                                    height={40} 
                                    alt="logo" 
                                />
                                <button 
                                    onClick={toggleMenu}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <LuX className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <nav className="space-y-4">
                                <a href="#" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100">
                                    Produtos
                                </a>
                                <a href="#" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100">
                                    Categorias
                                </a>
                                <a href="#" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100">
                                    Sobre Nós
                                </a>
                                <a href="#" className="block py-3 text-gray-700 hover:text-primary transition-colors font-medium border-b border-gray-100">
                                    Contato
                                </a>
                            </nav>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <LiaUserSolid className="text-xl text-gray-600" />
                                    <div>
                                        <div className="text-gray-900 font-medium">Minha Conta</div>
                                        <div className="text-sm text-gray-500">
                                            <a href="/login" className="hover:text-primary transition-colors">Entrar</a> / 
                                            <a href="/register" className="hover:text-primary transition-colors"> Cadastrar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Component */}
            <Cart isOpen={isOpen} toggleDrawer={toggleDrawer}/>
        </header>
    )
}
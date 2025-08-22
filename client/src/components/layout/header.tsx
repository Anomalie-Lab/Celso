"use client"
import Image from "next/image";
import React from 'react'
import { LiaUserSolid } from "react-icons/lia";
import {  LuSearch } from "react-icons/lu";
import { PiBasketLight } from "react-icons/pi";
import { LogOut, User } from "lucide-react";
import Cart from "./cart";
import { useUser } from "@/hooks/user.hook";
import { Auth } from "@/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { user, setUser } = useUser();
    const router = useRouter();
    
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleLogout = async () => {
        try {
            await Auth.logout();
            setUser(null);
            toast.success("Logout realizado com sucesso!");
            router.push('/');
        } catch (error) {
            toast.error("Erro ao fazer logout");
        }
    }

    return (
        <header className="h-32">
            <div className="flex items-center h-full justify-between w-full px-24">
                <Image src="/images/logo.png" width={200} height={200} alt="logo" className="text-black text-3xl font-bold"/>
                <div className="relative w-1/2">
                    <input 
                        type="text" 
                        placeholder="O que está buscando hoje?" 
                        className="w-full h-12 bg-white rounded-full px-4 pr-12 placeholder:text-gray-400 focus:outline-none" 
                    />
                    <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-600 transition-colors">
                        <LuSearch className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex items-center gap-8">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <User className="text-2xl" />
                                <div>
                                    <p className="text-sm font-medium">Olá, {user.fullname}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sair
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <LiaUserSolid className="text-3xl" />
                            <p className="text-[12px]">
                                Faça seu <Link href="/login" className="underline hover:text-primary transition-colors">login</Link> ou <br></br>
                                <Link href="/register" className="underline hover:text-primary transition-colors">cadastre-se</Link>
                            </p>
                        </div>
                    )}
                    <button 
                        onClick={toggleDrawer}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <PiBasketLight className="text-3xl" />
                    </button>
                </div>
            </div>
            <Cart isOpen={isOpen} toggleDrawer={toggleDrawer}/>
        </header>
    )
}
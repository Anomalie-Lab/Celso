"use client";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { LuX, LuUser, LuLogIn, LuUserPlus } from "react-icons/lu";
import { useDrawer } from "@/hooks/useDrawer";
import { useUser } from "@/hooks/user.hook";
import { ModalAuth } from "../auth/modal.auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

type AuthPage = "Login" | "Register" | "ForgotPass";

export default function MenuDrawer({ isOpen, toggleDrawer }: MenuDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [authPage, setAuthPage] = useState<AuthPage>("Login");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useDrawer(isOpen);

  const toggleDialog = () => {
    setIsDialogOpen((prevState) => !prevState);
  };

  const toggleAuthPage = (authPage: AuthPage) => {
    setAuthPage(authPage);
  };


  const handleCategoryClick = (category: string) => {
    router.push(`/search?q=${category}`);
    toggleDrawer();
  };

  if (!isMounted) {
    return null;
  }

  const categories = [
    'MEDICAMENTOS',
    'EQUIPAMENTOS', 
    'COSMETICOS',
    'HIGIENE PESSOAL',
    'ANALGESICOS'
  ];

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        size={isMobile ? "100%" : 400}
        direction="left"
        className="!bg-white drawer-panel"
        overlayClassName="drawer-overlay"
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/logo.png" 
                width={120} 
                height={40} 
                alt="logo"
                className="w-24 h-auto"
              />
            </div>
            <button 
              onClick={toggleDrawer}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <LuX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <LuUser className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Olá, {user.fullname.split(" ")[0]}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Menu */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
                  Categorias
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                    >
                      <span className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
            {!user && (
              <div className="space-y-3">
                <button
                  onClick={() => {
                    toggleDialog();
                    toggleAuthPage("Login");
                  }}
                  className="w-full bg-primary text-white py-3 px-4 rounded-full font-medium transition-colors text-sm cursor-pointer hover:bg-primary-600 flex items-center justify-center gap-2"
                >
                  <LuLogIn className="w-4 h-4" />
                  Entrar
                </button>
                <button
                  onClick={() => {
                    toggleDialog();
                    toggleAuthPage("Register");
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-full font-medium transition-colors text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <LuUserPlus className="w-4 h-4" />
                  Criar Conta
                </button>
              </div>
            )}
            {user && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  © 2024 Celso. Todos os direitos reservados.
                </p>
              </div>
            )}
          </div>
        </div>
      </Drawer>

      <ModalAuth 
        isOpen={isDialogOpen} 
        toggleDialog={toggleDialog} 
        authPage={authPage} 
        onAuthPageChange={toggleAuthPage} 
      />
    </>
  );
}
"use client";
import { Auth } from "@/api/auth.api";
import { Contexts } from "@/entities/contexts";
import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Cart } from "@/api/cart.api";
import { Wishlist } from "@/api/wishlist.api";

export const ContextUser = createContext<Contexts.UserProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Account.UserI | null>(null);

  const FetchUser = useCallback(async () => {
    const response = await Auth.getMe();
    if (response) setUser(response);
  }, []);

  // Função para sincronizar dados locais com o servidor
  const syncLocalData = useCallback(async () => {
    try {
      // Sincronizar carrinho local
      const localCart = localStorage.getItem('localCart');
      if (localCart) {
        const cartData = JSON.parse(localCart);
        if (cartData.items && cartData.items.length > 0) {
          for (const item of cartData.items) {
            try {
              await Cart.addToCart({
                product_id: item.product_id,
                quantity: item.quantity,
                size: item.size,
                color: item.color
              });
            } catch (error) {
              console.error('Erro ao sincronizar item do carrinho:', error);
            }
          }
          // Limpar carrinho local após sincronização
          localStorage.removeItem('localCart');
        }
      }

      // Sincronizar wishlist local
      const localWishlist = localStorage.getItem('localWishlist');
      if (localWishlist) {
        const wishlistData = JSON.parse(localWishlist);
        if (wishlistData.items && wishlistData.items.length > 0) {
          for (const item of wishlistData.items) {
            try {
              await Wishlist.addToWishlist({
                product_id: item.product_id
              });
            } catch (error) {
              console.error('Erro ao sincronizar item da wishlist:', error);
            }
          }
          // Limpar wishlist local após sincronização
          localStorage.removeItem('localWishlist');
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar dados locais:', error);
    }
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const cookieValue = cookies.find((cookie) => cookie.trim().startsWith(`${process.env.NEXT_PUBLIC_IS_IN_SESSION}=`));
    if (cookieValue?.split("=")[1] === "true") {
      FetchUser().then(() => {
        // Após buscar o usuário, sincronizar dados locais
        syncLocalData();
      });
    }
  }, [FetchUser, syncLocalData]);

  const contextValue: Contexts.UserProps = { user, setUser };

  return <ContextUser.Provider value={contextValue}>{children}</ContextUser.Provider>;
};
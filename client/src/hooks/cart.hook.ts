import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Cart, UpdateCartItemData } from "@/api/cart.api";
import { toast } from "sonner";
import { useUser } from "./user.hook";
import { useState, useEffect } from "react";

// Interface para item do carrinho local
interface LocalCartItem {
  id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
  };
}

// Interface para carrinho local
interface LocalCart {
  items: LocalCartItem[];
  created_at: string;
  updated_at: string;
}

export const useCart = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [localCart, setLocalCart] = useState<LocalCart>({ items: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  
  // Estados de loading individuais para cada item
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>({});
  const [removingItems, setRemovingItems] = useState<{ [key: number]: boolean }>({});

  // Carregar carrinho local do localStorage
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem('localCart');
      if (stored) {
        try {
          setLocalCart(JSON.parse(stored));
        } catch (error) {
          console.error('Erro ao carregar carrinho local:', error);
          localStorage.removeItem('localCart');
        }
      }
    }
  }, [user]);

  // Salvar carrinho local no localStorage
  const saveLocalCart = (cart: LocalCart) => {
    if (!user) {
      localStorage.setItem('localCart', JSON.stringify(cart));
      setLocalCart(cart);
    }
  };

  // Buscar carrinho do servidor (apenas se usuário autenticado)
  const { data: serverCart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: Cart.getCart,
    enabled: !!user,
  });

  // Usar carrinho do servidor ou local
  const cart = user ? serverCart : localCart;

  const addToCartMutation = useMutation({
    mutationFn: Cart.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado ao carrinho!");
    },
    onError: () => {
      toast.error("Erro ao adicionar produto ao carrinho");
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: UpdateCartItemData }) =>
      Cart.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Carrinho atualizado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar carrinho");
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: Cart.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto removido do carrinho!");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: Cart.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Carrinho limpo!");
    },
    onError: () => {
      toast.error("Erro ao limpar carrinho");
    },
  });

  // Função para adicionar ao carrinho
  const addToCart = (data: any) => {
    if (user) {
      // Usuário autenticado: usar API
      addToCartMutation.mutate(data);
    } else {
      // Usuário não autenticado: usar localStorage
      const newItem: LocalCartItem = {
        id: Date.now(), // ID temporário
        product_id: data.product_id,
        quantity: data.quantity || 1,
        size: data.size || 'M',
        color: data.color || 'Default',
        product: {
          id: data.product_id,
          title: data.product?.title || 'Produto',
          price: data.product?.price || 0,
          images: data.product?.images || [],
        }
      };

      const updatedCart = {
        ...localCart,
        items: [...localCart.items, newItem],
        updated_at: new Date().toISOString()
      };

      saveLocalCart(updatedCart);
      toast.success("Produto adicionado ao carrinho!");
    }
  };

  // Função para atualizar item do carrinho
  const updateCartItem = ({ itemId, data }: { itemId: number; data: UpdateCartItemData }) => {
    if (user) {
      // Usuário autenticado: usar API
      updateCartItemMutation.mutate({ itemId, data });
    } else {
      // Usuário não autenticado: usar localStorage
      setLoadingItems(prev => ({ ...prev, [itemId]: true }));
      
      setTimeout(() => {
        const updatedItems = localCart.items.map(item => 
          item.id === itemId 
            ? { ...item, ...data, updated_at: new Date().toISOString() }
            : item
        );

        const updatedCart = {
          ...localCart,
          items: updatedItems,
          updated_at: new Date().toISOString()
        };

        saveLocalCart(updatedCart);
        setLoadingItems(prev => ({ ...prev, [itemId]: false }));
        toast.success("Carrinho atualizado!");
      }, 300);
    }
  };

  // Função para remover item do carrinho
  const removeFromCart = (itemId: number) => {
    if (user) {
      // Usuário autenticado: usar API
      removeFromCartMutation.mutate(itemId);
    } else {
      // Usuário não autenticado: usar localStorage
      setRemovingItems(prev => ({ ...prev, [itemId]: true }));
      
      setTimeout(() => {
        const updatedItems = localCart.items.filter(item => item.id !== itemId);
        const updatedCart = {
          ...localCart,
          items: updatedItems,
          updated_at: new Date().toISOString()
        };

        saveLocalCart(updatedCart);
        setRemovingItems(prev => ({ ...prev, [itemId]: false }));
        toast.success("Produto removido do carrinho!");
      }, 300);
    }
  };

  // Função para limpar carrinho
  const clearCart = () => {
    if (user) {
      // Usuário autenticado: usar API
      clearCartMutation.mutate();
    } else {
      // Usuário não autenticado: usar localStorage
      const updatedCart = {
        ...localCart,
        items: [],
        updated_at: new Date().toISOString()
      };

      saveLocalCart(updatedCart);
      toast.success("Carrinho limpo!");
    }
  };

  const cartTotal = cart?.items?.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0) || 0;

  const cartItemsCount = cart?.items?.reduce((count, item) => {
    return count + item.quantity;
  }, 0) || 0;

  // Funções para verificar loading de itens específicos
  const isItemLoading = (itemId: number) => loadingItems[itemId] || false;
  const isItemRemoving = (itemId: number) => removingItems[itemId] || false;

  return {
    cart,
    isLoading: user ? isLoading : false,
    cartTotal,
    cartItemsCount,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartItemMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
    isItemLoading,
    isItemRemoving,
  };
};

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Wishlist } from "@/api/wishlist.api";
import { toast } from "sonner";
import { useUser } from "./user.hook";
import { useState, useEffect } from "react";

// Interface para item da wishlist local
interface LocalWishlistItem {
  id: number;
  product_id: number;
  product: {
    id: number;
    title: string;
    price: number;
    images?: string[];
  };
}

// Interface para wishlist local
interface LocalWishlist {
  items: LocalWishlistItem[];
  created_at: string;
  updated_at: string;
}

export const useWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [localWishlist, setLocalWishlist] = useState<LocalWishlist>({ items: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  
  // Estados de loading individuais para cada item
  const [addingItems, setAddingItems] = useState<{ [key: number]: boolean }>({});
  const [removingItems, setRemovingItems] = useState<{ [key: number]: boolean }>({});

  // Carregar wishlist local do localStorage
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem('localWishlist');
      if (stored) {
        try {
          setLocalWishlist(JSON.parse(stored));
        } catch (error) {
          console.error('Erro ao carregar wishlist local:', error);
          localStorage.removeItem('localWishlist');
        }
      }
    }
  }, [user]);

  // Salvar wishlist local no localStorage
  const saveLocalWishlist = (wishlist: LocalWishlist) => {
    if (!user) {
      localStorage.setItem('localWishlist', JSON.stringify(wishlist));
      setLocalWishlist(wishlist);
    }
  };

  // Buscar wishlist do servidor (apenas se usuário autenticado)
  const { data: serverWishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: Wishlist.getWishlist,
    enabled: !!user,
  });

  // Usar wishlist do servidor ou local
  const wishlist = user ? serverWishlist : localWishlist;

  const addToWishlistMutation = useMutation({
    mutationFn: Wishlist.addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Produto adicionado à lista de desejos!");
    },
    onError: () => {
      toast.error("Erro ao adicionar produto à lista de desejos");
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: Wishlist.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Produto removido da lista de desejos!");
    },
    onError: () => {
      toast.error("Erro ao remover produto da lista de desejos");
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: Wishlist.clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Lista de desejos limpa!");
    },
    onError: () => {
      toast.error("Erro ao limpar lista de desejos");
    },
  });

  // Função para adicionar à wishlist
  const addToWishlist = (data: any) => {
    if (user) {
      // Usuário autenticado: usar API
      addToWishlistMutation.mutate(data);
    } else {
      // Usuário não autenticado: usar localStorage
      setAddingItems(prev => ({ ...prev, [data.product_id]: true }));
      
      setTimeout(() => {
        const newItem: LocalWishlistItem = {
          id: Date.now(), // ID temporário
          product_id: data.product_id,
          product: {
            id: data.product_id,
            title: data.product?.title || 'Produto',
            price: data.product?.price || 0,
            images: data.product?.images || [],
          }
        };

        // Verificar se o produto já está na wishlist
        const exists = localWishlist.items.some(item => item.product_id === data.product_id);
        if (exists) {
          toast.error("Produto já está na lista de desejos!");
          setAddingItems(prev => ({ ...prev, [data.product_id]: false }));
          return;
        }

        const updatedWishlist = {
          ...localWishlist,
          items: [...localWishlist.items, newItem],
          updated_at: new Date().toISOString()
        };

        saveLocalWishlist(updatedWishlist);
        setAddingItems(prev => ({ ...prev, [data.product_id]: false }));
        toast.success("Produto adicionado à lista de desejos!");
      }, 300);
    }
  };

  // Função para remover da wishlist
  const removeFromWishlist = (itemId: number) => {
    if (user) {
      // Usuário autenticado: usar API
      removeFromWishlistMutation.mutate(itemId);
    } else {
      // Usuário não autenticado: usar localStorage
      setRemovingItems(prev => ({ ...prev, [itemId]: true }));
      
      setTimeout(() => {
        const updatedItems = localWishlist.items.filter(item => item.id !== itemId);
        const updatedWishlist = {
          ...localWishlist,
          items: updatedItems,
          updated_at: new Date().toISOString()
        };

        saveLocalWishlist(updatedWishlist);
        setRemovingItems(prev => ({ ...prev, [itemId]: false }));
        toast.success("Produto removido da lista de desejos!");
      }, 300);
    }
  };

  // Função para limpar wishlist
  const clearWishlist = () => {
    if (user) {
      // Usuário autenticado: usar API
      clearWishlistMutation.mutate();
    } else {
      // Usuário não autenticado: usar localStorage
      const updatedWishlist = {
        ...localWishlist,
        items: [],
        updated_at: new Date().toISOString()
      };

      saveLocalWishlist(updatedWishlist);
      toast.success("Lista de desejos limpa!");
    }
  };

  const wishlistItemsCount = wishlist?.items?.length || 0;

  const isInWishlist = (productId: number) => {
    return wishlist?.items?.some(item => item.product.id === productId) || false;
  };

  // Funções para verificar loading de itens específicos
  const isItemAdding = (productId: number) => addingItems[productId] || false;
  const isItemRemoving = (itemId: number) => removingItems[itemId] || false;

  return {
    wishlist,
    isLoading: user ? isLoading : false,
    wishlistItemsCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
    isInWishlist,
    isItemAdding,
    isItemRemoving,
  };
};

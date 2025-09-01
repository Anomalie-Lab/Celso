import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Cart, AddToCartData, UpdateCartItemData } from '@/api/cart.api';

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: Cart.getCart,
    staleTime: 1000 * 60 * 5,
  });

  const addToCartMutation = useMutation({
    mutationFn: (data: AddToCartData) => Cart.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Produto adicionado ao carrinho!');
    },
    onError: (error: any) => {
      toast.error('Erro ao adicionar produto ao carrinho');
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: number; data: UpdateCartItemData }) =>
      Cart.updateCartItem(itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrinho atualizado!');
    },
    onError: (error: any) => {
      toast.error('Erro ao atualizar carrinho');
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (itemId: number) => Cart.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Produto removido do carrinho!');
    },
    onError: (error: any) => {
      toast.error('Erro ao remover produto do carrinho');
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: Cart.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Carrinho limpo!');
    },
    onError: (error: any) => {
      toast.error('Erro ao limpar carrinho');
    },
  });

  const addToCart = (data: AddToCartData) => {
    addToCartMutation.mutate(data);
  };

  const updateCartItem = (itemId: number, data: UpdateCartItemData) => {
    updateCartItemMutation.mutate({ itemId, data });
  };

  const removeFromCart = (itemId: number) => {
    removeFromCartMutation.mutate(itemId);
  };

  const clearCart = () => {
    clearCartMutation.mutate();
  };

  const cartTotal = cart?.items?.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0) || 0;

  const cartItemsCount = cart?.items?.reduce((total, item) => {
    return total + item.quantity;
  }, 0) || 0;

  return {
    cart,
    isLoading,
    error,
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
  };
};

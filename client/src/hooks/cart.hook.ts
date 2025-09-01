import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Cart, UpdateCartItemData } from "@/api/cart.api";
import { toast } from "sonner";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: Cart.getCart,
  });

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

  const cartTotal = cart?.items?.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0) || 0;

  const cartItemsCount = cart?.items?.reduce((count, item) => {
    return count + item.quantity;
  }, 0) || 0;

  return {
    cart,
    isLoading,
    cartTotal,
    cartItemsCount,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartItemMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
};

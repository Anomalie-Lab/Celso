import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Wishlist } from "@/api/wishlist.api";
import { toast } from "sonner";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: Wishlist.getWishlist,
  });

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

  const wishlistItemsCount = wishlist?.items?.length || 0;

  const isInWishlist = (productId: number) => {
    return wishlist?.items?.some(item => item.product.id === productId) || false;
  };

  return {
    wishlist,
    isLoading,
    wishlistItemsCount,
    isInWishlist,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    clearWishlist: clearWishlistMutation.mutate,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
  };
};

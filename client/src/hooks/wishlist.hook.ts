import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Wishlist, AddToWishlistData } from '@/api/wishlist.api';

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: Wishlist.getWishlist,
    staleTime: 1000 * 60 * 5,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: (data: AddToWishlistData) => Wishlist.addToWishlist(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Produto adicionado aos favoritos!');
    },
    onError: (error: any) => {
      toast.error('Erro ao adicionar produto aos favoritos');
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (itemId: number) => Wishlist.removeFromWishlist(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Produto removido dos favoritos!');
    },
    onError: (error: any) => {
      toast.error('Erro ao remover produto dos favoritos');
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: Wishlist.clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success('Lista de desejos limpa!');
    },
    onError: (error: any) => {
      toast.error('Erro ao limpar lista de desejos');
    },
  });

  const addToWishlist = (data: AddToWishlistData) => {
    addToWishlistMutation.mutate(data);
  };

  const removeFromWishlist = (itemId: number) => {
    removeFromWishlistMutation.mutate(itemId);
  };

  const clearWishlist = () => {
    clearWishlistMutation.mutate();
  };

  const wishlistItemsCount = wishlist?.items?.length || 0;

  const isInWishlist = (productId: number) => {
    return wishlist?.items?.some(item => item.product.id === productId) || false;
  };

  return {
    wishlist,
    isLoading,
    error,
    wishlistItemsCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    isAddingToWishlist: addToWishlistMutation.isPending,
    isRemovingFromWishlist: removeFromWishlistMutation.isPending,
    isClearingWishlist: clearWishlistMutation.isPending,
  };
};

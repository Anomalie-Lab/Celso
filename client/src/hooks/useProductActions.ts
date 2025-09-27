import { useCart } from "@/hooks/cart.hook";
import { useWishlist } from "@/hooks/wishlist.hook";
import { useToast } from "@/hooks/use-toast";

interface UseProductActionsProps {
  product: Product.ProductCompleteI | null;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export function useProductActions({ product, quantity, selectedSize, selectedColor }: UseProductActionsProps) {
  const { toast } = useToast();
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isItemAdding, isItemRemoving, wishlist } = useWishlist();

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart({
        product_id: product.id,
        product: {
          title: product.title,
          price: product.price,
          images: product.images
        },
        quantity,
        size: selectedSize,
        color: selectedColor
      });
      
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      });
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;
    
    try {
      if (isInWishlist(product.id)) {
        const wishlistItem = wishlist?.items?.find((item: { id: number; product: { id: number } }) => item.product.id === product.id);
        if (wishlistItem) {
          await removeFromWishlist(wishlistItem.id);
        }
      } else {
        await addToWishlist({
          product_id: product.id,
          product: {
            title: product.title,
            price: product.price,
            images: product.images
          }
        });
      }
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a lista de desejos.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Erro ao compartilhar:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do produto foi copiado para a área de transferência.",
      });
    }
  };

  return {
    handleAddToCart,
    handleWishlistToggle,
    handleShare,
    isAddingToCart,
    isInWishlist: product ? isInWishlist(product.id) : false,
    isItemAdding: product ? isItemAdding(product.id) : false,
    isItemRemoving: product ? isItemRemoving(product.id) : false
  };
}

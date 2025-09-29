"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductSkeleton } from "@/components/product/product-skeleton";
import { 
  ProductGallery, 
  ProductInfo, 
  ProductActions, 
  ProductDetails 
} from "@/components/product";
import { useProduct } from "@/hooks/useProduct";
import { useProductState } from "@/hooks/useProductState";
import { useProductActions } from "@/hooks/useProductActions";
import ProductsArea from "@/components/home/productsArea";

export default function ProductPage() {
  const router = useRouter();
  const { product, loading, error, productId } = useProduct();
  
  const {
    quantity,
    selectedSize,
    selectedColor,
    handleQuantityChange,
    handleColorChange,
    handleShippingInfoChange
  } = useProductState({ product });

  const {
    handleAddToCart,
    handleWishlistToggle,
    handleShare,
    isAddingToCart,
    isInWishlist,
    isItemAdding,
    isItemRemoving
  } = useProductActions({ 
    product, 
    quantity, 
    selectedSize, 
    selectedColor 
  });

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Produto não encontrado"}
          </h1>
          <Button onClick={() => router.push("/")} variant="outline">
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    );
  }

  const discountPercentage = product.last_price && product.last_price > product.price 
    ? Math.round(((product.last_price - product.price) / product.last_price) * 100)
    : 0;

  return (
    <div className="h-[2150px] flex items-center justify-center flex-col space-y-16 mt-16">
      <div className="w-full px-8 lg:w-3/4 lg:px-8 py-4 pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <ProductGallery
            images={product.images ?? []}
            title={product.title}
            discountPercentage={discountPercentage}
          />

          <div className="space-y-6">
            <ProductInfo
              title={product.title}
              price={product.price}
              lastPrice={product.last_price}
              installments={product.installments}
              description={product.description}
              comments={product.comments}
              categories={product.categories ?? []}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />

            <ProductActions
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              onShare={handleShare}
              onShippingInfoChange={handleShippingInfoChange}
              isAddingToCart={isAddingToCart}
              isInWishlist={isInWishlist}
              isItemAdding={isItemAdding}
              isItemRemoving={isItemRemoving}
              productId={productId}
            />
          </div>
        </div>

        <ProductDetails product={product} />
      </div>
      <ProductsArea titleArea="20% OFF" type="all"/>
    </div>
  );
}
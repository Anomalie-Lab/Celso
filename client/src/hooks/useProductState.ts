import { useState, useEffect } from "react";

interface UseProductStateProps {
  product: Product.ProductCompleteI | null;
}

export function useProductState({ product }: UseProductStateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.categories && product.categories.length > 0 && !selectedColor) {
        setSelectedColor(product.categories[0]);
      }
    }
  }, [product, selectedSize, selectedColor]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };


  return {
    quantity,
    selectedSize,
    selectedColor,
    handleQuantityChange,
    handleSizeChange,
    handleColorChange
  };
}

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Products } from "@/api/products.api";

export function useProduct() {
  const params = useParams();
  const productId = Number(params.id);
  
  const [product, setProduct] = useState<Product.ProductCompleteI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await Products.getById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        setError("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return {
    product,
    loading,
    error,
    productId
  };
}

"use client";

import { LuStar } from "react-icons/lu";
import { AccordionSearch } from "@/components/ui/accordion";

interface ProductDetailsProps {
  product: Product.ProductCompleteI;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <LuStar 
          key={i} 
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  const hasDetails = product.details && product.details.length > 0;
  const hasComments = product.comments && product.comments.length > 0;

  return (
    <div className="mt-8 sm:mt-16">      
      <div className="space-y-0">
        {/* Especificações */}
        <AccordionSearch nameFilter="Especificações" defaultOpen={true}>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Marca:</span>
              <span className="font-medium">{product.brand || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>SKU:</span>
              <span className="font-medium">{product.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Estoque:</span>
              <span className="font-medium">{product.stock} unidades</span>
            </div>
          </div>
        </AccordionSearch>

        {/* Detalhes */}
        <AccordionSearch nameFilter="Detalhes">
          {hasDetails ? (
            <ul className="space-y-1 text-sm text-gray-600">
              {product.details?.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {detail}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Nenhum detalhe adicional disponível.</p>
          )}
        </AccordionSearch>

        {/* Avaliações */}
        <AccordionSearch nameFilter="Avaliações">
          {hasComments ? (
            <div className="space-y-3">
              {product.comments.slice(0, 3).map((comment) => (
                <div key={comment.id} className="border-l-2 border-primary pl-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex">
                      {renderStars(comment.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {comment.user.fullname}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nenhuma avaliação ainda.</p>
          )}
        </AccordionSearch>
      </div>
    </div>
  );
}

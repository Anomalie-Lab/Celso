"use client";

import { LuStar, LuMessageCircle, LuPlay } from "react-icons/lu";
import { AccordionSearch } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CommentModal } from "./CommentModal";
import { useState } from "react";
import { useComments } from "@/hooks/comments.hook";
import { useUser } from "@/hooks/user.hook";

interface ProductDetailsProps {
  product: Product.ProductCompleteI;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const { createComment, canComment, isCreating, userComment } = useComments(product.id);

  const handleCreateComment = async (data: any) => {
    await createComment(data);
    setIsModalOpen(false);
  };

  const renderAttachments = (attachments: any[]) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-2 flex space-x-1">
        {attachments.slice(0, 3).map((attachment, index) => {
          const imageUrl = attachment.url.startsWith('data:') 
            ? attachment.url 
            : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'}${attachment.url}`;

          return (
            <div key={index} className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              {attachment.type === 'image' ? (
                <img
                  src={imageUrl}
                  alt={attachment.alt || 'Imagem do comentário'}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={imageUrl}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <LuPlay className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {attachments.length > 3 && (
          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-500">+{attachments.length - 3}</span>
          </div>
        )}
      </div>
    );
  };

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
    {product.summary && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Resumo</h3>
        <p className="text-gray-700 leading-relaxed">{product.summary}</p>
      </div>
    )}
    
    {product.description && (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>
    )}
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
        <AccordionSearch nameFilter="Avaliações" defaultOpen={true}>
          {hasComments ? (
            <div className="space-y-6">
              {/* Resumo das Avaliações */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Avaliações dos Clientes</h4>
                    <p className="text-sm text-gray-500">{product.comments.length} avaliação(ões)</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(Math.round(product.comments.reduce((acc, comment) => acc + comment.rating, 0) / product.comments.length))}
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {(product.comments.reduce((acc, comment) => acc + comment.rating, 0) / product.comments.length).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-500">Média geral</p>
                  </div>
                </div>
              </div>

              {/* Comentários Recentes */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-sm font-semibold text-gray-900">Comentários Recentes</h5>
                  {user && (
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      size="sm"
                      className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      <LuMessageCircle className="w-4 h-4" />
                      <span>Avaliar Produto</span>
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {product.comments.slice(0, 3).map((comment) => (
                    <div key={comment.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {comment.user.fullname}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{comment.message}</p>
                      {renderAttachments(comment.attachments || [])}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuStar className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma avaliação ainda</h4>
              <p className="text-sm text-gray-500 mb-4">Seja o primeiro a avaliar este produto!</p>
              {user && (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors"
                >
                  <LuMessageCircle className="w-4 h-4 mr-2" />
                  Avaliar Produto
                </Button>
              )}
            </div>
          )}
        </AccordionSearch>
      </div>

      {/* Modal de Comentário */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateComment}
        isLoading={isCreating}
        productTitle={product.title}
      />
    </div>
  );
}

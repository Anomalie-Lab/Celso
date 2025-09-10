"use client";

import { useState, useRef } from "react";
import { LuStar, LuX, LuLoader, LuImage, LuVideo, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CreateCommentData, CommentAttachment } from "@/api/comments.api";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCommentData) => Promise<void>;
  isLoading: boolean;
  productTitle: string;
}

export function CommentModal({ isOpen, onClose, onSubmit, isLoading, productTitle }: CommentModalProps) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<CommentAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    await onSubmit({
      message: message.trim(),
      rating,
      attachments: attachments.length > 0 ? attachments : undefined,
      product_id: 0, // Será definido pelo hook
    });

    // Limpar formulário após sucesso
    setMessage("");
    setRating(5);
    setAttachments([]);
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      setMessage("");
      setRating(5);
      setAttachments([]);
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      
      if (isImage || isVideo) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result as string;
          const newAttachment: CommentAttachment = {
            type: isImage ? 'image' : 'video',
            url: url, // Manter base64 para envio
            alt: file.name,
            ...(isVideo && { thumbnail: url }) // Para vídeos, usar a primeira frame como thumbnail
          };
          
          setAttachments(prev => [...prev, newAttachment]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Avaliar Produto</h2>
            <p className="text-sm text-gray-500 mt-1">{productTitle}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <LuX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Sua avaliação
            </label>
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isLoading}
                  className="focus:outline-none disabled:opacity-50 transition-transform hover:scale-110"
                >
                  <LuStar
                    className={`w-8 h-8 transition-colors ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {rating === 1 && "Muito ruim"}
              {rating === 2 && "Ruim"}
              {rating === 3 && "Regular"}
              {rating === 4 && "Bom"}
              {rating === 5 && "Excelente"}
            </p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Seu comentário
            </label>
            <textarea
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              placeholder="Conte sua experiência com este produto..."
              className="w-full min-h-[120px] resize-none px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
              disabled={isLoading}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-2 text-right">
              {message.length}/500 caracteres
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Anexar fotos ou vídeos (opcional)
            </label>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              <LuImage className="w-4 h-4 mr-2" />
              Adicionar Fotos/Vídeos
            </Button>
            
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                    {attachment.type === 'image' ? (
                      <LuImage className="w-4 h-4 text-gray-600" />
                    ) : (
                      <LuVideo className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm text-gray-700 flex-1 truncate">
                      {attachment.alt}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? (
                <>
                  <LuLoader className="w-4 h-4 animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                "Enviar Avaliação"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

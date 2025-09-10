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
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Avaliar Produto</h2>
            <p className="text-sm text-gray-600 mt-1">{productTitle}</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sua avaliação
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isLoading}
                  className="focus:outline-none disabled:opacity-50"
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
            <p className="text-sm text-gray-600 mt-2">
              {rating === 1 && "Muito ruim"}
              {rating === 2 && "Ruim"}
              {rating === 3 && "Regular"}
              {rating === 4 && "Bom"}
              {rating === 5 && "Excelente"}
            </p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Seu comentário
            </label>
             <textarea
               value={message}
               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
               placeholder="Conte sua experiência com este produto..."
               className="w-full min-h-[120px] resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
               disabled={isLoading}
               maxLength={500}
             />
            <p className="text-xs text-gray-500 mt-2 text-right">
              {message.length}/500 caracteres
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
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
              className="w-full"
            >
              <LuImage className="w-4 h-4 mr-2" />
              Adicionar Fotos/Vídeos
            </Button>
            
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    {attachment.type === 'image' ? (
                      <LuImage className="w-4 h-4 text-blue-500" />
                    ) : (
                      <LuVideo className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-gray-600 flex-1 truncate">
                      {attachment.alt}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="flex-1"
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

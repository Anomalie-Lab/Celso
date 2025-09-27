"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
  discountPercentage?: number;
}

export function ProductGallery({ images, title, discountPercentage }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const hasImages = images && images.length > 0;
  const hasMultipleImages = images && images.length > 1;

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        {hasImages ? (
          <Image
            src={images[selectedImage] || images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Imagem não disponível</span>
          </div>
        )}
        
        {/* Badge de Desconto */}
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {hasMultipleImages && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                selectedImage === index 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Imagem ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

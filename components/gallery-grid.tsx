
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/gallery-utils';
import { ImageDetailModal } from './image-detail-modal';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryGridProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
}

export function GalleryGrid({ images, onImageDelete }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No images yet. Upload some to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-card hover:cursor-pointer"
          >
            <div
              className="relative w-full h-full"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt="Gallery image"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {image.faces.length > 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  {image.faces.length} face{image.faces.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onImageDelete(image.id);
              }}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive/80 hover:bg-destructive text-destructive-foreground h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

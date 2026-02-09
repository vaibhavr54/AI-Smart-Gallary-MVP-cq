
'use client';

import { useState } from 'react';
import { GalleryImage, upscaleImage } from '@/lib/gallery-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface ImageEnhancementProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
}

export function ImageEnhancement({
  images,
  onImageDelete,
}: ImageEnhancementProps) {
  const [upscaling, setUpscaling] = useState<string | null>(null);
  const [upscaled, setUpscaled] = useState<Set<string>>(new Set());

  const handleUpscale = async (imageId: string) => {
    setUpscaling(imageId);
    try {
      await upscaleImage(imageId);
      setUpscaled((prev) => new Set([...prev, imageId]));
    } catch (e) {
      console.error('Upscaling failed', e);
    } finally {
      setUpscaling(null);
    }
  };

  if (images.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          Upload images to enhance them
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Wand2 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Image Enhancement</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-square bg-muted overflow-hidden">
              <img
                src={image.src || "/placeholder.svg"}
                alt="Image"
                className="w-full h-full object-cover"
              />
              {upscaled.has(image.id) && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <div className="text-white font-semibold text-center bg-green-600 px-3 py-2 rounded">
                    Enhanced
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 space-y-2">
              <p className="text-sm text-muted-foreground truncate">
                {image.description}
              </p>
              <Button
                onClick={() => handleUpscale(image.id)}
                disabled={upscaling === image.id || upscaled.has(image.id)}
                size="sm"
                className="w-full"
              >
                {upscaling === image.id ? (
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                ) : (
                  <Wand2 className="h-4 w-4 mr-2" />
                )}
                {upscaled.has(image.id) ? 'Enhanced' : 'Enhance'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

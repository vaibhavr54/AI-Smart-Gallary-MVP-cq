
'use client';

import { useState } from 'react';
import { GalleryImage, upscaleImage, denoise, adjustBrightness, adjustContrast, adjustSaturation, removeRed, autoCorrect } from '@/lib/gallery-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2, Zap, Sun, Contrast, Droplet, RotateCcw, Sparkles } from 'lucide-react';

interface ImageEnhancementProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
}

export function ImageEnhancement({
  images,
  onImageDelete,
}: ImageEnhancementProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancements, setEnhancements] = useState<Map<string, Set<string>>>(new Map());
  const [processing, setProcessing] = useState<string | null>(null);

  const isEnhanced = (imageId: string, type: string) => {
    return enhancements.get(imageId)?.has(type) ?? false;
  };

  const handleEnhancement = async (imageId: string, type: string, handler: () => Promise<string>) => {
    setProcessing(`${imageId}-${type}`);
    try {
      await handler();
      setEnhancements((prev) => {
        const imgEnhancements = new Set(prev.get(imageId) || []);
        imgEnhancements.add(type);
        const newMap = new Map(prev);
        newMap.set(imageId, imgEnhancements);
        return newMap;
      });
    } catch (e) {
      console.error('Enhancement failed', e);
    } finally {
      setProcessing(null);
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(selectedImage === image.id ? null : image.id)}
            className={`overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
              selectedImage === image.id
                ? 'border-primary ring-2 ring-primary/30'
                : 'border-muted hover:border-muted-foreground/50'
            }`}
          >
            <div className="relative aspect-square bg-muted overflow-hidden">
              <img
                src={image.src || "/placeholder.svg"}
                alt="Image"
                className="w-full h-full object-cover"
              />
              {((enhancements.get(image.id)?.size ?? 0) > 0) && (
                <div className="absolute top-2 right-2 bg-green-600 text-green-50 text-xs px-2 py-1 rounded-full font-medium">
                  {enhancements.get(image.id)?.size} enhanced
                </div>
              )}
            </div>
            <div className="p-3 text-left">
              <p className="text-xs text-muted-foreground truncate">
                {image.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div className="border-t border-muted pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-4">Enhancement Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Upscale */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'upscale', () => upscaleImage(selectedImage))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'upscale')}
                  variant={isEnhanced(selectedImage, 'upscale') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Zap className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Upscale</div>
                    <div className="text-xs opacity-70">4x resolution boost</div>
                  </div>
                  {processing === `${selectedImage}-upscale` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Denoise */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'denoise', () => denoise(selectedImage))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'denoise')}
                  variant={isEnhanced(selectedImage, 'denoise') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Denoise</div>
                    <div className="text-xs opacity-70">Remove grain & noise</div>
                  </div>
                  {processing === `${selectedImage}-denoise` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Brightness */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'brightness', () => adjustBrightness(selectedImage, 1.2))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'brightness')}
                  variant={isEnhanced(selectedImage, 'brightness') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Sun className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Brighten</div>
                    <div className="text-xs opacity-70">+20% brightness</div>
                  </div>
                  {processing === `${selectedImage}-brightness` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Contrast */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'contrast', () => adjustContrast(selectedImage, 1.3))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'contrast')}
                  variant={isEnhanced(selectedImage, 'contrast') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Contrast className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Enhance Contrast</div>
                    <div className="text-xs opacity-70">+30% contrast</div>
                  </div>
                  {processing === `${selectedImage}-contrast` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Saturation */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'saturation', () => adjustSaturation(selectedImage, 1.4))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'saturation')}
                  variant={isEnhanced(selectedImage, 'saturation') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Droplet className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Enhance Colors</div>
                    <div className="text-xs opacity-70">+40% saturation</div>
                  </div>
                  {processing === `${selectedImage}-saturation` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Red Eye */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'red-eye', () => removeRed(selectedImage))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'red-eye')}
                  variant={isEnhanced(selectedImage, 'red-eye') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <RotateCcw className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Remove Red Eye</div>
                    <div className="text-xs opacity-70">Fix red eye effect</div>
                  </div>
                  {processing === `${selectedImage}-red-eye` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>

                {/* Auto Correct */}
                <Button
                  onClick={() => handleEnhancement(selectedImage, 'auto', () => autoCorrect(selectedImage))}
                  disabled={processing?.startsWith(selectedImage) || isEnhanced(selectedImage, 'auto')}
                  variant={isEnhanced(selectedImage, 'auto') ? 'default' : 'outline'}
                  className="justify-start gap-3 h-auto py-3"
                >
                  <Wand2 className="h-4 w-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Auto Correct</div>
                    <div className="text-xs opacity-70">AI-powered correction</div>
                  </div>
                  {processing === `${selectedImage}-auto` && (
                    <div className="ml-auto h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  )}
                </Button>
              </div>
            </div>

            {((enhancements.get(selectedImage)?.size ?? 0) > 0) && (
              <div className="bg-green-950/30 border border-green-700/30 rounded-lg p-4">
                <p className="text-sm text-green-50">
                  Applied {enhancements.get(selectedImage)?.size ?? 0} enhancement{((enhancements.get(selectedImage)?.size ?? 0) !== 1) ? 's' : ''} to this image
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

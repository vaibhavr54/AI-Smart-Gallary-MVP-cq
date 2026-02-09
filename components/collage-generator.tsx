
'use client';

import { useState, useMemo } from 'react';
import { GalleryImage, createCollage } from '@/lib/gallery-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Grid3x3 } from 'lucide-react';

interface CollageGeneratorProps {
  images: GalleryImage[];
  selectedImageIds?: string[];
}

export function CollageGenerator({
  images,
  selectedImageIds,
}: CollageGeneratorProps) {
  const [cols, setCols] = useState(3);
  const [generated, setGenerated] = useState(false);

  const imagesToUse = useMemo(() => {
    if (selectedImageIds && selectedImageIds.length > 0) {
      return images.filter((img) => selectedImageIds.includes(img.id));
    }
    return images;
  }, [images, selectedImageIds]);

  const collageLayout = useMemo(() => {
    if (imagesToUse.length === 0) return null;
    return createCollage(
      imagesToUse.map((img) => img.id),
      new Map(imagesToUse.map((img) => [img.id, img])),
      cols
    );
  }, [imagesToUse, cols]);

  if (imagesToUse.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          {images.length === 0
            ? 'Upload images to generate a collage'
            : 'Select images to generate a collage'}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Grid3x3 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Smart Collage Generator</h3>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Columns:</label>
          <select
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="px-3 py-1 rounded border border-muted bg-card text-foreground"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
      </div>

      <div className="relative w-full bg-muted rounded-lg overflow-hidden aspect-video">
        {collageLayout ? (
          <div className="relative w-full h-full">
            {collageLayout.layout.map((item, idx) => {
              const image = imagesToUse.find((img) => img.id === item.id);
              if (!image) return null;

              return (
                <div
                  key={item.id}
                  className="absolute overflow-hidden"
                  style={{
                    left: `${item.x * 100}%`,
                    top: `${item.y * 100}%`,
                    width: `${item.width * 100}%`,
                    height: `${item.height * 100}%`,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt="Collage item"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${image.faces.length > 0 ? image.faces[0].x * 100 : 50}% ${image.faces.length > 0 ? image.faces[0].y * 100 : 50}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setGenerated(!generated)}
          className="flex-1"
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          {generated ? 'Regenerate' : 'Generate Collage'}
        </Button>
      </div>

      {generated && (
        <p className="text-sm text-muted-foreground text-center">
          Collage generated with face-aware cropping for optimal framing
        </p>
      )}
    </div>
  );
}

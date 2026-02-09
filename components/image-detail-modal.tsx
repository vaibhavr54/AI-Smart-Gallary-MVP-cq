
'use client';

import { GalleryImage } from '@/lib/gallery-utils';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageDetailModalProps {
  image: GalleryImage;
  onClose: () => void;
}

export function ImageDetailModal({ image, onClose }: ImageDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col">
          <div className="relative w-full h-96 overflow-hidden bg-muted">
            <img
              src={image.src || "/placeholder.svg"}
              alt="Full size"
              className="w-full h-full object-contain"
            />
            
            {/* Draw face boxes */}
            {image.faces.map((face) => (
              <div
                key={face.id}
                className="absolute border-2 border-primary"
                style={{
                  left: `${face.x * 100}%`,
                  top: `${face.y * 100}%`,
                  width: `${face.width * 100}%`,
                  height: `${face.height * 100}%`,
                }}
              >
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {Math.round(face.confidence * 100)}%
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Description</h3>
              <p className="text-foreground mt-1">{image.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Date</h4>
                <p className="text-foreground mt-1">
                  {new Date(image.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Faces Detected</h4>
                <p className="text-foreground mt-1">{image.faces.length}</p>
              </div>
            </div>

            {image.faces.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Face Details</h4>
                <div className="space-y-2">
                  {image.faces.map((face, idx) => (
                    <div key={face.id} className="text-sm bg-muted p-3 rounded flex justify-between">
                      <span>Face {idx + 1}</span>
                      <span className="text-primary">{Math.round(face.confidence * 100)}% confidence</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

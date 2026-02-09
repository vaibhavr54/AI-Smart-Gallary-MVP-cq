'use client';

import { GalleryImage } from '@/lib/gallery-utils';
import { GalleryGrid } from './gallery-grid';
import { ImageUploader } from './image-uploader';
import { FaceClustering } from './face-clustering';
import { EventGrouping } from './event-grouping';
import { SemanticSearch } from './semantic-search';
import { CollageGenerator } from './collage-generator';
import { ImageEnhancement } from './image-enhancement';

interface GalleryContentProps {
  activeTab: string;
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
  onImageUpload: (images: GalleryImage[]) => void;
}

export function GalleryContent({
  activeTab,
  images,
  onImageDelete,
  onImageUpload,
}: GalleryContentProps) {
  return (
    <div className="space-y-6">
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
            <p className="text-muted-foreground">
              Add new photos to your gallery. Supported formats: JPG, PNG, WebP, GIF
            </p>
          </div>
          <ImageUploader onImagesUpload={onImageUpload} />
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Gallery</h2>
            <p className="text-muted-foreground">
              Browse and manage all your photos in one place
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">No photos yet. Upload some to get started.</p>
            </div>
          ) : (
            <GalleryGrid images={images} onImageDelete={onImageDelete} />
          )}
        </div>
      )}

      {activeTab === 'faces' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Face Detection & Clustering</h2>
            <p className="text-muted-foreground">
              Automatically detect and group people across your photos
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Upload photos to detect faces</p>
            </div>
          ) : (
            <FaceClustering images={images} onPersonSelect={() => {}} />
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Smart Event Grouping</h2>
            <p className="text-muted-foreground">
              Automatically organize photos into events based on timestamps
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Upload photos to create events</p>
            </div>
          ) : (
            <EventGrouping images={images} onEventSelect={() => {}} />
          )}
        </div>
      )}

      {activeTab === 'search' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Semantic Image Search</h2>
            <p className="text-muted-foreground">
              Search your photos using natural language descriptions
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Upload photos to search</p>
            </div>
          ) : (
            <SemanticSearch images={images} onImageDelete={onImageDelete} />
          )}
        </div>
      )}

      {activeTab === 'collage' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Collage Generator</h2>
            <p className="text-muted-foreground">
              Create beautiful collages with intelligent face-aware cropping
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Upload photos to create collages</p>
            </div>
          ) : (
            <CollageGenerator images={images} />
          )}
        </div>
      )}

      {activeTab === 'enhance' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Image Enhancement</h2>
            <p className="text-muted-foreground">
              Upscale and enhance your images for better quality
            </p>
          </div>
          {images.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Upload photos to enhance</p>
            </div>
          ) : (
            <ImageEnhancement images={images} onImageDelete={onImageDelete} />
          )}
        </div>
      )}
    </div>
  );
}

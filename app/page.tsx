'use client';

import { useState, useEffect } from 'react';
import { GalleryImage } from '@/lib/gallery-utils';
import { ImageUploader } from '@/components/image-uploader';
import { GalleryTabs } from '@/components/gallery-tabs';
import { Sparkles } from 'lucide-react';

export default function Page() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gallery-images');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load gallery', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('gallery-images', JSON.stringify(images));
    }
  }, [images, isHydrated]);

  const handleImagesUpload = (newImages: GalleryImage[]) => {
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-muted sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  AI SmartGallery
                </h1>
                <p className="text-sm text-muted-foreground">
                  Intelligent Digital Asset Management System
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-primary">
                {images.length} image{images.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-muted-foreground">
                {images.reduce((sum, img) => sum + img.faces.length, 0)} faces detected
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {images.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-balance">
                Welcome to AI SmartGallery
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your photos to experience intelligent face recognition, semantic search,
                smart event grouping, and AI-powered collage generation.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ImageUploader onImagesUpload={handleImagesUpload} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">👤</div>
                <h3 className="font-semibold">Face Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically detect and cluster faces across your photos
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">🔍</div>
                <h3 className="font-semibold">Semantic Search</h3>
                <p className="text-sm text-muted-foreground">
                  Find images using natural language descriptions
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">📅</div>
                <h3 className="font-semibold">Smart Events</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-group photos into meaningful events by time
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">🎨</div>
                <h3 className="font-semibold">Face-Aware Collages</h3>
                <p className="text-sm text-muted-foreground">
                  Create beautiful collages with intelligent face cropping
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">✨</div>
                <h3 className="font-semibold">Image Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance old or low-quality images automatically
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-card border border-muted">
                <div className="text-2xl">🖼️</div>
                <h3 className="font-semibold">Gallery Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize and browse your entire photo library
                </p>
              </div>
            </div>
          </div>
        ) : (
          <GalleryTabs
            images={images}
            onImageDelete={handleImageDelete}
            onImageUpload={handleImagesUpload}
          />
        )}

        {images.length > 0 && (
          <div className="mt-12 pt-8 border-t border-muted">
            <h3 className="text-lg font-semibold mb-4">Upload More Images</h3>
            <div className="max-w-2xl">
              <ImageUploader onImagesUpload={handleImagesUpload} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

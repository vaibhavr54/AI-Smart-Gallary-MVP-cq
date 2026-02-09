'use client';

import { useState, useEffect } from 'react';
import { GalleryImage } from '@/lib/gallery-utils';
import { Sidebar } from '@/components/sidebar';
import { GalleryContent } from '@/components/gallery-content';

export default function Page() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');

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

  const totalFaces = images.reduce((sum, img) => sum + img.faces.length, 0);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        imageCount={images.length}
        faceCount={totalFaces}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0 pt-16 md:pt-0">
        {/* Top Header */}
        <header className="border-b border-muted sticky top-0 z-20 bg-background/95 backdrop-blur">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">AI SmartGallery</h1>
                <p className="text-xs text-muted-foreground">Intelligent Digital Asset Management</p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">
                    {images.length} Photos
                  </div>
                  <div className="text-xs text-muted-foreground">Stored locally</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 pb-20">
            <GalleryContent
              activeTab={activeTab}
              images={images}
              onImageDelete={handleImageDelete}
              onImageUpload={handleImagesUpload}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

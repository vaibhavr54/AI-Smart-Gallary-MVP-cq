
'use client';

import { useState } from 'react';
import { GalleryImage } from '@/lib/gallery-utils';
import { GalleryGrid } from './gallery-grid';
import { FaceClustering } from './face-clustering';
import { EventGrouping } from './event-grouping';
import { SemanticSearch } from './semantic-search';
import { CollageGenerator } from './collage-generator';
import { ImageEnhancement } from './image-enhancement';
import { Button } from '@/components/ui/button';

interface GalleryTabsProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
  onImageUpload: (images: GalleryImage[]) => void;
}

const tabs = [
  { id: 'gallery', label: 'Gallery', icon: '📸' },
  { id: 'faces', label: 'Face Detection', icon: '👤' },
  { id: 'events', label: 'Smart Events', icon: '📅' },
  { id: 'search', label: 'Semantic Search', icon: '🔍' },
  { id: 'collage', label: 'Collage', icon: '🎨' },
  { id: 'enhance', label: 'Enhancement', icon: '✨' },
];

export function GalleryTabs({
  images,
  onImageDelete,
  onImageUpload,
}: GalleryTabsProps) {
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [selectedEventImages, setSelectedEventImages] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-muted pb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className="gap-2"
          >
            <span>{tab.icon}</span>
            {tab.label}
          </Button>
        ))}
      </div>

      <div>
        {activeTab === 'gallery' && (
          <GalleryGrid images={images} onImageDelete={onImageDelete} />
        )}

        {activeTab === 'faces' && (
          <FaceClustering
            images={images}
            onPersonSelect={(personId, imageIds) => {
              setSelectedPersonId(personId);
              setSelectedEventImages(imageIds);
              setActiveTab('gallery');
            }}
          />
        )}

        {activeTab === 'events' && (
          <EventGrouping
            images={images}
            onEventSelect={(eventId, imageIds) => {
              setSelectedEventImages(imageIds);
              setActiveTab('gallery');
            }}
          />
        )}

        {activeTab === 'search' && (
          <SemanticSearch
            images={images}
            onImageDelete={onImageDelete}
          />
        )}

        {activeTab === 'collage' && (
          <CollageGenerator
            images={images}
            selectedImageIds={selectedEventImages.length > 0 ? selectedEventImages : undefined}
          />
        )}

        {activeTab === 'enhance' && (
          <ImageEnhancement
            images={images}
            onImageDelete={onImageDelete}
          />
        )}
      </div>
    </div>
  );
}

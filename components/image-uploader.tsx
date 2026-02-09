
'use client';

import React from "react"

import { useState, useRef } from 'react';
import { Cloud, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GalleryImage, detectFaces, generateImageDescription, generateEmbedding } from '@/lib/gallery-utils';

interface ImageUploaderProps {
  onImagesUpload: (images: GalleryImage[]) => void;
  disabled?: boolean;
}

export function ImageUploader({ onImagesUpload, disabled = false }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFiles = async (files: FileList) => {
    setUploading(true);
    const newImages: GalleryImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) continue;

      const reader = new FileReader();

      reader.onload = (e) => {
        const src = e.target?.result as string;
        const imageId = `img-${Date.now()}-${i}`;

        const image: GalleryImage = {
          id: imageId,
          src,
          timestamp: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000, // Random date in past 30 days
          faces: detectFaces(imageId),
          description: generateImageDescription(),
          embedding: generateEmbedding(),
        };

        newImages.push(image);

        if (newImages.length === Math.min(files.length, Object.keys(files).length)) {
          onImagesUpload(newImages);
          setUploading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-primary/50'
      } ${disabled || uploading ? 'opacity-50' : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3">
          {uploading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          ) : (
            <Cloud className="h-8 w-8 text-primary" />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            {uploading ? 'Processing images...' : 'Drag and drop images here'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {uploading ? 'Analyzing faces and generating metadata...' : 'or click to browse'}
          </p>
        </div>

        {!uploading && (
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Images
          </Button>
        )}
      </div>
    </div>
  );
}

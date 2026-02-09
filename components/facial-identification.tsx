'use client';

import React from "react"

import { useState } from 'react';
import { GalleryImage, generateFacesForImage } from '@/lib/gallery-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Search, X } from 'lucide-react';

interface FacialIdentificationProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
}

export function FacialIdentification({
  images,
  onImageDelete,
}: FacialIdentificationProps) {
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [matchedPhotos, setMatchedPhotos] = useState<GalleryImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setSelfieImage(imageData);
      performFacialSearch(imageData);
    };
    reader.readAsDataURL(file);
  };

  const performFacialSearch = (selfieData: string) => {
    setIsSearching(true);

    // Simulate AI facial matching
    setTimeout(() => {
      // Generate a random confidence score
      const matchConfidence = Math.floor(Math.random() * 40) + 60; // 60-99%
      setConfidence(matchConfidence);

      // Find photos with faces that could match
      const matches = images.filter((img) => {
        // Simulate matching: return images that have faces
        const hasMatch = Math.random() > 0.3; // 70% chance of match if has faces
        return img.faces.length > 0 && hasMatch;
      });

      setMatchedPhotos(matches.sort(() => Math.random() - 0.5).slice(0, 6));
      setIsSearching(false);
    }, 1500);
  };

  const handleClearSelfie = () => {
    setSelfieImage(null);
    setMatchedPhotos([]);
    setConfidence(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Selfie Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-muted rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">Upload Your Selfie</h3>
            <p className="text-sm text-muted-foreground">
              Take a photo or upload a selfie to find matching photos from your gallery.
            </p>

            {!selfieImage ? (
              <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground">or drag and drop</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSelfieUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={selfieImage || "/placeholder.svg"}
                    alt="Your selfie"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isSearching && (
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-transparent border-t-primary" />
                    <span>Searching for matches...</span>
                  </div>
                )}

                {!isSearching && confidence !== null && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Match Confidence:</span>
                      <span className="font-semibold text-secondary">{confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-secondary to-primary h-full transition-all duration-500"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearSelfie}
                  className="w-full bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Matched Photos Grid */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-muted rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">
                Matching Photos
                {matchedPhotos.length > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({matchedPhotos.length})
                  </span>
                )}
              </h3>
            </div>

            {!selfieImage ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Upload a selfie to see matching photos from your gallery
                </p>
              </div>
            ) : isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-transparent border-t-primary" />
                  </div>
                  <p className="text-muted-foreground">Analyzing facial features...</p>
                </div>
              </div>
            ) : matchedPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {matchedPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group bg-muted rounded-lg overflow-hidden aspect-square cursor-pointer"
                  >
                    <img
                      src={photo.data || "/placeholder.svg"}
                      alt="Match"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Face Detection Indicator */}
                    <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {photo.faces.length} face{photo.faces.length !== 1 ? 's' : ''}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => onImageDelete(photo.id)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No matching photos found. Try uploading another selfie.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {matchedPhotos.length > 0 && (
        <div className="bg-card border border-muted rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-lg">Match Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{matchedPhotos.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Matching Photos</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-secondary">
                {matchedPhotos.reduce((sum, p) => sum + p.faces.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total Faces Detected</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{confidence}%</div>
              <p className="text-xs text-muted-foreground mt-1">Confidence Score</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

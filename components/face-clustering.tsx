
'use client';

import { useState, useMemo } from 'react';
import { GalleryImage, clusterFaces } from '@/lib/gallery-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface FaceClusteringProps {
  images: GalleryImage[];
  onPersonSelect?: (personId: string, imageIds: string[]) => void;
}

export function FaceClustering({ images, onPersonSelect }: FaceClusteringProps) {
  const allFaces = useMemo(() => {
    return images.flatMap((img) =>
      img.faces.map((face) => ({
        ...face,
        imageId: img.id,
        imageSrc: img.src,
      }))
    );
  }, [images]);

  const clusters = useMemo(() => {
    if (allFaces.length === 0) return new Map();
    return clusterFaces(
      allFaces as any,
      new Map(images.map((img) => [img.id, img]))
    );
  }, [allFaces, images]);

  const personGroups = useMemo(() => {
    const groups: Array<{
      personId: string;
      faces: any[];
      imageIds: string[];
      avatarFace: any;
    }> = [];

    clusters.forEach((faceIds, personId) => {
      const personFaces = allFaces.filter((f) =>
        faceIds.some((fid: string) => fid === (f as any).id)
      ) as any[];

      const imageIds = [...new Set(personFaces.map((f) => f.imageId))];
      const avatarFace = personFaces[0];

      groups.push({
        personId,
        faces: personFaces,
        imageIds,
        avatarFace,
      });
    });

    return groups.sort((a, b) => b.imageIds.length - a.imageIds.length);
  }, [clusters, allFaces]);

  if (images.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Upload images to detect faces</p>
      </Card>
    );
  }

  if (personGroups.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No faces detected in the images</p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">
          Detected Persons ({personGroups.length})
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {personGroups.map((group) => (
          <Card
            key={group.personId}
            className="overflow-hidden hover:border-primary transition-colors cursor-pointer group"
            onClick={() =>
              onPersonSelect?.(group.personId, group.imageIds)
            }
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={group.avatarFace.imageSrc || "/placeholder.svg"}
                alt="Person"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                style={{
                  objectPosition: `${group.avatarFace.x * 100}% ${group.avatarFace.y * 100}%`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="text-white text-sm font-semibold">
                  {group.imageIds.length} image{group.imageIds.length !== 1 ? 's' : ''}
                </div>
                <div className="text-white/70 text-xs">
                  {group.faces.length} face{group.faces.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

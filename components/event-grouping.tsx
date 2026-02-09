
'use client';

import { useState, useMemo } from 'react';
import { GalleryImage, groupIntoEvents, Event } from '@/lib/gallery-utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface EventGroupingProps {
  images: GalleryImage[];
  onEventSelect?: (eventId: string, imageIds: string[]) => void;
}

export function EventGrouping({ images, onEventSelect }: EventGroupingProps) {
  const events = useMemo(() => {
    return groupIntoEvents(images);
  }, [images]);

  if (images.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Upload images to group into events</p>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No events found</p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">
          Smart Events ({events.length})
        </h3>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden hover:border-primary transition-colors cursor-pointer group"
            onClick={() => onEventSelect?.(event.id, event.imageIds)}
          >
            <div className="flex gap-4 p-4">
              <div className="relative w-32 h-24 rounded overflow-hidden flex-shrink-0 bg-muted">
                {event.imageIds.length > 0 && (
                  <img
                    src={
                      images.find((img) => img.id === event.imageIds[0])
                        ?.src || ''
                    }
                    alt="Event"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{event.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {event.imageIds.length} photo{event.imageIds.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(event.timestamp).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-fit"
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

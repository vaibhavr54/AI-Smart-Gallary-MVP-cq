
'use client';

import { useState } from 'react';
import { GalleryImage, semanticSearch } from '@/lib/gallery-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { GalleryGrid } from './gallery-grid';

interface SemanticSearchProps {
  images: GalleryImage[];
  onImageDelete: (id: string) => void;
}

export function SemanticSearch({ images, onImageDelete }: SemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GalleryImage[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      const searchResults = semanticSearch(query, images);
      setResults(searchResults);
      setSearched(true);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search with natural language... (e.g., 'dog running on grass', 'people at beach')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={!query.trim()}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        {searched && (
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>

      {searched && (
        <div>
          <h3 className="font-semibold mb-4">
            Found {results.length} result{results.length !== 1 ? 's' : ''} for "
            {query}"
          </h3>
          {results.length > 0 ? (
            <GalleryGrid
              images={results}
              onImageDelete={onImageDelete}
            />
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No images found matching your search
            </p>
          )}
        </div>
      )}
    </div>
  );
}

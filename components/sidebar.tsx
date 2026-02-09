'use client';

import { useState } from 'react';
import { Sparkles, ImageIcon, Users, Calendar, Search, Palette, Zap, Upload, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  imageCount: number;
  faceCount: number;
}

const menuItems = [
  {
    id: 'gallery',
    label: 'Gallery',
    icon: ImageIcon,
    description: 'Browse all photos',
  },
  {
    id: 'upload',
    label: 'Upload Photos',
    icon: Upload,
    description: 'Add new images',
  },
  {
    id: 'faces',
    label: 'Face Detection',
    icon: Users,
    description: 'Detect & cluster faces',
  },
  {
    id: 'events',
    label: 'Smart Events',
    icon: Calendar,
    description: 'Group by events',
  },
  {
    id: 'search',
    label: 'Semantic Search',
    icon: Search,
    description: 'AI-powered search',
  },
  {
    id: 'collage',
    label: 'Collage Generator',
    icon: Palette,
    description: 'Create collages',
  },
  {
    id: 'enhance',
    label: 'Enhancement',
    icon: Zap,
    description: 'Improve images',
  },
];

export function Sidebar({
  activeTab,
  onTabChange,
  imageCount,
  faceCount,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border-muted"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-muted transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-card border-b border-muted p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">SmartGallery</h1>
              <p className="text-xs text-muted-foreground">AI-Powered DAM</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 p-3 bg-background rounded-lg border border-muted">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Photos</span>
              <span className="font-semibold text-primary">{imageCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Faces</span>
              <span className="font-semibold text-secondary">{faceCount}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div
                      className={`text-xs ${
                        isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-muted bg-card">
          <p className="text-xs text-muted-foreground text-center">
            AI SmartGallery v1.0
          </p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

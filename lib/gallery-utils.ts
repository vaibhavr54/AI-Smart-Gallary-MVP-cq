
// Simulated AI feature utilities for gallery operations

export interface GalleryImage {
  id: string;
  src: string;
  timestamp: number;
  faces: FaceData[];
  description: string;
  embedding?: number[];
  eventId?: string;
}

export interface FaceData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  personId?: string;
  confidence: number;
}

export interface Person {
  id: string;
  name: string;
  imageIds: string[];
  avatarImageId?: string;
}

export interface Event {
  id: string;
  name: string;
  imageIds: string[];
  timestamp: number;
}

// Simulate face detection
export function detectFaces(imageId: string): FaceData[] {
  const faceCount = Math.floor(Math.random() * 3) + 1;
  const faces: FaceData[] = [];
  
  for (let i = 0; i < faceCount; i++) {
    faces.push({
      id: `face-${imageId}-${i}`,
      x: Math.random() * 0.6 + 0.1,
      y: Math.random() * 0.6 + 0.1,
      width: Math.random() * 0.3 + 0.15,
      height: Math.random() * 0.3 + 0.15,
      confidence: Math.random() * 0.4 + 0.6,
      personId: undefined,
    });
  }
  
  return faces;
}

// Generate simulated embeddings
export function generateEmbedding(): number[] {
  return Array.from({ length: 512 }, () => Math.random() * 2 - 1);
}

// Cluster faces by simulated similarity (DBSCAN-like)
export function clusterFaces(
  faces: FaceData[],
  imageMap: Map<string, GalleryImage>
): Map<string, string[]> {
  const clusters = new Map<string, string[]>();
  const processedFaces = new Set<string>();
  let clusterIndex = 0;

  faces.forEach((face) => {
    if (processedFaces.has(face.id)) return;

    const clusterId = `person-${clusterIndex++}`;
    const cluster = [face.id];
    processedFaces.add(face.id);

    // Simulate finding similar faces
    faces.forEach((otherFace) => {
      if (
        !processedFaces.has(otherFace.id) &&
        Math.random() > 0.4 // Simulated similarity threshold
      ) {
        cluster.push(otherFace.id);
        processedFaces.add(otherFace.id);
      }
    });

    clusters.set(clusterId, cluster);
  });

  return clusters;
}

// Group images into events based on timestamps
export function groupIntoEvents(images: GalleryImage[]): Event[] {
  const sortedImages = [...images].sort((a, b) => a.timestamp - b.timestamp);
  const events: Event[] = [];
  const timeWindow = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

  let currentEvent: Event | null = null;

  sortedImages.forEach((image) => {
    if (
      !currentEvent ||
      image.timestamp - currentEvent.timestamp > timeWindow
    ) {
      // Create new event
      currentEvent = {
        id: `event-${Date.now()}-${Math.random()}`,
        name: generateEventName(image.timestamp),
        imageIds: [image.id],
        timestamp: image.timestamp,
      };
      events.push(currentEvent);
    } else {
      currentEvent.imageIds.push(image.id);
    }
  });

  return events;
}

// Generate contextual event names
function generateEventName(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const dateNum = date.getDate();
  const hour = date.getHours();

  let timeOfDay = 'Day';
  if (hour < 12) timeOfDay = 'Morning';
  else if (hour < 17) timeOfDay = 'Afternoon';
  else timeOfDay = 'Evening';

  const eventTypes = ['Gathering', 'Outing', 'Moment', 'Celebration', 'Meeting'];
  const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

  return `${day} ${timeOfDay} - ${month} ${dateNum} ${eventType}`;
}

// Semantic search simulation (CLIP-like)
export function semanticSearch(
  query: string,
  images: GalleryImage[]
): GalleryImage[] {
  const keywords = query.toLowerCase().split(' ');
  
  return images.filter((image) => {
    const description = image.description.toLowerCase();
    const matchScore = keywords.filter((keyword) =>
      description.includes(keyword)
    ).length;
    
    // Also add random relevance for simulation
    return matchScore > 0 || Math.random() > 0.7;
  }).sort(() => Math.random() - 0.5);
}

// Generate random descriptions for images
export function generateImageDescription(): string {
  const scenes = [
    'People at a gathering',
    'Outdoor landscape',
    'Friends having fun',
    'Family moment',
    'Sunset view',
    'Indoor celebration',
    'Group photo',
    'Candid moment',
    'Scenic location',
    'Party scene',
  ];
  
  return scenes[Math.floor(Math.random() * scenes.length)];
}

// Create collage with face-aware cropping
export function createCollage(
  imageIds: string[],
  images: Map<string, GalleryImage>,
  cols: number = 3
): {
  layout: Array<{ id: string; x: number; y: number; width: number; height: number }>;
} {
  const layout = [];
  const colWidth = 1 / cols;
  
  for (let i = 0; i < Math.min(imageIds.length, cols * 2); i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    const image = images.get(imageIds[i]);
    
    // If image has faces, use face-aware cropping
    let x = col * colWidth;
    let y = row * 0.5;
    let width = colWidth;
    let height = 0.5;
    
    if (image && image.faces.length > 0) {
      // Center crop on the first face
      const face = image.faces[0];
      x = Math.max(0, face.x - face.width / 2);
      y = Math.max(0, face.y - face.height / 2);
      width = Math.min(1 - x, face.width * 1.5);
      height = Math.min(1 - y, face.height * 1.5);
    }
    
    layout.push({
      id: imageIds[i],
      x,
      y,
      width,
      height,
    });
  }
  
  return { layout };
}

// Simulate image upscaling
export function upscaleImage(imageId: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would call an upscaling API
      resolve(`upscaled-${imageId}`);
    }, 1000);
  });
}

// Face-based search
export function faceBasedSearch(
  queryFace: FaceData,
  allImages: GalleryImage[]
): GalleryImage[] {
  return allImages
    .filter((img) => img.faces.length > 0)
    .map((img) => ({
      ...img,
      relevance: img.faces.reduce((max, face) => {
        const distance = Math.sqrt(
          Math.pow(face.x - queryFace.x, 2) +
          Math.pow(face.y - queryFace.y, 2)
        );
        return Math.max(max, 1 - distance);
      }, 0),
    }))
    .filter((img) => (img as any).relevance > 0.3)
    .sort((a, b) => (b as any).relevance - (a as any).relevance)
    .map((img) => {
      const { relevance, ...rest } = img as any;
      return rest;
    });
}

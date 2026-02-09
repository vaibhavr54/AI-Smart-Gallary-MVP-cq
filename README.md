# AI SmartGallery

An intelligent digital asset management system with advanced computer vision features including face recognition, semantic search, smart event grouping, and AI-powered collage generation.

## Features

### 1. **Face Recognition & Intelligent Clustering** 👤
- Automatically detects faces in every uploaded image
- Converts faces into embeddings for similarity comparison
- Uses simulated DBSCAN clustering to group the same person across different images
- Creates unique identity profiles for each detected individual
- View all detected persons and their photos across your gallery

### 2. **Visual Search (Face-Based Search)**
- Upload reference images or use existing photos to find similar faces
- Instantly retrieves all photos containing similar persons
- Enables fast and accurate face-based search across your gallery

### 3. **Smart Event Grouping** 📅
- Automatically analyzes photo timestamps during upload
- Groups photos taken within a 4-hour window into meaningful events
- Events are named contextually (e.g., "Sunday Afternoon", "December 8 Celebration")
- Perfect for organizing memories from specific occasions

### 4. **AI Smart Collage Generation** 🎨
- Creates beautiful collages with face-aware cropping
- Uses face coordinates instead of center cropping
- Ensures faces remain perfectly framed in collages
- Prevents head cuts and awkward framing
- Adjustable grid layout (2x, 3x, 4x, or 5x columns)

### 5. **Semantic Image Search** 🔍
- Search images using natural language queries
- Examples: "dog running on grass", "me wearing a red shirt", "friends at the beach"
- Eliminates the need for manual tags or filenames
- Find exactly what you're looking for with intuitive descriptions

### 6. **Image Quality Upscaling** ✨
- Enhance low-resolution or old images
- Improves sharpness, clarity, and visual details
- Ideal for restoring old memories or preparing images for printing
- One-click enhancement for each image

## How to Use

### Getting Started

1. **Upload Images**
   - Drag and drop images into the upload area
   - Or click "Select Images" to browse your computer
   - Supports multiple image formats (JPG, PNG, WebP, etc.)

2. **Explore Features**
   - Navigate between tabs to access different features
   - Each tab offers unique ways to organize and interact with your photos

### Features in Detail

#### Gallery View
- Browse all uploaded images in a grid layout
- Click any image to see full details and detected faces
- View face detection confidence scores
- Delete individual images using the delete button

#### Face Detection
- See all automatically detected persons
- Each person card shows:
  - Avatar from their first detected image
  - Number of images they appear in
  - Number of faces detected
- Click on a person to view all their photos

#### Smart Events
- View all automatically created events
- Each event card displays:
  - Thumbnail from the event
  - Number of photos
  - Event name and timestamp
- Click to filter gallery to that event's photos

#### Semantic Search
- Type natural language queries
- Examples of searchable terms:
  - Objects: "dog", "beach", "mountains", "sunset"
  - People: "friends", "family", "group photo"
  - Activities: "running", "playing", "celebrating"
  - Descriptions: "wearing red shirt", "smiling", "outdoor"

#### Collage Generator
- Create beautiful collages from your photos
- Adjust the number of columns (2-5)
- Uses face-aware cropping for optimal framing
- Generate multiple variations with different layouts

#### Image Enhancement
- View all your images for enhancement
- Click "Enhance" on any image to improve quality
- Process includes:
  - Sharpness enhancement
  - Detail restoration
  - Clarity improvement
  - Perfect for old or low-resolution photos

## Technical Details

### Data Storage
- All images and metadata are stored in browser localStorage
- Data persists between sessions
- No server upload required for privacy

### AI Features (Simulated)
This is an MVP with simulated AI features for demonstration:
- Face detection: Simulated detection with random placement
- Face clustering: Simulated DBSCAN with random grouping
- Semantic search: Keyword matching with simulated relevance
- Image descriptions: Auto-generated contextual descriptions
- Upscaling: Placeholder implementation for demo purposes

### Actual AI Integration
When deploying to production, integrate with:
- **Face Detection**: InsightFace, OpenCV, or similar
- **Semantic Search**: CLIP embeddings for image understanding
- **Image Upscaling**: Real-ESRGAN, Upscayl, or similar
- **Backend Storage**: Supabase, Firebase, or custom server

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- Recommended for galleries up to 1000-2000 images in browser storage
- For larger galleries, implement server-side storage
- Image processing is done client-side
- Face detection runs during upload

## Privacy & Security

- All images remain on your device
- No data sent to external servers (current MVP)
- localStorage can be cleared from browser settings
- Export your photos anytime

## Future Enhancements

- [ ] Real AI model integration (InsightFace, CLIP)
- [ ] Cloud storage backend (Supabase, Firebase)
- [ ] User authentication
- [ ] Photo sharing and collaboration
- [ ] Advanced filters and editing
- [ ] Video support
- [ ] Mobile app
- [ ] Progressive Web App (PWA)
- [ ] Real-time synchronization across devices
- [ ] Machine learning model caching

## Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to see the application.

## Technology Stack

- **Frontend Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Storage**: Browser localStorage (for MVP)
- **Language**: TypeScript

## License

MIT License - Feel free to use and modify for your own projects.

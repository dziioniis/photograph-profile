import { Category, Series, Photo } from '@/types/models';

// Sample photos
const samplePhotos: Record<string, Photo[]> = {
  wedding1: [
    { id: 'w1-1', src: '/images/portfolio/wedding/series1/1.jpg', alt: 'Wedding ceremony moment', protect: true },
    { id: 'w1-2', src: '/images/portfolio/wedding/series1/2.jpg', alt: 'Bride and groom portrait', protect: true },
    { id: 'w1-3', src: '/images/portfolio/wedding/series1/3.jpg', alt: 'Wedding reception', protect: true },
    { id: 'w1-4', src: '/images/portfolio/wedding/series1/4.jpg', alt: 'First dance', protect: true },
  ],
  wedding2: [
    { id: 'w2-1', src: '/images/portfolio/wedding/series2/1.jpg', alt: 'Outdoor wedding ceremony', protect: true },
    { id: 'w2-2', src: '/images/portfolio/wedding/series2/2.jpg', alt: 'Wedding details', protect: true },
    { id: 'w2-3', src: '/images/portfolio/wedding/series2/3.jpg', alt: 'Couple portraits', protect: true },
    { id: 'w2-4', src: '/images/portfolio/wedding/series2/4.jpg', alt: 'Wedding party', protect: true },
  ],
  portrait1: [
    { id: 'p1-1', src: '/images/portfolio/portrait/series1/1.jpg', alt: 'Portrait photography', protect: true },
    { id: 'p1-2', src: '/images/portfolio/portrait/series1/2.jpg', alt: 'Professional headshot', protect: true },
    { id: 'p1-3', src: '/images/portfolio/portrait/series1/3.jpg', alt: 'Creative portrait', protect: true },
    { id: 'p1-4', src: '/images/portfolio/portrait/series1/4.jpg', alt: 'Lifestyle portrait', protect: true },
  ],
  portrait2: [
    { id: 'p2-1', src: '/images/portfolio/portrait/series2/1.jpg', alt: 'Studio portrait', protect: true },
    { id: 'p2-2', src: '/images/portfolio/portrait/series2/2.jpg', alt: 'Natural light portrait', protect: true },
    { id: 'p2-3', src: '/images/portfolio/portrait/series2/3.jpg', alt: 'Fashion portrait', protect: true },
    { id: 'p2-4', src: '/images/portfolio/portrait/series2/4.jpg', alt: 'Editorial portrait', protect: true },
  ],
  family1: [
    { id: 'f1-1', src: '/images/portfolio/family/series1/1.jpg', alt: 'Family outdoor session', protect: true },
    { id: 'f1-2', src: '/images/portfolio/family/series1/2.jpg', alt: 'Parents with children', protect: true },
    { id: 'f1-3', src: '/images/portfolio/family/series1/3.jpg', alt: 'Candid family moment', protect: true },
    { id: 'f1-4', src: '/images/portfolio/family/series1/4.jpg', alt: 'Family portrait', protect: true },
  ],
  family2: [
    { id: 'f2-1', src: '/images/portfolio/family/series2/1.jpg', alt: 'Beach family session', protect: true },
    { id: 'f2-2', src: '/images/portfolio/family/series2/2.jpg', alt: 'Family at home', protect: true },
    { id: 'f2-3', src: '/images/portfolio/family/series2/3.jpg', alt: 'Multigenerational family', protect: true },
    { id: 'f2-4', src: '/images/portfolio/family/series2/4.jpg', alt: 'Family lifestyle', protect: true },
  ],
};

// Series
export const series: Series[] = [
  {
    id: 'wedding-series-1',
    title: 'Sarah & John',
    location: 'Central Park, NY',
    date: '2024-06-15',
    photos: samplePhotos.wedding1,
    coverPhoto: samplePhotos.wedding1[0],
    videoPreviewUrl: '/videos/wedding-preview-1.mp4',
  },
  {
    id: 'wedding-series-2',
    title: 'Emily & Michael',
    location: 'Hamptons, NY',
    date: '2024-08-20',
    photos: samplePhotos.wedding2,
    coverPhoto: samplePhotos.wedding2[0],
    videoPreviewUrl: '/videos/wedding-preview-2.mp4',
  },
  {
    id: 'portrait-series-1',
    title: 'Creative Portraits',
    location: 'Studio NYC',
    date: '2024-05-10',
    photos: samplePhotos.portrait1,
    coverPhoto: samplePhotos.portrait1[0],
  },
  {
    id: 'portrait-series-2',
    title: 'Natural Light Sessions',
    location: 'Brooklyn, NY',
    date: '2024-07-05',
    photos: samplePhotos.portrait2,
    coverPhoto: samplePhotos.portrait2[0],
  },
  {
    id: 'family-series-1',
    title: 'Johnson Family',
    location: 'Prospect Park',
    date: '2024-04-22',
    photos: samplePhotos.family1,
    coverPhoto: samplePhotos.family1[0],
  },
  {
    id: 'family-series-2',
    title: 'Smith Family',
    location: 'Coney Island',
    date: '2024-09-12',
    photos: samplePhotos.family2,
    coverPhoto: samplePhotos.family2[0],
  },
];

// Categories
export const categories: Category[] = [
  {
    id: 'wedding',
    title: 'Wedding',
    slug: 'wedding',
    description: 'Capturing your special day with timeless elegance and emotion',
    coverPhoto: samplePhotos.wedding1[0],
    seriesIds: ['wedding-series-1', 'wedding-series-2'],
  },
  {
    id: 'portrait',
    title: 'Portrait',
    slug: 'portrait',
    description: 'Individual sessions that showcase your unique personality',
    coverPhoto: samplePhotos.portrait1[0],
    seriesIds: ['portrait-series-1', 'portrait-series-2'],
  },
  {
    id: 'family',
    title: 'Family',
    slug: 'family',
    description: 'Preserving precious family moments for generations to come',
    coverPhoto: samplePhotos.family1[0],
    seriesIds: ['family-series-1', 'family-series-2'],
  },
];

// Helper functions
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getSeriesById(id: string): Series | undefined {
  return series.find((s) => s.id === id);
}

export function getSeriesByCategory(categoryId: string): Series[] {
  const category = categories.find((cat) => cat.id === categoryId);
  if (!category) return [];
  return series.filter((s) => category.seriesIds.includes(s.id));
}

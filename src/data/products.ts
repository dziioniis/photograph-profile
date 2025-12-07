import { Product } from '@/types/models';

export const products: Product[] = [
  {
    id: 'preset-lightroom-bundle',
    title: 'Professional Lightroom Presets Bundle',
    slug: 'lightroom-presets-bundle',
    type: 'preset',
    description:
      'A comprehensive collection of 50+ professional Lightroom presets for wedding, portrait, and landscape photography. Instant download.',
    priceCents: 4900,
    currency: 'USD',
    images: [
      {
        id: 'preset-img-1',
        src: '/images/products/presets/preview.jpg',
        alt: 'Lightroom presets preview',
      },
    ],
    features: [
      '50+ professional presets',
      'One-click editing',
      'Compatible with Lightroom Classic & CC',
      'Mobile presets included',
      'Lifetime updates',
      'Commercial license',
    ],
    beforeAfterImages: [
      {
        before: {
          id: 'ba-1-before',
          src: '/images/products/presets/before1.jpg',
          alt: 'Before preset',
        },
        after: {
          id: 'ba-1-after',
          src: '/images/products/presets/after1.jpg',
          alt: 'After preset',
        },
      },
      {
        before: {
          id: 'ba-2-before',
          src: '/images/products/presets/before2.jpg',
          alt: 'Before preset',
        },
        after: {
          id: 'ba-2-after',
          src: '/images/products/presets/after2.jpg',
          alt: 'After preset',
        },
      },
    ],
    downloadUrl: '/downloads/lightroom-presets-bundle.zip',
  },
  {
    id: 'online-course-photography',
    title: 'Master Photography: From Beginner to Pro',
    slug: 'photography-masterclass',
    type: 'online_course',
    description:
      'Complete online photography course covering camera basics, composition, lighting, editing, and business. 40+ hours of video content.',
    priceCents: 29900,
    currency: 'USD',
    images: [
      {
        id: 'course-img-1',
        src: '/images/products/course/preview.jpg',
        alt: 'Photography course preview',
      },
    ],
    features: [
      '40+ hours of video lessons',
      'Downloadable resources',
      'Certificate of completion',
      'Private community access',
      'Lifetime access',
      '30-day money-back guarantee',
    ],
    videoPreviewUrl: '/videos/course-preview.mp4',
    modules: [
      {
        id: 'module-1',
        title: 'Camera Fundamentals',
        description: 'Understanding your camera, exposure triangle, and shooting modes',
        duration: '6 hours',
      },
      {
        id: 'module-2',
        title: 'Composition & Lighting',
        description: 'Master the art of composition and working with natural and artificial light',
        duration: '8 hours',
      },
      {
        id: 'module-3',
        title: 'Portrait Photography',
        description: 'Techniques for capturing stunning portraits and working with clients',
        duration: '10 hours',
      },
      {
        id: 'module-4',
        title: 'Post-Processing',
        description: 'Professional editing workflow in Lightroom and Photoshop',
        duration: '12 hours',
      },
      {
        id: 'module-5',
        title: 'Building Your Business',
        description: 'Marketing, pricing, and growing your photography business',
        duration: '6 hours',
      },
    ],
  },
  {
    id: 'physical-course-box',
    title: 'Photography Learning Kit (Physical)',
    slug: 'photography-learning-kit',
    type: 'physical',
    description:
      'Premium physical learning kit including printed course materials, flash cards, color charts, and exclusive swag. Perfect for hands-on learners.',
    priceCents: 14900,
    currency: 'USD',
    images: [
      {
        id: 'kit-img-1',
        src: '/images/products/kit/box.jpg',
        alt: 'Photography learning kit',
      },
      {
        id: 'kit-img-2',
        src: '/images/products/kit/contents.jpg',
        alt: 'Kit contents',
      },
    ],
    features: [
      'Premium printed course workbook (200+ pages)',
      'Photography cheat sheet cards',
      'Professional color calibration chart',
      '18% gray card set',
      'Exclusive branded merchandise',
      'Free shipping worldwide',
    ],
    instagramLink: 'https://instagram.com/photographer',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByType(type: Product['type']): Product[] {
  return products.filter((p) => p.type === type);
}

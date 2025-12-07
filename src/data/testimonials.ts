import { Testimonial } from '@/types/models';

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Sarah Johnson',
    role: 'Bride',
    text: 'Absolutely amazing! Our wedding photos exceeded all expectations. Every moment was captured beautifully and the attention to detail was incredible. We could not be happier!',
    photo: {
      id: 'test-photo-1',
      src: '/images/testimonials/sarah.jpg',
      alt: 'Sarah Johnson',
    },
    rating: 5,
    date: '2024-06-20',
  },
  {
    id: 'test-2',
    author: 'Michael Chen',
    role: 'Business Professional',
    text: 'The headshots turned out perfect! Professional, quick turnaround, and great direction during the shoot. Highly recommend for anyone needing professional photography.',
    photo: {
      id: 'test-photo-2',
      src: '/images/testimonials/michael.jpg',
      alt: 'Michael Chen',
    },
    rating: 5,
    date: '2024-07-15',
  },
  {
    id: 'test-3',
    author: 'The Smith Family',
    role: 'Family Session',
    text: 'Such a wonderful experience! Made our kids feel comfortable and captured genuine smiles. The photos are treasures we will keep forever. Thank you!',
    photo: {
      id: 'test-photo-3',
      src: '/images/testimonials/smith-family.jpg',
      alt: 'Smith Family',
    },
    rating: 5,
    date: '2024-09-18',
  },
  {
    id: 'test-4',
    author: 'Emily Rodriguez',
    role: 'Wedding Videography',
    text: 'The wedding video was like a cinematic masterpiece! Captured all the emotions perfectly. We cry happy tears every time we watch it.',
    videoUrl: '/videos/testimonials/emily.mp4',
    rating: 5,
    date: '2024-08-25',
  },
  {
    id: 'test-5',
    author: 'David Miller',
    role: 'Course Student',
    text: 'The photography course transformed my hobby into a business! Clear instruction, practical examples, and ongoing support. Best investment I have made.',
    photo: {
      id: 'test-photo-5',
      src: '/images/testimonials/david.jpg',
      alt: 'David Miller',
    },
    rating: 5,
    date: '2024-05-10',
  },
];

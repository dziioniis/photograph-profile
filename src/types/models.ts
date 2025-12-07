export type Photo = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  protect?: boolean;
};

export type Series = {
  id: string;
  title: string;
  location?: string;
  date?: string;
  coverPhoto?: Photo;
  photos: Photo[];
  videoPreviewUrl?: string;
};

export type Category = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverPhoto?: Photo;
  seriesIds: string[];
};

export type ProductType = 'preset' | 'online_course' | 'physical';

export type Product = {
  id: string;
  title: string;
  slug: string;
  type: ProductType;
  description: string;
  priceCents: number;
  currency: string;
  images: Photo[];
  features?: string[];
  beforeAfterImages?: { before: Photo; after: Photo }[];
  downloadUrl?: string; // for digital products
  videoPreviewUrl?: string; // for courses
  modules?: CourseModule[]; // for online courses
  instagramLink?: string; // for physical products
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  duration?: string;
  videoUrl?: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role?: string;
  text: string;
  photo?: Photo;
  videoUrl?: string;
  rating?: number;
  date?: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  eventDate?: string;
  eventType?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalCents: number;
};

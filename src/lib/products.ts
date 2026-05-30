import { groq } from 'next-sanity';
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Photo, Product, CourseModule } from '@/types/models';

// Сырой ответ Sanity (до маппинга в доменные типы)
type SanityImage = { _key?: string; alt?: string; asset?: { _ref?: string } };
type RawProduct = {
  id: string;
  title: string;
  slug: string;
  type: Product['type'];
  description: string;
  priceCents: number;
  currency: string;
  images?: SanityImage[];
  features?: string[];
  beforeAfterImages?: { before?: SanityImage; after?: SanityImage }[];
  downloadUrl?: string;
  videoPreviewUrl?: string;
  modules?: (CourseModule & { id: string })[];
  instagramLink?: string;
};

const PRODUCT_PROJECTION = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  type,
  description,
  priceCents,
  currency,
  images,
  features,
  beforeAfterImages,
  downloadUrl,
  videoPreviewUrl,
  "modules": modules[]{ "id": _key, title, description, duration, videoUrl },
  instagramLink
}`;

function toPhoto(img: SanityImage | undefined, fallbackId: string): Photo | undefined {
  if (!img?.asset?._ref) return undefined;
  return {
    id: img._key || img.asset._ref || fallbackId,
    src: urlFor(img).width(1600).fit('max').auto('format').url(),
    alt: img.alt || '',
  };
}

function mapProduct(raw: RawProduct): Product {
  const images = (raw.images ?? [])
    .map((img, i) => toPhoto(img, `${raw.id}-img-${i}`))
    .filter((p): p is Photo => Boolean(p));

  const beforeAfterImages = (raw.beforeAfterImages ?? [])
    .map((pair, i) => {
      const before = toPhoto(pair.before, `${raw.id}-ba-${i}-before`);
      const after = toPhoto(pair.after, `${raw.id}-ba-${i}-after`);
      return before && after ? { before, after } : undefined;
    })
    .filter((p): p is { before: Photo; after: Photo } => Boolean(p));

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    type: raw.type,
    description: raw.description,
    priceCents: raw.priceCents,
    currency: raw.currency || 'USD',
    images,
    features: raw.features,
    beforeAfterImages: beforeAfterImages.length ? beforeAfterImages : undefined,
    downloadUrl: raw.downloadUrl,
    videoPreviewUrl: raw.videoPreviewUrl,
    modules: raw.modules,
    instagramLink: raw.instagramLink,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const raw = await sanityClient.fetch<RawProduct[]>(
      groq`*[_type == "product"] | order(_createdAt asc) ${PRODUCT_PROJECTION}`
    );
    return raw.map(mapProduct);
  } catch (error) {
    console.error('Sanity getProducts failed:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const raw = await sanityClient.fetch<RawProduct | null>(
      groq`*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
      { slug }
    );
    return raw ? mapProduct(raw) : undefined;
  } catch (error) {
    console.error('Sanity getProductBySlug failed:', error);
    return undefined;
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const raw = await sanityClient.fetch<RawProduct | null>(
      groq`*[_type == "product" && _id == $id][0] ${PRODUCT_PROJECTION}`,
      { id }
    );
    return raw ? mapProduct(raw) : undefined;
  } catch (error) {
    console.error('Sanity getProductById failed:', error);
    return undefined;
  }
}

export async function getProductsByType(type: Product['type']): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.type === type);
}

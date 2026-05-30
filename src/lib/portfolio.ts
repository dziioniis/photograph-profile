import { groq } from 'next-sanity';
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Photo, Series, Category } from '@/types/models';

type SanityImage = {
  _key?: string;
  alt?: string;
  protect?: boolean;
  asset?: { _ref?: string };
};

type RawCategory = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverPhoto?: SanityImage;
};

type RawSeries = {
  id: string;
  title: string;
  slug: string;
  categorySlug?: string;
  categoryTitle?: string;
  location?: string;
  date?: string;
  coverPhoto?: SanityImage;
  photos?: SanityImage[];
  videoPreviewUrl?: string;
};

function toPhoto(img: SanityImage | undefined, fallbackId: string): Photo | undefined {
  if (!img?.asset?._ref) return undefined;
  return {
    id: img._key || img.asset._ref || fallbackId,
    src: urlFor(img).width(2000).fit('max').auto('format').url(),
    alt: img.alt || '',
    protect: img.protect ?? true,
  };
}

const CATEGORY_PROJECTION = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  description,
  coverPhoto
}`;

const SERIES_PROJECTION = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  location,
  date,
  coverPhoto,
  photos,
  videoPreviewUrl
}`;

function mapCategory(raw: RawCategory): Category {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    coverPhoto: toPhoto(raw.coverPhoto, `${raw.id}-cover`),
    seriesIds: [],
  };
}

function mapSeries(raw: RawSeries): Series {
  const photos = (raw.photos ?? [])
    .map((img, i) => toPhoto(img, `${raw.id}-photo-${i}`))
    .filter((p): p is Photo => Boolean(p));

  return {
    id: raw.slug, // в URL используем slug
    title: raw.title,
    location: raw.location,
    date: raw.date,
    coverPhoto: toPhoto(raw.coverPhoto, `${raw.id}-cover`),
    photos,
    videoPreviewUrl: raw.videoPreviewUrl,
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const raw = await sanityClient.fetch<RawCategory[]>(
      groq`*[_type == "category"] | order(order asc, title asc) ${CATEGORY_PROJECTION}`
    );
    return raw.map(mapCategory);
  } catch (error) {
    console.error('Sanity getCategories failed:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  try {
    const raw = await sanityClient.fetch<RawCategory | null>(
      groq`*[_type == "category" && slug.current == $slug][0] ${CATEGORY_PROJECTION}`,
      { slug }
    );
    return raw ? mapCategory(raw) : undefined;
  } catch (error) {
    console.error('Sanity getCategoryBySlug failed:', error);
    return undefined;
  }
}

export async function getSeriesByCategorySlug(slug: string): Promise<Series[]> {
  try {
    const raw = await sanityClient.fetch<RawSeries[]>(
      groq`*[_type == "series" && category->slug.current == $slug] | order(order asc, date desc) ${SERIES_PROJECTION}`,
      { slug }
    );
    return raw.map(mapSeries);
  } catch (error) {
    console.error('Sanity getSeriesByCategorySlug failed:', error);
    return [];
  }
}

export type SeriesWithCategory = Series & {
  categorySlug?: string;
  categoryTitle?: string;
};

export async function getSeriesBySlug(slug: string): Promise<SeriesWithCategory | undefined> {
  try {
    const raw = await sanityClient.fetch<RawSeries | null>(
      groq`*[_type == "series" && slug.current == $slug][0] ${SERIES_PROJECTION}`,
      { slug }
    );
    if (!raw) return undefined;
    return {
      ...mapSeries(raw),
      categorySlug: raw.categorySlug,
      categoryTitle: raw.categoryTitle,
    };
  } catch (error) {
    console.error('Sanity getSeriesBySlug failed:', error);
    return undefined;
  }
}

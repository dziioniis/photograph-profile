import { groq } from 'next-sanity';
import { sanityClient, urlFor } from '@/lib/sanity';

type SanityImage = { asset?: { _ref: string }; alt?: string };

type RawVideoItem = {
  _key: string;
  title?: string;
  poster?: SanityImage;
  videoFileUrl?: string;
  videoUrl?: string;
};

type RawVideoPage = {
  introTitle?: string;
  introText?: string;
  introImage?: SanityImage;
  secondText?: string;
  secondImage?: SanityImage;
  filmsTitle?: string;
  films?: RawVideoItem[];
  teasersTitle?: string;
  teasers?: RawVideoItem[];
};

export type VideoItem = {
  id: string;
  title?: string;
  posterUrl?: string;
  videoUrl?: string;
};

export type VideoPageData = {
  introTitle?: string;
  introText?: string;
  introImageUrl?: string;
  secondText?: string;
  secondImageUrl?: string;
  filmsTitle?: string;
  films: VideoItem[];
  teasersTitle?: string;
  teasers: VideoItem[];
};

const VIDEO_ITEM_PROJECTION = groq`{
  _key,
  title,
  poster,
  "videoFileUrl": videoFile.asset->url,
  videoUrl
}`;

function mapItem(raw: RawVideoItem): VideoItem {
  return {
    id: raw._key,
    title: raw.title,
    posterUrl: raw.poster?.asset
      ? urlFor(raw.poster).width(1280).quality(85).url()
      : undefined,
    videoUrl: raw.videoFileUrl || raw.videoUrl,
  };
}

export async function getVideoPage(
  locale: string = 'en'
): Promise<VideoPageData | null> {
  try {
    const raw = await sanityClient.fetch<RawVideoPage | null>(
      groq`*[_type == "videoPage" && _id == "videoPage"][0]{
        introTitle,
        "introText": coalesce(introText[$locale], introText.en, introText),
        introImage,
        "secondText": coalesce(secondText[$locale], secondText.en, secondText),
        secondImage,
        filmsTitle,
        "films": films[] ${VIDEO_ITEM_PROJECTION},
        teasersTitle,
        "teasers": teasers[] ${VIDEO_ITEM_PROJECTION}
      }`,
      { locale }
    );
    if (!raw) return null;
    return {
      introTitle: raw.introTitle,
      introText: raw.introText,
      introImageUrl: raw.introImage?.asset
        ? urlFor(raw.introImage).width(1200).quality(85).url()
        : undefined,
      secondText: raw.secondText,
      secondImageUrl: raw.secondImage?.asset
        ? urlFor(raw.secondImage).width(1200).quality(85).url()
        : undefined,
      filmsTitle: raw.filmsTitle,
      films: (raw.films || []).map(mapItem),
      teasersTitle: raw.teasersTitle,
      teasers: (raw.teasers || []).map(mapItem),
    };
  } catch (error) {
    console.error('Sanity getVideoPage failed:', error);
    return null;
  }
}

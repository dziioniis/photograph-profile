import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Серверный read-токен (только на сервере, в браузер не попадает).
// Нужен, потому что анонимное чтение датасета не отдаёт часть типов (ролевой доступ).
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token, // с токеном читаем напрямую (CDN не кешируем для приватного доступа)
  token,
  perspective: 'published', // отдаём только опубликованное, без черновиков
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

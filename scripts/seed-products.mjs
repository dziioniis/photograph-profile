/**
 * Опциональный seed: заливает 3 демо-товара в Sanity, чтобы магазин не был пустым.
 * Фотографии добавляются вручную в Studio (/studio) — здесь только тексты/цены.
 *
 * Запуск:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_WRITE_TOKEN=yyy \
 *   node scripts/seed-products.mjs
 *
 * Токен с правами Editor создаётся в https://sanity.io/manage → API → Tokens.
 */
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Нужны NEXT_PUBLIC_SANITY_PROJECT_ID и SANITY_WRITE_TOKEN.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const products = [
  {
    _id: 'product.lightroom-presets-bundle',
    _type: 'product',
    title: 'Professional Lightroom Presets Bundle',
    slug: { _type: 'slug', current: 'lightroom-presets-bundle' },
    type: 'preset',
    description:
      'A comprehensive collection of 50+ professional Lightroom presets for wedding, portrait, and landscape photography. Instant download.',
    priceCents: 4900,
    currency: 'USD',
    features: [
      '50+ professional presets',
      'One-click editing',
      'Compatible with Lightroom Classic & CC',
      'Mobile presets included',
      'Lifetime updates',
      'Commercial license',
    ],
    downloadUrl: 'https://example.com/downloads/lightroom-presets-bundle.zip',
  },
  {
    _id: 'product.photography-masterclass',
    _type: 'product',
    title: 'Master Photography: From Beginner to Pro',
    slug: { _type: 'slug', current: 'photography-masterclass' },
    type: 'online_course',
    description:
      'Complete online photography course covering camera basics, composition, lighting, editing, and business. 40+ hours of video content.',
    priceCents: 29900,
    currency: 'USD',
    features: [
      '40+ hours of video lessons',
      'Downloadable resources',
      'Certificate of completion',
      'Private community access',
      'Lifetime access',
      '30-day money-back guarantee',
    ],
    modules: [
      { _key: 'm1', _type: 'module', title: 'Camera Fundamentals', description: 'Understanding your camera, exposure triangle, and shooting modes', duration: '6 hours' },
      { _key: 'm2', _type: 'module', title: 'Composition & Lighting', description: 'Master the art of composition and working with natural and artificial light', duration: '8 hours' },
      { _key: 'm3', _type: 'module', title: 'Portrait Photography', description: 'Techniques for capturing stunning portraits and working with clients', duration: '10 hours' },
      { _key: 'm4', _type: 'module', title: 'Post-Processing', description: 'Professional editing workflow in Lightroom and Photoshop', duration: '12 hours' },
      { _key: 'm5', _type: 'module', title: 'Building Your Business', description: 'Marketing, pricing, and growing your photography business', duration: '6 hours' },
    ],
  },
  {
    _id: 'product.photography-learning-kit',
    _type: 'product',
    title: 'Photography Learning Kit (Physical)',
    slug: { _type: 'slug', current: 'photography-learning-kit' },
    type: 'physical',
    description:
      'Premium physical learning kit including printed course materials, flash cards, color charts, and exclusive swag. Perfect for hands-on learners.',
    priceCents: 14900,
    currency: 'USD',
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

const tx = products.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

tx.commit()
  .then(() => {
    console.log(`✓ Залито товаров: ${products.length}. Откройте /studio и добавьте фото к каждому.`);
  })
  .catch((err) => {
    console.error('Ошибка seed:', err.message);
    process.exit(1);
  });

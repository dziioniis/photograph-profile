/**
 * Seed-скрипт: заливает в Sanity демо-контент с картинками —
 * 5 товаров и портфолио (3 категории + 5 серий с фото).
 * Картинки скачиваются с picsum.photos и загружаются в Sanity как ассеты.
 *
 * Запуск:
 *   SANITY_WRITE_TOKEN=ваш_токен node scripts/seed-all.mjs
 *
 * Токен с правами Editor: https://sanity.io/manage → проект → API → Tokens.
 * (projectId и dataset уже зашиты ниже — они публичные.)
 */
import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zy45pnj8';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('Нужен SANITY_WRITE_TOKEN (права Editor). См. комментарий в начале файла.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// Загрузка картинки с URL прямо в ассеты Sanity → возвращает поле image
async function uploadImage(url, alt, extra = {}) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Не удалось скачать ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buf, {
    filename: `${alt.replace(/\s+/g, '-').toLowerCase()}.jpg`,
    contentType: 'image/jpeg',
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
    ...extra,
  };
}

const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

async function seedPortfolio() {
  const categoriesDef = [
    { key: 'wedding', title: 'Wedding', order: 0, description: 'Capturing your special day with timeless elegance and emotion' },
    { key: 'portrait', title: 'Portrait', order: 1, description: 'Individual sessions that showcase your unique personality' },
    { key: 'family', title: 'Family', order: 2, description: 'Preserving precious family moments for generations to come' },
  ];

  const categoryIds = {};
  for (const c of categoriesDef) {
    const cover = await uploadImage(img(`cat-${c.key}`, 1200, 1500), `${c.title} cover`);
    const _id = `seed.category.${c.key}`;
    await client.createOrReplace({
      _id,
      _type: 'category',
      title: c.title,
      slug: { _type: 'slug', current: c.key },
      order: c.order,
      description: c.description,
      coverPhoto: cover,
    });
    categoryIds[c.key] = _id;
    console.log(`✓ category: ${c.title}`);
  }

  const seriesDef = [
    { key: 'sarah-john', title: 'Sarah & John', cat: 'wedding', location: 'Central Park, NY', date: '2025-06-15' },
    { key: 'emily-michael', title: 'Emily & Michael', cat: 'wedding', location: 'Hamptons, NY', date: '2025-08-20' },
    { key: 'studio-portraits', title: 'Studio Portraits', cat: 'portrait', location: 'Studio, Batumi', date: '2025-05-10' },
    { key: 'johnson-family', title: 'Johnson Family', cat: 'family', location: 'Prospect Park', date: '2025-04-22' },
    { key: 'smith-family', title: 'Smith Family', cat: 'family', location: 'Seaside', date: '2025-09-12' },
  ];

  for (const [i, s] of seriesDef.entries()) {
    const cover = await uploadImage(img(`series-${s.key}`, 1200, 1500), `${s.title} cover`);
    const photos = [];
    for (let p = 1; p <= 4; p++) {
      photos.push(await uploadImage(img(`${s.key}-${p}`, 1600, 1100), `${s.title} photo ${p}`, { protect: true }));
    }
    await client.createOrReplace({
      _id: `seed.series.${s.key}`,
      _type: 'series',
      title: s.title,
      slug: { _type: 'slug', current: s.key },
      category: { _type: 'reference', _ref: categoryIds[s.cat] },
      order: i,
      location: s.location,
      date: s.date,
      coverPhoto: cover,
      photos,
    });
    console.log(`✓ series: ${s.title}`);
  }
}

async function seedProducts() {
  const productsDef = [
    {
      key: 'lightroom-presets-bundle', title: 'Professional Lightroom Presets Bundle', type: 'preset',
      description: 'A collection of 50+ professional Lightroom presets for wedding, portrait, and landscape photography. Instant download.',
      priceCents: 4900, features: ['50+ presets', 'One-click editing', 'Lightroom Classic & CC', 'Mobile presets', 'Lifetime updates'],
      downloadUrl: 'https://example.com/presets.zip',
    },
    {
      key: 'cinematic-presets', title: 'Cinematic Color Presets', type: 'preset',
      description: 'Moody cinematic tones for storytelling photography. Works great for weddings and lifestyle.',
      priceCents: 3900, features: ['20 cinematic presets', 'Desktop & mobile', 'Free updates'],
      downloadUrl: 'https://example.com/cinematic.zip',
    },
    {
      key: 'photography-masterclass', title: 'Master Photography: Beginner to Pro', type: 'online_course',
      description: 'Complete online course: camera basics, composition, lighting, editing, and business. 40+ hours of video.',
      priceCents: 29900, features: ['40+ hours video', 'Downloadable resources', 'Certificate', 'Lifetime access'],
      videoPreviewUrl: 'https://example.com/preview.mp4',
      modules: [
        { _key: 'm1', _type: 'module', title: 'Camera Fundamentals', description: 'Exposure triangle and modes', duration: '6 hours' },
        { _key: 'm2', _type: 'module', title: 'Composition & Lighting', description: 'Natural and artificial light', duration: '8 hours' },
        { _key: 'm3', _type: 'module', title: 'Post-Processing', description: 'Lightroom & Photoshop workflow', duration: '10 hours' },
      ],
    },
    {
      key: 'wedding-editing-course', title: 'Wedding Editing Workflow', type: 'online_course',
      description: 'Learn a fast, consistent editing workflow for full wedding galleries.',
      priceCents: 19900, features: ['Culling strategy', 'Batch editing', 'Color consistency', 'Export presets'],
      videoPreviewUrl: 'https://example.com/wedding-preview.mp4',
      modules: [
        { _key: 'm1', _type: 'module', title: 'Culling', description: 'Selecting the keepers fast', duration: '2 hours' },
        { _key: 'm2', _type: 'module', title: 'Editing', description: 'Consistent looks across a gallery', duration: '5 hours' },
      ],
    },
    {
      key: 'photography-learning-kit', title: 'Photography Learning Kit (Physical)', type: 'physical',
      description: 'Premium physical kit: printed workbook, cheat-sheet cards, color charts, and branded swag.',
      priceCents: 14900, features: ['200+ page workbook', 'Cheat-sheet cards', 'Color calibration chart', 'Free worldwide shipping'],
      instagramLink: 'https://instagram.com',
    },
  ];

  for (const p of productsDef) {
    const image = await uploadImage(img(`product-${p.key}`, 1200, 900), `${p.title} image`);
    const doc = {
      _id: `seed.product.${p.key}`,
      _type: 'product',
      title: p.title,
      slug: { _type: 'slug', current: p.key },
      type: p.type,
      description: p.description,
      priceCents: p.priceCents,
      currency: 'USD',
      images: [image],
      features: p.features,
    };
    if (p.downloadUrl) doc.downloadUrl = p.downloadUrl;
    if (p.videoPreviewUrl) doc.videoPreviewUrl = p.videoPreviewUrl;
    if (p.modules) doc.modules = p.modules;
    if (p.instagramLink) doc.instagramLink = p.instagramLink;
    await client.createOrReplace(doc);
    console.log(`✓ product: ${p.title}`);
  }
}

(async () => {
  try {
    console.log('Заливаю портфолио...');
    await seedPortfolio();
    console.log('Заливаю товары...');
    await seedProducts();
    console.log('\n✅ Готово. Открой /studio и /shop, /portfolio — данные на месте.');
  } catch (e) {
    console.error('Ошибка seed:', e.message);
    process.exit(1);
  }
})();

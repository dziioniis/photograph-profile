import React from 'react';
import HomeContent from '@/components/HomeContent';
import { getProducts } from '@/lib/products';
import { getCategories } from '@/lib/portfolio';
import { getContactSettings } from '@/lib/settings';

// Кеш с обновлением раз в 30с — товары, портфолио и контакты на главной синхронны с Sanity.
export const revalidate = 30;

// Серверный компонент: тянет данные из Sanity и отдаёт клиентской вёрстке.
export default async function HomePage() {
  const [products, categories, contact] = await Promise.all([
    getProducts(),
    getCategories(),
    getContactSettings(),
  ]);
  return (
    <HomeContent
      products={products}
      categories={categories}
      instagramUrl={contact.instagram}
    />
  );
}

import React from 'react';
import ShopListing from '@/components/ShopListing';
import { getProducts } from '@/lib/products';

// Кеш с обновлением раз в 30с — новые/изменённые товары появляются без пересборки.
export const revalidate = 30;

// Серверный компонент: тянет товары из Sanity и отдаёт клиентской вёрстке.
export default async function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);
  return <ShopListing products={products} />;
}

import React from 'react';
import ShopListing from '@/components/ShopListing';
import { getProducts } from '@/lib/products';

// Кеш с обновлением раз в 30с — новые/изменённые товары появляются без пересборки.
export const revalidate = 30;

// Серверный компонент: тянет товары из Sanity и отдаёт клиентской вёрстке.
export default async function ShopPage() {
  const products = await getProducts();
  return <ShopListing products={products} />;
}

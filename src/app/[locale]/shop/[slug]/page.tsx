import React from 'react';
import ProductDetail from '@/components/ProductDetail';
import ProductNotFound from '@/components/ProductNotFound';
import { getProductBySlug } from '@/lib/products';

// Кеш с обновлением раз в 30с — изменения товара появляются без пересборки.
export const revalidate = 30;

// Серверный компонент: тянет товар из Sanity по slug и отдаёт клиентской вёрстке.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <ProductNotFound />;
  }

  return <ProductDetail product={product} />;
}

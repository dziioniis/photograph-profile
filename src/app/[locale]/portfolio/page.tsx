import React from 'react';
import PortfolioListing from '@/components/PortfolioListing';
import { getCategories } from '@/lib/portfolio';

// Кеш с обновлением раз в 30с — новые категории появляются без пересборки.
export const revalidate = 30;

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = await getCategories(locale);
  return <PortfolioListing categories={categories} />;
}

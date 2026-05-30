import React from 'react';
import { notFound } from 'next/navigation';
import CategorySeries from '@/components/CategorySeries';
import { getCategoryBySlug, getSeriesByCategorySlug } from '@/lib/portfolio';

export const revalidate = 30;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const seriesList = await getSeriesByCategorySlug(categorySlug);

  return <CategorySeries category={category} seriesList={seriesList} />;
}

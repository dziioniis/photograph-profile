import React from 'react';
import { notFound } from 'next/navigation';
import SeriesDetail from '@/components/SeriesDetail';
import { getSeriesBySlug } from '@/lib/portfolio';

export const revalidate = 30;

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ category: string; series: string; locale: string }>;
}) {
  const { series: seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <SeriesDetail
      series={series}
      categorySlug={series.categorySlug}
      categoryTitle={series.categoryTitle}
    />
  );
}

'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';
import type { Series } from '@/types/models';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Breadcrumb = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};

  a {
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Details = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const VideoPreview = styled.div`
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function SeriesDetail({
  series,
  categorySlug,
  categoryTitle,
}: {
  series: Series;
  categorySlug?: string;
  categoryTitle?: string;
}) {
  const t = useTranslations('portfolio');
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const catSlug = categorySlug || (params.category as string);

  return (
    <Container>
      <Header>
        <Breadcrumb>
          <Link href={`${prefix}/portfolio`}>{t('title')}</Link>
          <span>/</span>
          <Link href={`${prefix}/portfolio/${catSlug}`}>
            {categoryTitle || catSlug}
          </Link>
          <span>/</span>
          <span>{series.title}</span>
        </Breadcrumb>

        <Title>{series.title}</Title>
        <Details>
          {series.location && <span>{series.location}</span>}
          {series.location && series.date && <span>•</span>}
          {series.date && <span>{new Date(series.date).toLocaleDateString()}</span>}
          <span>•</span>
          <span>
            {series.photos.length} {t('photos')}
          </span>
        </Details>
      </Header>

      {series.videoPreviewUrl && (
        <VideoPreview>
          <video controls>
            <source src={series.videoPreviewUrl} type="video/mp4" />
            {t('videoNotSupported')}
          </video>
        </VideoPreview>
      )}

      <GalleryGrid photos={series.photos} />
    </Container>
  );
}

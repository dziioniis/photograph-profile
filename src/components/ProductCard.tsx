'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/models';

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProductType = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ViewButton = styled(Link)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.textLight};
    opacity: 1;
  }
`;

interface ProductCardProps {
  product: Product;
}

const formatPrice = (cents: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
};

const getProductTypeLabel = (type: Product['type'], t: any) => {
  switch (type) {
    case 'preset':
      return t('types.preset');
    case 'online_course':
      return t('types.online_course');
    case 'physical':
      return t('types.physical');
    default:
      return t('types.product');
  }
};

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('shop');
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const mainImage = product.images[0];

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ImageContainer>
        {mainImage && (
          <ProductImage
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </ImageContainer>
      <CardContent>
        <ProductType>{getProductTypeLabel(product.type, t)}</ProductType>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <PriceContainer>
          <Price>{formatPrice(product.priceCents, product.currency)}</Price>
          <ViewButton href={`${prefix}/shop/${product.slug}`}>
            {t('viewDetails')}
          </ViewButton>
        </PriceContainer>
      </CardContent>
    </Card>
  );
}

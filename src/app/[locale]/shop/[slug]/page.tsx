'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getProductBySlug } from '@/data/products';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const Breadcrumb = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};

  a:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.overlay};

  img {
    object-fit: cover;
  }
`;

const DetailsSection = styled.div``;

const ProductType = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeatureItem = styled.li`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: bold;
  }
`;

const BuyButton = styled(motion.button)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.textLight};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InstagramButton = styled.a`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    opacity: 1;
  }
`;

const ModulesSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  grid-column: 1 / -1;
`;

const ModuleCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
`;

const formatPrice = (cents: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
};

const getProductTypeLabel = (type: string, t: any) => {
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

export default function ProductPage() {
  const t = useTranslations('shop');
  const params = useParams();
  const productSlug = params.slug as string;
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const [loading, setLoading] = React.useState(false);

  const product = getProductBySlug(productSlug);

  if (!product) {
    return (
      <Container>
        <NotFound>
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.description')}</p>
          <Link href={`${prefix}/shop`}>{t('notFound.backToShop')}</Link>
        </NotFound>
      </Container>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t('checkoutError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Link href={`${prefix}/shop`}>{t('title')}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </Breadcrumb>

      <ProductLayout>
        <ImageSection>
          {product.images[0] && (
            <MainImage>
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </MainImage>
          )}
        </ImageSection>

        <DetailsSection>
          <ProductType>{getProductTypeLabel(product.type, t)}</ProductType>
          <Title>{product.title}</Title>
          <Price>{formatPrice(product.priceCents, product.currency)}</Price>
          <Description>{product.description}</Description>

          {product.features && product.features.length > 0 && (
            <FeaturesList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeaturesList>
          )}

          {product.type === 'physical' && product.instagramLink ? (
            <InstagramButton
              href={product.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('orderOnInstagram')}
            </InstagramButton>
          ) : (
            <BuyButton
              onClick={handleCheckout}
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? t('processing') : t('buyNow')}
            </BuyButton>
          )}
        </DetailsSection>

        {product.modules && product.modules.length > 0 && (
          <ModulesSection>
            <h2>{t('courseModules')}</h2>
            {product.modules.map((module, index) => (
              <ModuleCard key={module.id}>
                <h3>
                  {t('module')} {index + 1}: {module.title}
                </h3>
                <p>{module.description}</p>
                {module.duration && (
                  <p>
                    {t('duration')}: {module.duration}
                  </p>
                )}
              </ModuleCard>
            ))}
          </ModulesSection>
        )}
      </ProductLayout>
    </Container>
  );
}

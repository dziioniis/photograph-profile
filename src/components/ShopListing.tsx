'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/models';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 700px;
  margin: 0 auto;
`;

const GroupSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const GroupTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  letter-spacing: 0.04em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ScrollRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CardSlot = styled.div`
  flex: 0 0 300px;
  scroll-snap-align: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-basis: 260px;
  }
`;

const GROUPS: { key: string; types: Product['type'][] }[] = [
  { key: 'presets', types: ['preset'] },
  { key: 'courses', types: ['online_course', 'physical'] },
  { key: 'luts', types: ['video_lut'] },
];

export default function ShopListing({ products }: { products: Product[] }) {
  const t = useTranslations('shop');

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Header>

      {GROUPS.map(({ key, types }) => {
        const items = products.filter((p) => types.includes(p.type));
        if (items.length === 0) return null;
        return (
          <GroupSection key={key}>
            <GroupTitle>{t(`groups.${key}`)}</GroupTitle>
            <ScrollRow>
              {items.map((product) => (
                <CardSlot key={product.id}>
                  <ProductCard product={product} />
                </CardSlot>
              ))}
            </ScrollRow>
          </GroupSection>
        );
      })}
    </Container>
  );
}

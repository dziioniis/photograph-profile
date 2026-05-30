'use client';

import React from 'react';
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

const ProductsGrid = styled.div`
  display: grid;
  /* Карточки фиксированной максимальной ширины, выравнивание влево —
     один товар не растягивается на всю страницу. */
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: start;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export default function ShopListing({ products }: { products: Product[] }) {
  const t = useTranslations('shop');

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Header>

      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
    </Container>
  );
}

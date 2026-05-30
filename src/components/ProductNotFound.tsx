'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
`;

export default function ProductNotFound() {
  const t = useTranslations('shop');
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;

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

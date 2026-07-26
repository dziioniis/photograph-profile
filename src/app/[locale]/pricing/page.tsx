'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 640px;
  margin: 0 auto;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Name = styled.h2`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Duration = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1.1;
`;

const PriceNote = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Included = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-left: 0;
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

const IncludedTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const IncludedList = styled.ul`
  list-style: none;
`;

const IncludedItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  padding: ${({ theme }) => theme.spacing.xs} 0;

  &:before {
    content: '✓';
    color: ${({ theme }) => theme.colors.accent};
    font-weight: bold;
  }
`;

const AdditionalBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const AdditionalTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AdditionalText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`;

type Package = {
  name: string;
  duration: string;
  tagline: string;
  price: string;
  included: string[];
};

export default function PricingPage() {
  const t = useTranslations('pricing');
  const packages = t.raw('packages') as Package[];

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Intro>{t('intro')}</Intro>
      </Header>

      <Cards>
        {packages.map((pkg, index) => (
          <Card
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div>
              <Name>{pkg.name}</Name>
              <Duration>{pkg.duration}</Duration>
              <Tagline>{pkg.tagline}</Tagline>
              <Price>{pkg.price}</Price>
              <PriceNote>{t('perHour')}</PriceNote>
            </div>

            <Included>
              <IncludedTitle>{t('includedTitle')}</IncludedTitle>
              <IncludedList>
                {pkg.included.map((item, i) => (
                  <IncludedItem key={i}>{item}</IncludedItem>
                ))}
              </IncludedList>
            </Included>
          </Card>
        ))}
      </Cards>

      <AdditionalBox>
        <AdditionalTitle>{t('additionallyTitle')}</AdditionalTitle>
        <AdditionalText>{t('additionally')}</AdditionalText>
      </AdditionalBox>
    </Container>
  );
}

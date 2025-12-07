'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data/portfolio';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing['3xl']};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
`;

const CategoryImage = styled.div<{ $imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${CategoryCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.xl};
  color: white;
`;

const CategoryTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.9);
`;

export default function PortfolioPage() {
  return (
    <Container>
      <Title>Portfolio</Title>
      <Subtitle>
        Browse through my collection of work across different photography styles
      </Subtitle>

      <Grid>
        {categories.map((category, index) => (
          <Link key={category.id} href={`/portfolio/${category.slug}`}>
            <CategoryCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryImage $imageUrl={category.coverPhoto?.src || ''} />
              <CategoryOverlay>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryOverlay>
            </CategoryCard>
          </Link>
        ))}
      </Grid>
    </Container>
  );
}

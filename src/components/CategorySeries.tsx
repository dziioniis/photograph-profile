'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Category, Series } from '@/types/models';

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

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const SeriesGrid = styled.div`
  display: grid;
  /* Карточки фиксированной максимальной ширины, выравнивание влево —
     одна серия не растягивается на всю страницу. */
  grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
  justify-content: start;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SeriesCard = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const SeriesImageContainer = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const SeriesImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${SeriesCard}:hover & {
    transform: scale(1.05);
  }
`;

const SeriesInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const SeriesTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SeriesDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export default function CategorySeries({
  category,
  seriesList,
}: {
  category: Category;
  seriesList: Series[];
}) {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <Container>
      <Header>
        <Title>{category.title}</Title>
        {category.description && <Description>{category.description}</Description>}
      </Header>

      <SeriesGrid>
        {seriesList.map((series, index) => (
          <Link
            key={series.id}
            href={`${prefix}/portfolio/${category.slug}/${series.id}`}
          >
            <SeriesCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {series.coverPhoto && (
                <SeriesImageContainer>
                  <SeriesImage
                    src={series.coverPhoto.src}
                    alt={series.coverPhoto.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </SeriesImageContainer>
              )}
              <SeriesInfo>
                <SeriesTitle>{series.title}</SeriesTitle>
                <SeriesDetails>
                  {series.location && <span>{series.location}</span>}
                  {series.location && series.date && <span>•</span>}
                  {series.date && (
                    <span>{new Date(series.date).toLocaleDateString()}</span>
                  )}
                </SeriesDetails>
              </SeriesInfo>
            </SeriesCard>
          </Link>
        ))}
      </SeriesGrid>
    </Container>
  );
}

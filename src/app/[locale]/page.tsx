'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';
import GalleryGrid from '@/components/GalleryGrid';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/portfolio';
import { products } from '@/data/products';
import { testimonials } from '@/data/testimonials';

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 4 / 5;
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
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.xl};
  color: white;
`;

const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: rgba(255, 255, 255, 0.9);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TestimonialCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AuthorName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const AuthorRole = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
`;

const CTASection = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.textLight};
    opacity: 1;
  }
`;

export default function HomePage() {
  const t = useTranslations('home');
  const tp = useTranslations('portfolio');
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <Hero />

      <Section>
        <SectionTitle>{t('portfolio.title')}</SectionTitle>
        <SectionSubtitle>{t('portfolio.subtitle')}</SectionSubtitle>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <Link key={category.id} href={`${prefix}/portfolio/${category.slug}`}>
              <CategoryCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryImage $imageUrl={category.coverPhoto?.src || ''} />
                <CategoryOverlay>
                  <CategoryTitle>
                    {tp(`categories.${category.slug}.title`)}
                  </CategoryTitle>
                  <CategoryDescription>
                    {tp(`categories.${category.slug}.description`)}
                  </CategoryDescription>
                </CategoryOverlay>
              </CategoryCard>
            </Link>
          ))}
        </CategoriesGrid>
      </Section>

      <Section>
        <SectionTitle>{t('shop.title')}</SectionTitle>
        <SectionSubtitle>{t('shop.subtitle')}</SectionSubtitle>
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </Section>

      <Section>
        <SectionTitle>{t('testimonials.title')}</SectionTitle>
        <SectionSubtitle>{t('testimonials.subtitle')}</SectionSubtitle>
        <TestimonialsContainer>
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialText>&ldquo;{testimonial.text}&rdquo;</TestimonialText>
              <TestimonialAuthor>
                <div>
                  <AuthorName>{testimonial.author}</AuthorName>
                  {testimonial.role && <AuthorRole>{testimonial.role}</AuthorRole>}
                </div>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsContainer>
      </Section>

      <Section>
        <CTASection>
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.subtitle')}</p>
          <CTAButton href={`${prefix}/contact`}>{t('cta.button')}</CTAButton>
        </CTASection>
      </Section>
    </>
  );
}

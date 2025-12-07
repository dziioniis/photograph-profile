'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';

const Container = styled.div`
  max-width: 1200px;
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
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TestimonialCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const TestimonialContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Quote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.8;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:before {
    content: '"';
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    color: ${({ theme }) => theme.colors.accentBeige};
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  &:after {
    content: '"';
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    color: ${({ theme }) => theme.colors.accentBeige};
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const Rating = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorDetails = styled.div``;

const AuthorName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AuthorRole = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const VideoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function TestimonialsPage() {
  const t = useTranslations('testimonials');

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Header>

      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {testimonial.videoUrl && (
              <VideoContainer>
                <video controls>
                  <source src={testimonial.videoUrl} type="video/mp4" />
                  {t('videoNotSupported')}
                </video>
              </VideoContainer>
            )}

            <TestimonialContent>
              {testimonial.rating && (
                <Rating>{'★'.repeat(testimonial.rating)}</Rating>
              )}
              <Quote>{testimonial.text}</Quote>
            </TestimonialContent>

            <AuthorInfo>
              <AuthorDetails>
                <AuthorName>{testimonial.author}</AuthorName>
                {testimonial.role && <AuthorRole>{testimonial.role}</AuthorRole>}
                {testimonial.date && (
                  <AuthorRole>
                    {new Date(testimonial.date).toLocaleDateString()}
                  </AuthorRole>
                )}
              </AuthorDetails>
            </AuthorInfo>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </Container>
  );
}

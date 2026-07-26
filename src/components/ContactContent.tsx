'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import type { ContactSettings } from '@/types/models';

const Container = styled.div`
  max-width: 860px;
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InstagramButton = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background-color: ${({ theme }) => theme.colors.textLight};
    opacity: 1;
  }
`;

export default function ContactContent({
  settings,
}: {
  settings: ContactSettings;
}) {
  const t = useTranslations('contact');

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
        {settings.instagram && (
          <div>
            <InstagramButton
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('instagramButton')}
            </InstagramButton>
          </div>
        )}
      </Header>

      <ContentGrid>
        <Card>
          <InfoTitle>{t('info.title')}</InfoTitle>
          {settings.email && (
            <InfoText>
              <strong>{t('info.email')}:</strong> {settings.email}
            </InfoText>
          )}
          {settings.location && (
            <InfoText>
              <strong>{t('info.location')}:</strong> {settings.location}
            </InfoText>
          )}
        </Card>

        <Card>
          <InfoTitle>{t('services.title')}</InfoTitle>
          <InfoText>• {t('services.wedding')}</InfoText>
          <InfoText>• {t('services.portrait')}</InfoText>
          <InfoText>• {t('services.family')}</InfoText>
          <InfoText>• {t('services.commercial')}</InfoText>
        </Card>
      </ContentGrid>
    </Container>
  );
}

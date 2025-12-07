'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.background};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);

  &:hover {
    color: ${({ theme }) => theme.colors.background};
  }
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    opacity: 1;
  }
`;

const Copyright = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.6);
`;

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>{t('about.title')}</FooterTitle>
          <FooterText>{t('about.description')}</FooterText>
          <SocialLinks>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              IG
            </SocialLink>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              FB
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              YT
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t('quickLinks.title')}</FooterTitle>
          <FooterLinks>
            <FooterLink href={`${prefix}/portfolio`}>
              {t('quickLinks.portfolio')}
            </FooterLink>
            <FooterLink href={`${prefix}/videos`}>
              {t('quickLinks.videos')}
            </FooterLink>
            <FooterLink href={`${prefix}/shop`}>{t('quickLinks.shop')}</FooterLink>
            <FooterLink href={`${prefix}/about`}>{t('quickLinks.about')}</FooterLink>
            <FooterLink href={`${prefix}/testimonials`}>
              {t('quickLinks.testimonials')}
            </FooterLink>
            <FooterLink href={`${prefix}/contact`}>
              {t('quickLinks.contact')}
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t('services.title')}</FooterTitle>
          <FooterLinks>
            <FooterLink href={`${prefix}/portfolio/wedding`}>
              {t('services.wedding')}
            </FooterLink>
            <FooterLink href={`${prefix}/portfolio/portrait`}>
              {t('services.portrait')}
            </FooterLink>
            <FooterLink href={`${prefix}/portfolio/family`}>
              {t('services.family')}
            </FooterLink>
            <FooterLink href={`${prefix}/videos`}>
              {t('services.videography')}
            </FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t('contact.title')}</FooterTitle>
          <FooterText>
            {t('contact.email')}: contact@photographer.com
            <br />
            {t('contact.phone')}: +1 (555) 123-4567
            <br />
            {t('contact.location')}: New York, NY
          </FooterText>
        </FooterSection>
      </FooterContent>

      <Copyright>
        {t('copyright', { year: currentYear })}
      </Copyright>
    </FooterContainer>
  );
}

'use client';

import React from 'react';
import styled from 'styled-components';
import ContactForm from '@/components/ContactForm';

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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div``;

const InfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    opacity: 1;
  }
`;

export default function ContactPage() {
  return (
    <Container>
      <Header>
        <Title>Get in Touch</Title>
        <Subtitle>
          Let's discuss your project and create something beautiful together
        </Subtitle>
      </Header>

      <ContentGrid>
        <ContactInfo>
          <InfoSection>
            <InfoTitle>Contact Information</InfoTitle>
            <InfoText>
              <strong>Email:</strong> contact@photographer.com
            </InfoText>
            <InfoText>
              <strong>Phone:</strong> +1 (555) 123-4567
            </InfoText>
            <InfoText>
              <strong>Location:</strong> New York, NY
            </InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>Availability</InfoTitle>
            <InfoText>
              I'm currently booking sessions 2-3 months in advance. For urgent requests, please
              mention it in your message.
            </InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>Services</InfoTitle>
            <InfoText>• Wedding Photography & Videography</InfoText>
            <InfoText>• Portrait Sessions</InfoText>
            <InfoText>• Family Photography</InfoText>
            <InfoText>• Commercial Projects</InfoText>
          </InfoSection>

          <InfoSection>
            <InfoTitle>Follow Me</InfoTitle>
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
          </InfoSection>
        </ContactInfo>

        <div>
          <ContactForm />
        </div>
      </ContentGrid>
    </Container>
  );
}

'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled(motion.div)`
  aspect-ratio: 3 / 4;
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

const TextSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const EquipmentList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const EquipmentItem = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export default function AboutPage() {
  return (
    <Container>
      <Header>
        <Title>About Me</Title>
      </Header>

      <ContentGrid>
        <ImageSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Placeholder for photographer's image */}
        </ImageSection>

        <TextSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paragraph>
            Hi, I'm a professional photographer and videographer based in New York City with over 10
            years of experience capturing life's most precious moments.
          </Paragraph>
          <Paragraph>
            My journey into photography began with a passion for storytelling. I believe every
            photograph should tell a story, evoke emotion, and preserve memories that last a
            lifetime.
          </Paragraph>
          <Paragraph>
            I specialize in wedding, portrait, and family photography, bringing a minimalist yet
            emotional approach to every session. My goal is to create timeless images that you'll
            treasure for generations.
          </Paragraph>
        </TextSection>
      </ContentGrid>

      <SectionTitle>My Approach</SectionTitle>
      <Paragraph>
        I combine technical expertise with an artistic eye to create photographs that are both
        beautiful and authentic. I work closely with each client to understand their vision and
        ensure every session is relaxed, fun, and memorable.
      </Paragraph>
      <Paragraph>
        Whether it's a wedding, family session, or portrait shoot, I focus on capturing genuine
        moments and natural expressions. My editing style is clean and timeless, emphasizing natural
        light and authentic colors.
      </Paragraph>

      <SectionTitle>Equipment</SectionTitle>
      <EquipmentList>
        <EquipmentItem>Canon EOS R5</EquipmentItem>
        <EquipmentItem>Canon RF 24-70mm f/2.8L</EquipmentItem>
        <EquipmentItem>Canon RF 70-200mm f/2.8L</EquipmentItem>
        <EquipmentItem>Canon RF 50mm f/1.2L</EquipmentItem>
        <EquipmentItem>DJI Ronin Gimbal</EquipmentItem>
        <EquipmentItem>Profoto B10 Plus</EquipmentItem>
      </EquipmentList>
    </Container>
  );
}

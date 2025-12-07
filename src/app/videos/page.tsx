'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 600px;
  margin: 0 auto;
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.overlay};

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const VideoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const VideoDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const sampleVideos = [
  {
    id: 1,
    title: 'Sarah & John Wedding Highlights',
    description: 'A beautiful summer wedding at Central Park',
    videoUrl: '/videos/wedding-1.mp4',
  },
  {
    id: 2,
    title: 'Emily & Michael Love Story',
    description: 'Romantic coastal wedding in the Hamptons',
    videoUrl: '/videos/wedding-2.mp4',
  },
  {
    id: 3,
    title: 'Family Portrait Session',
    description: 'Joyful family moments at Prospect Park',
    videoUrl: '/videos/family-1.mp4',
  },
  {
    id: 4,
    title: 'Creative Portrait Reel',
    description: 'Behind the scenes of studio portrait sessions',
    videoUrl: '/videos/portrait-reel.mp4',
  },
];

export default function VideosPage() {
  return (
    <Container>
      <Header>
        <Title>Videography</Title>
        <Subtitle>
          Cinematic stories that capture the essence of your special moments
        </Subtitle>
      </Header>

      <VideosGrid>
        {sampleVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <VideoContainer>
              <video controls>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </VideoContainer>
            <VideoInfo>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoDescription>{video.description}</VideoDescription>
            </VideoInfo>
          </VideoCard>
        ))}
      </VideosGrid>
    </Container>
  );
}

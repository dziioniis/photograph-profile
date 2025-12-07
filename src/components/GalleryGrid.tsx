'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '@/types/models';
import Image from 'next/image';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const GridItem = styled(motion.div)`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const StyledImage = styled(Image)<{ $protected?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${({ theme }) => theme.transitions.slow};

  ${({ $protected }) =>
    $protected &&
    `
    user-select: none;
    -webkit-user-select: none;
    pointer-events: none;
  `}

  ${GridItem}:hover & {
    transform: scale(1.05);
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LightboxImage = styled(Image)`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const NavButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${({ $direction }) => ($direction === 'prev' ? 'left' : 'right')}: ${({ theme }) =>
    theme.spacing.lg};
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    ${({ $direction }) => ($direction === 'prev' ? 'left' : 'right')}: ${({ theme }) =>
      theme.spacing.sm};
  }
`;

interface GalleryGridProps {
  photos: Photo[];
  columns?: number;
}

export default function GalleryGrid({ photos, columns = 3 }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : photos.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < photos.length - 1 ? selectedIndex + 1 : 0);
    }
  };

  return (
    <>
      <Grid>
        {photos.map((photo, index) => (
          <GridItem
            key={photo.id}
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <StyledImage
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              $protected={photo.protect}
              className={photo.protect ? 'no-context-menu' : ''}
            />
          </GridItem>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <CloseButton onClick={closeLightbox}>&times;</CloseButton>
            <NavButton $direction="prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
              ‹
            </NavButton>
            <NavButton $direction="next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
              ›
            </NavButton>
            <LightboxImage
              src={photos[selectedIndex].src}
              alt={photos[selectedIndex].alt}
              width={photos[selectedIndex].width || 1200}
              height={photos[selectedIndex].height || 1600}
              onClick={(e) => e.stopPropagation()}
            />
          </Lightbox>
        )}
      </AnimatePresence>
    </>
  );
}

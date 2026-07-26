'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { VideoPageData, VideoItem } from '@/lib/videoPage';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(80px + ${({ theme }) => theme.spacing['2xl']});
`;

const IntroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const SecondSection = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const TextBlock = styled.div`
  max-width: 560px;
  justify-self: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
    justify-self: stretch;
    /* На мобильном текст идёт после фото. */
    order: 2;
  }
`;

const IntroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  letter-spacing: 0.04em;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  white-space: pre-line;
`;

const Photo = styled(motion.img)`
  width: 100%;
  max-width: 560px;
  aspect-ratio: 4 / 5;
  max-height: 70vh;
  display: block;
  justify-self: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  object-fit: cover;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  letter-spacing: 0.06em;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const PlayerWrapper = styled(motion.div)`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.overlay};

  video,
  iframe {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    object-fit: cover;
  }
`;

const PosterButton = styled.button<{ $posterUrl?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: ${({ $posterUrl }) =>
    $posterUrl ? `url(${$posterUrl}) center / cover no-repeat` : 'none'};
`;

const PlayCircle = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${PosterButton}:hover & {
    transform: scale(1.08);
  }

  &::after {
    content: '';
    margin-left: 4px;
    border-style: solid;
    border-width: 9px 0 9px 15px;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.colors.accent};
  }
`;

// Преобразует ссылку YouTube/Vimeo в embed-URL; для прямых ссылок возвращает null.
function toEmbedUrl(url: string): string | null {
  const yt = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

function VideoPlayer({ item }: { item: VideoItem }) {
  const t = useTranslations('videos');
  const [playing, setPlaying] = useState(false);

  if (!item.videoUrl) {
    return (
      <PlayerWrapper>
        <PosterButton as="div" $posterUrl={item.posterUrl} />
      </PlayerWrapper>
    );
  }

  const embedUrl = toEmbedUrl(item.videoUrl);

  return (
    <PlayerWrapper
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      {playing ? (
        embedUrl ? (
          <iframe
            src={embedUrl}
            title={item.title || 'Video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video controls autoPlay playsInline poster={item.posterUrl}>
            <source src={item.videoUrl} />
            {t('videoNotSupported')}
          </video>
        )
      ) : (
        <PosterButton
          $posterUrl={item.posterUrl}
          onClick={() => setPlaying(true)}
          aria-label={item.title || 'Play video'}
        >
          <PlayCircle />
        </PosterButton>
      )}
    </PlayerWrapper>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

export default function VideoPageContent({ data }: { data: VideoPageData }) {
  const t = useTranslations('videos');

  const films = data.films.filter((f) => f.posterUrl || f.videoUrl);
  const teasers = data.teasers.filter((f) => f.posterUrl || f.videoUrl);

  return (
    <Container>
      {(data.introTitle || data.introText || data.introImageUrl) && (
        <IntroSection>
          <TextBlock>
            {data.introTitle && (
              <motion.div {...fadeIn}>
                <IntroTitle>{data.introTitle}</IntroTitle>
              </motion.div>
            )}
            {data.introText && (
              <motion.div {...fadeIn}>
                <Paragraph>{data.introText}</Paragraph>
              </motion.div>
            )}
          </TextBlock>
          {data.introImageUrl && (
            <Photo
              src={data.introImageUrl}
              alt={data.introTitle || t('title')}
              {...fadeIn}
            />
          )}
        </IntroSection>
      )}

      {(data.secondText || data.secondImageUrl) && (
        <SecondSection>
          {data.secondImageUrl && (
            <Photo src={data.secondImageUrl} alt={t('title')} {...fadeIn} />
          )}
          {data.secondText && (
            <TextBlock>
              <motion.div {...fadeIn}>
                <Paragraph>{data.secondText}</Paragraph>
              </motion.div>
            </TextBlock>
          )}
        </SecondSection>
      )}

      {films.length > 0 && (
        <section>
          <SectionTitle>{data.filmsTitle || t('films')}</SectionTitle>
          <VideosGrid>
            {films.map((item) => (
              <VideoPlayer key={item.id} item={item} />
            ))}
          </VideosGrid>
        </section>
      )}

      {teasers.length > 0 && (
        <section>
          <SectionTitle>{data.teasersTitle || t('teasers')}</SectionTitle>
          <VideosGrid>
            {teasers.map((item) => (
              <VideoPlayer key={item.id} item={item} />
            ))}
          </VideosGrid>
        </section>
      )}
    </Container>
  );
}

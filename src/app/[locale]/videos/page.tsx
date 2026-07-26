import { notFound } from 'next/navigation';
import { getVideoPage } from '@/lib/videoPage';
import VideoPageContent from '@/components/VideoPageContent';

export const revalidate = 60;

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const data = await getVideoPage(locale);

  if (!data) notFound();

  return <VideoPageContent data={data} />;
}

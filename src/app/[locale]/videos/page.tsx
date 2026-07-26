import { notFound } from 'next/navigation';
import { getVideoPage } from '@/lib/videoPage';
import VideoPageContent from '@/components/VideoPageContent';

// Контент страницы редактируется в Sanity Studio (/studio → Video page).
export const revalidate = 60;

export default async function VideosPage() {
  const data = await getVideoPage();

  // Пока документ не создан в Studio — страница недоступна.
  if (!data) notFound();

  return <VideoPageContent data={data} />;
}

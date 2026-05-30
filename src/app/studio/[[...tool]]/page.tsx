import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// Studio рендерится на всю страницу. Метаданные/вьюпорт берём из next-sanity.
export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

import React from 'react';
import ContactContent from '@/components/ContactContent';
import { getContactSettings } from '@/lib/settings';

// Кеш с обновлением раз в 30с — изменения контактов появляются без пересборки.
export const revalidate = 30;

// Серверный компонент: тянет контактные данные из Sanity и отдаёт клиентской вёрстке.
export default async function ContactPage() {
  const settings = await getContactSettings();
  return <ContactContent settings={settings} />;
}

import { defineType } from 'sanity';

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  options: { collapsible: false },
  fields: [
    { name: 'en', title: 'English', type: 'text', rows: 3 },
    { name: 'uk', title: 'Українська', type: 'text', rows: 3 },
    { name: 'pl', title: 'Polski', type: 'text', rows: 3 },
  ],
});

export const allLanguagesRequired = (
  value: { en?: string; uk?: string; pl?: string } | undefined
): true | string => {
  const missing = (['en', 'uk', 'pl'] as const).filter((l) => !value?.[l]?.trim());
  if (missing.length === 0) return true;
  return `Fill in all languages: missing ${missing.join(', ').toUpperCase()}`;
};

import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const { useRouter, usePathname, Link } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

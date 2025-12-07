import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // English at /, Ukrainian at /uk
});

export const config = {
  // Match all pathnames except for API routes, static files, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

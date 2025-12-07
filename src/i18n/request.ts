import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale might be undefined, so we provide a default
  let locale = await requestLocale;

  if (!locale) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

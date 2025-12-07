import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import StyledComponentsRegistry from '@/lib/registry';
import Providers from '@/components/Providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'metadata'
  });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(', '),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/',
        'uk': '/uk',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      alternateLocale: locale === 'en' ? 'uk' : 'en',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <Header />
              <main>{children}</main>
              <Footer />
            </Providers>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

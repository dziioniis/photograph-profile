'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeNames } from '@/i18n/config';

const HeaderContainer = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ $scrolled, theme }) =>
    $scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
  transition: all ${({ theme }) => theme.transitions.base};
  border-bottom: ${({ $scrolled, theme }) =>
    $scrolled ? `1px solid ${theme.colors.border}` : 'none'};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  letter-spacing: 0.05em;
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 75%;
    max-width: 320px;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform ${({ theme }) => theme.transitions.base};
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  border-bottom: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.accent}` : 'none'};
  padding-bottom: 4px;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 6px;
  padding: ${({ theme }) => theme.spacing.xs};
  z-index: 1001;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const MenuLine = styled.span<{ $isOpen: boolean; $index: number }>`
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.accent};
  transition: all ${({ theme }) => theme.transitions.base};
  transform-origin: center;

  ${({ $isOpen, $index }) => {
    if (!$isOpen) return '';
    if ($index === 0) return 'transform: rotate(45deg) translateY(8px);';
    if ($index === 1) return 'opacity: 0;';
    if ($index === 2) return 'transform: rotate(-45deg) translateY(-8px);';
  }}
`;

const Overlay = styled(motion.div)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-left: 0;
    padding-top: ${({ theme }) => theme.spacing.lg};
    margin-top: ${({ theme }) => theme.spacing.lg};
    justify-content: center;
    width: 100%;
  }
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  padding: ${({ theme }) => theme.spacing.xs};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-width: 60px;
  }
`;

export default function Header() {
  const t = useTranslations('header');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params.locale as string) || 'en';

  const navItems = [
    { label: t('nav.portfolio'), href: '/portfolio' },
    { label: t('nav.video'), href: '/videos' },
    { label: t('nav.shop'), href: '/shop' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.testimonials'), href: '/testimonials' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <HeaderContainer
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Nav>
          <Logo
            href={currentLocale === 'en' ? '/' : `/${currentLocale}`}
            onClick={closeMobileMenu}
          >
            {t('logo')}
          </Logo>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('toggleMenu')}
          >
            <MenuLine $isOpen={mobileMenuOpen} $index={0} />
            <MenuLine $isOpen={mobileMenuOpen} $index={1} />
            <MenuLine $isOpen={mobileMenuOpen} $index={2} />
          </MobileMenuButton>

          <NavLinks $isOpen={mobileMenuOpen}>
            {navItems.map((item) => {
              const fullHref =
                currentLocale === 'en' ? item.href : `/${currentLocale}${item.href}`;

              return (
                <NavLink
                  key={item.href}
                  href={fullHref}
                  $active={pathname === fullHref}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </NavLink>
              );
            })}

            <LanguageSwitcher>
              {locales.map((locale) => (
                <LanguageButton
                  key={locale}
                  $active={currentLocale === locale}
                  onClick={() => {
                    closeMobileMenu();
                    router.replace(pathname, { locale });
                  }}
                >
                  {locale.toUpperCase()}
                </LanguageButton>
              ))}
            </LanguageSwitcher>
          </NavLinks>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
}

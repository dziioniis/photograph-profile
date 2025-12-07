'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
    width: 70%;
    max-width: 300px;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xl};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform ${({ theme }) => theme.transitions.base};
    box-shadow: ${({ theme }) => theme.shadows.lg};
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

  &:hover {
    opacity: 1;
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

const navItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Video', href: '/videos' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          <Logo href="/" onClick={closeMobileMenu}>
            PHOTOGRAPHER
          </Logo>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuLine $isOpen={mobileMenuOpen} $index={0} />
            <MenuLine $isOpen={mobileMenuOpen} $index={1} />
            <MenuLine $isOpen={mobileMenuOpen} $index={2} />
          </MobileMenuButton>

          <NavLinks $isOpen={mobileMenuOpen}>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                $active={pathname === item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </NavLink>
            ))}
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

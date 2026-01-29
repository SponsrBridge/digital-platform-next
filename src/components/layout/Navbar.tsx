'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Industries', href: '#industries' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHash = (hash: string) => {
    if (lenis) {
      lenis.scrollTo(hash, { offset: -80 });
    } else {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => scrollToHash(href), 100);
      } else {
        scrollToHash(href);
      }
    } else {
      router.push(href);
    }
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return pathname === href;
  };

  const navBackground = 'rgba(var(--navy-rgb), 0.85)';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent ${scrolled ? 'py-4 shadow-lg border-brand-border/10' : 'py-6'
        }`}
      style={{ backgroundColor: navBackground }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Logo variant="full" size="md" isLightMode={!isDark} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-xs font-medium uppercase transition-colors relative group ${isActive(item.href)
                ? 'text-brand-teal'
                : 'text-brand-text hover:text-brand-teal'
                }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-teal transition-all ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </a>
          ))}

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-brand-card text-brand-text hover:text-brand-teal transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(var(--accent-rgb),0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-brand-teal text-brand-navy font-semibold tracking-tighter  rounded-lg transition-colors whitespace-nowrap"
          >
            Book Call
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-brand-white"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button
            className="text-brand-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-brand-navy border-t border-brand-border flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-lg font-medium ${isActive(item.href) ? 'text-brand-teal' : 'text-brand-text hover:text-brand-teal'
                    }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="w-full text-center px-6 py-3 bg-brand-teal text-brand-navy font-bold rounded-lg mt-4"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

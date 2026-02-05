'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Linkedin, Twitter, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

const Footer: React.FC = () => {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerStatus, setFooterStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');

  const scrollToHash = (hash: string) => {
    if (lenis) {
      lenis.scrollTo(`#${hash}`, { offset: -80 });
    } else {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.includes('#')) {
      const parts = href.split('#');
      const page = parts[0];
      const hash = parts[1];

      if (page) {
        router.push(`/${page}`);
        setTimeout(() => scrollToHash(hash), 300);
      } else {
        if (pathname !== '/') {
          router.push('/');
          setTimeout(() => scrollToHash(hash), 100);
        } else {
          scrollToHash(hash);
        }
      }
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <footer className="bg-brand-section pt-20 pb-8 border-t border-brand-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Branding */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Logo variant="full" size="md" />
            </Link>
            <p className="text-brand-muted text-sm mb-6">
              The sponsorship engine behind high-performing B2B conferences.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/sponsrbridge/" target='_blank' className="text-brand-muted hover:text-brand-teal transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-brand-muted hover:text-brand-teal transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-brand-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="/about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-brand-teal transition-colors">About Us</a></li>
              <li><a href="/about#our-difference" onClick={(e) => handleLinkClick(e, 'about#our-difference')} className="hover:text-brand-teal transition-colors">The SponsrBridge Way</a></li>
              <li><a href="/contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-brand-teal transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Full-Service Management</a></li>
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Sales Execution Partnership</a></li>
              <li><a href="/services" onClick={(e) => handleLinkClick(e, 'services')} className="hover:text-brand-teal transition-colors text-nowrap">Strategic Commercial Advisory</a></li>
              <li><a href="/#industries" onClick={(e) => handleLinkClick(e, '#industries')} className="hover:text-brand-teal transition-colors">Industries</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-white font-bold mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li><Link href="/insights" className="hover:text-brand-teal transition-colors">Blog & Insights</Link></li>
              <li><Link href="/faq" className="hover:text-brand-teal transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-teal transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-brand-white font-bold mb-6">Stay Updated</h4>
            {footerStatus === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle2 size={32} className="text-brand-teal mx-auto mb-2" />
                <p className="text-sm font-bold text-brand-white mb-1">You&apos;re Subscribed!</p>
                <p className="text-xs text-brand-muted">Look out for our next insight in your inbox.</p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={async (e) => {
                e.preventDefault();
                if (!footerEmail || footerStatus === 'loading') return;
                setFooterStatus('loading');
                try {
                  const res = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: footerEmail }),
                  });
                  if (res.status === 409) { setFooterStatus('duplicate'); return; }
                  if (!res.ok) throw new Error();
                  setFooterStatus('success');
                  setFooterEmail('');
                } catch {
                  setFooterStatus('error');
                }
              }}>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  disabled={footerStatus === 'loading'}
                  className="w-full bg-brand-navy lowercase border border-brand-border rounded px-4 py-2 text-sm text-brand-white focus:border-brand-teal focus:outline-none placeholder-brand-muted disabled:opacity-50"
                />
                <button
                  disabled={footerStatus === 'loading'}
                  className="w-full bg-brand-teal text-brand-navy font-bold text-sm py-2 rounded-lg hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
                >
                  {footerStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
                {footerStatus === 'error' && <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>}
                {footerStatus === 'duplicate' && <p className="text-yellow-400 text-xs">This email is already subscribed.</p>}
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-muted">
          <div className="flex items-center gap-2">
            <p>&copy; {new Date().getFullYear()} SponsrBridge LLC. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-teal">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-teal">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

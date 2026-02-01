'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useTheme } from '@/components/providers/ThemeProvider';

const ContactSection: React.FC = () => {
  const USER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { isDark } = useTheme();

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '45min' });
      cal('ui', {
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#0d9488',
            'cal-bg': '#ffffff',
            'cal-bg-emphasis': '#f8fafc',
            'cal-border': '#e5e7eb',
            'cal-border-emphasis': '#d1d5db',
            'cal-text': '#374151',
            'cal-text-emphasis': '#111827',
            'cal-text-muted': '#4b5563',
          },
          dark: {
            'cal-brand': '#79f3de',
            'cal-bg': '#11151c',
            'cal-bg-emphasis': '#161b22',
            'cal-border': '#1f2937',
            'cal-border-emphasis': '#374151',
            'cal-text': '#e6edf3',
            'cal-text-emphasis': '#ffffff',
            'cal-text-muted': '#9ca3af',
            'cal-bg-subtle': '#0d1117',
            'cal-bg-muted': '#161b22',
          },
        },
        hideEventTypeDetails: false,
        layout: 'column_view',
        theme: isDark ? 'dark' : 'light',
      });
    })();
  }, [isDark]);

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-brand-navy to-brand-section transition-colors duration-300 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-6">Start a Commercial Conversation About Your Conference Revenue</h2>
          <p className="text-lg md:text-xl text-brand-text leading-relaxed">Every engagement begins with a structured 45-minute consultation. We'll assess your current model, identify revenue leakage, and map out a growth architecture.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col items-center gap-8 mb-12">
          <div className="bg-brand-card p-8 rounded-xl border border-brand-border w-full max-w-xl">
            <h3 className="text-xl font-bold text-brand-white mb-4">Engagement Protocol:</h3>
            <ul className="space-y-4">
              {["45-minute strategy call with a senior partner", "Revenue leakage diagnostic for your event", "Alignment on commercial models", "Instant calendar invite confirmation"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-brand-muted"><CheckCircle2 className="text-brand-teal w-5 h-5 mt-0.5" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-brand-muted bg-brand-navy/40 p-4 rounded-lg border border-brand-border/50 w-full max-w-xl">
            <Globe className="text-brand-teal animate-pulse" size={20} />
            <p>Working Hours: <span className="text-brand-white font-bold">UK 08:00 - 20:00</span>. Slots shown in your local time: <span className="text-brand-teal font-medium">{USER_TZ}</span>.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full max-w-7xl mx-auto">
          <div className='border border-brand-teal rounded-2xl p-2'>
            <Cal
              namespace="45min"
              calLink="sponsrbridge/45min"
              style={{ width: '100%', }}
              config={{ layout: 'column_view', theme: isDark ? 'dark' : 'light' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

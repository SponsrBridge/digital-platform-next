'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold text-brand-teal mb-4">404</h1>
          <h2 className="text-3xl font-bold text-brand-white mb-6">Page Not Found</h2>
          <p className="text-brand-muted text-lg mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-brand-teal text-brand-navy font-bold rounded-lg hover:bg-brand-accent-hover transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

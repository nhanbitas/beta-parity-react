'use client';

import { ArrowUpFromDot } from 'lucide-react';
import React from 'react';

const ScrollToTopButton: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <button
      className='fixed bottom-24 right-4 z-10 cursor-pointer rounded-full bg-gray-100 p-2 text-gray-900 hover:bg-gray-200'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label='Scroll to top'
    >
      <ArrowUpFromDot />
    </button>
  );
};

export default ScrollToTopButton;

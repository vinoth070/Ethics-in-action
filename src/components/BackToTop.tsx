import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useEthics } from '../context/EthicsContext';

export const BackToTop: React.FC = () => {
  const { reducedMotion } = useEthics();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-[#0B162C] text-white dark:bg-[#EAB308] dark:text-[#070D1A] shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

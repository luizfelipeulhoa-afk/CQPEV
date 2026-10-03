import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionPref } from '../state/useMotionPref';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook que inicializa Lenis (smooth scroll) e sincroniza com GSAP ScrollTrigger.
 * Respeita a preferência de movimento do usuário.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced) {
      // Destroy Lenis if reduced motion is preferred
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Add Lenis class to html
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({ ignoreMobileResize: true });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, [reduced]);

  return lenisRef;
}

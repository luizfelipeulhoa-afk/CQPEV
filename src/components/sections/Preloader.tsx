import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMotionPref } from '../../state/useMotionPref';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Preloader "a bancada acende" — mostra na primeira visita da sessão.
 * Contador de voltas + SVG line-art de pendente + fio de alumínio.
 */
const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const { reduced } = useMotionPref();

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem('cqpev-preloader-shown')) {
      setVisible(false);
      onComplete();
      return;
    }

    // Skip if reduced motion
    if (reduced) {
      sessionStorage.setItem('cqpev-preloader-shown', '1');
      setVisible(false);
      onComplete();
      return;
    }

    sessionStorage.setItem('cqpev-preloader-shown', '1');
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setVisible(false);
          onComplete();
        },
      });

      // Counter animation
      const counter = { value: 0 };
      tl.to(counter, {
        value: 2486,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value).toString().padStart(5, '0');
          }
        },
      }, 0);

      // SVG draw animation
      const paths = containerRef.current?.querySelectorAll('.draw-path');
      if (paths) {
        paths.forEach((path) => {
          const el = path as SVGPathElement | SVGLineElement;
          const length = el.getTotalLength?.() || 1000;
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
        });

        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          stagger: 0.1,
        }, 0.3);
      }

      // Wire sweep
      const wire = containerRef.current?.querySelector('.wire-sweep');
      if (wire) {
        tl.fromTo(wire,
          { x: '-110%' },
          { x: '110%', duration: 0.6, ease: 'power2.in', repeat: 2, repeatDelay: 0.15 },
          0.5
        );
      }

      // Complete text
      const completeText = containerRef.current?.querySelector('.complete-text');
      if (completeText) {
        tl.fromTo(completeText,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          2.2
        );
      }

      // Exit
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.in',
      }, 2.8);
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, [reduced, onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-night flex flex-col items-center justify-center"
      role="status"
      aria-label="Carregando"
    >
      {/* Counter */}
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-quartz/50 mb-4">
        volta <span ref={counterRef} className="text-brass">00000</span> / 2.486
      </p>

      {/* SVG pendant */}
      <svg
        viewBox="0 0 200 300"
        className="w-32 h-48 md:w-40 md:h-60 mb-6"
        fill="none"
        stroke="#aeb4c2"
        strokeWidth="1.5"
      >
        {/* Crystal */}
        <polygon
          className="draw-path"
          points="100,40 140,70 140,170 100,200 60,170 60,70"
        />
        <line className="draw-path" x1="100" y1="40" x2="100" y2="200" />
        <line className="draw-path" x1="60" y1="70" x2="140" y2="170" />
        <line className="draw-path" x1="140" y1="70" x2="60" y2="170" />

        {/* Spiral wire */}
        <path
          className="draw-path"
          d="M100,200 C80,210 70,230 85,245 C100,260 120,250 115,235 C110,220 90,225 95,240"
        />

        {/* Cord */}
        <line className="draw-path" x1="100" y1="40" x2="100" y2="10" />
      </svg>

      {/* Wire sweep */}
      <div className="relative w-full h-[2px] overflow-hidden">
        <div
          className="wire-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-silver to-transparent"
        />
      </div>

      {/* Complete text */}
      <p className="complete-text font-mono text-[11px] uppercase tracking-[0.24em] text-brass mt-6 opacity-0">
        peça pronta ✂
      </p>
    </div>
  );
};

export default Preloader;

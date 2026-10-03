import React, { useEffect, useRef } from 'react';
import { useMotionPref } from '../../state/useMotionPref';

/**
 * Fio da leitura — indicador de progresso de scroll no lado direito.
 * Linha vertical com label e "conta de cristal" que desliza.
 */
const ReadingThread: React.FC = () => {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced) return;

    let rafId: number;
    const update = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${progress})`;
      }
      if (dotRef.current) {
        dotRef.current.style.top = `${progress * 100}%`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [reduced]);

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      {/* Label */}
      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink/30 writing-vertical">
        fio da leitura
      </span>

      {/* Track */}
      <div className="relative w-[2px] h-32 bg-ink/10">
        {/* Fill */}
        <div
          ref={fillRef}
          className="absolute inset-0 bg-crystal origin-top transition-transform"
          style={{ transform: 'scaleY(0)' }}
        />
        {/* Dot */}
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brass border border-ink/20 transition-top"
          style={{ top: '0%' }}
        />
      </div>
    </div>
  );
};

export default ReadingThread;

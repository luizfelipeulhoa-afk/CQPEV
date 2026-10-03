import React, { useEffect, useRef, useState } from 'react';
import { stats, marqueeItems } from '../../data/content';
import Reveal from '../ui/Reveal';

const StatsMarquee: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-linen-deep overflow-hidden" aria-label="Estatísticas">
      {/* Marquee */}
      <div className="mb-12 -rotate-1">
        <div className="bg-crystal text-quartz border-y-2 border-ink py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="font-mono text-[11px] uppercase tracking-[0.2em] mx-6">
                {item} ✳
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <StatCard stat={stat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: { value: number; label: string; prefix: string; suffix: string };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            animateValue(stat.value, 1600);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  const animateValue = (target: number, duration: number) => {
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutPower2
      const eased = 1 - Math.pow(1 - progress, 2);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl md:text-4xl text-ink mb-2">
        {stat.prefix}{displayValue.toLocaleString('pt-BR')}{stat.suffix}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsMarquee;

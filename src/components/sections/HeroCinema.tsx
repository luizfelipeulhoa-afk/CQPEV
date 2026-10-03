import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroCinema } from '../../data/content';
import PlaceholderGem from '../ui/PlaceholderGem';
import BtnFio from '../ui/BtnFio';
import { useMotionPref } from '../../state/useMotionPref';

gsap.registerPlugin(ScrollTrigger);

const HeroCinema: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const prevChapterRef = useRef(0);
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const totalHeight = isMobile ? 2.4 : 4.2;

      // Proxy for progress
      const proxy = { p: 0 };

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${section.offsetHeight * totalHeight}`,
        pin: container,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          proxy.p = self.progress;
          const newChapter = proxy.p < 0.49 ? 0 : proxy.p < 0.79 ? 1 : 2;
          if (newChapter !== prevChapterRef.current) {
            prevChapterRef.current = newChapter;
            setChapter(newChapter);
          }
        },
      });

      // Parallax exit
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom top',
        end: () => `+=${window.innerHeight * 0.5}`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const visual = container.querySelector('[data-parallax-visual]') as HTMLElement;
          const copy = container.querySelector('[data-parallax-copy]') as HTMLElement;
          if (visual) {
            gsap.set(visual, {
              yPercent: 14 * p,
              rotate: 3 * p,
            });
          }
          if (copy) {
            gsap.set(copy, {
              yPercent: -8 * p,
              opacity: 1 - 0.8 * p,
            });
          }
        },
      });

      return () => {
        st.kill();
        ScrollTrigger.getAll().forEach(t => {
          if (t.trigger === section) t.kill();
        });
      };
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const currentChapter = heroCinema.chapters[chapter];
  const crystalColors = ['#e8e2f2', '#aeb4c2', '#8f7fd4'];

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative bg-linen"
      style={{ height: '100vh' }}
      aria-label="Abertura cinematográfica"
    >
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div className="order-2 md:order-1" data-parallax-copy>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-4">
              capítulo {currentChapter.number} / 03 — {currentChapter.label}
            </p>
            <h1
              className="font-display text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-6"
              dangerouslySetInnerHTML={{ __html: currentChapter.headline }}
            />
            {currentChapter.lines.map((line, i) => (
              <p key={i} className="font-sans text-base md:text-lg text-ink/70 mb-2">
                {line}
              </p>
            ))}
            {currentChapter.cta && (
              <div className="mt-8">
                <BtnFio href="#vitrine">{currentChapter.cta}</BtnFio>
              </div>
            )}
          </div>

          {/* Visual */}
          <div className="order-1 md:order-2 flex justify-center" data-parallax-visual>
            <div className="animate-floaty">
              <PlaceholderGem
                color={crystalColors[chapter]}
                label={currentChapter.label}
                size={280}
                className="md:w-[350px] md:h-[350px]"
              />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8">
          <div className="h-[2px] bg-ink/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-crystal transition-all duration-300"
              style={{ width: `${((chapter + 1) / 3) * 100}%` }}
            />
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/30 mt-2 text-center">
            capítulo 0{chapter + 1} / 03
          </p>
        </div>

        {/* Scroll indicator (chapter 1 only) */}
        {chapter === 0 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
              desça para descobrir ↓
            </span>
            <span className="w-2 h-2 rounded-full bg-brass animate-pulsedot" />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroCinema;

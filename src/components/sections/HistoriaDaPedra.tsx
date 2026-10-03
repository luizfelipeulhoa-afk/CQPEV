import React from 'react';
import { historiaDaPedra } from '../../data/content';
import Reveal from '../ui/Reveal';

const bgColors = ['#f4efe6', '#171a2b', '#5c4fa3'];

const HistoriaDaPedra: React.FC = () => {
  return (
    <section className="py-16 md:py-24" aria-label="A história da pedra">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {historiaDaPedra.chapters.map((chapter, i) => (
          <div
            key={i}
            className="py-16 md:py-24 relative"
            style={{ backgroundColor: bgColors[i] }}
            data-surface={i >= 1 ? 'dark' : undefined}
          >
            <Reveal>
              <p className={`font-mono text-[10px] uppercase tracking-[0.24em] mb-4 ${i >= 1 ? 'text-quartz/50' : 'text-ink/50'}`}>
                capítulo {chapter.number} — {chapter.label}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className={`font-display text-3xl md:text-5xl leading-[1.1] mb-6 ${i >= 1 ? 'text-quartz' : 'text-ink'}`}
                dangerouslySetInnerHTML={{ __html: chapter.headline }}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <p className={`font-sans text-base md:text-lg max-w-lg ${i >= 1 ? 'text-quartz/70' : 'text-ink/70'}`}>
                {chapter.text}
              </p>
            </Reveal>

            {/* Decorative crystal */}
            <div className={`absolute right-4 md:right-12 top-1/2 -translate-y-1/2 opacity-10 ${i >= 1 ? 'text-quartz' : 'text-ink'}`}>
              <svg viewBox="0 0 100 160" className="w-16 h-24 md:w-24 md:h-36" fill="none" stroke="currentColor" strokeWidth="1">
                <polygon points="50,5 90,35 90,125 50,155 10,125 10,35" />
                <line x1="50" y1="5" x2="50" y2="155" />
                <line x1="10" y1="35" x2="90" y2="125" />
                <line x1="90" y1="35" x2="10" y2="125" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoriaDaPedra;

import React from 'react';
import { intencoes } from '../../data/content';
import Reveal from '../ui/Reveal';
import BtnFio from '../ui/BtnFio';

const intentionColors: Record<string, string> = {
  protecao: '#2b2b33',
  clareza: '#e8e2f2',
  amor: '#e6a8b8',
  prosperidade: '#e3b34c',
};

const Intencoes: React.FC = () => {
  return (
    <section id="intencoes" className="py-16 md:py-24 bg-linen-deep" aria-label="Intenções">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-3">
            {intencoes.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 mb-10">
            {intencoes.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {intencoes.chapters.map((chapter, i) => (
            <Reveal key={chapter.slug} delay={i * 0.1}>
              <div
                className="border-2 border-ink p-6 shadow-hard bg-linen relative overflow-hidden group hover:shadow-hard-lg transition-shadow"
                style={{ transform: `rotate(${i % 2 === 0 ? 0.5 : -0.5}deg)` }}
              >
                {/* Number */}
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/30 absolute top-4 right-4">
                  0{i + 1} / 04
                </span>

                {/* Color accent */}
                <div
                  className="w-12 h-12 rounded-full mb-4 border-2 border-ink/10"
                  style={{ backgroundColor: intentionColors[chapter.slug] || '#8f7fd4' }}
                />

                <h3 className="font-display text-2xl md:text-3xl text-ink mb-1">
                  {chapter.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 mb-3">
                  {chapter.stones}
                </p>
                <p className="font-display text-lg italic text-ink/80 mb-3">
                  "{chapter.phrase}"
                </p>
                <p className="font-sans text-sm text-ink/60 mb-5">
                  {chapter.description}
                </p>

                <a
                  href={`#catalogo`}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-crystal-deep hover:text-crystal transition-colors border-b border-crystal/30 pb-0.5"
                >
                  Explorar {chapter.name} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 text-center mt-10">
            {intencoes.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Intencoes;

import React from 'react';
import { bancadaNasce } from '../../data/content';
import Reveal from '../ui/Reveal';

const BancadaNasce: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-linen" aria-label="Como uma joia nasce">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-3">
            {bancadaNasce.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="font-sans text-base md:text-lg text-ink/70 mb-12 max-w-lg"
            dangerouslySetInnerHTML={{ __html: bancadaNasce.subtitle }}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bancadaNasce.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-linen-deep border-2 border-ink p-6 shadow-hard relative">
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass mb-3 block">
                  passo 0{i + 1} / 04
                </span>
                <div className="w-8 h-8 bg-crystal/20 border border-crystal/30 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-crystal-deep" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {i === 0 && <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" />}
                    {i === 1 && <><circle cx="12" cy="12" r="8" /><path d="M8,12 Q12,6 16,12" /></>}
                    {i === 2 && <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>}
                    {i === 3 && <><rect x="4" y="8" width="16" height="8" rx="1" /><line x1="8" y1="8" x2="8" y2="16" /></>}
                  </svg>
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
                <p className="font-sans text-sm text-ink/60">{step.text}</p>
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brass animate-pulsedot" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Glossary marquee */}
        <div className="mt-12 rotate-1">
          <div className="bg-brass text-ink border-y-2 border-ink py-3 overflow-hidden">
            <div className="flex animate-marquee-reverse whitespace-nowrap">
              {[...bancadaNasce.glossary, ...bancadaNasce.glossary].map((item, i) => (
                <span key={i} className="font-mono text-[10px] uppercase tracking-[0.2em] mx-5">
                  {item} ✳
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BancadaNasce;

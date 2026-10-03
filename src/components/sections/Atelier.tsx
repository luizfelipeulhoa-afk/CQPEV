import React from 'react';
import { atelier } from '../../data/content';
import { siteConfig } from '../../data/config';
import Reveal from '../ui/Reveal';

const Atelier: React.FC = () => {
  return (
    <section id="atelier" className="py-16 md:py-24 bg-linen-deep" aria-label="A bancada">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <Reveal>
            <div className="relative aspect-[4/3] bg-linen border-2 border-ink overflow-hidden shadow-hard">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl block mb-4">✳</span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                    bancada da Cidinha
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/30 mt-1">
                    foto em breve
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 animate-kenburns bg-gradient-to-br from-crystal/5 to-leather/5" />
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-3">
                {atelier.label}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                {atelier.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-sans text-base text-ink/70 mb-8">
                {atelier.bio}
              </p>
            </Reveal>

            {/* Steps */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {atelier.steps.map((step, i) => (
                  <div key={i} className="bg-linen border border-ink/10 p-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass block mb-1">
                      {step.number}
                    </span>
                    <p className="font-sans text-sm text-ink">{step.title}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Credentials */}
            <Reveal delay={0.4}>
              <div className="border-t border-ink/10 pt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40 mb-2">
                  credenciais
                </p>
                <ul className="space-y-1">
                  {siteConfig.credentials.map((cred, i) => (
                    <li key={i} className="font-sans text-sm text-ink/60">
                      ✳ {cred}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atelier;

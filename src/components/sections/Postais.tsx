import React from 'react';
import { postais } from '../../data/content';
import Reveal from '../ui/Reveal';

const Postais: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-linen" aria-label="Depoimentos">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-10 text-center">
            {postais.title}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {postais.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.11}>
              <div
                className={`bg-linen border-2 border-ink p-6 shadow-hard transition-all duration-500 hover:scale-[1.03] hover:z-10 ${
                  i % 2 === 0 ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                }`}
              >
                <span className="font-display text-4xl text-crystal/30 block mb-3">"</span>
                <p className="font-display text-lg text-ink italic mb-4 leading-relaxed">
                  {item.quote}
                </p>
                <div className="border-t border-ink/10 pt-3">
                  <p className="font-sans text-sm text-ink font-medium">{item.author}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40">
                    {item.city} · levou: {item.piece}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Postais;

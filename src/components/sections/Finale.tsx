import React from 'react';
import { finale } from '../../data/content';
import BtnFio from '../ui/BtnFio';
import Reveal from '../ui/Reveal';
import PlaceholderGem from '../ui/PlaceholderGem';

const Finale: React.FC = () => {
  return (
    <section id="presenca" className="py-20 md:py-32 bg-night" data-surface="dark" aria-label="O último brilho">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Visual */}
        <Reveal>
          <div className="mb-12 flex justify-center">
            <div className="animate-floaty">
              <PlaceholderGem
                color="#8f7fd4"
                label="cristal"
                size={200}
                className="md:w-[250px] md:h-[250px]"
              />
            </div>
          </div>
        </Reveal>

        {/* Stanzas */}
        <Reveal delay={0.1}>
          <p
            className="font-display text-3xl md:text-5xl text-quartz leading-[1.15] mb-6"
            dangerouslySetInnerHTML={{ __html: finale.stanzas[0] }}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="font-display text-3xl md:text-5xl text-quartz leading-[1.15] mb-10"
            dangerouslySetInnerHTML={{ __html: finale.stanzas[1] }}
          />
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <BtnFio href="#vitrine">{finale.cta1}</BtnFio>
            <BtnFio href="#monte" variant="secondary">{finale.cta2}</BtnFio>
          </div>
        </Reveal>

        {/* Seal */}
        <Reveal delay={0.4}>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-quartz/30">
            {finale.seal}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Finale;

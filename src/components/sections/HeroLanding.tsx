import React from 'react';
import { heroLanding } from '../../data/content';
import { getWeekPick, Q } from '../../data/products';
import { useBag } from '../../state/useBag';
import { showToast } from '../../events';
import BtnFio from '../ui/BtnFio';
import Reveal from '../ui/Reveal';
import PlaceholderGem from '../ui/PlaceholderGem';

const HeroLanding: React.FC = () => {
  const weekPick = getWeekPick();
  const add = useBag(s => s.add);
  const setDrawer = useBag(s => s.setDrawer);

  const handleReserve = () => {
    if (!weekPick) return;
    add({
      key: weekPick.id,
      name: weekPick.name,
      price: weekPick.price,
      img: weekPick.images[0],
      meta: `${weekPick.stone.toLowerCase()} · ${weekPick.type.toLowerCase()}`,
    });
    showToast(`"${weekPick.name}" foi pra sua sacola`, 'success');
    setDrawer(true);
  };

  return (
    <section className="py-20 md:py-32 bg-linen" aria-label="Apresentação">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Main copy */}
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-6">
                {heroLanding.badge}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.08] mb-6 text-balance"
                dangerouslySetInnerHTML={{ __html: heroLanding.headline }}
              />
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans text-base md:text-lg text-ink/70 mb-8 max-w-xl">
                {heroLanding.paragraph}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-8">
                <BtnFio href="#vitrine">{heroLanding.ctaPrimary}</BtnFio>
                <BtnFio href="#monte" variant="secondary">{heroLanding.ctaSecondary}</BtnFio>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                {heroLanding.social}
              </p>
            </Reveal>
          </div>

          {/* Week pick card */}
          {weekPick && (
            <Reveal delay={0.3} className="lg:col-span-2">
              <div className="bg-linen-deep border-2 border-ink p-5 shadow-hard rotate-1 hover:rotate-0 transition-transform duration-500">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass mb-3">
                  pedra da semana · pronta p/ envio
                </p>

                <div className="mb-4">
                  <PlaceholderGem
                    color="#8f7fd4"
                    label={weekPick.name}
                    size={200}
                    className="w-full h-48"
                  />
                </div>

                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/50 mb-1">
                  peça única · nº 04
                </p>
                <h3 className="font-display text-xl text-ink mb-1">{weekPick.name}</h3>
                <p className="font-sans text-sm text-ink/60 mb-3">{weekPick.story}</p>
                <p className="font-mono text-lg text-ink font-medium mb-4">{Q(weekPick.price)}</p>

                <button
                  onClick={handleReserve}
                  className="w-full bg-ink text-linen border-2 border-ink py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] hover:bg-brass hover:text-ink transition-colors"
                >
                  reservar esta peça
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;

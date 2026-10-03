import React, { useRef, useState } from 'react';
import { vitrine } from '../../data/content';
import { getAvailableProducts, Q } from '../../data/products';
import { useBag } from '../../state/useBag';
import { showToast } from '../../events';
import Reveal from '../ui/Reveal';
import PlaceholderGem from '../ui/PlaceholderGem';
import { getCrystalBySlug } from '../../data/crystals';

const Vitrine: React.FC = () => {
  const products = getAvailableProducts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const add = useBag(s => s.add);
  const setDrawer = useBag(s => s.setDrawer);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  const handleAdd = (product: typeof products[0]) => {
    add({
      key: product.id,
      name: product.name,
      price: product.price,
      img: product.images[0],
      meta: `${product.stone.toLowerCase()} · ${product.type.toLowerCase()}`,
    });
    showToast(`"${product.name}" foi pra sua sacola`, 'success');
    setDrawer(true);
  };

  return (
    <section id="vitrine" className="py-16 md:py-24 bg-linen" aria-label="Vitrine">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50 mb-3">
            siga o fio para a direita →
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display text-3xl md:text-5xl text-ink mb-2"
            dangerouslySetInnerHTML={{ __html: vitrine.title }}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
            {vitrine.subtitle} · {products.length} peças
          </p>
        </Reveal>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Arrows */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ink text-linen flex items-center justify-center font-mono text-lg hover:bg-brass hover:text-ink transition-colors shadow-hard"
            aria-label="Peça anterior"
          >
            ←
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-ink text-linen flex items-center justify-center font-mono text-lg hover:bg-brass hover:text-ink transition-colors shadow-hard"
            aria-label="Próxima peça"
          >
            →
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((product, i) => {
            const crystal = getCrystalBySlug(product.crystalSlug);
            const rotation = i % 2 === 0 ? 'rotate-1' : '-rotate-1';
            return (
              <div
                key={product.id}
                className={`flex-shrink-0 w-[280px] md:w-[320px] snap-start bg-linen-deep border-2 border-ink p-4 shadow-hard ${rotation} hover:rotate-0 transition-transform duration-500`}
              >
                <PlaceholderGem
                  color={crystal?.color || '#8f7fd4'}
                  label={product.name}
                  size={280}
                  className="w-full h-56 mb-4"
                />
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 mb-1">
                  {product.type}
                </p>
                <h3 className="font-display text-lg text-ink mb-1">{product.name}</h3>
                <p className="font-sans text-sm text-ink/60 mb-3 line-clamp-2">{product.story}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-base text-ink font-medium">{Q(product.price)}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-crystal-deep bg-crystal/10 px-2 py-0.5">
                    {product.intention}
                  </span>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full bg-ink text-linen border-2 border-ink py-2 font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-brass hover:text-ink transition-colors"
                >
                  tocar p/ guardar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Vitrine;

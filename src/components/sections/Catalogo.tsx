import React, { useState, useMemo } from 'react';
import { catalogo } from '../../data/content';
import { products, Q, type ProductType } from '../../data/products';
import { intentions, getCrystalBySlug } from '../../data/crystals';
import { useBag } from '../../state/useBag';
import { showToast } from '../../events';
import Reveal from '../ui/Reveal';
import PlaceholderGem from '../ui/PlaceholderGem';

const typeFilters = ['Todas', 'Colares', 'Brincos', 'Chokers', 'Pulseiras'] as const;
const sortOptions = [
  { value: 'destaque', label: 'destaque' },
  { value: 'menor', label: 'menor preço' },
  { value: 'maior', label: 'maior preço' },
  { value: 'nome', label: 'nome' },
];

const Catalogo: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string>('Todas');
  const [intentionFilter, setIntentionFilter] = useState<string>('Todas');
  const [sort, setSort] = useState<string>('destaque');
  const [visibleCount, setVisibleCount] = useState(6);
  const add = useBag(s => s.add);
  const setDrawer = useBag(s => s.setDrawer);

  const filtered = useMemo(() => {
    let result = products.filter(p => p.available);
    if (typeFilter !== 'Todas') result = result.filter(p => p.type === typeFilter);
    if (intentionFilter !== 'Todas') result = result.filter(p => p.intention === intentionFilter);

    switch (sort) {
      case 'menor': result.sort((a, b) => a.price - b.price); break;
      case 'maior': result.sort((a, b) => b.price - a.price); break;
      case 'nome': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return result;
  }, [typeFilter, intentionFilter, sort]);

  const visible = filtered.slice(0, visibleCount);

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
    <section id="catalogo" className="py-16 md:py-24 bg-quartz" aria-label="Catálogo">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brass mb-3">
            {catalogo.header}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display text-3xl md:text-5xl text-ink mb-3"
            dangerouslySetInnerHTML={{ __html: catalogo.title }}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-sans text-base text-ink/60 mb-8 max-w-lg">
            {catalogo.subtitle}
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3 mb-4">
            {typeFilters.map(t => (
              <button
                key={t}
                onClick={() => { setTypeFilter(t); setVisibleCount(6); }}
                className={`font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 border-2 transition-colors ${
                  typeFilter === t
                    ? 'bg-ink text-linen border-ink'
                    : 'bg-transparent text-ink border-ink/20 hover:border-ink'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => { setIntentionFilter('Todas'); setVisibleCount(6); }}
              className={`font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 border transition-colors ${
                intentionFilter === 'Todas'
                  ? 'bg-crystal text-quartz border-crystal'
                  : 'bg-transparent text-ink/60 border-ink/15 hover:border-crystal'
              }`}
            >
              Todas
            </button>
            {intentions.map(int => (
              <button
                key={int}
                onClick={() => { setIntentionFilter(int); setVisibleCount(6); }}
                className={`font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1 border transition-colors ${
                  intentionFilter === int
                    ? 'bg-crystal text-quartz border-crystal'
                    : 'bg-transparent text-ink/60 border-ink/15 hover:border-crystal'
                }`}
              >
                {int}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40">
            1–{visible.length} de {filtered.length} peças
            {typeFilter !== 'Todas' ? ` · capítulo: ${typeFilter}` : ''}
          </p>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60 bg-transparent border-b border-ink/20 py-1 pr-4 cursor-pointer"
            aria-label="Ordenar por"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-ink/60 mb-4">nenhuma peça encontrada com esses filtros.</p>
            <a href="#monte" className="font-mono text-xs uppercase tracking-[0.14em] text-crystal-deep hover:text-crystal transition-colors">
              {catalogo.emptyCta}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((product, i) => {
              const crystal = getCrystalBySlug(product.crystalSlug);
              return (
                <Reveal key={product.id} delay={i * 0.05}>
                  <div className="bg-linen border-2 border-ink p-4 shadow-hard hover:shadow-hard-lg transition-shadow group">
                    <PlaceholderGem
                      color={crystal?.color || '#8f7fd4'}
                      label={product.name}
                      size={300}
                      className="w-full h-52 mb-4"
                    />
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
                        {product.type}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-crystal-deep bg-crystal/10 px-1.5 py-0.5">
                        {product.intention}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-ink mb-1">{product.name}</h3>
                    <p className="font-sans text-sm text-ink/60 mb-2">{product.story}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-[9px] text-ink/40">{product.stone}</span>
                      <span className="text-ink/20">·</span>
                      <span className="font-mono text-[9px] text-ink/40">{product.material.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base text-ink font-medium">{Q(product.price)}</span>
                      <button
                        onClick={() => handleAdd(product)}
                        className="font-mono text-[9px] uppercase tracking-[0.12em] bg-ink text-linen px-3 py-1.5 hover:bg-brass hover:text-ink transition-colors"
                      >
                        adicionar
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink border-2 border-ink px-6 py-2.5 hover:bg-ink hover:text-linen transition-colors shadow-hard"
            >
              carregar mais peças
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalogo;

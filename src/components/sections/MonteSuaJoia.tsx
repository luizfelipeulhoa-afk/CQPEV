import React, { useState, useMemo } from 'react';
import { monteSuaJoia } from '../../data/content';
import { crystals } from '../../data/crystals';
import { Q } from '../../data/products';
import { useBag } from '../../state/useBag';
import { showToast } from '../../events';
import Reveal from '../ui/Reveal';

const MonteSuaJoia: React.FC = () => {
  const [piece, setPiece] = useState(monteSuaJoia.pieces[0].id);
  const [crystalSlug, setCrystalSlug] = useState(crystals[0].slug);
  const [wire, setWire] = useState(monteSuaJoia.wires[0].id);
  const [cord, setCord] = useState(monteSuaJoia.cords[0].id);
  const [extras, setExtras] = useState<string[]>([]);
  const add = useBag(s => s.add);
  const setDrawer = useBag(s => s.setDrawer);

  const selectedPiece = monteSuaJoia.pieces.find(p => p.id === piece)!;
  const selectedCrystal = crystals.find(c => c.slug === crystalSlug)!;

  const price = useMemo(() => {
    let total = selectedPiece.basePrice;
    if (selectedCrystal.premium) total += 30;
    extras.forEach(extraId => {
      const extra = monteSuaJoia.extras.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });
    return total;
  }, [piece, crystalSlug, extras, selectedPiece, selectedCrystal]);

  const days = monteSuaJoia.baseDays + extras.length * monteSuaJoia.extraDaysPerExtra;

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleAdd = () => {
    const key = `monte-${piece}-${crystalSlug}-${wire}-${cord}-${[...extras].sort().join('-')}`;
    add({
      key,
      name: `${selectedPiece.name} — ${selectedCrystal.name}`,
      price,
      img: '',
      meta: `fio: ${wire} · cordão: ${cord}`,
    });
    showToast('Pedido personalizado adicionado — a Cidinha te chama no WhatsApp', 'success');
    setDrawer(true);
  };

  return (
    <section id="monte" className="py-16 md:py-24 bg-night" data-surface="dark" aria-label="Monte sua joia">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-brass mb-3">
            ficha de encomenda nº 2026-200
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl md:text-4xl text-quartz mb-2">
            {monteSuaJoia.title}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-quartz/50 mb-10">
            {monteSuaJoia.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Config */}
          <div className="space-y-6">
            {/* Piece */}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/50 mb-2 block">
                1. que joia é essa?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {monteSuaJoia.pieces.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPiece(p.id)}
                    className={`text-left p-3 border-2 transition-colors ${
                      piece === p.id
                        ? 'border-brass bg-brass/10 text-quartz'
                        : 'border-quartz/15 text-quartz/70 hover:border-quartz/30'
                    }`}
                  >
                    <span className="font-sans text-sm block">{p.name}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.1em] opacity-60">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Crystal */}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/50 mb-2 block">
                2. a pedra (intenção)
              </label>
              <select
                value={crystalSlug}
                onChange={e => setCrystalSlug(e.target.value)}
                className="w-full bg-night border-2 border-quartz/15 text-quartz font-sans text-sm p-3 cursor-pointer"
              >
                {crystals.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name} ({c.intention})</option>
                ))}
              </select>
            </div>

            {/* Wire */}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/50 mb-2 block">
                3. cor do fio de alumínio
              </label>
              <div className="flex flex-wrap gap-2">
                {monteSuaJoia.wires.map(w => (
                  <button
                    key={w.id}
                    onClick={() => setWire(w.id)}
                    className={`font-mono text-[9px] uppercase tracking-[0.1em] px-3 py-1.5 border-2 transition-colors ${
                      wire === w.id
                        ? 'border-brass text-brass'
                        : 'border-quartz/15 text-quartz/60 hover:border-quartz/30'
                    }`}
                  >
                    {w.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Cord */}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/50 mb-2 block">
                4. cordão
              </label>
              <div className="flex flex-wrap gap-2">
                {monteSuaJoia.cords.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCord(c.id)}
                    className={`font-mono text-[9px] uppercase tracking-[0.1em] px-3 py-1.5 border-2 transition-colors ${
                      cord === c.id
                        ? 'border-brass text-brass'
                        : 'border-quartz/15 text-quartz/60 hover:border-quartz/30'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-quartz/50 mb-2 block">
                5. acabamentos extras
              </label>
              <div className="space-y-2">
                {monteSuaJoia.extras.map(extra => (
                  <label key={extra.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={extras.includes(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      className="w-4 h-4 accent-brass"
                    />
                    <span className="font-sans text-sm text-quartz/70 group-hover:text-quartz transition-colors">
                      {extra.name}
                    </span>
                    <span className="font-mono text-[9px] text-brass ml-auto">+{Q(extra.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-linen border-2 border-ink p-6 shadow-hard sticky top-24">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40 mb-4">
                resumo da encomenda
              </p>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="font-sans text-ink/60">Peça</span>
                  <span className="font-sans text-ink">{selectedPiece.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-ink/60">Pedra</span>
                  <span className="font-sans text-ink">{selectedCrystal.name} ({selectedCrystal.intention})</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-ink/60">Fio</span>
                  <span className="font-sans text-ink">{monteSuaJoia.wires.find(w => w.id === wire)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-ink/60">Cordão</span>
                  <span className="font-sans text-ink">{monteSuaJoia.cords.find(c => c.id === cord)?.name}</span>
                </div>
                {extras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="font-sans text-ink/60">Extras</span>
                    <span className="font-sans text-ink text-right text-xs">
                      {extras.map(id => monteSuaJoia.extras.find(e => e.id === id)?.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-ink pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">Estimativa</span>
                  <span key={price} className="font-display text-3xl text-brass animate-bump">{Q(price)}</span>
                </div>
                <p className="font-mono text-[9px] text-ink/40 mt-1 text-right">
                  pronta em ~{days} dias
                </p>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-ink text-linen border-2 border-ink py-3 font-mono text-[10px] uppercase tracking-[0.16em] hover:bg-brass hover:text-ink transition-colors mb-4"
              >
                colocar na sacola
              </button>

              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/30 text-center">
                {monteSuaJoia.footer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonteSuaJoia;

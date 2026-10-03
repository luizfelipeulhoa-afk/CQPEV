import React, { useState } from 'react';
import { quiz } from '../../data/content';
import { crystals } from '../../data/crystals';
import { products, Q, getProductsByIntention } from '../../data/products';
import { useBag } from '../../state/useBag';
import { showToast } from '../../events';
import Reveal from '../ui/Reveal';
import PlaceholderGem from '../ui/PlaceholderGem';

const intentionCrystalMap: Record<string, string> = {
  protecao: 'turmalina-negra',
  clareza: 'quartzo-transparente',
  amor: 'quartzo-rosa',
  prosperidade: 'citrino',
  equilibrio: 'ametista',
  coragem: 'cornalina',
};

const Quiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [weights, setWeights] = useState<Record<string, number>>({
    protecao: 0, clareza: 0, amor: 0, prosperidade: 0, equilibrio: 0, coragem: 0,
  });
  const [finished, setFinished] = useState(false);
  const add = useBag(s => s.add);
  const setDrawer = useBag(s => s.setDrawer);

  const handleAnswer = (optionWeights: Partial<Record<string, number>>) => {
    const newWeights = { ...weights };
    Object.entries(optionWeights).forEach(([key, val]) => {
      if (val !== undefined) {
        newWeights[key] = (newWeights[key] || 0) + val;
      }
    });
    setWeights(newWeights);

    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    const max = Object.entries(weights).reduce((a, b) => (b[1] > a[1] ? b : a));
    const intentionSlug = max[0];
    const crystalSlug = intentionCrystalMap[intentionSlug];
    const crystal = crystals.find(c => c.slug === crystalSlug);
    const relatedProducts = getProductsByIntention(crystal?.intention || '').slice(0, 3);
    return { crystal, relatedProducts, intentionSlug };
  };

  const reset = () => {
    setCurrentQ(0);
    setWeights({ protecao: 0, clareza: 0, amor: 0, prosperidade: 0, equilibrio: 0, coragem: 0 });
    setFinished(false);
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
    <section className="py-16 md:py-24 bg-quartz" aria-label="Quiz">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-ink text-center mb-2">
            {quiz.title}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 text-center mb-10">
            {quiz.subtitle}
          </p>
        </Reveal>

        <div className="bg-linen border-2 border-ink p-6 md:p-8 shadow-hard">
          {!finished ? (
            <>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass mb-6">
                pergunta 0{currentQ + 1} / 0{quiz.questions.length}
              </p>
              <h3 className="font-display text-xl md:text-2xl text-ink mb-6">
                {quiz.questions[currentQ].question}
              </h3>
              <div className="space-y-3">
                {quiz.questions[currentQ].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.weights)}
                    className="w-full text-left bg-linen-deep border-2 border-ink/10 p-4 font-sans text-sm text-ink hover:border-crystal hover:bg-crystal/5 transition-all"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              {/* Progress dots */}
              <div className="flex gap-2 mt-6 justify-center">
                {quiz.questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full ${i <= currentQ ? 'bg-crystal' : 'bg-ink/10'}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <QuizResult
              result={getResult()}
              onReset={reset}
              onAdd={handleAdd}
            />
          )}
        </div>
      </div>
    </section>
  );
};

interface QuizResultProps {
  result: {
    crystal: typeof crystals[0] | undefined;
    relatedProducts: typeof products;
    intentionSlug: string;
  };
  onReset: () => void;
  onAdd: (product: typeof products[0]) => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ result, onReset, onAdd }) => {
  if (!result.crystal) return null;

  return (
    <div className="text-center">
      <div
        className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-ink/10"
        style={{ backgroundColor: result.crystal.color }}
      />
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brass mb-2">
        sua pedra é
      </p>
      <h3 className="font-display text-2xl md:text-3xl text-ink mb-3">
        {result.crystal.name}
      </h3>
      <p className="font-sans text-sm text-ink/60 mb-6 max-w-sm mx-auto">
        {result.crystal.meaning}
      </p>

      {result.relatedProducts.length > 0 && (
        <div className="mb-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40 mb-3">
            peças com {result.crystal.name.toLowerCase()}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {result.relatedProducts.map(product => (
              <div key={product.id} className="bg-linen-deep border border-ink/10 p-3 text-left">
                <PlaceholderGem
                  color={result.crystal!.color}
                  label={product.name}
                  size={100}
                  className="w-full h-20 mb-2"
                />
                <p className="font-sans text-xs text-ink truncate">{product.name}</p>
                <p className="font-mono text-[10px] text-ink/60">{Q(product.price)}</p>
                <button
                  onClick={() => onAdd(product)}
                  className="mt-2 font-mono text-[8px] uppercase tracking-[0.1em] text-crystal-deep hover:text-crystal transition-colors"
                >
                  guardar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="#catalogo"
          className="font-mono text-[10px] uppercase tracking-[0.14em] bg-ink text-linen px-4 py-2 border-2 border-ink hover:bg-brass hover:text-ink transition-colors"
        >
          Ver peças com {result.crystal.name.split(' ')[0]}
        </a>
        <button
          onClick={onReset}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60 border-2 border-ink/20 px-4 py-2 hover:border-ink transition-colors"
        >
          refazer a consulta
        </button>
      </div>
    </div>
  );
};

export default Quiz;

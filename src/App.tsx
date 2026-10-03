import React, { Suspense, useEffect, lazy, useState } from 'react';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import BagDrawer from './components/layout/BagDrawer';
import Toast from './components/ui/Toast';
import HeroCinema from './components/sections/HeroCinema';
import HeroLanding from './components/sections/HeroLanding';
import StatsMarquee from './components/sections/StatsMarquee';
import Vitrine from './components/sections/Vitrine';
import Catalogo from './components/sections/Catalogo';
import Intencoes from './components/sections/Intencoes';
import HistoriaDaPedra from './components/sections/HistoriaDaPedra';
import BancadaNasce from './components/sections/BancadaNasce';
import Quiz from './components/sections/Quiz';
import MonteSuaJoia from './components/sections/MonteSuaJoia';
import Atelier from './components/sections/Atelier';
import Postais from './components/sections/Postais';
import { useMotionPref } from './state/useMotionPref';
import { useLenis } from './hooks/useLenis';
import ReadingThread from './components/layout/ReadingThread';
import Preloader from './components/sections/Preloader';

// Lazy loaded 3D components
const CrystalCurtain = lazy(() => import('./components/three/CrystalCurtain'));
const HeroCrystal = lazy(() => import('./components/three/HeroCrystal'));

const SiteApp: React.FC = () => {
  const { reduced, init } = useMotionPref();
  const [show3D, setShow3D] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  useLenis();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.add('motion-off');
    } else {
      document.documentElement.classList.remove('motion-off');
    }
  }, [reduced]);

  // Lazy load 3D when finale section enters viewport
  useEffect(() => {
    const finale = document.getElementById('presenca');
    if (!finale) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShow3D(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '800px' }
    );

    observer.observe(finale);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo
      </a>

      <Nav />

      <main id="main-content">
        <HeroCinema />
        <HeroLanding />
        <StatsMarquee />
        <Vitrine />
        <Catalogo />
        <Intencoes />
        <HistoriaDaPedra />
        <BancadaNasce />
        <Quiz />
        <MonteSuaJoia />
        <Atelier />
        <Postais />
        <FinaleWith3D show3D={show3D} reduced={reduced} />
      </main>

      <Footer />
      <BagDrawer />
      <Toast />

      {/* Crystal Curtain (transition shader) */}
      <Suspense fallback={null}>
        <CrystalCurtain />
      </Suspense>

      {/* Reading thread (scroll progress) */}
      <ReadingThread />

      {/* Motion toggle */}
      <MotionToggle />
    </>
  );
};

/**
 * Finale section with optional 3D crystal.
 */
const FinaleWith3D: React.FC<{ show3D: boolean; reduced: boolean }> = ({ show3D, reduced }) => {
  return (
    <section id="presenca" className="relative py-20 md:py-32 bg-night overflow-hidden" data-surface="dark" aria-label="O último brilho">
      {/* 3D Background */}
      {show3D && !reduced && (
        <div className="absolute inset-0 opacity-60">
          <Suspense fallback={null}>
            <HeroCrystal progress={1} />
          </Suspense>
        </div>
      )}

      {/* Fallback static gem when 3D is not available */}
      {!show3D || reduced ? (
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-72 md:h-72" fill="none" stroke="#8f7fd4" strokeWidth="0.5">
            <polygon points="100,20 160,60 160,140 100,180 40,140 40,60" />
            <line x1="100" y1="20" x2="100" y2="180" />
            <line x1="40" y1="60" x2="160" y2="140" />
            <line x1="160" y1="60" x2="40" y2="140" />
          </svg>
        </div>
      ) : null}

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <p className="font-display text-3xl md:text-5xl text-quartz leading-[1.15] mb-6">
          Há um lugar <em className="italic">para o que é natural.</em>
        </p>
        <p className="font-display text-3xl md:text-5xl text-quartz leading-[1.15] mb-10">
          Leve um pouco <em className="italic">de brilho.</em>
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="#vitrine"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-quartz text-quartz font-mono text-xs uppercase tracking-[0.16em] hover:bg-brass hover:text-ink hover:border-brass transition-colors shadow-hard"
          >
            Encontre a sua pedra ↗
          </a>
          <a
            href="#monte"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-quartz/30 text-quartz font-mono text-xs uppercase tracking-[0.16em] hover:border-brass hover:text-brass transition-colors"
          >
            Quero uma joia sob medida ↗
          </a>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-quartz/30">
          com que pedra eu vou? · joias funcionais
        </p>
      </div>
    </section>
  );
};

const MotionToggle: React.FC = () => {
  const { reduced, setReduced, initialized } = useMotionPref();

  if (!initialized) return null;

  return (
    <button
      onClick={() => setReduced(!reduced)}
      className="fixed bottom-4 right-4 z-[70] bg-night/90 backdrop-blur-sm text-quartz border border-quartz/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] hover:border-brass transition-colors"
      aria-pressed={reduced}
      aria-label={reduced ? 'Ativar movimento' : 'Pausar movimento'}
    >
      {reduced ? 'movimento: pausado' : 'pausar movimento'}
    </button>
  );
};

const App: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linen flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/40 animate-pulse">
          preparando a bancada…
        </span>
      </div>
    }>
      <SiteApp />
    </Suspense>
  );
};

export default App;

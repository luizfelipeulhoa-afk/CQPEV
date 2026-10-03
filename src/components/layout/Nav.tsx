import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../data/config';
import { useBag } from '../../state/useBag';
import BtnFio from '../ui/BtnFio';

const navLinks = [
  { label: 'Vitrine', href: '#vitrine' },
  { label: 'Intenções', href: '#intencoes' },
  { label: 'Monte sua joia', href: '#monte' },
  { label: 'A bancada', href: '#atelier' },
];

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useBag(s => s.totalItems());
  const setDrawer = useBag(s => s.setDrawer);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);

    // Camaleão: verifica elementos com data-surface="dark"
    const darkEls = document.querySelectorAll<HTMLElement>('[data-surface="dark"]');
    let isDark = false;
    darkEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 72 && rect.bottom > 72) {
        isDark = true;
      }
    });
    setDark(isDark);
  }, []);

  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  const textColor = dark ? 'text-quartz' : 'text-ink';
  const borderColor = dark ? 'border-quartz/20' : 'border-ink/10';

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled ? 'py-2 backdrop-blur-md bg-linen/90' : 'py-4 bg-transparent'}
          ${dark && scrolled ? 'bg-night/90' : ''}
          ${textColor}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between" aria-label="Navegação principal">
          {/* Logo */}
          <a
            href="#inicio"
            className={`font-mono text-[11px] md:text-xs uppercase tracking-[0.14em] ${textColor} hover:opacity-70 transition-opacity`}
          >
            {siteConfig.brand.name.toLowerCase()} <span className="text-crystal">✳</span> {siteConfig.brand.tagline}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-[11px] uppercase tracking-[0.14em] ${textColor} hover:opacity-60 transition-opacity`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setDrawer(true)}
              className={`relative font-mono text-[11px] uppercase tracking-[0.14em] ${textColor} border-2 ${dark ? 'border-quartz/40' : 'border-ink'} px-3 py-1.5 hover:bg-ink hover:text-linen transition-colors`}
              aria-label={`Sacola com ${totalItems} itens`}
            >
              Sacola
              {totalItems > 0 && (
                <span
                  key={totalItems}
                  className="absolute -top-2 -right-2 bg-crystal text-quartz text-[9px] w-5 h-5 flex items-center justify-center rounded-full animate-bump font-mono"
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: bag + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setDrawer(true)}
              className={`relative font-mono text-[10px] uppercase tracking-[0.12em] ${textColor} border ${dark ? 'border-quartz/40' : 'border-ink'} px-2 py-1`}
              aria-label={`Sacola com ${totalItems} itens`}
            >
              ✳ {totalItems}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 ${textColor}`}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-night/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-2xl text-quartz hover:text-brass transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => { setMenuOpen(false); setDrawer(true); }}
              className="mt-4"
            >
              <BtnFio variant="secondary">Sacola ({totalItems})</BtnFio>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

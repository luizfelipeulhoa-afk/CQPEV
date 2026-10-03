import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBag } from '../../state/useBag';
import { Q } from '../../data/products';
import { siteConfig } from '../../data/config';
import { showToast } from '../../events';

const BagDrawer: React.FC = () => {
  const { items, drawerOpen, setDrawer, remove, updateQty, totalPrice, clear } = useBag();
  const [sending, setSending] = React.useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setSending(true);

    setTimeout(() => {
      const lines = items.map(
        i => `• ${i.qty}x ${i.name} — ${Q(i.price)} (${i.meta})`
      ).join('\n');

      const message = `Olá, Cidinha! ✳ Quero essas joias:\n\n${lines}\n\nTotal: ${Q(totalPrice())}\n\nVi no site ${siteConfig.domain}`;

      const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
      setSending(false);
      showToast('Pedido enviado pelo WhatsApp!', 'success');
    }, 900);
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 bottom-0 z-[65] w-full max-w-md bg-linen border-l-2 border-ink flex flex-col shadow-hard-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Sua sacola"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-ink">
              <h2 className="font-display text-xl text-ink">Sua sacola</h2>
              <button
                onClick={() => setDrawer(false)}
                className="font-mono text-xs uppercase tracking-[0.12em] text-ink/60 hover:text-ink transition-colors p-2"
                aria-label="Fechar sacola"
              >
                fechar ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl mb-4">✳</span>
                  <p className="font-sans text-sm text-ink/60">
                    sua sacola está esperando uma pedra…
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item.key} className="flex gap-3 border-b border-ink/10 pb-4">
                      <div className="w-14 h-14 bg-linen-deep border border-ink/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✳</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-medium text-ink truncate">{item.name}</p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/50 mt-0.5">{item.meta}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.key, item.qty - 1)}
                            className="w-6 h-6 border border-ink/20 flex items-center justify-center font-mono text-xs hover:bg-ink hover:text-linen transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="font-mono text-xs w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.key, item.qty + 1)}
                            className="w-6 h-6 border border-ink/20 flex items-center justify-center font-mono text-xs hover:bg-ink hover:text-linen transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                          <button
                            onClick={() => remove(item.key)}
                            className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40 hover:text-ink transition-colors"
                          >
                            remover
                          </button>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-ink font-medium self-start">
                        {Q(item.price * item.qty)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t-2 border-ink">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">Total</span>
                  <span className="font-display text-2xl text-ink">{Q(totalPrice())}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={sending}
                  className="w-full bg-ink text-linen border-2 border-ink py-3 font-mono text-xs uppercase tracking-[0.16em] hover:bg-brass hover:text-ink transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <span className="animate-spin inline-block w-3 h-3 border-2 border-linen/30 border-t-linen rounded-full" />
                      passando o fio…
                    </>
                  ) : (
                    'finalizar pelo WhatsApp'
                  )}
                </button>
                <button
                  onClick={clear}
                  className="w-full mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/40 hover:text-ink transition-colors py-2"
                >
                  limpar sacola
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BagDrawer;

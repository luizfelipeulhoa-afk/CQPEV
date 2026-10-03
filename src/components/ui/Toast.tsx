import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ToastPayload } from '../../events';

interface ToastItem extends ToastPayload {
  id: number;
}

let toastId = 0;

const Toast: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((payload: ToastPayload) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { ...payload, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ToastPayload>).detail;
      addToast(detail);
    };
    window.addEventListener('cqpev-toast', handler);
    return () => window.removeEventListener('cqpev-toast', handler);
  }, [addToast]);

  return (
    <div className="fixed bottom-6 left-6 z-[80] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-night text-quartz border-2 border-crystal px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] shadow-hard max-w-[280px]"
            role="status"
            aria-live="polite"
          >
            <span className="text-brass mr-2">✳</span>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

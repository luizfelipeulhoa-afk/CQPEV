import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Componente de revelação por viewport (whileInView).
 * Usa Motion para micro-animações de entrada.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 30,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;

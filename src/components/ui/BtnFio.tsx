import React from 'react';

interface BtnFioProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  'aria-label'?: string;
  type?: 'button' | 'submit';
}

/**
 * Botão com efeito de fill animado via CSS var --fill.
 * Estilo editorial: borda 2px, cantos vivos.
 */
const BtnFio: React.FC<BtnFioProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    px-6 py-3 border-2 border-ink
    font-mono text-xs uppercase tracking-[0.16em]
    overflow-hidden cursor-pointer
    transition-colors duration-300
    shadow-hard
    focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2
  `;

  const variantClasses = variant === 'primary'
    ? 'bg-ink text-linen hover:text-brass'
    : 'bg-transparent text-ink hover:bg-ink hover:text-linen';

  const Tag = href ? 'a' : 'button';
  const tagProps = href
    ? { href }
    : { type, onClick };

  return (
    <Tag
      {...tagProps}
      {...rest}
      className={`
        ${baseClasses}
        ${variantClasses}
        group
        ${className}
      `}
    >
      <span
        className="absolute inset-0 bg-brass origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        aria-hidden="true"
      />
      <span className="relative z-10 group-hover:text-ink transition-colors duration-300">
        {children}
      </span>
    </Tag>
  );
};

export default BtnFio;

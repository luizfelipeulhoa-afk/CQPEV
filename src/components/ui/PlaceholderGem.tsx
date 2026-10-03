import React from 'react';

interface PlaceholderGemProps {
  color?: string;
  label?: string;
  className?: string;
  size?: number;
}

/**
 * Placeholder SVG de cristal facetado.
 * Usado quando a foto real do produto ainda não foi adicionada.
 */
const PlaceholderGem: React.FC<PlaceholderGemProps> = ({
  color = '#8f7fd4',
  label = '',
  className = '',
  size = 200,
}) => {
  const id = React.useId();
  return (
    <div
      className={`relative flex items-center justify-center bg-linen-deep overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ? `Ilustração de ${label}` : 'Ilustração de cristal'}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-3/4 h-3/4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gem-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Cristal facetado */}
        <polygon
          points="100,20 160,60 160,140 100,180 40,140 40,60"
          fill={`url(#gem-${id})`}
          stroke="#211f2a"
          strokeWidth="1.5"
        />
        {/* Facetas internas */}
        <line x1="100" y1="20" x2="100" y2="180" stroke="#211f2a" strokeWidth="0.7" opacity="0.4" />
        <line x1="40" y1="60" x2="160" y2="140" stroke="#211f2a" strokeWidth="0.5" opacity="0.3" />
        <line x1="160" y1="60" x2="40" y2="140" stroke="#211f2a" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="100" x2="160" y2="100" stroke="#211f2a" strokeWidth="0.5" opacity="0.2" />
        {/* Brilho */}
        <polygon
          points="85,45 100,35 108,55 95,60"
          fill="white"
          opacity="0.3"
        />
      </svg>
      {/* Label */}
      {label && (
        <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">
          {label}
        </span>
      )}
      {/* Marca d'água */}
      <span className="absolute top-2 right-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/30">
        foto real em breve ✳
      </span>
    </div>
  );
};

export default PlaceholderGem;

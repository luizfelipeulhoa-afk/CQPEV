import React, { useState } from 'react';
import PlaceholderGem from './PlaceholderGem';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
  fallbackLabel?: string;
  width?: number;
  height?: number;
}

/**
 * Imagem com lazy loading e fallback para PlaceholderGem.
 * Se a imagem falhar ao carregar, mostra o placeholder SVG.
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  fallbackColor = '#8f7fd4',
  fallbackLabel = '',
  width = 300,
  height = 300,
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <PlaceholderGem
        color={fallbackColor}
        label={fallbackLabel}
        className={className}
        size={width}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={{ width, height, objectFit: 'cover' }}
      onError={() => setError(true)}
    />
  );
};

export default LazyImage;

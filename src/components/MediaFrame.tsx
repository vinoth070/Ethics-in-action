import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  fallbackTone?: 'navy' | 'blue' | 'gold';
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  caption,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackTone = 'navy',
}) => {
  const [hasError, setHasError] = useState(false);

  const fallbackGradient =
    fallbackTone === 'blue'
      ? 'from-[#1E3A8A] via-[#3B2F7F] to-[#0F172A]'
      : fallbackTone === 'gold'
      ? 'from-[#0F1E3C] via-[#1E293B] to-[#785214]'
      : 'from-[#0B162C] via-[#172B52] to-[#2B235A]';

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={imgClassName}
        />
      ) : (
        <div
          className={`w-full h-full min-h-[220px] bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-8 text-center text-white/90`}
          role="img"
          aria-label={alt}
        >
          <Compass className="w-10 h-10 mb-3 text-[#EAB308]" aria-hidden="true" />
          <p className="font-editorial text-lg font-semibold max-w-xs">{alt}</p>
        </div>
      )}
      {caption && (
        <figcaption className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

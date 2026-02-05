import React from 'react';
import { DotType, CornerSquareType, CornerDotType } from '../../types';

export const BodyShapeIcon = ({ type, className }: { type: DotType, className?: string }) => {
  const commonClass = "fill-current";
  switch (type) {
    case 'dots':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="6" cy="6" r="4" className={commonClass} />
          <circle cx="18" cy="6" r="4" className={commonClass} />
          <circle cx="6" cy="18" r="4" className={commonClass} />
          <circle cx="18" cy="18" r="4" className={commonClass} />
        </svg>
      );
    case 'rounded':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="8" height="8" rx="2" className={commonClass} />
          <rect x="14" y="2" width="8" height="8" rx="2" className={commonClass} />
          <rect x="2" y="14" width="8" height="8" rx="2" className={commonClass} />
          <rect x="14" y="14" width="8" height="8" rx="2" className={commonClass} />
        </svg>
      );
    case 'extra-rounded':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M2 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6z" className={commonClass} />
           <path d="M14 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V6z" className={commonClass} />
           <path d="M2 18a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4z" className={commonClass} />
           <path d="M14 18a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-4z" className={commonClass} />
        </svg>
      );
    case 'classy':
      return (
         <svg viewBox="0 0 24 24" className={className}>
           <path d="M2 10V2h8a8 8 0 0 1-8 8z" className={commonClass} />
           <path d="M14 2h8v8a8 8 0 0 1-8-8z" transform="rotate(90 18 6)" className={commonClass} />
           <path d="M2 14h8v8a8 8 0 0 1-8-8z" transform="rotate(-90 6 18)" className={commonClass} />
           <path d="M14 22h8v-8a8 8 0 0 1-8 8z" className={commonClass} />
         </svg>
      );
    case 'classy-rounded':
       return (
        <svg viewBox="0 0 24 24" className={className}>
           <path d="M2 10V2h8c0 4.418-3.582 8-8 8z" className={commonClass} />
           <path d="M22 14v8h-8c0-4.418 3.582-8 8-8z" className={commonClass} />
           <rect x="14" y="2" width="8" height="8" rx="4" className={commonClass} />
           <rect x="2" y="14" width="8" height="8" rx="4" className={commonClass} />
        </svg>
       );
    case 'square':
    default:
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="2" y="2" width="8" height="8" className={commonClass} />
          <rect x="14" y="2" width="8" height="8" className={commonClass} />
          <rect x="2" y="14" width="8" height="8" className={commonClass} />
          <rect x="14" y="14" width="8" height="8" className={commonClass} />
        </svg>
      );
  }
};

export const FrameShapeIcon = ({ type, className }: { type: CornerSquareType, className?: string }) => {
   const strokeClass = "stroke-current fill-none stroke-[3]";
   switch(type) {
      case 'dot':
         return <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="9" className={strokeClass} /></svg>;
      case 'extra-rounded':
         return <svg viewBox="0 0 24 24" className={className}><rect x="3" y="3" width="18" height="18" rx="6" className={strokeClass} /></svg>;
      case 'square':
      default:
         return <svg viewBox="0 0 24 24" className={className}><rect x="3" y="3" width="18" height="18" className={strokeClass} /></svg>;
   }
};

export const BallShapeIcon = ({ type, className }: { type: CornerDotType, className?: string }) => {
   const fillClass = "fill-current";
   switch(type) {
      case 'dot':
         return <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="7" className={fillClass} /></svg>;
      case 'extra-rounded':
         return <svg viewBox="0 0 24 24" className={className}><rect x="5" y="5" width="14" height="14" rx="5" className={fillClass} /></svg>;
      case 'square':
      default:
         return <svg viewBox="0 0 24 24" className={className}><rect x="5" y="5" width="14" height="14" className={fillClass} /></svg>;
   }
};

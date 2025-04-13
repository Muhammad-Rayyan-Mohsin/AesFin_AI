import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient = ({ className, children }: AnimatedGradientProps) => {
  return (
    <div className={cn(
      "relative overflow-hidden group",
      className
    )}>
      {/* Refined gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-aes-greenPale/40 via-transparent to-transparent animate-pulse-light transition-opacity duration-700 group-hover:opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent animate-pulse-light transition-opacity duration-700" style={{ animationDelay: '1s' }}></div>
      
      {/* Enhanced data flow particles */}
      <div className="absolute w-1 h-1 bg-aes-green/70 rounded-full animate-data-flow blur-[0.5px]"></div>
      <div className="absolute w-1 h-1 bg-aes-greenDark/60 rounded-full animate-data-flow blur-[0.5px]" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-1 h-1 bg-aes-green/70 rounded-full animate-data-flow blur-[0.5px]" style={{ animationDelay: '2s' }}></div>
      <div className="absolute w-1 h-1 bg-white/50 rounded-full animate-data-flow blur-[0.5px]" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute w-1 h-1 bg-white/50 rounded-full animate-data-flow blur-[0.5px]" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
      
      {children}
    </div>
  );
};

export default AnimatedGradient;


import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

  const getTransformValue = () => {
    switch (direction) {
      case 'up': return 'translateY(40px)';
      case 'down': return 'translateY(-40px)';
      case 'left': return 'translateX(40px)';
      case 'right': return 'translateX(-40px)';
      default: return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        transform: isVisible ? 'translate(0)' : getTransformValue(),
        opacity: isVisible ? 1 : 0,
        transition: `transform ${duration}s ease-out, opacity ${duration}s ease-out`,
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

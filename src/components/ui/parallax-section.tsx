import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  zIndex?: number;
  opacity?: boolean;
  scale?: boolean;
}

export const ParallaxSection = ({
  children,
  className,
  speed = 0.2,
  direction = 'up',
  zIndex = 0,
  opacity = false,
  scale = false,
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Different transforms based on direction
  const getTransform = (scrollProgress: MotionValue<number>) => {
    const value = speed * 100; // Convert to percentage for movement
    
    switch (direction) {
      case 'up':
        return useTransform(scrollProgress, [0, 1], [`0%`, `-${value}%`]);
      case 'down':
        return useTransform(scrollProgress, [0, 1], [`0%`, `${value}%`]);
      case 'left':
        return useTransform(scrollProgress, [0, 1], [`0%`, `-${value}%`]);
      case 'right':
        return useTransform(scrollProgress, [0, 1], [`0%`, `${value}%`]);
      default:
        return useTransform(scrollProgress, [0, 1], [`0%`, `-${value}%`]);
    }
  };

  // Get the appropriate transform property
  const transform = getTransform(scrollYProgress);
  
  // Optional opacity transform
  const opacityValue = opacity 
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]) 
    : 1;
  
  // Optional scale transform
  const scaleValue = scale 
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]) 
    : 1;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} style={{ zIndex }}>
      <motion.div
        style={{
          [direction === 'up' || direction === 'down' ? 'y' : 'x']: transform,
          opacity: opacityValue,
          scale: scaleValue,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection; 
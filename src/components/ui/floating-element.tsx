import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/providers/AnimationProvider';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotate?: boolean;
  scale?: boolean;
  rotateZ?: boolean;
  rotateAmplitude?: number;
  scaleAmplitude?: number;
  glowEffect?: boolean;
  glowColor?: string;
}

export const FloatingElement = ({
  children,
  className,
  amplitude = 10,
  duration = 4,
  delay = 0,
  rotate = false,
  scale = false,
  rotateZ = false,
  rotateAmplitude = 5,
  scaleAmplitude = 0.05,
  glowEffect = false,
  glowColor = "rgba(1, 171, 68, 0.2)",
}: FloatingElementProps) => {
  const { prefersReducedMotion } = useAnimation();
  
  // If user prefers reduced motion, return static element
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Enhanced floating animation with more options
  return (
    <motion.div
      className={cn(
        className,
        glowEffect && "relative"
      )}
      animate={{
        y: [`0px`, `-${amplitude}px`, `0px`],
        rotateX: rotate ? [-rotateAmplitude, 0, rotateAmplitude, 0] : 0,
        rotateY: rotate ? [0, rotateAmplitude, 0, -rotateAmplitude, 0] : 0,
        rotateZ: rotateZ ? [0, 360] : 0,
        scale: scale ? [1, 1 + scaleAmplitude, 1] : 1,
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay,
        rotateZ: rotateZ ? {
          duration: duration * 15,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        } : undefined,
      }}
    >
      {/* Optional glow effect beneath the element */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 -z-10 blur-xl opacity-50"
          style={{ backgroundColor: glowColor }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: duration * 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default FloatingElement; 
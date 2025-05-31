import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { fadeUp, fadeIn, slideInLeft, slideInRight } from '@/lib/animation-variants';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const AnimatedSection = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  amount = 0.3,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    amount,
  });
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, only use the fade animation
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeIn}
        custom={delay}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    );
  }

  // Choose the right animation variant based on direction
  const getVariants = (): Variants => {
    switch (direction) {
      case 'up': return fadeUp;
      case 'down': return {
        hidden: { opacity: 0, y: -40 },
        visible: (delay = 0) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay * 0.1,
          }
        })
      };
      case 'left': return slideInLeft;
      case 'right': return slideInRight;
      case 'fade': return fadeIn;
      case 'scale': return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (delay = 0) => ({
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay * 0.1,
          }
        })
      };
      default: return fadeUp;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnimation } from '@/providers/AnimationProvider';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  key?: string;
}

export const PageTransition = ({ children, className, key }: PageTransitionProps) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Use simpler transitions if reduced motion is preferred
  const variants = prefersReducedMotion 
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
            when: 'beforeChildren',
          }
        },
        exit: { 
          opacity: 0, 
          y: -20,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }
        },
      };
  
  return (
    <motion.div
      key={key}
      className={cn("w-full", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 
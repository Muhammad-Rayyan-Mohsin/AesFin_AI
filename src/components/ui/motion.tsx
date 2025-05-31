import { motion, MotionProps, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { fadeUp, fadeIn, slideInLeft, slideInRight, scaleUp, reducedMotionVariants } from '@/lib/animation-variants';

type MotionComponentProps = MotionProps & {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
  };
};

// Factory function to create motion components with default variants
const createMotionComponent = (
  Component: typeof motion.div,
  defaultVariants: Variants,
  variantName?: keyof typeof reducedMotionVariants
) => {
  return forwardRef<HTMLDivElement, MotionComponentProps>(
    ({ children, className, delay = 0, viewport = { once: true, amount: 0.3 }, ...props }, ref) => {
      const prefersReducedMotion = useReducedMotion();
      // Use reduced motion variants if available and preferred, otherwise use default
      const variants = prefersReducedMotion && variantName && reducedMotionVariants[variantName]
        ? reducedMotionVariants[variantName]
        : defaultVariants;

      return (
        <Component
          ref={ref}
          className={className}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          custom={delay}
          variants={variants}
          {...props}
        >
          {children}
        </Component>
      );
    }
  );
};

// Create motion components with different animation variants
export const FadeUpDiv = createMotionComponent(motion.div, fadeUp, 'fadeUp');
export const FadeInDiv = createMotionComponent(motion.div, fadeIn);
export const SlideInLeftDiv = createMotionComponent(motion.div, slideInLeft);
export const SlideInRightDiv = createMotionComponent(motion.div, slideInRight);
export const ScaleUpDiv = createMotionComponent(motion.div, scaleUp);

// Text animation component for title animations
export const AnimatedTitle = forwardRef<HTMLHeadingElement, MotionComponentProps & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }>(
  ({ children, className, as = 'h2', delay = 0, viewport = { once: true, amount: 0.3 }, ...props }, ref) => {
    const Component = motion[as];
    const prefersReducedMotion = useReducedMotion();
    const variants = prefersReducedMotion && reducedMotionVariants.fadeUp 
      ? reducedMotionVariants.fadeUp 
      : fadeUp;

    return (
      <Component
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        custom={delay}
        variants={variants}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
AnimatedTitle.displayName = 'AnimatedTitle';

// Container component for staggered children animations
export const StaggerContainer = forwardRef<HTMLDivElement, MotionComponentProps>(
  ({ children, className, viewport = { once: true, amount: 0.3 }, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            }
          }
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerContainer.displayName = 'StaggerContainer';

// Animated button component with hover effects
export const AnimatedButton = forwardRef<HTMLButtonElement, MotionComponentProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
AnimatedButton.displayName = 'AnimatedButton';

// Section divider component with animation
export const AnimatedDivider = forwardRef<HTMLDivElement, MotionComponentProps & { width?: string }>(
  ({ className, width = '100%', delay = 0.2, viewport = { once: true, amount: 0.5 }, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className || "h-px bg-gradient-to-r from-transparent via-aes-green to-transparent my-12"}
        initial={{ width: "0%" }}
        whileInView={{ width }}
        viewport={viewport}
        transition={{ duration: 0.8, ease: "easeInOut", delay }}
        {...props}
      />
    );
  }
);
AnimatedDivider.displayName = 'AnimatedDivider';

// Export base motion components for custom use
export { motion }; 
 
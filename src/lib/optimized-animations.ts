import { Variants, Transition } from 'framer-motion';

// GPU-accelerated base properties
export const gpuAcceleratedBase = {
  style: {
    willChange: 'transform, opacity',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden' as const
  }
};

// High-performance easing functions
export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  spring: { type: 'spring', stiffness: 300, damping: 30 } as const
};

// Optimized fade animations
export const fadeVariants: Variants = {
  hidden: { 
    opacity: 0,
    transform: 'translate3d(0, 0, 0)'
  },
  visible: { 
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.6,
      ease: easings.smooth
    }
  }
};

// Optimized slide animations with GPU acceleration
export const slideVariants = {
  slideUp: {
    hidden: { 
      opacity: 0, 
      transform: 'translate3d(0, 40px, 0)'
    },
    visible: { 
      opacity: 1, 
      transform: 'translate3d(0, 0, 0)',
      transition: {
        duration: 0.7,
        ease: easings.smooth
      }
    }
  } as Variants,
  slideLeft: {
    hidden: { 
      opacity: 0, 
      transform: 'translate3d(-40px, 0, 0)'
    },
    visible: { 
      opacity: 1, 
      transform: 'translate3d(0, 0, 0)',
      transition: {
        duration: 0.7,
        ease: easings.smooth
      }
    }
  } as Variants,
  slideRight: {
    hidden: { 
      opacity: 0, 
      transform: 'translate3d(40px, 0, 0)'
    },
    visible: { 
      opacity: 1, 
      transform: 'translate3d(0, 0, 0)',
      transition: {
        duration: 0.7,
        ease: easings.smooth
      }
    }
  } as Variants
};

// Scale animations with transform3d
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    transform: 'translate3d(0, 0, 0) scale(0.95)'
  },
  visible: { 
    opacity: 1, 
    transform: 'translate3d(0, 0, 0) scale(1)',
    transition: {
      duration: 0.6,
      ease: easings.smooth
    }
  }
};

// Magnetic button effect
export const magneticButton: Variants = {
  initial: { 
    transform: 'translate3d(0, 0, 0) scale(1)'
  },
  hover: { 
    transform: 'translate3d(0, -2px, 0) scale(1.02)',
    transition: {
      duration: 0.2,
      ease: easings.snappy
    }
  },
  tap: { 
    transform: 'translate3d(0, 0, 0) scale(0.98)',
    transition: {
      duration: 0.1
    }
  }
};

// Card tilt effect (desktop only)
export const cardTilt: Variants = {
  initial: { 
    transform: 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)'
  },
  hover: { 
    transform: 'translate3d(0, -5px, 0) rotateX(5deg) rotateY(5deg) scale(1.02)',
    transition: {
      duration: 0.3,
      ease: easings.smooth
    }
  }
};

// Stagger container for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: 'beforeChildren'
    }
  }
};

// Item variants for staggered lists
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    transform: 'translate3d(0, 20px, 0)'
  },
  visible: { 
    opacity: 1, 
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.5,
      ease: easings.smooth
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    transform: 'translate3d(0, 20px, 0)'
  },
  in: { 
    opacity: 1, 
    transform: 'translate3d(0, 0, 0)'
  },
  out: { 
    opacity: 0, 
    transform: 'translate3d(0, -20px, 0)'
  }
};

// Mobile-optimized reduced motion variants
export const reducedMotionVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  },
  slideUp: {
    hidden: { opacity: 0, transform: 'translate3d(0, 10px, 0)' },
    visible: { 
      opacity: 1, 
      transform: 'translate3d(0, 0, 0)',
      transition: { duration: 0.3 }
    }
  }
};

// Animation utility functions
export const getOptimizedVariant = (
  type: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale',
  reducedMotion: boolean = false
): Variants => {
  if (reducedMotion) {
    return reducedMotionVariants.fade;
  }

  switch (type) {
    case 'fade':
      return fadeVariants;
    case 'slideUp':
      return slideVariants.slideUp;
    case 'slideLeft':
      return slideVariants.slideLeft;
    case 'slideRight':
      return slideVariants.slideRight;
    case 'scale':
      return scaleVariants;
    default:
      return fadeVariants;
  }
};

// Performance monitoring
export const animationPerformance = {
  startTime: 0,
  
  start() {
    this.startTime = performance.now();
  },
  
  end(animationName: string) {
    const duration = performance.now() - this.startTime;
    if (duration > 16.67) { // More than one frame at 60fps
      console.warn(`Animation "${animationName}" took ${duration.toFixed(2)}ms (> 16.67ms frame budget)`);
    }
  }
};

// Mobile-specific optimizations
export const mobileOptimizations = {
  // Reduce animation complexity on mobile
  getReducedComplexity: (isMobile: boolean, variants: Variants): Variants => {
    if (!isMobile) return variants;
    
    // Simplify transforms for mobile
    return Object.fromEntries(
      Object.entries(variants).map(([key, value]) => [
        key,
        typeof value === 'object' && 'transform' in value
          ? { ...value, transform: 'translate3d(0, 0, 0)' }
          : value
      ])
    );
  },

  // Touch-friendly interaction variants
  touchInteraction: {
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    },
    hover: {} // Disable hover on touch devices
  }
};

// Preload animations for better performance
export const preloadAnimation = (element: HTMLElement) => {
  element.style.willChange = 'transform, opacity';
  element.style.transform = 'translate3d(0, 0, 0)';
  element.style.backfaceVisibility = 'hidden';
}; 
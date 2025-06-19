import { Variants } from 'framer-motion';

// Easing presets for consistent animation timing
export const easings = {
  default: [0.25, 0.1, 0.25, 1], // Custom easing
  gentle: [0.4, 0.0, 0.2, 1],     // Ease out
  bounce: [0.175, 0.885, 0.32, 1.275], // Bounce
  smooth: [0.5, 0, 0, 1]          // Custom smooth
};

// Duration presets for consistent timing
export const durations = {
  fast: 0.2,
  default: 0.4,
  medium: 0.6,
  slow: 0.8,
  extraSlow: 1.2
};

// Fade up animation - elements fade in and move up
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easings.default,
      delay: custom * 0.1,
    }
  })
};

// Fade in animation - simple fade in effect
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: durations.default,
      ease: 'easeOut',
      delay: custom * 0.1,
    }
  })
};

// Slide in animations from different directions
export const slideInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: (custom = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.medium,
      ease: easings.default,
      delay: custom * 0.1,
    }
  })
};

export const slideInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: (custom = 0) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.medium,
      ease: easings.default,
      delay: custom * 0.1,
    }
  })
};

// Scale animations
export const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (custom = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.default,
      ease: easings.default,
      delay: custom * 0.1,
    }
  })
};

// Stagger children animation control
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

// Special animations for cards and interactive elements
export const cardHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: durations.fast, 
      ease: "easeOut" 
    } 
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: durations.fast * 0.5, 
      ease: "easeIn" 
    } 
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: durations.default, 
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: durations.fast, 
      ease: 'easeInOut' 
    }
  }
};

// Floating animation for decorative elements
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Subtle floating animation for background elements
export const subtleFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Float with rotation for decoration elements
export const floatWithRotate: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 5,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Pulse animation for emphasis
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Text character animation for hero sections
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.default,
      ease: easings.default,
      delay: 0.5 + custom * 0.02,
    }
  })
};

// Character-by-character text animation
export const characterAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.fast,
      ease: easings.default,
    }
  }
};

// Container variant for staggered character animation
export const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: custom * 0.1,
    }
  })
};

// Button hover animation
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.04,
    transition: { 
      duration: durations.fast,
      ease: easings.default
    } 
  },
  tap: { 
    scale: 0.97,
    transition: { 
      duration: durations.fast * 0.5,
      ease: easings.default
    } 
  }
};

// Logo animation for header
export const logoAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.medium,
      ease: easings.default
    }
  }
};

// Nav link animation
export const navLinkAnimation: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.default,
      ease: easings.default,
      delay: custom * 0.05
    }
  }),
  hover: {
    y: -2,
    transition: {
      duration: durations.fast,
      ease: easings.default
    }
  }
};

// Mobile menu animation
export const mobileMenuAnimation: Variants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.default,
      ease: easings.default
    }
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: durations.fast,
      ease: easings.default
    }
  }
};

// Hamburger icon line animation
export const hamburgerLineVariants = {
  top: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  },
  middle: {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  },
  bottom: {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  }
};

// Section fade in animation for scroll-triggered elements
export const sectionFadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easings.default
    }
  }
};

// Image gallery item animation
export const galleryItemAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.medium,
      ease: easings.default,
      delay: custom * 0.1
    }
  }),
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: durations.fast,
      ease: easings.default
    }
  }
};

// Reduced motion variants for accessibility
export const reducedMotionVariants = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: (custom = 0) => ({
      opacity: 1,
      transition: {
        duration: durations.default,
        delay: custom * 0.05,
      }
    })
  },
  
  // Character animation with reduced motion
  characterAnimation: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.fast
      }
    }
  },
  
  // Container for character animation with reduced motion
  textContainer: {
    hidden: { opacity: 0 },
    visible: (custom = 0) => ({
      opacity: 1,
      transition: {
        delayChildren: custom * 0.05,
        staggerChildren: 0.01
      }
    })
  },
  
  // Page transition with reduced motion
  pageTransition: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: durations.default
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: durations.fast
      }
    }
  },
  
  // Section fade for reduced motion
  sectionFadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.medium
      }
    }
  },
  
  // Gallery item for reduced motion
  galleryItemAnimation: {
    hidden: { opacity: 0 },
    visible: (custom = 0) => ({
      opacity: 1,
      transition: {
        duration: durations.default,
        delay: custom * 0.05
      }
    }),
    hover: {
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: durations.fast
      }
    }
  }
};

// Enhanced fadeInUp animation with spring physics
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: custom * 0.1,
    }
  })
};

// hoverLift variant for card and button hover states
export const hoverLift: Variants = {
  initial: { 
    y: 0, 
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0)" 
  },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// 3D spin animation for floating dashboard mockups
export const threeDSpin: Variants = {
  initial: { 
    rotateX: 0, 
    rotateY: 0 
  },
  animate: {
    rotateX: [0, 5, 0, -5, 0],
    rotateY: [0, -5, 0, 5, 0],
    transition: {
      duration: 12,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Glass card hover effect
export const glassCardHover: Variants = {
  initial: { 
    y: 0, 
    scale: 1,
    boxShadow: "0 0px 0px rgba(0, 0, 0, 0)"
  },
  hover: { 
    y: -8, 
    scale: 1.03,
    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: { 
    y: -2,
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Underline reveal animation for section headers
export const underlineReveal: Variants = {
  hidden: { 
    width: 0, 
    opacity: 0 
  },
  visible: (custom = 0) => ({
    width: "100%",
    opacity: 1,
    transition: {
      delay: 0.3 + (custom * 0.1),
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

// Continuous arrow nudge animation
export const arrowNudge: Variants = {
  initial: { x: 0 },
  animate: {
    x: [0, 5, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Coverflow effect for dashboard carousel
export const coverflowItem: Variants = {
  center: {
    rotateY: 0,
    x: 0,
    z: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  left: (custom) => ({
    rotateY: 30,
    x: -300 * custom,
    z: -200,
    opacity: 0.5 - (0.2 * custom),
    scale: 0.9 - (0.05 * custom),
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }),
  right: (custom) => ({
    rotateY: -30,
    x: 300 * custom,
    z: -200,
    opacity: 0.5 - (0.2 * custom),
    scale: 0.9 - (0.05 * custom),
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  })
};

// New animation variants for enhanced interactivity

// Subtle image hover zoom effect
export const subtleImageZoom: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02, 
    transition: { 
      duration: durations.default,
      ease: easings.default
    }
  }
};

// Subtle background color shift on hover
export const subtleColorShift: Variants = {
  initial: { backgroundColor: "rgba(255, 255, 255, 0)" },
  hover: { 
    backgroundColor: "rgba(240, 247, 250, 0.5)", 
    transition: { 
      duration: durations.medium,
      ease: easings.default
    }
  }
};

// Subtle border highlight animation
export const subtleBorderHighlight: Variants = {
  initial: { 
    boxShadow: "inset 0 0 0 0 rgba(99, 230, 190, 0)",
  },
  hover: { 
    boxShadow: "inset 0 0 0 2px rgba(99, 230, 190, 0.3)",
    transition: { 
      duration: durations.default,
      ease: easings.default
    }
  }
};

// Subtle scale for icons without affecting layout
export const subtleIconScale: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.15, 
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

// Continuous subtle pulsing for important elements
export const subtlePulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      ease: easings.smooth,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Smooth staggered reveal for list items
export const listItemReveal: Variants = {
  hidden: { opacity: 0, x: -5 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.fast,
      ease: easings.default,
      delay: custom * 0.08
    }
  })
};

// Super subtle parallax effect
export const microParallax: Variants = {
  initial: { y: 0 },
  scroll: (scrollY: number) => ({
    y: scrollY * 0.05,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 30,
      mass: 0.5
    }
  })
};

// Enhanced logo hover effect
export const logoHoverEffect: Variants = {
  initial: { 
    filter: "brightness(1) saturate(1)",
    scale: 1
  },
  hover: { 
    filter: "brightness(1.1) saturate(1.2)",
    scale: 1.05,
    transition: { 
      duration: durations.fast,
      ease: easings.default
    }
  }
};

// Accessibility-friendly focus animation
export const accessibleFocus: Variants = {
  initial: {},
  focus: {
    outline: "2px solid rgba(99, 230, 190, 0.5)",
    outlineOffset: "3px",
    transition: {
      duration: durations.fast,
      ease: easings.default
    }
  }
};

// Chart line drawing animation for data visualizations
export const chartLineReveal: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { 
        duration: durations.slow * 1.5, 
        ease: easings.smooth 
      },
      opacity: { 
        duration: durations.fast, 
        ease: "easeIn" 
      },
      delay: custom * 0.2
    }
  })
};

// Counter animation for metrics
export const countUp: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.default,
      ease: easings.default
    }
  }
};

// Radial progress indicator animation
export const radialProgress: Variants = {
  hidden: { opacity: 0, strokeDashoffset: 283 }, // 283 is approx circumference of circle with r=45
  visible: (custom = 0) => ({
    opacity: 1,
    strokeDashoffset: custom, // Pass the final value as custom
    transition: {
      strokeDashoffset: {
        duration: durations.slow * 1.5,
        ease: easings.smooth
      },
      opacity: {
        duration: durations.fast,
        ease: "easeIn"
      }
    }
  })
};

// Metric card reveal with subtle pulse
export const metricReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.medium,
      ease: easings.default,
      delay: custom * 0.1
    }
  }),
  pulse: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.2,
      ease: easings.smooth,
      times: [0, 0.5, 1],
      repeat: 1
    }
  }
};

// Tooltip reveal animation
export const tooltipReveal: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.fast,
      ease: easings.default
    }
  },
  exit: {
    opacity: 0,
    y: 5,
    scale: 0.95,
    transition: {
      duration: durations.fast * 0.7,
      ease: "easeIn"
    }
  }
}; 
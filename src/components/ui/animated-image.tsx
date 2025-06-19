import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { subtleImageZoom } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface AnimatedImageProps {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  hoverEffect?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  whileInViewAnimation?: 'fadeIn' | 'fadeUp' | 'none';
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  hoverEffect = true,
  shadow = false,
  rounded = true,
  whileInViewAnimation = 'none',
  ...props
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Skip animations for users who prefer reduced motion
  const shouldAnimate = !prefersReducedMotion && hoverEffect;

  // Define the animations for when image comes into view
  const inViewVariants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    none: {
      hidden: {},
      visible: {}
    }
  };

  return (
    <motion.div 
      className={cn(
        "overflow-hidden", 
        rounded && "rounded-xl", 
        shadow && "shadow-md",
        containerClassName
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={inViewVariants[whileInViewAnimation]}
    >
      <motion.img
        src={src}
        alt={alt || ''}
        className={cn("w-full h-auto", className)}
        initial="initial"
        whileHover={shouldAnimate ? "hover" : "initial"}
        variants={shouldAnimate ? subtleImageZoom : undefined}
        width={props.width}
        height={props.height}
        loading={props.loading}
      />
    </motion.div>
  );
};

export default AnimatedImage; 
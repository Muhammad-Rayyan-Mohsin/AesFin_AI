import React, { useState } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { subtleImageZoom } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';
import Skeleton from './skeleton-loader';

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
  blurDataURL?: string;
  showSkeleton?: boolean;
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
  blurDataURL,
  showSkeleton = true,
  ...props
}) => {
  const { prefersReducedMotion } = useAnimation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
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
        "relative overflow-hidden", 
        rounded && "rounded-xl", 
        shadow && "shadow-md",
        containerClassName
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={inViewVariants[whileInViewAnimation]}
    >
      {/* Skeleton/Blur placeholder */}
      {!imageLoaded && showSkeleton && (
        <div className="absolute inset-0 z-10">
          {blurDataURL ? (
            <motion.img
              src={blurDataURL}
              alt=""
              className={cn("w-full h-full object-cover filter blur-sm scale-110", className)}
              initial={{ opacity: 1 }}
              animate={{ opacity: imageLoaded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <Skeleton 
              variant="rectangular" 
              className={cn("w-full h-full", className)}
              animation="pulse"
            />
          )}
        </div>
      )}

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt || ''}
        className={cn("w-full h-auto relative z-20", className)}
        initial="initial"
        whileHover={shouldAnimate ? "hover" : "initial"}
        variants={shouldAnimate ? subtleImageZoom : undefined}
        width={props.width}
        height={props.height}
        loading={props.loading}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-30">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedImage; 
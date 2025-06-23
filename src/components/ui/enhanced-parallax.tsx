import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDeviceInfo } from '@/hooks/use-mobile';
import { useOptimizedAnimation } from '@/hooks/use-optimized-animation';

interface EnhancedParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number[];
  disabled?: boolean;
  enableOnMobile?: boolean;
}

const EnhancedParallax: React.FC<EnhancedParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  offset = [0, 1],
  disabled = false,
  enableOnMobile = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useDeviceInfo();
  const { shouldUseComplexAnimations } = useOptimizedAnimation();
  const [isInView, setIsInView] = useState(false);

  // Disable parallax on mobile unless explicitly enabled
  const shouldEnableParallax = !disabled && 
    shouldUseComplexAnimations && 
    (!isMobile || enableOnMobile);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start end`, `end start`]
  });

  // Add spring for smoother motion
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate transform values based on direction
  const getTransformValue = () => {
    const distance = speed * 100;
    
    switch (direction) {
      case 'up':
        return useTransform(springProgress, offset, [`${distance}px`, `-${distance}px`]);
      case 'down':
        return useTransform(springProgress, offset, [`-${distance}px`, `${distance}px`]);
      case 'left':
        return useTransform(springProgress, offset, [`${distance}px`, `-${distance}px`]);
      case 'right':
        return useTransform(springProgress, offset, [`-${distance}px`, `${distance}px`]);
      default:
        return useTransform(springProgress, offset, [`${distance}px`, `-${distance}px`]);
    }
  };

  const transformValue = shouldEnableParallax ? getTransformValue() : 0;

  // Intersection Observer for performance optimization
  useEffect(() => {
    if (!ref.current || !shouldEnableParallax) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [shouldEnableParallax]);

  // Get appropriate style based on direction and device
  const getMotionStyle = () => {
    if (!shouldEnableParallax || !isInView) {
      return {
        willChange: 'auto'
      };
    }

    const baseStyle = {
      willChange: 'transform',
      transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
    };

    switch (direction) {
      case 'up':
      case 'down':
        return {
          ...baseStyle,
          y: transformValue
        };
      case 'left':
      case 'right':
        return {
          ...baseStyle,
          x: transformValue
        };
      default:
        return {
          ...baseStyle,
          y: transformValue
        };
    }
  };

  if (!shouldEnableParallax) {
    // Fallback for mobile or when parallax is disabled
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={getMotionStyle()}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
};

// Mouse-following parallax component for desktop interactions
interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  enableOnMobile?: boolean;
}

export const MouseParallax: React.FC<MouseParallaxProps> = ({
  children,
  strength = 0.1,
  className,
  enableOnMobile = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceInfo();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  const shouldEnable = !isMobile || enableOnMobile;

  useEffect(() => {
    if (!shouldEnable || !ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, shouldEnable]);

  if (!shouldEnable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default EnhancedParallax; 
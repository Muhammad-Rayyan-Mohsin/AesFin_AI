import React, { ReactNode } from 'react';
import { motion, useScroll, useInView, useTransform, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  threshold?: number;
  duration?: number;
  once?: boolean;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 50,
  threshold = 0.2,
  duration = 0.7,
  once = true,
  as: Component = 'div',
  ...motionProps
}: ScrollRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Set initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Set target animation values
  const getTargetValues = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialValues()}
      animate={isInView ? getTargetValues() : getInitialValues()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // custom easing
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function ScrollParallax({
  children,
  className,
  speed = 0.2,
  direction = 'up',
  ...motionProps
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
} & MotionProps) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Apply different transforms based on direction
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' || direction === 'down' 
      ? [direction === 'down' ? -100 * speed : 100 * speed, 0] 
      : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'left' || direction === 'right' 
      ? [direction === 'right' ? -100 * speed : 100 * speed, 0] 
      : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ 
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function ScrollSequence({
  children,
  className,
  staggerChildren = 0.1,
  delayStart = 0,
  direction = 'up',
  distance = 30,
  duration = 0.5,
  threshold = 0.2,
  once = true,
  as: Component = 'div',
}: Omit<ScrollRevealProps, 'children'> & {
  children: ReactNode;
  staggerChildren?: number;
  delayStart?: number;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Set initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Animation variants for parent and children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delayStart,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialValues(),
    visible: {
      opacity: 1,
      y: direction === 'up' || direction === 'down' ? 0 : undefined,
      x: direction === 'left' || direction === 'right' ? 0 : undefined,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {React.Children.map(React.Children.toArray(children), (child, i) => (
        <motion.div key={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 
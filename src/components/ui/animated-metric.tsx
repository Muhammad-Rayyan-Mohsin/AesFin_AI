import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { metricReveal } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface AnimatedMetricProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
  duration?: number;
  pulseOnView?: boolean;
  index?: number; // For staggered animations
}

const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  className,
  valueClassName,
  labelClassName,
  duration = 1.5,
  pulseOnView = true,
  index = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion;
  
  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayValue(value);
      return;
    }
    
    let startTime: number;
    let animationFrame: number;
    
    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(value);
      }
    };
    
    animationFrame = requestAnimationFrame(updateValue);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration, shouldAnimate]);
  
  return (
    <motion.div 
      className={cn("flex flex-col", className)}
      initial="hidden"
      whileInView={shouldAnimate ? "visible" : undefined}
      variants={shouldAnimate ? metricReveal : undefined}
      custom={index}
      viewport={{ once: true, margin: "-50px" }}
      animate={pulseOnView && shouldAnimate ? "pulse" : undefined}
    >
      <span 
        className={cn(
          "text-3xl font-bold text-aes-navy",
          valueClassName
        )}
      >
        {prefix}{displayValue}{suffix}
      </span>
      {label && (
        <span 
          className={cn(
            "text-sm text-aes-gray mt-1",
            labelClassName
          )}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
};

export default AnimatedMetric; 
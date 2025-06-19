import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { chartLineReveal } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface AnimatedChartLineProps {
  path: string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  delay?: number;
  fill?: boolean;
  fillColor?: string;
  fillOpacity?: number;
}

const AnimatedChartLine: React.FC<AnimatedChartLineProps> = ({
  path,
  color = "#01AB44", // AesFin green
  strokeWidth = 2,
  className,
  delay = 0,
  fill = false,
  fillColor,
  fillOpacity = 0.1,
}) => {
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion;
  
  return (
    <motion.path
      d={path}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill ? fillColor || color : "none"}
      fillOpacity={fill ? fillOpacity : 0}
      className={cn("chart-line", className)}
      initial="hidden"
      whileInView={shouldAnimate ? "visible" : undefined}
      viewport={{ once: true, margin: "-50px" }}
      variants={shouldAnimate ? chartLineReveal : undefined}
      custom={delay}
    />
  );
};

export default AnimatedChartLine; 
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/providers/AnimationProvider';

interface DynamicGridBackgroundProps {
  className?: string;
  gridSize?: number;
  gridColor?: string;
  gridOpacity?: number;
  gradientColors?: string[];
  gradientOpacity?: [number, number];
  gradientDuration?: number;
  gridAnimationDuration?: number;
  children?: React.ReactNode;
}

const DynamicGridBackground: React.FC<DynamicGridBackgroundProps> = ({
  className,
  gridSize = 20,
  gridColor = "#e2e8f0",
  gridOpacity = 0.3,
  gradientColors = ["rgba(1, 171, 68, 0.15)", "rgba(0, 112, 240, 0.1)"],
  gradientOpacity = [0.3, 0.5],
  gradientDuration = 8,
  gridAnimationDuration = 20,
  children,
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Style for the background grid
  const gridStyle = {
    backgroundSize: `${gridSize}px ${gridSize}px`,
    backgroundImage: `
      linear-gradient(to right, ${gridColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
    `,
    opacity: gridOpacity,
  };
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={gridStyle}
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ["0px 0px", `${gridSize}px ${gridSize}px`]
        }}
        transition={{
          duration: gridAnimationDuration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradientColors[0]}, ${gradientColors[1]})`,
        }}
        animate={prefersReducedMotion ? {} : {
          opacity: [gradientOpacity[0], gradientOpacity[1], gradientOpacity[0]]
        }}
        transition={{
          duration: gradientDuration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicGridBackground; 
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/providers/AnimationProvider';
import { glassCardHover } from '@/lib/animation-variants';

interface GlassFeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const GlassFeatureCard = ({
  title,
  description,
  icon,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
}: GlassFeatureCardProps) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Use simpler animations if the user prefers reduced motion
  const cardAnimation = prefersReducedMotion 
    ? {} 
    : {
        whileHover: "hover",
        whileTap: "tap",
        variants: glassCardHover
      };

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-300",
        className
      )}
      initial="initial"
      {...cardAnimation}
    >
      {/* Glassy background effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg"></div>
      
      {/* Glowing background circles */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-aes-green/10 blur-3xl opacity-70"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl opacity-70"></div>
      
      {/* Subtle border */}
      <div className="absolute inset-0 border border-white/20 rounded-xl"></div>
      
      {/* Card content */}
      <div className="relative z-10">
        {icon && (
          <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-aes-green/10", iconClassName)}>
            {icon}
          </div>
        )}
        
        <h3 className={cn("mb-2 text-xl font-medium text-aes-navy overflow-wrap-break-word", titleClassName)}>
          {title}
        </h3>
        
        <p className={cn("text-sm text-aes-gray overflow-wrap-break-word", descriptionClassName)}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default GlassFeatureCard; 
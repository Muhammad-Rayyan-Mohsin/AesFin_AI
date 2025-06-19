import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { underlineReveal } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface EnhancedSectionHeadingProps {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  centered?: boolean;
  underline?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

const EnhancedSectionHeading: React.FC<EnhancedSectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  underline = false,
  className,
  as: Heading = 'h2',
}) => {
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion && underline;
  
  return (
    <div className={cn(
      "mb-8",
      centered && "text-center",
      className
    )}>
      <Heading className={cn(
        "font-display tracking-tight leading-tight text-aes-navy mb-4",
        Heading === 'h1' && "text-4xl md:text-5xl lg:text-6xl font-bold",
        Heading === 'h2' && "text-3xl md:text-4xl font-bold",
        Heading === 'h3' && "text-2xl md:text-3xl font-bold",
        Heading === 'h4' && "text-xl md:text-2xl font-semibold",
      )}>
        {title}
        {shouldAnimate && (
          <motion.div 
            className="bg-aes-green h-[3px] mt-3 rounded-full opacity-80 w-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={underlineReveal}
          />
        )}
      </Heading>
      
      {subtitle && (
        <p className={cn(
          "text-aes-gray tracking-wide", 
          Heading === 'h1' && "text-xl leading-relaxed",
          Heading === 'h2' && "text-lg leading-relaxed",
          centered && "max-w-3xl mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default EnhancedSectionHeading; 
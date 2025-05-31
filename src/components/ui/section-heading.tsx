import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { underlineReveal } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  underlineColor?: string;
  underlineHeight?: number;
  as?: React.ElementType;
  titleAs?: React.ElementType;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
  underlineColor = 'bg-aes-green',
  underlineHeight = 2,
  as: Component = 'div',
  titleAs: TitleComponent = 'h2',
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  
  const underlineAlignClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };
  
  return (
    <Component className={cn("mb-10 max-w-3xl", alignmentClasses[align], className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <TitleComponent className={cn(
          "font-display font-bold text-3xl md:text-4xl text-aes-navy mb-3",
          titleClassName
        )}>
          {title}
        </TitleComponent>
        
        {/* Animated underline */}
        <motion.div 
          className={cn(
            "h-px relative overflow-hidden w-24",
            underlineAlignClasses[align]
          )}
          style={{ height: `${underlineHeight}px` }}
        >
          <motion.div 
            className={cn("absolute inset-0", underlineColor)}
            variants={prefersReducedMotion ? {} : underlineReveal}
            transition={{ delay: 0.2 }}
          />
        </motion.div>
        
        {subtitle && (
          <motion.p 
            className={cn("mt-4 text-aes-gray", subtitleClassName)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </Component>
  );
};

export default SectionHeading; 
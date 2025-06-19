import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hoverLift, subtleIconScale } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface EnhancedFeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  index?: number; // For staggered animations
}

const EnhancedFeatureCard: React.FC<EnhancedFeatureCardProps> = ({
  title,
  description,
  icon,
  className,
  index = 0,
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Base animation that considers accessibility
  const cardAnimation = !prefersReducedMotion ? hoverLift : undefined;
  const iconAnimation = !prefersReducedMotion ? subtleIconScale : undefined;

  return (
    <motion.div
      className={cn(
        "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm",
        className
      )}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={cardAnimation}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div 
        className="h-12 w-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4"
        variants={iconAnimation}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-aes-navy mb-2 tracking-tight font-display">{title}</h3>
      <p className="feature-paragraph text-base">{description}</p>
    </motion.div>
  );
};

export default EnhancedFeatureCard; 
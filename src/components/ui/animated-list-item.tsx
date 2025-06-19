import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { listItemReveal, subtleIconScale } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface AnimatedListItemProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  index?: number; // For staggered animations
}

const AnimatedListItem: React.FC<AnimatedListItemProps> = ({
  icon,
  children,
  className,
  iconClassName,
  index = 0,
}) => {
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion;

  return (
    <motion.li
      className={cn("flex items-start", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={shouldAnimate ? listItemReveal : undefined}
      custom={index}
    >
      {icon && (
        <motion.div
          className={cn("mr-3 mt-0.5", iconClassName)}
          whileHover={shouldAnimate ? "hover" : undefined}
          variants={shouldAnimate ? subtleIconScale : undefined}
        >
          {icon}
        </motion.div>
      )}
      <span className="text-aes-gray tracking-wide leading-relaxed">{children}</span>
    </motion.li>
  );
};

export default AnimatedListItem; 
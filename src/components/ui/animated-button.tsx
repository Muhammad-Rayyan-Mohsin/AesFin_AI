import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { hoverLift, arrowNudge } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';
import { cn } from '@/lib/utils';
import { ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  showArrow?: boolean;
  arrowIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, showArrow = true, arrowIcon, href, onClick, ...props }, ref) => {
    const { prefersReducedMotion } = useAnimation();
    
    // If reduced motion is preferred, use simpler animations
    const buttonAnimation = prefersReducedMotion 
      ? {} 
      : {
          whileHover: "hover",
          whileTap: "tap",
          variants: hoverLift
        };

    const handleClick = () => {
      if (href) {
        window.location.href = href;
      } else if (onClick) {
        onClick();
      }
    };

    return (
      <motion.div
        className="inline-block"
        initial="initial"
        {...buttonAnimation}
      >
        <Button
          ref={ref}
          className={cn(
            "group transition-all duration-300", 
            showArrow && "pr-2",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
          
          {showArrow && (
            <motion.span 
              className="ml-2 flex items-center"
              initial="initial"
              animate="animate"
              variants={prefersReducedMotion ? {} : arrowNudge}
            >
              {arrowIcon || <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </motion.span>
          )}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton; 
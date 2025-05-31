import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { characterAnimation, textContainer } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface AnimatedTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  staggerChildren?: number;
  delayStart?: number;
  charDelay?: number;
  once?: boolean;
  threshold?: number;
  as?: React.ElementType;
  animateOnMount?: boolean;
  onAnimationComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  textClassName,
  staggerChildren = 0.02,
  delayStart = 0,
  charDelay = 0.01,
  once = true,
  threshold = 0.1,
  as: Component = 'div',
  animateOnMount = true,
  onAnimationComplete,
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  // Set different animation variants based on user's preferences
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: delayStart,
      }
    }
  };

  const wordVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    }
  };

  // Split text into words instead of characters
  const words = text.split(' ');

  return (
    <Component className={cn(className, "overflow-wrap-break-word")}>
      {/* Keep the full text for accessibility and SEO, but visually hide it */}
      <span className="sr-only">{text}</span>
      
      <motion.span
        className={cn("flex flex-wrap", textClassName)}
        aria-hidden="true"
        initial={animateOnMount ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={containerVariants}
        onAnimationComplete={onAnimationComplete}
        style={{ 
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          hyphens: 'none'
        }}
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <motion.span
              variants={wordVariants}
              style={{ 
                display: 'inline-block',
                whiteSpace: 'normal'
              }}
              transition={{
                delay: delayStart + (index * charDelay * 5),
              }}
            >
              {word}
            </motion.span>
            {/* Add a space after each word except the last one */}
            {index < words.length - 1 && (
              <motion.span
                variants={wordVariants}
                style={{ 
                  display: 'inline-block',
                  marginRight: '0.25em'
                }}
                transition={{
                  delay: delayStart + (index * charDelay * 5),
                }}
              >
                {'\u00A0'}
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </motion.span>
    </Component>
  );
};

export default AnimatedText; 
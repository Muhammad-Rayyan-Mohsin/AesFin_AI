import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/providers/AnimationProvider';

interface RotatingHeadlineProps {
  baseText: string;
  rotatingWords: {
    names: string[];
    departments: string[];
  };
  className?: string;
  interval?: number;
}

const RotatingHeadline: React.FC<RotatingHeadlineProps> = ({
  baseText,
  rotatingWords,
  className,
  interval = 2000, // 2 seconds by default
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'idle' | 'transitioning'>('idle');
  const [isPaused, setIsPaused] = useState(false);
  const { prefersReducedMotion } = useAnimation();
  const { names, departments } = rotatingWords;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate the maximum number of iterations based on array lengths
  const maxItems = Math.min(names.length, departments.length);
  
  // Setup animation timing
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    
    // If user prefers reduced motion, use a longer interval
    const baseInterval = prefersReducedMotion ? interval * 2 : interval;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set up the animation timer
    timerRef.current = setInterval(() => {
      if (animationState === 'idle') {
        setAnimationState('transitioning');
        setPrevIndex(currentIndex);
        
        // Update the index after a short delay
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex + 1) % maxItems);
          
          // Reset animation state after animation completes
          setTimeout(() => {
            setAnimationState('idle');
          }, 500); // Match animation duration
        }, 250); // Half of animation duration
      }
    }, baseInterval);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [maxItems, interval, prefersReducedMotion, isPaused, animationState, currentIndex]);
  
  // Pause animations on hover for better user experience
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  
  // Get the animation state for a specific item
  const getItemAnimationClass = (index: number, currentIdx: number, prevIdx: number, isAnimating: boolean) => {
    if (!isAnimating) {
      return index === currentIdx ? 'active' : '';
    }
    
    if (index === currentIdx) {
      return 'active entering';
    } else if (index === prevIdx) {
      return 'exiting';
    }
    
    return '';
  };
  
  // Format the text by replacing [Name] and [Department] with the current values
  const formatText = () => {
    // Split the text where [Name] and [Department] should be
    const parts = baseText.split(/\[Name\]|\[Department\]/);
    
    // If no matches, just return the base text as fallback
    if (parts.length <= 1) return baseText;
    
    const isAnimating = animationState === 'transitioning';
    
    return (
      <>
        {parts[0]}
        <span 
          className="word-rotate-container" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          {names.map((name, index) => (
            <span 
              key={name}
              className={cn(
                "word-rotate-item underline text-aes-green font-medium tracking-tight",
                getItemAnimationClass(index, currentIndex, prevIndex, isAnimating)
              )}
            >
              {name}
            </span>
          ))}
        </span>
        {parts[1]}
        <span 
          className="word-rotate-container"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          {departments.map((dept, index) => (
            <span 
              key={dept}
              className={cn(
                "word-rotate-item underline text-aes-green font-medium tracking-tight",
                getItemAnimationClass(index, currentIndex, prevIndex, isAnimating)
              )}
            >
              {dept}
            </span>
          ))}
        </span>
        {parts[2]}
      </>
    );
  };
  
  // Provide a static fallback for users with JavaScript disabled
  const staticFallback = `The financial compliance tool even ${names[0]} in ${departments[0]} wants to use`;
  
  return (
    <>
      {/* Accessible static fallback (only visible when JS is disabled) */}
      <noscript>
        <span className="block">{staticFallback}</span>
      </noscript>
      
      {/* Dynamic version with ARIA live region for screen readers */}
      <span 
        className={cn(
          "leading-tight tracking-tight",
          className
        )} 
        aria-live="polite"
        suppressHydrationWarning // Prevents React hydration warnings from changing content
      >
        {formatText()}
      </span>
    </>
  );
};

export default RotatingHeadline; 
import { useState, useEffect, useRef, RefObject } from 'react';
import { useAnimation } from '@/providers/AnimationProvider';
import { supportsIntersectionObserver } from '@/lib/animation-utils';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  // How long to wait before triggering the animation (ms)
  delay?: number;
  // For staggered animations within a container
  staggerChildren?: boolean;
  staggerDelay?: number;
  // Container query selector for children to animate
  childrenSelector?: string;
}

type AnimationState = 'hidden' | 'visible';

/**
 * Enhanced hook for scroll-triggered animations
 * Uses IntersectionObserver for performance and handles accessibility
 */
export function useEnhancedScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): {
  ref: RefObject<T>;
  animationState: AnimationState;
  visible: boolean;
} {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    staggerChildren = false,
    staggerDelay = 150,
    childrenSelector,
  } = options;
  
  const [visible, setVisible] = useState(false);
  const [animationState, setAnimationState] = useState<AnimationState>('hidden');
  const ref = useRef<T>(null);
  const { prefersReducedMotion } = useAnimation();
  
  useEffect(() => {
    // If reduced motion is preferred, immediately show content
    if (prefersReducedMotion) {
      setVisible(true);
      setAnimationState('visible');
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Fall back if IntersectionObserver is not supported
    if (!supportsIntersectionObserver()) {
      setVisible(true);
      setAnimationState('visible');
      return;
    }
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
            setAnimationState('visible');
            
            // Add staggered animation to children if requested
            if (staggerChildren && childrenSelector) {
              const children = currentRef.querySelectorAll(childrenSelector);
              children.forEach((child, index) => {
                const delayTime = delay + (index * staggerDelay);
                setTimeout(() => {
                  child.classList.add('animate-in');
                }, delayTime);
              });
            }
          }, delay);
          
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setAnimationState('hidden');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [
    threshold, 
    rootMargin, 
    prefersReducedMotion, 
    triggerOnce, 
    delay, 
    staggerChildren, 
    staggerDelay, 
    childrenSelector
  ]);
  
  return { ref, animationState, visible };
} 
import { useEffect } from 'react';

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit how often a function is called
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Use will-change property for elements that are about to animate
 */
export function useWillChange(
  elementRef: React.RefObject<HTMLElement>,
  property: string = 'transform',
  timeout: number = 3000
) {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleMouseEnter = () => {
      element.style.willChange = property;
    };
    
    const handleMouseLeave = () => {
      // Remove willChange after a delay to avoid flickering
      timeoutId = setTimeout(() => {
        element.style.willChange = 'auto';
      }, timeout);
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [elementRef, property, timeout]);
}

/**
 * Enhance performance of animations
 */
export function optimizeAnimation(element: HTMLElement): void {
  // Force GPU acceleration
  element.style.transform = 'translateZ(0)';
  
  // Optional: Add more optimization properties as needed
  // element.style.backfaceVisibility = 'hidden';
}

/**
 * Check if browser supports interaction media query
 */
export function supportsGPUAcceleration(): boolean {
  return (
    typeof window !== 'undefined' && 
    ('GPU' in window || 
      'WebGLRenderingContext' in window || 
      'WebGL2RenderingContext' in window)
  );
}

/**
 * Check if IntersectionObserver is supported
 */
export function supportsIntersectionObserver(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
} 
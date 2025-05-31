import { useState, useEffect } from 'react';

type AnimationPreference = {
  prefersReducedMotion: boolean;
  isAnimationAllowed: boolean;
  shouldUseSimpleFade: boolean;
};

/**
 * Hook to detect user's animation preferences
 * Returns information about animation preferences and accessibility settings
 */
export function useAnimationPreference(): AnimationPreference {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window === 'undefined') return;
    
    // Initial check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes in the preference
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Determine if animations should be allowed at all
  const isAnimationAllowed = !prefersReducedMotion;
  
  // For users with reduced motion preference, we'll use simple fades instead of complex animations
  const shouldUseSimpleFade = prefersReducedMotion;

  return {
    prefersReducedMotion,
    isAnimationAllowed,
    shouldUseSimpleFade
  };
}

/**
 * Helper function to get motion-safe values
 * @param fullAnimation The value to use when animations are allowed
 * @param reducedAnimation The fallback value when animations should be reduced
 */
export function getMotionSafeValue<T>(
  fullAnimation: T, 
  reducedAnimation: T
): T {
  // For server-side rendering, we need to check if window is available
  if (typeof window === 'undefined') return reducedAnimation;
  
  // Check if the user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Return the appropriate value based on the preference
  return prefersReducedMotion ? reducedAnimation : fullAnimation;
} 
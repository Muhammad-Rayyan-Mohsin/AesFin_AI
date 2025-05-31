import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { useAnimationPreference } from '@/hooks/use-animation-preference';

// Define the animation context type
type AnimationContextType = {
  prefersReducedMotion: boolean;
  isAnimationAllowed: boolean;
  shouldUseSimpleFade: boolean;
};

// Create the context with default values
const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  isAnimationAllowed: true,
  shouldUseSimpleFade: false,
});

// Hook to use the animation context
export const useAnimation = () => useContext(AnimationContext);

// Provider component
export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get animation preferences using our custom hook
  const animationPreference = useAnimationPreference();
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    prefersReducedMotion: animationPreference.prefersReducedMotion,
    isAnimationAllowed: animationPreference.isAnimationAllowed,
    shouldUseSimpleFade: animationPreference.shouldUseSimpleFade,
  }), [
    animationPreference.prefersReducedMotion,
    animationPreference.isAnimationAllowed,
    animationPreference.shouldUseSimpleFade,
  ]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Higher-order component to wrap components that need animation preferences
 * Use this when you need to make a component animation-aware without passing props
 */
export function withAnimationPreference<P extends object>(
  Component: React.ComponentType<P & AnimationContextType>
): React.FC<P> {
  return (props: P) => {
    const animationPreference = useAnimation();
    return <Component {...props} {...animationPreference} />;
  };
} 
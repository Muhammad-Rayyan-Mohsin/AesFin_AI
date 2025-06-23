import { useReducedMotion } from 'framer-motion';
import { useDeviceInfo } from './use-mobile';
import { useMemo } from 'react';
import { Variants } from 'framer-motion';
import { 
  getOptimizedVariant, 
  mobileOptimizations,
  animationPerformance 
} from '@/lib/optimized-animations';

export interface AnimationSettings {
  shouldAnimate: boolean;
  animationIntensity: number;
  complexAnimationsEnabled: boolean;
  gpuAcceleration: boolean;
}

export const useOptimizedAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isTablet, touchCapable, reducedMotionPreference } = useDeviceInfo();
  
  const settings = useMemo<AnimationSettings>(() => {
    // Respect user's motion preferences first
    if (prefersReducedMotion || reducedMotionPreference) {
      return {
        shouldAnimate: true, // Still animate, but reduced
        animationIntensity: 0.3,
        complexAnimationsEnabled: false,
        gpuAcceleration: true
      };
    }
    
    // Mobile optimizations
    if (isMobile) {
      return {
        shouldAnimate: true,
        animationIntensity: 0.7,
        complexAnimationsEnabled: false,
        gpuAcceleration: true
      };
    }
    
    // Tablet optimizations
    if (isTablet) {
      return {
        shouldAnimate: true,
        animationIntensity: 0.8,
        complexAnimationsEnabled: true,
        gpuAcceleration: true
      };
    }
    
    // Desktop - full animations
    return {
      shouldAnimate: true,
      animationIntensity: 1,
      complexAnimationsEnabled: true,
      gpuAcceleration: true
    };
  }, [prefersReducedMotion, reducedMotionPreference, isMobile, isTablet]);

  const getVariant = (type: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'): Variants => {
    return getOptimizedVariant(type, !settings.shouldAnimate || settings.animationIntensity < 0.5);
  };

  const getHoverVariant = (baseVariant: any) => {
    if (!settings.shouldAnimate || isMobile || touchCapable) {
      return {};
    }
    return baseVariant;
  };

  const getTouchVariant = (baseVariant: any) => {
    if (!touchCapable) return {};
    return mobileOptimizations.touchInteraction;
  };

  const withPerformanceMonitoring = (animationName: string) => {
    return {
      onAnimationStart: () => animationPerformance.start(),
      onAnimationComplete: () => animationPerformance.end(animationName)
    };
  };

  const getReducedComplexity = (variants: Variants): Variants => {
    return mobileOptimizations.getReducedComplexity(isMobile, variants);
  };

  return {
    settings,
    getVariant,
    getHoverVariant,
    getTouchVariant,
    withPerformanceMonitoring,
    getReducedComplexity,
    // Convenience properties
    shouldUseComplexAnimations: settings.complexAnimationsEnabled,
    isTouchDevice: touchCapable,
    animationDuration: settings.animationIntensity * 0.6, // Scale duration
    springConfig: {
      type: 'spring' as const,
      stiffness: 300 * settings.animationIntensity,
      damping: 30
    }
  };
}; 
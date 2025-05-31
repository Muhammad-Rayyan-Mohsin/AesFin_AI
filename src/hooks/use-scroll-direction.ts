import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    let lastScrollPosition = window.pageYOffset;
    
    function handleScroll() {
      const currentScrollPosition = window.pageYOffset;
      const scrollingDown = currentScrollPosition > lastScrollPosition;
      
      // Don't hide header when at the very top
      if (currentScrollPosition < 50) {
        setIsVisible(true);
      }
      // Show/hide based on scroll direction with a meaningful scroll amount
      else if (Math.abs(currentScrollPosition - lastScrollPosition) > 5) {
        setIsVisible(!scrollingDown);
      }
      
      lastScrollPosition = currentScrollPosition;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isVisible;
} 
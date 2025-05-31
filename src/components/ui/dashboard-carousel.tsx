import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAnimation } from '@/providers/AnimationProvider';
import { coverflowItem } from '@/lib/animation-variants';

interface Screenshot {
  image: string;
  title: string;
  description: string;
}

interface DashboardCarouselProps {
  screenshots: Screenshot[];
  onPrev?: () => void;
  onNext?: () => void;
  activeIndex?: number;
  onSlideChange?: (index: number) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const DashboardCarousel: React.FC<DashboardCarouselProps> = ({ 
  screenshots,
  onPrev,
  onNext,
  activeIndex: externalActiveIndex,
  onSlideChange,
  autoplay = true,
  autoplayInterval = 5000
}) => {
  const [activeIndex, setActiveIndex] = useState(externalActiveIndex ?? 0);
  const { prefersReducedMotion } = useAnimation();

  // Handle external control
  useEffect(() => {
    if (externalActiveIndex !== undefined) {
      setActiveIndex(externalActiveIndex);
    }
  }, [externalActiveIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, autoplayInterval);
    
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, activeIndex]);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? screenshots.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    onPrev?.();
    onSlideChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === screenshots.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    onNext?.();
    onSlideChange?.(newIndex);
  };

  const handleSlideSelect = (index: number) => {
    setActiveIndex(index);
    onSlideChange?.(index);
  };

  // Calculate positions for the coverflow effect
  const getSlideVariant = (index: number) => {
    if (index === activeIndex) return "center";
    
    const isLeft = index < activeIndex;
    // Handle loop wrap-around
    if (isLeft && activeIndex === 0 && index === screenshots.length - 1) return "right";
    if (!isLeft && activeIndex === screenshots.length - 1 && index === 0) return "left";
    
    const position = isLeft ? "left" : "right";
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex + screenshots.length),
      Math.abs(index - activeIndex - screenshots.length)
    );
    
    return position;
  };

  // Get custom value for position (distance from center)
  const getCustomValue = (index: number) => {
    const isLeft = index < activeIndex;
    // Handle loop wrap-around cases
    if (isLeft && activeIndex === 0 && index === screenshots.length - 1) return 1;
    if (!isLeft && activeIndex === screenshots.length - 1 && index === 0) return 1;
    
    const distance = Math.min(
      Math.abs(index - activeIndex),
      Math.abs(index - activeIndex + screenshots.length),
      Math.abs(index - activeIndex - screenshots.length)
    );
    
    return distance;
  };

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* 3D perspective container */}
      <div className="w-full" style={{ perspective: prefersReducedMotion ? 'none' : '1200px' }}>
        <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
          {screenshots.map((screenshot, index) => {
            const variant = getSlideVariant(index);
            const custom = getCustomValue(index);
            const isVisible = custom <= 2; // Only show slides close to the active one for performance
            
            return isVisible && (
              <motion.div
                key={`${screenshot.title}-${index}`}
                className={cn(
                  "absolute top-0 w-full max-w-[800px] rounded-[2rem] overflow-hidden",
                  "transition-all shadow-lg",
                  index === activeIndex ? "border-4 border-white/20 shadow-xl z-30" : "border border-white/10 z-10"
                )}
                style={{ transformStyle: 'preserve-3d' }}
                initial={prefersReducedMotion ? false : "center"}
                animate={prefersReducedMotion ? {
                  opacity: index === activeIndex ? 1 : 0,
                  zIndex: index === activeIndex ? 30 : 10
                } : variant}
                custom={custom}
                variants={coverflowItem}
                onClick={() => handleSlideSelect(index)}
              >
                <div className="relative aspect-[16/9] bg-aes-navy/10">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                    loading={index === activeIndex ? "eager" : "lazy"}
                  />
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-white font-bold text-xl mb-1 overflow-wrap-break-word">{screenshot.title}</h3>
                      <p className="text-white/80 text-sm overflow-wrap-break-word">{screenshot.description}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 hidden md:block">
        <motion.button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20 hidden md:block">
        <motion.button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {screenshots.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${activeIndex === index ? 'bg-aes-green' : 'bg-white/30'}`}
            onClick={() => handleSlideSelect(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: activeIndex === index ? 1.2 : 1,
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCarousel; 
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import DynamicGridBackground from './dynamic-grid-background';
import FloatingElement from './floating-element';
import { useAnimation } from '@/providers/AnimationProvider';
import { threeDSpin } from '@/lib/animation-variants';

interface Hero3DProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  buttons?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  children?: React.ReactNode;
  decorations?: boolean;
}

const Hero3D: React.FC<Hero3DProps> = ({
  title,
  description,
  image,
  buttons,
  className,
  contentClassName,
  imageClassName,
  children,
  decorations = true,
}) => {
  const { prefersReducedMotion } = useAnimation();
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Grid background with gradient */}
      <DynamicGridBackground 
        className="absolute inset-0" 
        gridOpacity={0.1}
        gridColor="rgba(255,255,255,0.2)"
      />
      
      {/* Content container */}
      <div className={cn("container mx-auto px-4 py-16 md:py-24 relative z-10", contentClassName)}>
        <div className="flex flex-col md:flex-row md:items-center md:gap-12">
          {/* Left content column */}
          <div className="md:w-1/2 mb-12 md:mb-0 relative">
            {/* Content passed as props */}
            {(title || description || buttons) && (
              <>
                {title}
                
                {description && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {description}
                  </motion.div>
                )}
                
                {buttons && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8"
                  >
                    {buttons}
                  </motion.div>
                )}
              </>
            )}
            
            {/* If content is passed as children instead */}
            {children && !title && !description && !buttons && (
              <>{children}</>
            )}
            
            {/* Decorative elements */}
            {decorations && !prefersReducedMotion && (
              <>
                <FloatingElement
                  className="absolute -top-20 -left-10 w-40 h-40 rounded-full opacity-20"
                  amplitude={8}
                  duration={7}
                >
                  <div className="w-full h-full bg-aes-green blur-3xl"></div>
                </FloatingElement>
              </>
            )}
          </div>
          
          {/* Right image column */}
          {image && (
            <div className="md:w-1/2 relative">
              <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] perspective-[1200px]">
                {/* Dashboard mockup with 3D rotation */}
                <motion.div
                  className={cn(
                    "relative z-10 w-full h-full flex items-center justify-center",
                    imageClassName
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
                  initial="initial"
                  animate={prefersReducedMotion ? {} : "animate"}
                  variants={threeDSpin}
                >
                  <img
                    src={image}
                    alt="Dashboard preview"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                {/* Decorative elements */}
                {decorations && !prefersReducedMotion && (
                  <>
                    <FloatingElement
                      className="absolute top-1/4 -right-10 w-32 h-32 z-0"
                      amplitude={12}
                      duration={5}
                      delay={1}
                    >
                      <div className="w-full h-full bg-aes-green/20 rounded-full blur-3xl"></div>
                    </FloatingElement>
                    
                    <FloatingElement
                      className="absolute -bottom-10 left-10 w-40 h-40 z-0"
                      amplitude={10}
                      duration={6}
                      delay={2}
                    >
                      <div className="w-full h-full bg-blue-500/20 rounded-full blur-3xl"></div>
                    </FloatingElement>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero3D; 
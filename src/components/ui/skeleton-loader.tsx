import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'button';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}) => {
  const baseClasses = 'bg-gray-200/60 rounded';
  
  const variantClasses = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    button: 'h-10 rounded-xl'
  };

  const animationVariants = {
    pulse: {
      animate: {
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    wave: {
      animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      },
      style: {
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        backgroundSize: '200% 100%'
      }
    },
    none: {}
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : variant === 'circular' ? '40px' : '80px'),
    ...(animationVariants[animation] as any).style
  };

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
      {...(animation !== 'none' ? animationVariants[animation] : {})}
    />
  );
};

// Content skeleton components
export const ContentSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '60%' : '100%'}
        className={index === 0 ? 'h-6' : 'h-4'}
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 border border-gray-200 rounded-lg', className)}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
    <ContentSkeleton lines={3} />
    <div className="mt-4 flex gap-2">
      <Skeleton variant="button" width="100px" />
      <Skeleton variant="button" width="80px" />
    </div>
  </div>
);

export const FeatureCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 border border-gray-200 rounded-xl', className)}>
    <div className="w-12 h-12 mb-4">
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </div>
    <Skeleton variant="text" width="80%" className="h-6 mb-3" />
    <ContentSkeleton lines={2} />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            className="flex-1 h-10"
          />
        ))}
      </div>
    ))}
  </div>
);

export const DashboardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-6', className)}>
    {/* Header */}
    <div className="flex justify-between items-center">
      <Skeleton variant="text" width="200px" className="h-8" />
      <Skeleton variant="button" width="120px" />
    </div>
    
    {/* Stats grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg">
          <Skeleton variant="text" width="60%" className="h-4 mb-2" />
          <Skeleton variant="text" width="40%" className="h-8" />
        </div>
      ))}
    </div>
    
    {/* Main content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <CardSkeleton />
      </div>
      <div>
        <CardSkeleton />
      </div>
    </div>
  </div>
);

export default Skeleton; 
import React from 'react';
import { cn } from '@/lib/utils';

interface JourneyStepProps {
  step: number;
  title: string;
  description: string;
  className?: string;
  isActive?: boolean;
}

const JourneyStep = ({ step, title, description, className, isActive = false }: JourneyStepProps) => {
  return (
    <div className={cn(
      "relative pl-12 pb-8 border-l border-aes-gray/30 last:border-l-0 group transition-all duration-300",
      isActive && "border-l-aes-green",
      className
    )}>
      <div className={cn(
        "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm -translate-x-1/2 border transition-all duration-300",
        isActive 
          ? "border-aes-green text-white bg-aes-green shadow-sm shadow-aes-green/20" 
          : "border-aes-gray/30 text-aes-gray/70 bg-aes-navy"
      )}>
        {step}
      </div>
      <div className="space-y-2">
        <h3 className={cn(
          "text-xl font-display font-medium transition-colors duration-300",
          isActive ? "text-aes-green" : "text-white"
        )}>
          {title}
        </h3>
        <p className="text-sm text-aes-gray/90 font-light">{description}</p>
      </div>
    </div>
  );
};

export default JourneyStep;

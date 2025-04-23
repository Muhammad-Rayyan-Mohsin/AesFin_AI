import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard = ({ icon, title, description, className, index }: FeatureCardProps) => {
  return (
    <div className={cn(
      "group h-full flex flex-col relative overflow-hidden bg-transparent border-t border-white/5 pt-5 md:pt-6 transition-all duration-500",
      "hover:translate-y-[-2px]",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-aes-green/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />
      
      {index !== undefined && (
        <div className="absolute top-0 right-0 text-[10px] font-mono text-aes-green/30 opacity-70 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}
      
      <div className="flex-shrink-0 mb-3 md:mb-5 text-aes-green group-hover:text-aes-greenLight transition-colors duration-300">
        {icon}
      </div>
      
      <h3 className="text-sm md:text-md font-display font-medium text-white mb-2 md:mb-3 transition-colors duration-300 group-hover:text-aes-greenLight">
        {title}
      </h3>
      
      <p className="text-xs md:text-sm text-aes-gray/80 flex-grow font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

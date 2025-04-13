import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "group h-full flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-6 hover:border-aes-green/20 hover:bg-white/8 transition-all duration-300",
      className
    )}>
      <div className="flex-shrink-0 mb-4 w-12 h-12 rounded-full bg-aes-greenPale/70 flex items-center justify-center text-aes-green group-hover:bg-aes-green/15 transition-colors">
        {icon}
      </div>
      
      <h3 className="text-lg font-display font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-aes-gray flex-grow">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

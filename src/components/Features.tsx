import React from 'react';
import { cn } from '@/lib/utils';

interface FeaturesProps {
  className?: string;
}

const Features = ({ className }: FeaturesProps) => {
  return (
    // Add the id="features" attribute here to enable navigation
    <section id="features" className={cn("py-20 bg-gray-50", className)}>
      {/* ... content of your features section ... */}
    </section>
  );
};

export default Features;

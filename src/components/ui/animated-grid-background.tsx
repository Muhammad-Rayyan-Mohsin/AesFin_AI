import React from 'react';

interface AnimatedGridBackgroundProps {
  className?: string;
}

const AnimatedGridBackground: React.FC<AnimatedGridBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none ${className}`}>
      <div className="absolute w-full h-full">
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`h-${i}`} 
            className="absolute left-0 right-0 h-px bg-aes-green/30"
            style={{ 
              top: `${(i + 1) * 5}%`,
              opacity: i % 2 === 0 ? 0.8 : 0.4
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={`v-${i}`} 
            className="absolute top-0 bottom-0 w-px bg-aes-green/30"
            style={{ 
              left: `${(i + 1) * 5}%`,
              opacity: i % 2 === 0 ? 0.8 : 0.4
            }}
          />
        ))}
      </div>
      
      {/* Animated grid shine effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-aes-green/10 to-transparent opacity-30 animate-grid-shine"
        style={{ animationDuration: '8s' }}
      />
    </div>
  );
};

export default AnimatedGridBackground; 
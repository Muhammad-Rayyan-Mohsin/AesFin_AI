import React from 'react';
import { cn } from '@/lib/utils';

interface StepVisualProps {
  step: number;
  isActive: boolean;
}

const StepVisual = ({ step, isActive }: StepVisualProps) => {
  // Colors from the site's theme (updated to match tailwind config)
  const colors = {
    green: "#01ab44",
    greenDark: "#217a46",
    white: "#FFFFFF",
    charcoal: "#333333",
    coral: "#E74C3C",
    greenLight: "rgba(1, 171, 68, 0.2)",
    navy: "#1A2235"
  };

  // Common animation class for all visuals
  const animationClass = cn(
    "transition-all duration-500 ease-out",
    isActive 
      ? "opacity-100 translate-x-0" 
      : "opacity-0 translate-x-20"
  );
  
  // SVG visuals for each step
  const renderVisual = () => {
    switch(step) {
      case 1: // Sign-up & Onboarding
        return (
          <svg 
            className={animationClass}
            width="70%" 
            height="70%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tablet/Laptop frame */}
            <rect x="15" y="20" width="70" height="50" rx="3" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="15" y="20" width="70" height="8" rx="1" stroke={colors.green} strokeWidth="1.5" fill={colors.greenLight} />
            <rect x="15" y="70" width="70" height="10" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            
            {/* Avatar placeholder */}
            <circle cx="50" cy="36" r="6" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <path d="M42 50C42 46.134 45.582 43 50 43C54.418 43 58 46.134 58 50" stroke={colors.green} strokeWidth="1.5" fill="none" />
            
            {/* Form fields */}
            <rect x="30" y="50" width="40" height="4" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="30" y="56" width="40" height="4" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            
            {/* Submit button */}
            <rect x="38" y="64" width="24" height="6" rx="2" fill={colors.green} />
            <text x="40" y="68.5" fontSize="3" fill={colors.white} fontFamily="sans-serif">Get Started</text>
          </svg>
        );
        
      case 2: // Data Sync
        return (
          <svg 
            className={animationClass}
            width="70%" 
            height="70%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cloud icon */}
            <path d="M30 55C30 48.373 35.373 43 42 43C47.392 43 51.878 46.502 53.36 51.366C54.063 51.126 54.818 51 55.6 51C60.24 51 64 54.76 64 59.4C64 64.04 60.24 67.8 55.6 67.8H34.4C29.76 67.8 26 64.04 26 59.4C26 55.982 27.718 53.012 30.285 51.41C30.097 52.572 30 53.772 30 55Z" stroke={colors.green} strokeWidth="1.5" fill="none" />
            
            {/* Folder label */}
            <text x="37" y="58" fontSize="4" fill={colors.green} fontFamily="sans-serif"></text>
            
            {/* Server/database icon */}
            <rect x="65" y="43" width="15" height="25" rx="2" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <line x1="65" y1="49" x2="80" y2="49" stroke={colors.green} strokeWidth="1.5" />
            <line x1="65" y1="55" x2="80" y2="55" stroke={colors.green} strokeWidth="1.5" />
            <line x1="65" y1="61" x2="80" y2="61" stroke={colors.green} strokeWidth="1.5" />
            
            {/* Upload arrow */}
            <path d="M50 48L50 60" stroke={colors.green} strokeWidth="1.5" />
            <path d="M45 53L50 48L55 53" stroke={colors.green} strokeWidth="1.5" />
            
            {/* Lock icon */}
            <rect x="46" y="35" width="8" height="6" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <path d="M48 35V32C48 30.8954 48.8954 30 50 30C51.1046 30 52 30.8954 52 32V35" stroke={colors.green} strokeWidth="1.5" />
          </svg>
        );
        
      case 3: // AI-Powered Analysis
        return (
          <svg 
            className={animationClass}
            width="70%" 
            height="70%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bar chart */}
            <rect x="25" y="60" width="8" height="20" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="38" y="50" width="8" height="30" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="51" y="40" width="8" height="40" rx="1" fill={colors.coral} /> {/* Flagged risk bar in coral/red */}
            <rect x="64" y="45" width="8" height="35" rx="1" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <line x1="20" y1="80" x2="80" y2="80" stroke={colors.green} strokeWidth="1.5" />
            <line x1="20" y1="30" x2="20" y2="80" stroke={colors.green} strokeWidth="1.5" />
            
            {/* Magnifying glass */}
            <circle cx="70" cy="35" r="10" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <line x1="77" y1="42" x2="82" y2="47" stroke={colors.green} strokeWidth="2" />
            
            {/* AI badge */}
            <rect x="25" y="25" width="12" height="12" rx="2" fill={colors.green} />
            <text x="27" y="33" fontSize="6" fill={colors.white} fontFamily="sans-serif">AI</text>
            
            {/* Neural network nodes */}
            <circle cx="30" cy="30" r="1.5" fill={colors.white} />
            <circle cx="26" cy="26" r="1.5" fill={colors.white} />
            <circle cx="34" cy="26" r="1.5" fill={colors.white} />
            <line x1="26" y1="26" x2="30" y2="30" stroke={colors.white} strokeWidth="0.75" />
            <line x1="34" y1="26" x2="30" y2="30" stroke={colors.white} strokeWidth="0.75" />
          </svg>
        );
        
      case 4: // Real-Time Insights
        return (
          <svg 
            className={animationClass}
            width="70%" 
            height="70%" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smartphone silhouette */}
            <rect x="35" y="20" width="30" height="60" rx="3" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="35" y="25" width="30" height="45" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <rect x="48" y="22" width="4" height="1" rx="0.5" fill={colors.green} />
            <circle cx="50" cy="75" r="2" stroke={colors.green} strokeWidth="1" fill="none" />
            
            {/* Notification bubble */}
            <rect x="38" y="30" width="24" height="8" rx="4" fill={colors.greenLight} stroke={colors.green} strokeWidth="1" />
            <text x="40" y="36" fontSize="4" fill={colors.green} fontFamily="sans-serif"> High Risk </text>
            
            {/* Simple chart in phone */}
            <path d="M40 55L45 50L50 52L55 45L60 48" stroke={colors.green} strokeWidth="1.5" fill="none" />
            <circle cx="45" cy="50" r="1" fill={colors.green} />
            <circle cx="50" cy="52" r="1" fill={colors.green} />
            <circle cx="55" cy="45" r="1" fill={colors.green} />
            
            {/* Bell icon with notification dot */}
            <path d="M56 28C56 26.8954 55.1046 26 54 26C52.8954 26 52 26.8954 52 28" stroke={colors.green} strokeWidth="1" />
            <path d="M54 31V29" stroke={colors.green} strokeWidth="1" />
            <circle cx="56" cy="28" r="1.5" fill={colors.coral} /> {/* Red notification dot */}
          </svg>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {renderVisual()}
    </div>
  );
};

export default StepVisual; 
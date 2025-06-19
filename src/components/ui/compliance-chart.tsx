import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnimatedChartLine from './animated-chart-line';
import { fadeIn } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface ComplianceChartProps {
  className?: string;
  height?: number;
  width?: number;
}

const ComplianceChart: React.FC<ComplianceChartProps> = ({
  className,
  height = 200,
  width = 400,
}) => {
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion;
  
  // Sample data paths for risk trend lines
  const riskLine = "M0,150 C50,140 100,160 150,100 S200,20 250,50 S350,120 400,80";
  const fraudLine = "M0,120 C60,140 120,90 180,110 S240,150 300,130 S360,90 400,60";
  
  // Grid lines
  const gridLines = [0, 1, 2, 3, 4].map(i => {
    const y = 40 + i * 40;
    return { y, label: 100 - i * 20 };
  });
  
  return (
    <div className={cn("relative", className)}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="overflow-visible"
      >
        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <motion.g 
            key={i}
            initial="hidden"
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
            variants={shouldAnimate ? fadeIn : undefined}
            custom={i * 0.1}
          >
            <line 
              x1="0" 
              y1={line.y} 
              x2={width} 
              y2={line.y} 
              stroke="#e5e7eb" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
            />
            <text 
              x="-25" 
              y={line.y + 4} 
              fontSize="10" 
              fill="#6b7280"
              textAnchor="start"
            >
              {line.label}%
            </text>
          </motion.g>
        ))}
        
        {/* X-axis labels */}
        {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => (
          <motion.text 
            key={i}
            x={i * (width / 4)} 
            y={height - 5} 
            fontSize="10" 
            fill="#6b7280"
            textAnchor="middle"
            initial="hidden"
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true }}
            variants={shouldAnimate ? fadeIn : undefined}
            custom={i * 0.1 + 0.5}
          >
            {month}
          </motion.text>
        ))}
        
        {/* Chart lines */}
        <AnimatedChartLine 
          path={riskLine} 
          color="#01AB44" // Green for risk line
          strokeWidth={3}
          delay={0.2}
        />
        <AnimatedChartLine 
          path={fraudLine} 
          color="#0070F0" // Blue for fraud line
          strokeWidth={3}
          delay={0.4}
        />
      </svg>
      
      {/* Legend */}
      <div className="flex items-center justify-start mt-4 gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-aes-green rounded-full mr-2"></div>
          <span className="text-xs text-aes-gray">Risk Score</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-xs text-aes-gray">Fraud Alerts</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChart; 
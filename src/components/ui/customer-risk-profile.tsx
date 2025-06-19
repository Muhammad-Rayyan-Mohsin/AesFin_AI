import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { radialProgress, fadeIn } from '@/lib/animation-variants';
import { useAnimation } from '@/providers/AnimationProvider';

interface CustomerRiskProfileProps {
  className?: string;
}

const CustomerRiskProfile: React.FC<CustomerRiskProfileProps> = ({
  className,
}) => {
  const { prefersReducedMotion } = useAnimation();
  const shouldAnimate = !prefersReducedMotion;
  
  // Sample customer data
  const customers = [
    { name: 'Acme Corp', score: 82, status: 'low', color: '#01AB44' },
    { name: 'Global Traders', score: 64, status: 'medium', color: '#FFA500' },
    { name: 'Zenith Financial', score: 91, status: 'low', color: '#01AB44' },
    { name: 'Mercury Inc', score: 43, status: 'high', color: '#EF4444' },
  ];
  
  // Calculate the strokeDashoffset based on the risk score
  // Circle circumference is 2 * PI * radius (45) = ~283
  const calculateOffset = (score: number) => {
    const circumference = 2 * Math.PI * 45;
    return circumference - (circumference * score / 100);
  };
  
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-aes-navy">Customer Risk Assessment</h3>
        <motion.button 
          className="text-xs text-aes-green hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View All
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {customers.map((customer, i) => (
          <motion.div 
            key={i}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            initial="hidden"
            whileInView={shouldAnimate ? "visible" : undefined}
            viewport={{ once: true, margin: "-50px" }}
            variants={shouldAnimate ? fadeIn : undefined}
            custom={i * 0.1}
            whileHover={{ backgroundColor: '#f9fafb' }}
          >
            <div>
              <p className="font-medium text-aes-navy">{customer.name}</p>
              <p className="text-xs text-aes-gray">
                Risk Status: <span className={cn(
                  "font-medium",
                  customer.status === 'low' && "text-green-600",
                  customer.status === 'medium' && "text-orange-500",
                  customer.status === 'high' && "text-red-500",
                )}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
              </p>
            </div>
            
            <div className="relative h-16 w-16 flex items-center justify-center">
              <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={customer.color}
                  strokeWidth="6"
                  strokeDasharray="283"
                  initial="hidden"
                  whileInView={shouldAnimate ? "visible" : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  variants={shouldAnimate ? radialProgress : undefined}
                  custom={calculateOffset(customer.score)}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              
              <div className="text-center">
                <motion.span 
                  className="text-lg font-bold"
                  style={{ color: customer.color }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, transition: { delay: 0.3 } }}
                  viewport={{ once: true }}
                >
                  {customer.score}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRiskProfile; 
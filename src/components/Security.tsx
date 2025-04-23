import React from 'react';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

interface SecurityProps {
  className?: string;
}

const Security = ({ className }: SecurityProps) => {
  return (
    <section id="security" className={cn(
      "relative py-3 bg-aes-navy border-t border-aes-green/10",
      className
    )}>      
      <div className="container">
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
          <Shield className="w-4 h-4 text-aes-green flex-shrink-0" />
          <p className="text-xs text-white/90 font-light">
            Your data is protected with end-to-end encryption.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Security; 
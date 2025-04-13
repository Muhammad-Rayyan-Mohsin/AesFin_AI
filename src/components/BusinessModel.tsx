
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Cloud, Code, DatabaseZap } from 'lucide-react';

interface BusinessModelProps {
  className?: string;
}

const BusinessModel = ({ className }: BusinessModelProps) => {
  const businessFeatures = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "SaaS Solution",
      description: "Flexible subscription model with tiered pricing based on business size and feature requirements."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Integration",
      description: "Seamless connection with your existing accounting software and financial systems."
    },
    {
      icon: <DatabaseZap className="h-6 w-6" />,
      title: "Real-time Sync",
      description: "Continuous data synchronization ensures your financial insights are always current."
    }
  ];

  return (
    <section id="business" className={cn(
      "relative py-20 bg-aes-navyLight",
      className
    )}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center justify-center mb-4 px-4 py-1 bg-aes-navy border border-aes-navy rounded-full text-aes-mint text-sm font-mono">
                BUSINESS MODEL
              </div>
              <h2 className="heading-lg mb-6 text-white">
                Straightforward Deployment & Pricing
              </h2>
              <p className="body-md text-aes-gray mb-8">
                AesFin AI is built to deploy quickly and scale with your business,
                providing immediate value without complex implementation requirements.
              </p>
            </div>
            
            <div className="space-y-6">
              {businessFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-aes-navy flex items-center justify-center text-aes-mint">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-aes-gray">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Pricing Preview */}
          <div className="bg-aes-navy rounded-lg border border-aes-gray/20 overflow-hidden">
            <div className="p-6 border-b border-aes-gray/20">
              <h3 className="text-xl font-display font-semibold text-white mb-1">Early Adopter Pricing</h3>
              <p className="text-sm text-aes-gray">Join the waitlist for special pricing</p>
            </div>
            
            <div className="p-6">
              <div className="flex gap-2 items-baseline mb-4">
                <span className="text-3xl font-display font-bold text-white">$19.99</span>
                <span className="text-sm text-aes-gray">/month</span>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  "Full platform access",
                  "Unlimited financial monitoring",
                  "Custom alert configuration",
                  "Premium support",
                  "API access",
                  "Early feature access"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-aes-mint" />
                    <span className="text-sm text-aes-gray">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="relative px-6 py-4 bg-aes-navyLight rounded border border-aes-gray/20 text-center">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-aes-gold text-aes-navy text-xs font-medium rounded-full">
                  LIMITED TIME
                </span>
                <p className="text-sm text-white font-medium">First 50 businesses receive 30% discount</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;

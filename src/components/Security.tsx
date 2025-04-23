import React from 'react';
import { cn } from '@/lib/utils';
import { Lock, Shield, Database, EyeOff } from 'lucide-react';
import AnimatedSection from './ui/animated-section';

interface SecurityProps {
  className?: string;
}

const Security = ({ className }: SecurityProps) => {
  return (
    <section id="security" className={cn(
      "relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aes-green/30 to-transparent" />
      </div>
      
      <div className="container relative z-10 px-4 md:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-xl text-center mb-10 md:mb-16">
            <div className="inline-flex items-center justify-center mb-4 gap-2">
              <Lock className="h-5 w-5 text-aes-green" />
              <span className="text-aes-green text-sm font-medium uppercase tracking-wider">Security</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-4 text-aes-navy">
              Your Financial Data is Protected
            </h2>
            <p className="text-sm md:text-base text-aes-gray/90 leading-relaxed">
              We use state-of-the-art encryption technology to ensure your sensitive financial information remains private and secure.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-aes-green" />
              </div>
              <h3 className="text-lg font-medium text-aes-navy mb-2">End-to-End Encryption</h3>
              <p className="text-sm text-aes-gray">Your data is encrypted from the moment it leaves your device until it reaches our secure servers, ensuring no unauthorized access.</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-aes-green" />
              </div>
              <h3 className="text-lg font-medium text-aes-navy mb-2">Secure Storage</h3>
              <p className="text-sm text-aes-gray">All data at rest is protected with AES-256 encryption, the same standard used by financial institutions and governments worldwide.</p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                <EyeOff className="h-6 w-6 text-aes-green" />
              </div>
              <h3 className="text-lg font-medium text-aes-navy mb-2">Privacy-First</h3>
              <p className="text-sm text-aes-gray">We follow a zero-knowledge approach, meaning we never see your raw financial data. Only you control who has access to your information.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Security; 
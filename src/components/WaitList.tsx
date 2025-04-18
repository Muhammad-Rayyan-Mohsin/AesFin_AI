import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Building2, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedSection from './ui/animated-section';
import { useToast } from '@/hooks/use-toast';

interface WaitListProps {
  className?: string;
}

const WaitList = ({ className }: WaitListProps) => {
  const { toast } = useToast();

  const handleOpenCalendly = () => {
    window.open('https://calendly.com/ali14hasnain/30min', '_blank');
    toast({
      title: "Success!",
      description: "Opening Calendly to book your demo.",
      variant: "default",
    });
  };

  return (
    <section id="wait-list" className={cn(
      "relative py-32 bg-white overflow-hidden",
      className
    )}>
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        {/* Base Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[grid-shine_3s_ease-in-out_infinite]" />
        
        {/* Subtle Radial Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-aes-green/5 via-transparent to-transparent" />
      </div>
      
      {/* Sparkle decorations */}
      <div className="absolute top-12 left-1/4 text-aes-green animate-pulse">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-24 right-1/3 text-aes-green animate-pulse delay-300">
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-24 left-1/3 text-aes-green animate-pulse delay-500">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute right-1/4 top-1/2 text-aes-green animate-pulse delay-700">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8">
              <span className="text-aes-navy">Try</span> <span className="text-aes-green">AesFin AI</span> <span className="text-aes-navy">for free</span>
            </h2>

            <p className="text-aes-gray text-xl mb-12 max-w-2xl mx-auto">
              Perfect for SMEs. 
              <br />
              Get enterprise-grade financial intelligence at a fraction of the cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-aes-green" />
                </div>
                <h3 className="text-aes-navy font-semibold mb-2">SME Focused</h3>
                <p className="text-aes-gray text-sm">Tailored specifically for small and medium enterprises</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-aes-green" />
                </div>
                <h3 className="text-aes-navy font-semibold mb-2">Quick Setup</h3>
                <p className="text-aes-gray text-sm">Get started in minutes, not days or weeks</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-aes-green" />
                </div>
                <h3 className="text-aes-navy font-semibold mb-2">Secure & Compliant</h3>
                <p className="text-aes-gray text-sm">Enterprise-grade security for your financial data</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-aes-navy hover:bg-aes-navy/90 text-white px-8 py-6 text-lg flex items-center gap-2"
                onClick={handleOpenCalendly}
              >
                <Sparkles className="w-5 h-5" />
                Book a Demo
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WaitList;

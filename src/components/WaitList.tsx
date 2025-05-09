import React, { useState, useEffect } from 'react';
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
  const [activeFeature, setActiveFeature] = useState(0);
  const [email, setEmail] = useState('');
  
  const features = [
    {
      icon: <Building2 className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
      title: "SME Focused",
      description: "Tailored specifically for small and medium enterprises"
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
      title: "Quick Setup",
      description: "Get started in minutes, not days or weeks"
    },
    {
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security for your financial data"
    }
  ];
  
  // Rotate features every 3 seconds on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  const handleOpenCalendly = () => {
    window.open('https://calendly.com/ali14hasnain/30min', '_blank');
    toast({
      title: "Success!",
      description: "Opening Calendly to book your demo.",
      variant: "default",
    });
  };

  const handleWaitlistSignup = () => {
    // Here you would typically integrate with your backend API
    // For now, we'll just show a success toast
    toast({
      title: "Success!",
      description: "You've been added to our waitlist. We'll notify you when we're ready!",
      variant: "default",
    });
  };

  return (
    <section id="wait-list" className={cn(
      "relative py-16 md:py-32 bg-white overflow-hidden",
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

      <div className="container relative z-10 px-4 md:px-8">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8">
              <span className="text-aes-navy">Try</span> <span className="text-aes-green">AesFin AI</span> <span className="text-aes-navy">for free</span>
            </h2>

            <p className="text-aes-gray text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto">
              Perfect for SMEs. 
              <br className="hidden md:block" />
              Get enterprise-grade financial intelligence at a fraction of the cost.
            </p>

            {/* Features - Desktop: Grid, Mobile: Auto-rotating Carousel */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-aes-navy font-semibold mb-2 text-base">{feature.title}</h3>
                  <p className="text-aes-gray text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile: Auto-rotating Feature */}
            <div className="md:hidden flex justify-center mb-12 h-[140px]">
              <div className="w-[280px] relative">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`absolute flex flex-col items-center w-full transition-all duration-500 ${
                      index === activeFeature 
                        ? 'opacity-100 translate-y-0 z-10' 
                        : 'opacity-0 translate-y-8 -z-10'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-aes-navy font-semibold mb-2 text-base">{feature.title}</h3>
                    <p className="text-aes-gray text-sm">{feature.description}</p>
                  </div>
                ))}
                
                {/* Indicators */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                  {features.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeFeature ? 'w-6 bg-aes-green' : 'w-1.5 bg-aes-gray/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-aes-navy hover:bg-aes-navy/90 text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg flex items-center gap-2"
                onClick={handleOpenCalendly}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
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

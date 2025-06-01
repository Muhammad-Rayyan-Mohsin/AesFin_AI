import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Building2, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { WaitlistForm } from './ui/waitlist-form';
import { AnimatedTitle, FadeUpDiv, StaggerContainer, FadeInDiv } from './ui/motion';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { addToWaitlist } from '@/lib/waitlist-service';

interface WaitListProps {
  className?: string;
}

const WaitList = ({ className }: WaitListProps) => {
  const { toast } = useToast();
  const [activeFeature, setActiveFeature] = useState(0);
  
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

  // Waitlist submission handler
  const handleWaitlistSubmit = async (email: string) => {
    try {
      const result = await addToWaitlist(email);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message || "You've been added to our waitlist. We'll notify you when we're ready!",
          variant: "default",
        });
      } else {
        toast({
          title: "Note",
          description: result.error || "There was an issue with your submission.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Error",
        description: "There was an error adding you to the waitlist. Please try again.",
        variant: "destructive",
      });
    }
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
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ 
            x: ['0%', '100%', '0%'],
          }}
          transition={{ 
            duration: 10, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
        
        {/* Subtle Radial Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-aes-green/5 via-transparent to-transparent" />
      </div>
      
      {/* Floating sparkle decorations */}
      <motion.div 
        className="absolute top-12 left-1/4 text-aes-green"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div 
        className="absolute top-24 right-1/3 text-aes-green"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
      <motion.div 
        className="absolute bottom-24 left-1/3 text-aes-green"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
      <motion.div 
        className="absolute right-1/4 top-1/2 text-aes-green"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>

      <div className="container relative z-10 px-4 md:px-8">
        <StaggerContainer>
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedTitle className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8 overflow-wrap-break-word">
              <span className="text-aes-navy">Try</span> <span className="text-aes-green">Aes AI</span> <span className="text-aes-navy">for free</span>
            </AnimatedTitle>

            <FadeInDiv delay={0.2}>
              <p className="text-aes-gray text-lg md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto overflow-wrap-break-word">
                Perfect for SMEs. 
                <br className="hidden md:block" />
                Get enterprise-grade financial intelligence at a fraction of the cost.
              </p>
            </FadeInDiv>

            {/* Features - Desktop: Grid, Mobile: Auto-rotating Carousel */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
              {features.map((feature, index) => (
                <FadeUpDiv key={index} delay={0.3 + index * 0.1}>
                  <div className="flex flex-col items-center group">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-aes-navy font-semibold mb-2 text-base overflow-wrap-break-word">{feature.title}</h3>
                    <p className="text-aes-gray text-sm overflow-wrap-break-word">{feature.description}</p>
                  </div>
                </FadeUpDiv>
              ))}
            </div>

            {/* Mobile: Auto-rotating Feature */}
            <div className="md:hidden flex justify-center mb-12 h-[140px]">
              <div className="w-[280px] relative">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="absolute flex flex-col items-center w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: index === activeFeature ? 1 : 0,
                      y: index === activeFeature ? 0 : 20
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-aes-navy font-semibold mb-2 text-base overflow-wrap-break-word">{feature.title}</h3>
                    <p className="text-aes-gray text-sm overflow-wrap-break-word">{feature.description}</p>
                  </motion.div>
                ))}
                
                {/* Indicators */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2">
                  {features.map((_, index) => (
                    <motion.div 
                      key={index}
                      className="h-1.5 rounded-full bg-aes-gray/30"
                      animate={{ 
                        width: index === activeFeature ? "1.5rem" : "0.375rem",
                        backgroundColor: index === activeFeature ? "#01ab44" : "rgb(141, 156, 168, 0.3)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <FadeUpDiv delay={0.5} className="mb-10 max-w-lg mx-auto">
              <WaitlistForm 
                onSubmit={handleWaitlistSubmit}
                buttonText="Join Waitlist"
                placeholder="Enter your email address"
              />
            </FadeUpDiv>

            <FadeInDiv delay={0.6}>
              <div className="flex justify-center">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-aes-navy hover:bg-aes-navy/90 text-white px-6 py-5 md:px-8 md:py-6 text-base md:text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    onClick={handleOpenCalendly}
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    Book a Demo
                  </Button>
                </motion.div>
              </div>
            </FadeInDiv>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WaitList;

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import JourneyStep from './ui/journey-step';
import { Button } from './ui/button';
import { ChevronRight, Database, LineChart, Upload, Users } from 'lucide-react';
import AnimatedSection from './ui/animated-section';
import AnimatedGridBackground from './ui/animated-grid-background';

interface UserJourneyProps {
  className?: string;
}

const UserJourney = ({ className }: UserJourneyProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  // Auto-advance the journey step if not manually clicked
  useEffect(() => {
    if (!autoAdvance) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => prev < 4 ? prev + 1 : 1);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoAdvance]);
  
  // Pause auto-advance on manual click, resume after 10 seconds
  const handleManualStepChange = (step: number) => {
    setAutoAdvance(false);
    setActiveStep(step);
    
    // Resume auto-advance after 10 seconds
    setTimeout(() => setAutoAdvance(true), 10000);
  };
  
  const steps = [
    {
      step: 1,
      title: "Sign-up & Onboarding",
      description: "Create your account and configure your business profile.",
      icon: <Users className="h-5 w-5 md:h-6 md:w-6" />
    },
    {
      step: 2,
      title: "Data Sync",
      description: "Upload your financial data or connect it via SharePoint/secure API integrations.",
      icon: <Upload className="h-5 w-5 md:h-6 md:w-6" />
    },
    {
      step: 3,
      title: "AI-Powered Analysis",
      description: "Get daily insights and flag risks instantly—no more waiting for month-end audits or manual reviews.",
      icon: <Database className="h-5 w-5 md:h-6 md:w-6" />
    },
    {
      step: 4,
      title: "Real-Time Insights",
      description: "Receive instant alerts, tax receipt readiness, turnover tracking, and personalized reports.",
      icon: <LineChart className="h-5 w-5 md:h-6 md:w-6" />
    }
  ];
  

  return (
    <section id="journey" className={cn(
      "relative py-20 md:py-28 bg-aes-navy overflow-hidden",
      className
    )}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-aes-green/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-aes-green/15 rounded-full blur-[80px]" />
      </div>
      
      <AnimatedGridBackground />
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aes-green/10 to-transparent" />
      
      <div className="container relative z-10 px-4 md:px-8">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center mb-10 md:mb-16">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6 text-aes-green text-xs font-mono tracking-wider">
              <div className="h-px w-4 md:w-8 bg-aes-green/30 mr-2 md:mr-3"></div>
              USER JOURNEY
              <div className="h-px w-4 md:w-8 bg-aes-green/30 ml-2 md:ml-3"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-5 md:mb-8 text-white group">
              <span className="relative inline-block">
                A Simple Path to 
                <span className="absolute bottom-0 left-0 w-full h-px bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
              </span>{" "}
              <span className="text-aes-green relative inline-block">
                Financial Clarity
                <span className="absolute bottom-0 left-0 w-full h-px bg-aes-green/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 origin-left"></span>
              </span>
            </h2>
            <p className="text-base md:text-lg text-aes-gray/90 leading-relaxed max-w-2xl mx-auto">
              Our streamlined process takes you from data to insights in just a few steps,
              with minimal setup time and maximum impact on your financial operations.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 mb-8">
          {/* Left Column - Journey Steps */}
          <AnimatedSection direction="right">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div key={index} onClick={() => handleManualStepChange(step.step)} className="cursor-pointer">
                  <JourneyStep
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isActive={activeStep === step.step}
                  />
                </div>
              ))}
              
              <div className="flex items-center justify-start pt-6">
                <Button 
                  className="bg-aes-green hover:bg-aes-green/90 text-white font-medium"
                  onClick={() => handleManualStepChange(activeStep < 4 ? activeStep + 1 : 1)}
                >
                  {activeStep < 4 ? "Next Step" : "Restart Journey"} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Right Column - Step Visualization */}
          <AnimatedSection direction="left" delay={0.3}>
            <div className="relative h-full flex items-center justify-center">
              <div className="w-full aspect-square max-w-md relative">
                {/* Journey Visualization */}
                <div className="absolute inset-0 rounded-full border-2 border-aes-gray/10 flex items-center justify-center animate-spin-slow">
                  <div className="w-3/4 h-3/4 rounded-full border-2 border-aes-gray/20 flex items-center justify-center animate-spin-slow-reverse">
                    <div className="w-1/2 h-1/2 rounded-full border-2 border-aes-green/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-aes-green flex items-center justify-center text-white font-display font-bold text-xl">
                        AI
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step Icons */}
                {steps.map((step, index) => {
                  // Position icons evenly around the circle
                  const angle = (index * (Math.PI * 2)) / steps.length;
                  const radius = 42; // % of container width
                  const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                  const y = 50 + radius * Math.sin(angle - Math.PI / 2);
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "absolute w-12 h-12 rounded-full -ml-6 -mt-6 flex items-center justify-center transition-all duration-500",
                        activeStep === step.step ? "bg-aes-green text-white scale-110" : "bg-aes-navy border border-aes-gray/20 text-aes-gray scale-100"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      {step.icon}
                    </div>
                  );
                })}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {steps.map((step, index) => {
                    // Calculate start and end points
                    const startAngle = (index * (Math.PI * 2)) / steps.length - Math.PI / 2;
                    const endAngle = ((index + 1) * (Math.PI * 2)) / steps.length - Math.PI / 2;
                    
                    const innerRadius = 10;
                    const outerRadius = 42;
                    
                    const startX = 50 + innerRadius * Math.cos(startAngle);
                    const startY = 50 + innerRadius * Math.sin(startAngle);
                    
                    const endX = 50 + outerRadius * Math.cos(startAngle);
                    const endY = 50 + outerRadius * Math.sin(startAngle);
                    
                    return (
                      <line
                        key={index}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        className={cn(
                          "transition-all duration-500",
                          activeStep === step.step ? "stroke-aes-green stroke-[1.5]" : "stroke-aes-gray/20 stroke-[0.5]"
                        )}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Circular Progress Indicator */}
          <AnimatedSection delay={0.1}>
            <div className="relative w-full flex justify-center mb-12">
              <div className="relative w-64 h-64">
                {/* Central Circle */}
                <div className="absolute inset-0 rounded-full border border-aes-gray/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-aes-green flex items-center justify-center text-white font-display font-bold text-base">
                    AI
                  </div>
                </div>
                
                {/* Step Dots */}
                {steps.map((step, index) => {
                  // Position dots evenly around the circle
                  const angle = (index * (Math.PI * 2)) / steps.length;
                  const radius = 45; // % of container width
                  const x = 50 + radius * Math.cos(angle - Math.PI / 2);
                  const y = 50 + radius * Math.sin(angle - Math.PI / 2);
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "absolute flex flex-col items-center transition-all duration-500 w-12 -ml-6 -mt-6",
                        activeStep === step.step ? "opacity-100" : "opacity-50"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                      onClick={() => handleManualStepChange(step.step)}
                    >
                      <div 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                          activeStep === step.step 
                            ? "bg-aes-green text-white shadow-lg shadow-aes-green/20" 
                            : "bg-aes-navy border border-aes-gray/20 text-aes-gray"
                        )}
                      >
                        {step.icon}
                      </div>
                      <span className={cn(
                        "absolute top-10 text-xs font-medium mt-1 whitespace-nowrap transition-all duration-300 px-2 py-1 rounded-full",
                        activeStep === step.step ? "text-aes-green opacity-100" : "text-aes-gray opacity-0"
                      )}>
                        Step {step.step}
                      </span>
                    </div>
                  );
                })}
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="32" 
                    fill="none" 
                    strokeDasharray="3,3"
                    className="stroke-aes-gray/20" 
                  />
                </svg>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Current Step Details */}
          <AnimatedSection>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5 mb-6">
              <h3 className="text-xl font-display font-semibold text-aes-green mb-2">{steps[activeStep - 1].title}</h3>
              <p className="text-sm text-aes-gray/90 mb-4">{steps[activeStep - 1].description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {steps.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        idx + 1 === activeStep ? "w-6 bg-aes-green" : "w-1.5 bg-aes-gray/30"
                      )}
                      onClick={() => handleManualStepChange(idx + 1)}
                    />
                  ))}
                </div>
                <Button 
                  size="sm"
                  className="bg-aes-green hover:bg-aes-green/90 text-white font-medium text-xs px-3 py-1.5 h-auto"
                  onClick={() => handleManualStepChange(activeStep < 4 ? activeStep + 1 : 1)}
                >
                  {activeStep < 4 ? "Next" : "Restart"} <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;

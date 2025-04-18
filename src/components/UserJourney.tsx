
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import JourneyStep from './ui/journey-step';
import { Button } from './ui/button';
import { ChevronRight, Database, LineChart, Upload, Users } from 'lucide-react';
import AnimatedSection from './ui/animated-section';

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
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Data Sync",
      description: "Upload your financial data or connect it via SharePoint/secure API integrations.",
      icon: <Upload className="h-6 w-6" />
    },
    {
      step: 3,
      title: "AI-Powered Analysis",
      description: "Get daily insights and flag risks instantly—no more waiting for month-end audits or manual reviews.",
      icon: <Database className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Real-Time Insights",
      description: "Receive instant alerts, tax receipt readiness, turnover tracking, and personalized reports.",
      icon: <LineChart className="h-6 w-6" />
    }
  ];
  

  return (
    <section id="journey" className={cn(
      "relative py-20 bg-gradient-to-b from-aes-navy to-aes-navyLight",
      className
    )}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Journey Steps */}
          <AnimatedSection direction="right">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center justify-center mb-4 px-4 py-1 bg-aes-navy border border-aes-navyLight rounded-full text-aes-mint text-sm font-mono">
                  USER JOURNEY
                </div>
                <h2 className="heading-lg mb-6 text-white">
                  A Simple Path to Financial Clarity
                </h2>
                <p className="body-md text-aes-gray mb-8">
                  Our streamlined process takes you from data to insights in just a few steps,
                  with minimal setup time and maximum impact on your financial operations.
                </p>
              </div>
              
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
              </div>
              
              <div className="flex items-center justify-start pt-6">
                <Button 
                  className="bg-aes-mint hover:bg-aes-mintLight text-aes-navy font-medium"
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
                    <div className="w-1/2 h-1/2 rounded-full border-2 border-aes-mint/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-aes-mint flex items-center justify-center text-aes-navy font-display font-bold text-xl">
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
                        activeStep === step.step ? "bg-aes-mint text-aes-navy scale-110" : "bg-aes-navyLight text-aes-gray scale-100"
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
                          activeStep === step.step ? "stroke-aes-mint stroke-[1.5]" : "stroke-aes-gray/20 stroke-[0.5]"
                        )}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default UserJourney;

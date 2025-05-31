import React from 'react';
import { cn } from '@/lib/utils';
import GlassFeatureCard from '@/components/ui/glass-feature-card';
import SectionHeading from '@/components/ui/section-heading';
import DynamicGridBackground from '@/components/ui/dynamic-grid-background';
import { ScrollReveal, ScrollSequence } from '@/components/ui/scroll-reveal';
import ParallaxSection from '@/components/ui/parallax-section';
import AnimatedButton from '@/components/ui/animated-button';
import { Shield, TrendingUp, LineChart, BarChart4, PieChart, ArrowRight, Zap, CloudCog } from 'lucide-react';

interface FeatureProps {
  className?: string;
}

const EnhancedFeatures = ({ className }: FeatureProps) => {
  const features = [
    {
      title: "Real-time Risk Monitoring",
      description: "Monitor financial transactions in real-time with AI-powered risk detection that flags suspicious activities instantly.",
      icon: <Shield className="h-5 w-5 text-aes-green" />
    },
    {
      title: "Advanced Analytics",
      description: "Gain deep insights into your financial data with our advanced analytics tools powered by artificial intelligence.",
      icon: <LineChart className="h-5 w-5 text-aes-green" />
    },
    {
      title: "Smart Compliance Checks",
      description: "Automatically verify transactions against AML regulations and compliance standards.",
      icon: <CloudCog className="h-5 w-5 text-aes-green" />
    },
    {
      title: "Performance Insights",
      description: "Track financial performance with AI-generated insights and recommendations for optimization.",
      icon: <TrendingUp className="h-5 w-5 text-aes-green" />
    },
    {
      title: "Financial Forecasting",
      description: "Predict future trends and potential risks with our machine learning forecasting algorithms.",
      icon: <BarChart4 className="h-5 w-5 text-aes-green" />
    },
    {
      title: "Custom Reporting",
      description: "Generate tailored reports for various stakeholders with automatic data visualization.",
      icon: <PieChart className="h-5 w-5 text-aes-green" />
    }
  ];

  return (
    <section className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      {/* Parallax Background */}
      <ParallaxSection className="absolute inset-0 z-0" speed={0.1} direction="up">
        <DynamicGridBackground
          gridOpacity={0.1}
          gridColor="rgba(1, 171, 68, 0.15)"
          gradientColors={["rgba(1, 171, 68, 0.08)", "rgba(0, 112, 240, 0.05)"]}
        />
      </ParallaxSection>
      
      <div className="container relative z-10 px-4 mx-auto">
        <ScrollReveal>
          <SectionHeading
            title="Powerful Features"
            subtitle="Our AI-powered platform offers a comprehensive suite of tools to streamline your financial compliance processes."
            underlineColor="bg-aes-green"
            titleClassName="overflow-wrap-break-word"
            subtitleClassName="overflow-wrap-break-word"
          />
        </ScrollReveal>
        
        <ScrollSequence staggerChildren={0.1} delayStart={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <GlassFeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                titleClassName="overflow-wrap-break-word"
                descriptionClassName="overflow-wrap-break-word"
              />
            ))}
          </div>
        </ScrollSequence>
        
        <ScrollReveal delay={0.5}>
          <div className="mt-16 text-center">
            <AnimatedButton 
              className="bg-aes-green text-white"
              onClick={() => window.location.href = '/features'}
            >
              Explore All Features
            </AnimatedButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedFeatures; 
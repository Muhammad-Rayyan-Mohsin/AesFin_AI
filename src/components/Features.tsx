import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ZapIcon, BarChart3, Shield, TrendingUp, Clock, AlertCircle, Eye } from 'lucide-react';
import { ScrollReveal, ScrollParallax, ScrollSequence } from './ui/scroll-reveal';
import { AnimatedTitle } from './ui/motion';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  className?: string;
}

const Features = ({ className }: FeaturesProps) => {
  const features: FeatureItem[] = [
    {
      icon: <ZapIcon className="w-6 h-6 text-aes-green" />,
      title: "Real-Time Monitoring",
      description: "Track financial activities as they happen with instant alerts and notifications."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-aes-green" />,
      title: "Advanced Analytics",
      description: "Gain deep insights with AI-powered analysis of your financial data and transactions."
    },
    {
      icon: <Shield className="w-6 h-6 text-aes-green" />,
      title: "Risk Assessment",
      description: "Proactively identify potential risks before they impact your financial operations."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-aes-green" />,
      title: "Performance Tracking",
      description: "Monitor financial performance metrics and track improvements over time."
    },
    {
      icon: <Clock className="w-6 h-6 text-aes-green" />,
      title: "Time-Saving Automation",
      description: "Reduce manual effort with automated processes for routine financial tasks."
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-aes-green" />,
      title: "Compliance Alerts",
      description: "Stay compliant with automated alerts for regulatory requirements and deadlines."
    },
    {
      icon: <Eye className="w-6 h-6 text-aes-green" />,
      title: "Enhanced Visibility",
      description: "Get a comprehensive view of your financial ecosystem in one unified dashboard."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-aes-green" />,
      title: "Audit Readiness",
      description: "Prepare for audits with organized documentation and transparent financial trails."
    },
  ];

  return (
    // Add the id="features" attribute here to enable navigation
    <section id="features" className={cn("py-20 bg-white relative overflow-hidden", className)}>
      {/* Background decorative elements */}
      <ScrollParallax speed={0.1} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-aes-green/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-400/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-aes-green/5 rounded-full blur-3xl" />
      </ScrollParallax>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedTitle 
              as="h2" 
              className="text-4xl font-display font-bold text-aes-navy mb-6 overflow-wrap-break-word"
            >
              Powerful Features for Financial Excellence
            </AnimatedTitle>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-lg text-aes-gray mb-8 overflow-wrap-break-word">
                Our platform delivers intelligent tools to transform your financial operations, 
                increase efficiency, and provide actionable insights.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        
        <ScrollSequence
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          staggerChildren={0.1}
          delayStart={0.3}
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-aes-green/10 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-aes-navy mb-3 overflow-wrap-break-word">{feature.title}</h3>
              <p className="text-aes-gray overflow-wrap-break-word">{feature.description}</p>
            </div>
          ))}
        </ScrollSequence>
        
        <ScrollReveal delay={0.6} className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              className="bg-aes-green text-white hover:bg-aes-green/90 px-8 py-6 text-lg font-medium rounded-lg"
            >
              Explore All Features
            </Button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Features;

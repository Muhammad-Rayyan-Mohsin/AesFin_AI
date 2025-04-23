import React from 'react';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, BarChart3, FileText, ScanSearch, PieChart, RefreshCw, Smartphone } from 'lucide-react';
import FeatureCard from './ui/feature-card';
import AnimatedSection from './ui/animated-section';
import AnimatedGridBackground from './ui/animated-grid-background';

interface OverviewProps {
  className?: string;
}

const Overview = ({ className }: OverviewProps) => {
  const features = [
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Anomaly Detection",
      description: "Automatically detect unusual transactions and financial patterns that may indicate errors or fraud."
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      title: "Risk Scoring",
      description: "Assign risk scores to transactions and accounts based on AI analysis of multiple data points."
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Variance Analysis",
      description: "Compare actual financial performance against budgets and historical data to identify trends."
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "AI-Generated Commentary",
      description: "Receive plain-language explanations of financial data and suggestions for improvement."
    },
    {
      icon: <ScanSearch className="h-5 w-5" />,
      title: "Document Intelligence",
      description: "Extract and analyze data from invoices, receipts, and financial documents automatically."
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Real-time Dashboards",
      description: "View customizable dashboards that update in real-time as new financial data is processed."
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Inventory Turnover",
      description: "Track and optimize your inventory efficiency with real-time turnover analysis and forecasting."
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Alert Notifications",
      description: "Receive instant alerts about critical financial events via email or mobile notifications."
    }
  ];

  return (
    <section id="overview" className={cn(
      "relative py-28 bg-aes-navy overflow-hidden",
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
          <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
            <div className="inline-flex items-center justify-center mb-4 md:mb-6 text-aes-green text-xs font-mono tracking-wider">
              <div className="h-px w-4 md:w-8 bg-aes-green/30 mr-2 md:mr-3"></div>
              CAPABILITIES
              <div className="h-px w-4 md:w-8 bg-aes-green/30 ml-2 md:ml-3"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-5 md:mb-8 text-white group">
              <span className="text-aes-green relative inline-block">
                LLM
                <span className="absolute bottom-0 left-0 w-full h-px bg-aes-green/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
              </span>{" "}
              <span className="relative inline-block">
                Financial Intelligence
                <span className="absolute bottom-0 left-0 w-full h-px bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 origin-left"></span>
              </span>
            </h2>
            <p className="text-base md:text-lg text-aes-gray/90 leading-relaxed max-w-2xl mx-auto">
              AesFin AI integrates directly with your existing accounting tools, providing real-time financial insights without disrupting your workflow.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-14 md:gap-x-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={0.05 * index} threshold={0.1}>
              <div className="h-full"> 
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;

import React from 'react';
import { cn } from '@/lib/utils';
import { Activity, AlertCircle, BarChart3, Clock, FileText, PieChart, ScanSearch, Smartphone, Zap } from 'lucide-react';
import FeatureCard from './ui/feature-card';
import AnimatedSection from './ui/animated-section';

interface OverviewProps {
  className?: string;
}

const Overview = ({ className }: OverviewProps) => {
  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Anomaly Detection",
      description: "Automatically detect unusual transactions and financial patterns that may indicate errors or fraud."
    },
    {
      icon: <AlertCircle className="h-6 w-6" />,
      title: "Risk Scoring",
      description: "Assign risk scores to transactions and accounts based on AI analysis of multiple data points."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Variance Analysis",
      description: "Compare actual financial performance against budgets and historical data to identify trends."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "AI-Generated Commentary",
      description: "Receive plain-language explanations of financial data and suggestions for improvement."
    },
    {
      icon: <ScanSearch className="h-6 w-6" />,
      title: "Document Intelligence",
      description: "Extract and analyze data from invoices, receipts, and financial documents automatically."
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Real-time Dashboards",
      description: "View customizable dashboards that update in real-time as new financial data is processed."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Automated Reporting",
      description: "Schedule and generate comprehensive financial reports without manual effort."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Alert Notifications",
      description: "Receive instant alerts about critical financial events via email or mobile notifications."
    }
  ];

  return (
    <section id="overview" className={cn(
      "relative py-20 bg-aes-navy",
      className
    )}>
      <div className="container relative z-10">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4 px-4 py-1 bg-aes-greenPale border border-aes-green/20 rounded-full text-aes-greenDark text-sm font-mono">
              OVERVIEW
            </div>
            <h2 className="heading-lg mb-6 text-white">
              Cutting-edge LLM Financial Intelligence
            </h2>
            <p className="body-md text-aes-gray">
              AesFin AI integrates directly with your existing accounting tools like QuickBooks and Excel
              to provide real-time financial insights and anomaly detection without disrupting your workflow.
            </p>
          </div>
        </AnimatedSection>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={0.1 * index} threshold={0.1}>
              <div className="h-full"> {/* Added wrapper to maintain consistent height */}
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
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

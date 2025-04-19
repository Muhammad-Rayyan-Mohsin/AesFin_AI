import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, AlertCircle, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedSection from './ui/animated-section';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const sampleTransactions = [
    {
      id: 1,
      description: "International Wire Transfer",
      amount: "$45,230.00",
      risk: "high",
      date: "2024-03-15"
    },
    {
      id: 2,
      description: "Vendor Payment - Tech Solutions",
      amount: "$12,850.00",
      risk: "low",
      date: "2024-03-14"
    },
    {
      id: 3,
      description: "Recurring Payment - Cloud Services",
      amount: "$3,499.99",
      risk: "medium",
      date: "2024-03-13"
    },
    {
      id: 4,
      description: "Payroll Distribution",
      amount: "$78,500.00",
      risk: "low",
      date: "2024-03-12"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className={cn(
      "relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24",
      className
    )}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <AnimatedSection>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-aes-navy leading-tight mb-6">
                Automate your  <br />
                finances- <br />
                from <span className="line-through text-aes-gray/50">months</span> to <span className="text-aes-green">minutes</span>
              </h1>
              
              <p className="text-xl text-aes-gray mb-8">
                The most complete AI copilot for financial auditors and accountants.
              </p>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="default" 
                  className="border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all duration-300 group px-5 py-2 text-sm"
                  onClick={() => window.location.href = '/demo'}
                >
                  Watch Demo
                  <ChevronRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="default"
                  className="bg-aes-green text-white hover:bg-white hover:text-aes-green border border-aes-green transition-all duration-300 group px-5 py-2 text-sm font-medium transform shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                  onClick={() => window.location.href = '/demo'}
                >
                  Book a Call
                  <ChevronRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - UI Demo */}
          <div className="relative">
            <AnimatedSection delay={0.3}>
              {/* Risk Score Card */}
              <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 bg-white rounded-lg shadow-lg p-3 sm:p-4 border border-emerald-100 scale-90 sm:scale-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Risk Score</p>
                    <p className="text-2xl font-bold text-emerald-600">87%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-emerald-600">12% improvement</span>
                </div>
              </div>

              {/* Main UI Preview */}
              <div className="bg-white rounded-xl shadow-2xl border border-emerald-100 p-4 sm:p-6 scale-90 sm:scale-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      Export
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Review All
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {sampleTransactions.map((transaction) => (
                    <div key={transaction.id} 
                         className="flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        transaction.risk === 'high' ? 'bg-red-500' :
                        transaction.risk === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                      )}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          getRiskColor(transaction.risk)
                        )}>
                          {transaction.risk.charAt(0).toUpperCase() + transaction.risk.slice(1)} Risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Card */}
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white rounded-lg shadow-lg p-3 sm:p-4 border border-emerald-100 scale-90 sm:scale-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total Monitored</p>
                    <p className="text-lg font-bold text-emerald-600">$140,080.00</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-medium text-gray-600">Flagged</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">$48,730</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-gray-600">Cleared</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">$91,350</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

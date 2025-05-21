import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, AlertCircle, TrendingUp, TrendingDown, DollarSign, AlertTriangle, Sparkles, UserPlus, Users, ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedSection from './ui/animated-section';
import { Link } from 'react-router-dom';
import WaitlistDialog from './ui/waitlist-dialog';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { faker } from '@faker-js/faker';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import styles from './Hero.module.css';

// Sample waitlist data (in a real app, this would come from the API)
const generateSampleWaitlistUsers = (count = 7) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.person.firstName(),
    avatar: faker.image.avatar(),
    companyRole: faker.person.jobTitle(),
    joinedAt: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const [riskScoreIndex, setRiskScoreIndex] = useState(0);
  const [totalMonitored, setTotalMonitored] = useState(140080);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistUsers, setWaitlistUsers] = useState(generateSampleWaitlistUsers());
  const [totalWaitlistCount, setTotalWaitlistCount] = useState(1238);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Risk score data to cycle through
  const riskScoreData = [
    { 
      score: 87, 
      change: -12, 
      label: "Risk Score"
    },
    { 
      score: 92, 
      change: 8, 
      label: "Risk Score" 
    },
    { 
      score: 76, 
      change: -5, 
      label: "Risk Score" 
    },
    { 
      score: 94, 
      change: 14, 
      label: "Risk Score" 
    },
    { 
      score: 71, 
      change: -23, 
      label: "Risk Score" 
    },
    { 
      score: 83, 
      change: 7, 
      label: "Risk Score" 
    },
    { 
      score: 68, 
      change: -15, 
      label: "Risk Score" 
    },
    { 
      score: 90, 
      change: 22, 
      label: "Risk Score" 
    },
    { 
      score: 65, 
      change: -25, 
      label: "Risk Score" 
    },
    { 
      score: 88, 
      change: 10, 
      label: "Risk Score" 
    },
    { 
      score: 59, 
      change: -29, 
      label: "Risk Score" 
    },
    { 
      score: 78, 
      change: 19, 
      label: "Risk Score" 
    },
    { 
      score: 63, 
      change: -15, 
      label: "Risk Score" 
    },
    { 
      score: 85, 
      change: 22, 
      label: "Risk Score" 
    },
    { 
      score: 72, 
      change: -13, 
      label: "Risk Score" 
    }
  ];

  // Auto-rotate risk score every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScoreIndex((prevIndex) => 
        prevIndex < riskScoreData.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-increment total monitored amount
  useEffect(() => {
    const interval = setInterval(() => {
      // Random increment between $10 and $100
      const increment = Math.floor(Math.random() * 91) + 10;
      setTotalMonitored(prev => prev + increment);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Format currency with commas and decimal places
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Current risk score data
  const currentRiskData = riskScoreData[riskScoreIndex];
  const isImprovement = currentRiskData.change < 0;
  
  // Determine text color based on change (down is good, up is bad for risk)
  const getMetricColor = (score, isImprovement) => {
    return isImprovement ? "text-emerald-600" : "text-red-600";
  };

  // Determine icon color and component based on change
  const getChangeDisplay = (change, isImprovement) => {
    const absChange = Math.abs(change);
    
    // For risk score, down arrow is good (green), up arrow is bad (red)
    return isImprovement ? (
      <>
        <TrendingDown className="w-4 h-4 text-emerald-600" />
        <span className="text-sm text-emerald-600">{absChange}% improvement</span>
      </>
    ) : (
      <>
        <TrendingUp className="w-4 h-4 text-red-600" />
        <span className="text-sm text-red-600">{absChange}% increase</span>
      </>
    );
  };

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

  // Function to handle waitlist signup
  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to save the email
      // For now, simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));

      // In production, this would use the actual API endpoint:
      // const { data, error } = await supabase
      //   .from('waitlist')
      //   .insert([{ email: waitlistEmail }]);

      // Add new user to the display list (for demo purposes)
      const newUser = {
        id: waitlistUsers.length + 1,
        name: faker.person.firstName(),
        avatar: faker.image.avatar(),
        companyRole: faker.person.jobTitle(),
        joinedAt: new Date().toISOString(),
      };

      setWaitlistUsers(prev => [newUser, ...prev.slice(0, 8)]);
      setTotalWaitlistCount(prev => prev + 1);
      setWaitlistEmail('');
      
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we're ready!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Error",
        description: "There was an error adding you to the waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className={cn(
      "relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 pt-16 pb-12 md:pt-28 md:pb-24",
      className
    )}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className={styles["animate-hero-gradient"] + " absolute inset-0 z-0"} />
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-aes-green/5 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-blue-400/5 blur-2xl" />
        <div className="absolute -bottom-24 right-1/4 w-72 h-72 rounded-full bg-aes-green/5 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
      </div>
      
      <div className="container relative z-10">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aes-green/10 mb-5">
                <Sparkles className="h-3.5 w-3.5 text-aes-green" />
                <span className="text-xs font-medium text-aes-green">AI-Powered Financial Intelligence</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold text-aes-navy leading-tight mb-6">
                Automate your  <br />
                finances- <br />
                <span className="relative">
                  from <span className="line-through text-aes-gray/50">months</span> to <span className="text-aes-green">minutes</span>
                  <svg className="absolute -bottom-3 left-0 w-full" height="9" viewBox="0 0 140 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7.5C20 2.5 88 -1.5 139 4.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-aes-gray mb-8">
                The most complete AI copilot for financial auditors and accountants.
              </p>

              <div className="flex gap-4">
                <a href="https://calendly.com/ali14hasnain/30min" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="default"
                    className="bg-aes-green text-white hover:bg-white hover:text-aes-green border border-aes-green transition-all duration-300 group px-5 py-2 text-sm font-medium transform shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                  >
                    Book a Call
                    <ChevronRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
                <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="default"
                      variant="outline"
                      className="border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all duration-300 group px-5 py-2 text-sm font-medium transform shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                      onClick={() => setIsDemoOpen(true)}
                    >
                      Watch Demo
                      <PlayCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full aspect-video">
                    <DialogHeader>
                      <DialogTitle>Product Demo</DialogTitle>
                    </DialogHeader>
                    <div className="w-full aspect-video">
                      {isDemoOpen && (
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/aMohh4bLFlo?autoplay=1"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - UI Demo */}
          <div className="relative">
            <AnimatedSection delay={0.3}>
              {/* Background glow for UI demo */}
              <div className="absolute inset-0 bg-gradient-to-br from-aes-green/5 via-blue-400/5 to-transparent rounded-3xl blur-xl -m-4" />
              
              {/* Risk Score Card */}
              <div className="absolute -top-8 -left-8 sm:-top-12 sm:-left-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 border border-emerald-100 scale-90 sm:scale-100 z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${isImprovement ? "bg-emerald-100" : "bg-red-100"} rounded-full flex items-center justify-center transition-colors duration-300`}>
                    <AlertCircle className={`w-5 h-5 ${isImprovement ? "text-emerald-600" : "text-red-600"} transition-colors duration-300`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{currentRiskData.label}</p>
                    <p className={cn("text-2xl font-bold transition-colors duration-300", getMetricColor(currentRiskData.score, isImprovement))}>
                      {currentRiskData.score}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 h-6 transition-all duration-300">
                  {getChangeDisplay(currentRiskData.change, isImprovement)}
                </div>
              </div>

              {/* Main UI Preview */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-emerald-100 p-4 sm:p-6 scale-90 sm:scale-100 relative z-0">
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
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 border border-emerald-100 scale-90 sm:scale-100 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total Monitored</p>
                    <p className="text-lg font-bold text-emerald-600 transition-all duration-500">
                      {formatCurrency(totalMonitored)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-medium text-gray-600">Flagged</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 transition-all duration-500">
                      {formatCurrency(Math.round(totalMonitored * 0.35))}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-medium text-gray-600">Cleared</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 transition-all duration-500">
                      {formatCurrency(Math.round(totalMonitored * 0.65))}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Mobile layout - optimized for better organization */}
        <div className="lg:hidden flex flex-col items-center text-center">
          <AnimatedSection>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aes-green/10 mb-4">
              <Sparkles className="h-3 w-3 text-aes-green" />
              <span className="text-xs font-medium text-aes-green">AI-Powered Finance</span>
            </div>
            
            {/* Header content */}
            <div className="mb-8">
              <h1 className="text-4xl font-display font-bold text-aes-navy leading-tight mb-4">
                Automate your finances- from <span className="line-through text-aes-gray/50">months</span> to <span className="text-aes-green relative">
                  minutes
                  <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 60 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 2.5C10 1 30 0.5 59 2.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-base text-aes-gray mb-6">
                The most complete AI copilot for financial auditors and accountants.
              </p>

              <div className="flex justify-center gap-4">
                <a href="https://calendly.com/ali14hasnain/30min" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="sm"
                    className="bg-aes-green text-white hover:bg-white hover:text-aes-green border border-aes-green transition-all duration-300 group px-4 py-1.5 text-xs font-medium shadow-sm"
                  >
                    Book a Call
                    <ChevronRight className="w-3 h-3 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </a>
                <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all duration-300 group px-4 py-1.5 text-xs font-medium shadow-sm"
                      onClick={() => setIsDemoOpen(true)}
                    >
                      Watch Demo
                      <PlayCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full aspect-video">
                    <DialogHeader>
                      <DialogTitle>Product Demo</DialogTitle>
                    </DialogHeader>
                    <div className="w-full aspect-video">
                      {isDemoOpen && (
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/aMohh4bLFlo?autoplay=1"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </AnimatedSection>

          {/* Cards in a 2-column grid */}
          <div className="relative">
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-3">
                {/* Risk Score Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-3 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 ${isImprovement ? "bg-emerald-100" : "bg-red-100"} rounded-full flex items-center justify-center transition-colors duration-300`}>
                      <AlertCircle className={`w-4 h-4 ${isImprovement ? "text-emerald-600" : "text-red-600"} transition-colors duration-300`} />
                    </div>
                    <p className="text-xs font-medium text-gray-900">{currentRiskData.label}</p>
                  </div>
                  <p className={cn("text-xl font-bold mb-1 transition-colors duration-300", getMetricColor(currentRiskData.score, isImprovement))}>
                    {currentRiskData.score}%
                  </p>
                  <div className="flex items-center gap-1 h-5 transition-all duration-300">
                    {currentRiskData.change < 0 ? (
                      <>
                        <TrendingDown className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs text-emerald-600">
                          {Math.abs(currentRiskData.change)}% improvement
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-3 h-3 text-red-600" />
                        <span className="text-xs text-red-600">
                          {currentRiskData.change}% increase
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Analytics Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md p-3 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">Total Monitored</p>
                  </div>
                  <p className="text-base font-bold text-emerald-600 mb-2">{formatCurrency(totalMonitored)}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="flex items-center">
                      <AlertTriangle className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="font-medium text-gray-600">Flagged:</span>
                    </div>
                    <p className="font-bold text-gray-900 ml-1">
                      {formatCurrency(Math.round(totalMonitored * 0.35))}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Main Transaction Card */}
            <AnimatedSection delay={0.3}>
              <div className="mt-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-6 px-2">
                    Review All
                  </Button>
                </div>
                <div className="space-y-2">
                  {sampleTransactions.slice(0, 2).map((transaction) => (
                    <div key={transaction.id} 
                         className="flex items-center gap-2 p-2 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        transaction.risk === 'high' ? 'bg-red-500' :
                        transaction.risk === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'
                      )}></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-[10px] text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-900">{transaction.amount}</p>
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded-full",
                          getRiskColor(transaction.risk)
                        )}>
                          {transaction.risk.charAt(0).toUpperCase() + transaction.risk.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
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

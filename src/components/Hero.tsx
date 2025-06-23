import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  Shield, 
  LineChart, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Loader2,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { WaitlistDialog } from './ui/unified-waitlist';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { faker } from '@faker-js/faker';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import styles from './Hero.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTitle, FadeUpDiv, FadeInDiv, SlideInLeftDiv, SlideInRightDiv, ScaleUpDiv } from './ui/motion';
import AnimatedText from './ui/animated-text';
import AnimatedSection from './ui/animated-section';
import FloatingElement from './ui/floating-element';
import ParallaxSection from './ui/parallax-section';
import Hero3D from './ui/hero-3d';
import AnimatedButton from './ui/animated-button';
import DynamicGridBackground from './ui/dynamic-grid-background';
import { ScrollReveal, ScrollSequence } from './ui/scroll-reveal';
import SectionHeading from './ui/section-heading';
import { addToWaitlist } from '@/lib/waitlist-service';
import RequestDemo from './RequestDemo';
import VideoButton from './VideoButton';

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
      amount: "$17,553",
      account: "ACC-773",
      time: "11:21 PM",
      status: "flagged"
    },
    {
      id: 2,
      amount: "$10,510",
      account: "ACC-224",
      time: "11:21 PM",
      status: "approved"
    },
    {
      id: 3,
      amount: "$25,628",
      account: "ACC-923",
      time: "11:21 PM",
      status: "approved"
    }
  ];

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'flagged':
        return 'bg-red-50 text-red-700';
      case 'approved':
        return 'bg-emerald-50 text-emerald-700';
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
      // Use the actual waitlist service
      const result = await addToWaitlist(waitlistEmail);
      
      if (result.success) {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-aes-navy via-aes-navyLight to-aes-navy"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,51,71,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,51,71,0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:4rem_4rem] sm:bg-[size:2rem_2rem]"></div>
        
        {/* Animated gradient overlay - disabled on small mobile for performance */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-aes-navy/30 to-transparent hidden sm:block"
          animate={{ 
            x: ['0%', '100%', '0%'],
          }}
          transition={{ 
            duration: 15, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
      </div>
      
      {/* Green accent glows - simplified for mobile */}
      <div className="absolute left-1/4 top-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-aes-green opacity-10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute right-1/4 top-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-aes-green opacity-8 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute left-1/2 bottom-0 w-[300px] md:w-[600px] h-[200px] md:h-[300px] bg-aes-navyLight opacity-30 blur-[40px] md:blur-[80px] rounded-full pointer-events-none transform -translate-x-1/2"></div>
      
      {/* Floating elements - hidden on mobile for performance */}
      <div className="absolute top-20 left-[15%] w-8 h-8 rounded-full border border-aes-green/20 animate-float opacity-60 hidden md:block"></div>
      <div className="absolute top-40 right-[20%] w-4 h-4 rounded-full border border-aes-green/30 animate-float opacity-70 hidden md:block" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-[30%] w-6 h-6 rounded-full border border-aes-green/20 animate-float opacity-50 hidden md:block" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">
          {/* Left column with text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Top badge - lowered by increasing margin and adjusting position */}
            <div className="relative top-4 inline-flex items-center px-4 py-1.5 mb-10 text-sm font-medium rounded-full bg-aes-green/10 text-aes-green tracking-wide mx-auto lg:mx-0">
              <Zap className="w-3.5 h-3.5 mr-2" />
              <span>AI-Powered Financial Intelligence</span>
            </div>
            
            {/* Main heading - Mobile optimized */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 sm:mb-8 md:mb-10 leading-tight">
              <span className="block bg-gradient-to-r from-white via-white to-aes-green text-transparent bg-clip-text">Automating Audits from months to minutes</span>
            </h1>
            
            {/* Feature icons - Mobile optimized */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-aes-green/10 flex items-center justify-center mr-2 sm:mr-3">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aes-green" />
                </div>
                <span className="text-white text-xs sm:text-sm">AI Risk Scoring</span>
              </div>
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-aes-green/10 flex items-center justify-center mr-2 sm:mr-3">
                  <LineChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aes-green" />
                </div>
                <span className="text-white text-xs sm:text-sm">Real-time Analytics</span>
              </div>
              <div className="flex items-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-aes-green/10 flex items-center justify-center mr-2 sm:mr-3">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-aes-green" />
                </div>
                <span className="text-white text-xs sm:text-sm">Instant Reconciliation</span>
              </div>
            </div>
            
            {/* CTA Buttons - Touch-friendly mobile optimized */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 md:mb-16">
              <RequestDemo 
                buttonVariant="primary"
                buttonSize="lg"
                buttonText="Request Demo"
                className="rounded-xl px-6 md:px-8 py-4 bg-aes-green hover:bg-aes-green/90 text-white shadow-lg text-base font-medium min-h-[48px] transition-all duration-200 hover:scale-105 active:scale-95"
              />
              
              <VideoButton 
                buttonSize="lg"
                buttonText="Watch Demo Video"
                className="rounded-xl border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white shadow-lg px-6 md:px-8 py-4 text-base font-medium min-h-[48px] transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm"
              />
            </div>
          </div>
          
          {/* Dashboard cards - desktop and mobile versions */}
          <div className="w-full lg:w-1/2 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-[480px] mx-auto border border-aes-grayLight">
              {/* Card header */}
              <div className="p-6 border-b border-aes-grayLight">
                <h3 className="text-lg font-bold text-aes-navy">Financial Intelligence Dashboard</h3>
                <p className="text-sm text-aes-gray">Real-time risk assessment and transaction monitoring</p>
              </div>
              
              {/* Risk score section */}
              <div className="px-6 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-aes-green">69</span>
                    <span className="text-aes-gray ml-1">/100</span>
                  </div>
                  <div className="px-2.5 py-1 bg-aes-greenPale rounded-full">
                    <span className="text-xs font-medium text-aes-green">Low Risk</span>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-aes-navy">91%</span>
                    <span className="text-xs text-aes-gray ml-1">Compliance</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-aes-navy">0</span>
                    <span className="text-xs text-aes-gray ml-1">Anomalies</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-aes-navy">1,272</span>
                    <span className="text-xs text-aes-gray ml-1">Processed</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-aes-gray">Risk Assessment Progress</span>
                    <span className="text-xs text-aes-green">Real-time</span>
                  </div>
                  <div className="w-full h-1.5 bg-aes-grayLight rounded-full overflow-hidden">
                    <div className="h-full bg-aes-green rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Live transaction monitor */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-aes-navy">Live Transaction Monitor</h4>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-aes-green mr-1.5"></div>
                    <span className="text-xs text-aes-green">Live</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {sampleTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-3 bg-aes-mintBg rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        {transaction.status === 'flagged' ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-aes-green mr-2" />
                        )}
                        <div>
                          <div className="font-medium text-aes-navy">{transaction.amount}</div>
                          <div className="text-xs text-aes-gray">{transaction.account}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-aes-gray">{transaction.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.status === 'flagged' 
                            ? 'bg-red-50 text-red-700' 
                            : 'bg-aes-greenPale text-aes-green'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/transactions" className="text-sm font-medium text-aes-green hover:text-aes-green/80 flex items-center">
                  View All Transactions
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile optimized dashboard preview */}
          <div className="w-full lg:hidden mt-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg max-w-[400px] mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-base">Financial Dashboard</h3>
                <div className="px-2 py-0.5 bg-aes-green/20 rounded-full">
                  <span className="text-xs text-aes-green font-medium">Live</span>
                </div>
              </div>
              
              <div className="flex gap-3 mb-4">
                {/* Risk score simplified card */}
                <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3.5 h-3.5 text-aes-green" />
                    <span className="text-xs text-white/90">Risk Score</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-white">69</span>
                    <span className="text-white/60 ml-1 text-xs">/100</span>
                  </div>
                </div>
                
                {/* Transactions simplified card */}
                <div className="flex-1 bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-3.5 h-3.5 text-aes-green" />
                    <span className="text-xs text-white/90">Processed</span>
                  </div>
                  <span className="text-2xl font-bold text-white">1,272</span>
                </div>
              </div>
              
              {/* Single transaction preview */}
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-aes-green mr-2" />
                    <div>
                      <div className="font-medium text-white text-sm">{sampleTransactions[0].amount}</div>
                      <div className="text-xs text-white/60">{sampleTransactions[0].account}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-aes-green/20 text-aes-green">
                    approved
                  </span>
                </div>
              </div>
              
              <Link to="/transactions" className="text-xs font-medium text-aes-green hover:text-aes-green/80 flex items-center justify-center w-full">
                View Full Dashboard
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero footer text */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-aes-gray/80 text-xs mb-2">Trusted by forward-thinking financial professionals</p>
          <p className="text-aes-gray/80 text-xs">
            Enterprise Ready <span className="mx-2">|</span> SOC 2 Compliant <span className="mx-2">|</span> Bank-Grade Security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

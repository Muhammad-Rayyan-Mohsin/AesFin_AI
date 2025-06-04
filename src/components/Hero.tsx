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
import WaitlistDialog from './ui/waitlist-dialog';
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
    <div className={cn("relative min-h-screen bg-gradient-to-b from-[#0E1B2B] to-[#03111F] overflow-hidden", className)}>
      {/* Emerald green radial glows */}
      <div className="absolute left-1/4 top-1/3 w-[500px] h-[500px] bg-[#00C37D] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute right-1/4 top-1/2 w-[400px] h-[400px] bg-[#00C37D] opacity-15 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left column with text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Top badge */}
            <div className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-[#0E1B2B]/80 text-white tracking-wide mx-auto lg:mx-0">
              <Zap className="w-3.5 h-3.5 mr-2" />
              <span>AI-Powered Financial Intelligence</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white block">Your AI Co-Pilot for</span>
              <span className="text-[#00C37D] block">Financial Operations</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-white text-lg md:text-xl max-w-[600px] mb-10 mx-auto lg:mx-0 leading-relaxed">
              Automate complex financial tasks, reduce processing times from months to minutes, and revolutionize your audit and accounting operations with advanced AI.
            </p>
            
            {/* Feature icons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-[#00C37D] mr-2" />
                <span className="text-white text-sm">AI Risk Scoring</span>
              </div>
              <div className="flex items-center">
                <LineChart className="w-5 h-5 text-[#00C37D] mr-2" />
                <span className="text-white text-sm">Real-time Analytics</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-[#00C37D] mr-2" />
                <span className="text-white text-sm">Instant Reconciliation</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
              <RequestDemo 
                buttonVariant="primary"
                buttonSize="lg"
                buttonText="Request Demo"
                className="rounded-full px-6 py-3 bg-[#00C37D] hover:bg-[#00C37D]/90 text-white shadow-lg"
              />
              
              <VideoButton 
                buttonSize="lg"
                buttonText="Watch Demo Video"
                className="shadow-lg"
              />
            </div>
          </div>
          
          {/* Right column with dashboard card - hidden on mobile/tablet */}
          <div className="w-full lg:w-1/2 hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-[480px] mx-auto">
              {/* Card header */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">Financial Intelligence Dashboard</h3>
                <p className="text-sm text-gray-500">Real-time risk assessment and transaction monitoring</p>
              </div>
              
              {/* Risk score section */}
              <div className="px-6 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-[#00C37D]">69</span>
                    <span className="text-gray-400 ml-1">/100</span>
                  </div>
                  <div className="px-2.5 py-1 bg-emerald-50 rounded-full">
                    <span className="text-xs font-medium text-emerald-700">Low Risk</span>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800">91%</span>
                    <span className="text-xs text-gray-500 ml-1">Compliance</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800">0</span>
                    <span className="text-xs text-gray-500 ml-1">Anomalies</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800">1,272</span>
                    <span className="text-xs text-gray-500 ml-1">Processed</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Risk Assessment Progress</span>
                    <span className="text-xs text-[#00C37D]">Real-time</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00C37D] rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Live transaction monitor */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-800">Live Transaction Monitor</h4>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] mr-1.5"></div>
                    <span className="text-xs text-[#10B981]">Live</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {sampleTransactions.map((transaction) => (
                    <div key={transaction.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        {transaction.status === 'flagged' ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                        )}
                        <div>
                          <div className="font-medium text-gray-800">{transaction.amount}</div>
                          <div className="text-xs text-gray-500">{transaction.account}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{transaction.time}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link to="/transactions" className="text-sm font-medium text-[#00C37D] hover:text-[#00C37D]/80 flex items-center">
                  View All Transactions
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero footer text */}
        <div className="text-center mt-16 md:mt-24">
          <p className="text-[#9CA3AF] text-xs mb-2">Trusted by forward-thinking financial professionals</p>
          <p className="text-[#9CA3AF] text-xs">
            Enterprise Ready <span className="mx-2">|</span> SOC 2 Compliant <span className="mx-2">|</span> Bank-Grade Security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

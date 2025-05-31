import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, AlertCircle, TrendingUp, TrendingDown, DollarSign, AlertTriangle, Sparkles, UserPlus, Users, ArrowRight, PlayCircle, Loader2 } from 'lucide-react';
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
import DemoModal from './ui/demo-modal';

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
    <Hero3D
      className={cn("bg-gradient-to-b from-white to-aes-mintBg py-16 md:py-24 overflow-hidden", className)}
      image="/screenshots/Screenshot 2025-05-18 at 12.32.00 AM.png"
      title={
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-aes-green/10 text-aes-green overflow-wrap-break-word">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            <span>Financial Intelligence Platform</span>
          </div>
          <AnimatedText 
            text="Intelligent AI for financial compliance & risk management"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-aes-navy overflow-wrap-break-word"
            as="h1"
          />
        </div>
      }
      description={
        <p className="text-xl text-aes-gray max-w-xl overflow-wrap-break-word">
          Advanced AI-powered solution for financial institutions to monitor transactions, 
          assess risks, and ensure compliance with regulations - all in one platform.
        </p>
      }
      buttons={
        <div className="flex flex-wrap gap-4">
          <AnimatedButton 
            className="bg-aes-green text-white"
            onClick={() => window.location.href = '/demo'}
          >
            Request Demo
          </AnimatedButton>
          
          <AnimatedButton 
            variant="outline"
            className="border-aes-gray/30 text-aes-navy"
            onClick={() => setIsDemoOpen(true)}
          >
            Watch Video
          </AnimatedButton>
        </div>
      }
    >
      {/* The Hero3D component will render the title, description, buttons, and image we passed as props */}
      {/* If needed, we can still add additional custom content inside the component */}
      
      {/* Dashboard stats will appear below the hero */}
      <ScrollReveal delay={0.4}>
        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-aes-green/10 flex items-center justify-center mr-3">
                  <AlertCircle className="w-5 h-5 text-aes-green" />
                </div>
                <span className="font-medium text-aes-navy overflow-wrap-break-word">{currentRiskData.label}</span>
              </div>
              <div className={`flex items-center ${isImprovement ? 'text-emerald-600' : 'text-red-600'} overflow-wrap-break-word`}>
                {getChangeDisplay(currentRiskData.change, isImprovement)}
              </div>
            </div>
            <div className="flex items-baseline">
              <span className={`text-3xl font-bold ${getMetricColor(currentRiskData.score, isImprovement)}`}>
                {currentRiskData.score}
              </span>
              <span className="text-xs text-aes-gray ml-2">/ 100</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-aes-green/10 flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-aes-green" />
                </div>
                <span className="font-medium text-aes-navy overflow-wrap-break-word">Total Monitored</span>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-aes-navy">
                {formatCurrency(totalMonitored)}
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-aes-green/10 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-aes-green" />
                </div>
                <span className="font-medium text-aes-navy overflow-wrap-break-word">Waitlist</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-aes-navy mb-2">
                {totalWaitlistCount}
              </span>
              <div className="flex -space-x-2 overflow-hidden">
                {waitlistUsers.map((user, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-aes-gray/20 flex items-center justify-center"
                  >
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={`User ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-xs font-medium text-aes-navy">
                        {getInitials(user.name)}
                      </span>
                    )}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-aes-green flex items-center justify-center">
                  <span className="text-xs font-medium text-white">+{totalWaitlistCount - waitlistUsers.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      {/* Waitlist Form */}
      <ScrollReveal delay={0.6}>
        <div className="mt-12 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-aes-navy mb-2 overflow-wrap-break-word">Join the Waitlist</h3>
          <p className="text-aes-gray mb-6 overflow-wrap-break-word">
            Be the first to gain access to our platform when we launch. Enter your email below.
          </p>
          
          <form 
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleWaitlistSignup}
          >
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-aes-green hover:bg-aes-greenDark text-white flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              <span className="overflow-wrap-break-word">Join Waitlist</span>
            </Button>
          </form>
        </div>
      </ScrollReveal>
      
      {/* Demo Modal */}
      <DemoModal
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </Hero3D>
  );
};

export default Hero;

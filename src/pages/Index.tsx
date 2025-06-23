import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrototypeBanner from '@/components/ui/prototype-banner';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ScrollReveal, ScrollSequence } from '@/components/ui/scroll-reveal';
import AnimatedText from '@/components/ui/animated-text';
import { WaitList } from '@/components/ui/unified-waitlist';
import VideoButton from '@/components/VideoButton';
import RotatingHeadline from '@/components/ui/rotating-headline';
import AnimatedImage from '@/components/ui/animated-image';
import EnhancedFeatureCard from '@/components/ui/enhanced-feature-card';
import AnimatedListItem from '@/components/ui/animated-list-item';
import EnhancedSectionHeading from '@/components/ui/enhanced-section-heading';
import { subtlePulse, fadeInUp, logoHoverEffect, hoverLift } from '@/lib/animation-variants';
import ComplianceChart from '@/components/ui/compliance-chart';
import CustomerRiskProfile from '@/components/ui/customer-risk-profile';
import AnimatedMetric from '@/components/ui/animated-metric';
import { useAnimation } from '@/providers/AnimationProvider';
import { CardSkeleton, ContentSkeleton } from '@/components/ui/skeleton-loader';
import { magneticButton, staggerContainer, staggerItem } from '@/lib/optimized-animations';
import { useDeviceInfo } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile, touchCapable } = useDeviceInfo();
  
  // Simulate progressive loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  
  // Features for main feature section
  const features = [
    {
      title: 'AML Screening',
      description: 'Automated screening against global watchlists and sanctions databases to identify high-risk entities.',
      icon: <Check className="h-5 w-5 text-aes-green" />,
    },
    {
      title: 'Transaction Monitoring',
      description: 'Real-time transaction monitoring with AI-powered risk scoring to detect suspicious patterns.',
      icon: <Check className="h-5 w-5 text-aes-green" />,
    },
    {
      title: 'Compliance Reporting',
      description: 'Generate comprehensive compliance reports with a single click, ready for regulatory submission.',
      icon: <Check className="h-5 w-5 text-aes-green" />,
    },
    {
      title: 'Customer Risk Assessment',
      description: 'Intelligent customer risk profiling based on multiple data points and behavioral patterns.',
      icon: <Check className="h-5 w-5 text-aes-green" />,
    },
  ];

  // Testimonials for social proof
  const testimonials = [
    {
      quote: "AesFin has transformed our compliance workflow, reducing manual checks by 78% while increasing detection accuracy.",
      author: "Maria Rodriguez",
      title: "Compliance Officer, Atlantic Finance",
      avatar: "/placeholder.svg"
    },
    {
      quote: "The automated transaction monitoring has been a game-changer for our team, flagging issues we would have missed.",
      author: "David Chen",
      title: "Risk Manager, Global Payments Inc.",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen text-aes-navy flex flex-col" style={{
  background: `linear-gradient(120deg, #E0F2FF 0%, #E4F1FF 15%, #EAF0FF 35%, #F0EFFD 65%, #E6F5F8 85%, #E0F7F5 100%)`,
  position: 'relative'
}}>
      {/* Add a subtle radial gradient for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top right, rgba(224, 242, 255, 0.7) 0%, rgba(234, 240, 255, 0.3) 30%, rgba(240, 239, 253, 0.1) 60%, rgba(224, 247, 245, 0) 100%)'
      }}></div>
      <PrototypeBanner />
      <Header />
      <main className="flex-grow overflow-hidden">
        {/* Hero Section - Slite-inspired with AesFin branding */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background elements */}
            <motion.div 
              className="absolute top-1/4 right-10 w-80 h-80 bg-aes-greenLight/10 rounded-full blur-[100px]"
              variants={subtlePulse}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="absolute bottom-10 left-10 w-60 h-60 bg-aes-greenLight/10 rounded-full blur-[80px]"
              variants={subtlePulse}
              initial="initial"
              animate="animate"
            />
          </div>
          
          {/* Hero content */}
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                {/* Dynamic rotating headline */}
                <h1 className="heading-xl mb-6">
                  <RotatingHeadline 
                    baseText="The financial compliance tool even [Name] in [Department] wants to use"
                    rotatingWords={{
                      names: ["Adeel", "Sana", "Zara"],
                      departments: ["Finance", "Audit", "Risk"]
                    }}
                    className="text-aes-navy"
                  />
                </h1>
                <p className="hero-text text-aes-gray mb-8 max-w-3xl mx-auto">
                  Skip the manual compliance checks: AesFin delivers automated monitoring, 
                  hassle-free AML screening, and AI-powered risk analysis from day one.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <motion.div
                    variants={magneticButton}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ willChange: 'transform' }}
                  >
                    <Button 
                      size="lg" 
                      className={cn(
                        "bg-aes-green text-white hover:bg-aes-greenDark group",
                        "px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                        "min-h-[48px] font-medium" // Touch-friendly
                      )}
                      onClick={() => navigate('/contact')}
                    >
                      Request a demo
                      <motion.div
                        className="ml-2 inline-block"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={magneticButton}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    style={{ willChange: 'transform' }}
                  >
                    <VideoButton 
                      buttonText="Watch video" 
                      className={cn(
                        "border-aes-green text-aes-green hover:bg-aes-greenPale hover:text-aes-green bg-white",
                        "px-8 py-4 rounded-xl border-2 min-h-[48px] font-medium",
                        "shadow-md hover:shadow-lg transition-all duration-300"
                      )}
                    />
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Hero dashboard preview - centered with shadow */}
            <ScrollReveal delay={0.2}>
              <AnimatedImage
                src="/screenshots/Screenshot 2025-05-18 at 12.32.00 AM.png"
                alt="AesFin Dashboard"
                shadow={true}
                rounded={true}
                containerClassName="max-w-5xl mx-auto mt-8"
                whileInViewAnimation="fadeUp"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Main features section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <EnhancedSectionHeading
                title="Get your team set up in minutes, not weeks"
                subtitle="Streamline your compliance operations with our intuitive platform"
                centered={true}
                underline={true}
              />
            </ScrollReveal>
            
            {/* Feature grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <EnhancedFeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    index={idx}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Product showcase section */}
        <section className="py-20 bg-aes-mintBg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <ScrollReveal className="lg:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <ComplianceChart width={400} height={200} />
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <AnimatedMetric 
                      value={78}
                      suffix="%"
                      label="Risk Detection"
                      index={0}
                    />
                    <AnimatedMetric 
                      value={92}
                      suffix="%"
                      label="Accuracy"
                      index={1}
                    />
                    <AnimatedMetric 
                      value={3}
                      prefix="<"
                      suffix="min"
                      label="Response Time"
                      index={2}
                    />
                  </div>
                </div>
              </ScrollReveal>
              <div className="lg:w-1/2">
                <ScrollReveal>
                  <EnhancedSectionHeading
                    title="Simplify Compliance, Amplify Results"
                    as="h2"
                  />
                  <p className="feature-paragraph mb-6">Transform complex regulatory requirements into actionable intelligence.</p>
                  <ul className="space-y-4">
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={0}
                    >
                      <span className="font-medium text-aes-navy">AI-Powered Risk Analysis</span> — Automatic scoring and alerts for potential compliance issues
                    </AnimatedListItem>
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={1}
                    >
                      <span className="font-medium text-aes-navy">Real-Time Monitoring</span> — Track transactions across all branches with instant notifications
                    </AnimatedListItem>
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={2}
                    >
                      <span className="font-medium text-aes-navy">Complete Audit Trail</span> — Maintain comprehensive documentation for regulatory inspections
                    </AnimatedListItem>
                  </ul>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Second product showcase section - reversed */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
              <ScrollReveal className="lg:w-1/2">
                <CustomerRiskProfile />
              </ScrollReveal>
              <div className="lg:w-1/2">
                <ScrollReveal>
                  <EnhancedSectionHeading
                    title="Confidence in Every Decision"
                    as="h2"
                  />
                  <p className="feature-paragraph mb-6">AI-driven insights that eliminate guesswork from compliance management.</p>
                  <ul className="space-y-4">
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={0}
                    >
                      <span className="font-medium text-aes-navy">Clear Risk Indicators</span> — Visual scoring system with specific action recommendations
                    </AnimatedListItem>
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={1}
                    >
                      <span className="font-medium text-aes-navy">Unified Customer Profiles</span> — Comprehensive risk assessment in a single view
                    </AnimatedListItem>
                    <AnimatedListItem 
                      icon={<div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>}
                      index={2}
                    >
                      <span className="font-medium text-aes-navy">One-Click Reporting</span> — Generate regulatory documentation instantly
                    </AnimatedListItem>
                  </ul>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-20 bg-aes-mintBg">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <EnhancedSectionHeading
                title="Our customers say it better than we do"
                subtitle="Trusted by compliance teams at financial institutions worldwide"
                centered={true}
                underline={true}
              />
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    variants={hoverLift}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <p className="testimonial-quote mb-6">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-aes-navy">{testimonial.author}</p>
                        <p className="text-sm text-aes-gray">{testimonial.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-aes-green text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="heading-lg mb-6">
                  The compliance solution your team will actually use
                </h2>
                <p className="cta-text mb-8">
                  Our AI-powered platform can help streamline your compliance operations in record time.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={hoverLift}
                  >
                    <Button 
                      size="lg" 
                      className="bg-white text-aes-green hover:bg-gray-100 group"
                      onClick={() => navigate('/pricing')}
                    >
                      Start free trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={hoverLift}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-aes-green hover:bg-white hover:border-white hover:text-aes-green"
                      onClick={() => navigate('/contact')}
                    >
                      Book a demo
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Waitlist section */}
        <WaitList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

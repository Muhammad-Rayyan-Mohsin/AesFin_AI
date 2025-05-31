import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedSection from './ui/animated-section';
import AnimatedGridBackground from './ui/animated-grid-background';
import DashboardCarousel from './ui/dashboard-carousel';
import { AnimatedTitle, FadeUpDiv, FadeInDiv, SlideInLeftDiv, SlideInRightDiv, ScaleUpDiv } from './ui/motion';
import { motion } from 'framer-motion';
import AnimatedText from './ui/animated-text';
import ParallaxSection from './ui/parallax-section';

interface OverviewProps {
  className?: string;
}

const segmentLabels = ["Overview", "Analysis", "Transactions"];

const Overview = ({ className }: OverviewProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenshots = [
    {
      image: "/screenshots/Screenshot 2025-05-18 at 12.32.00 AM.png",
      title: "Dashboard Overview",
      description: "Real-time financial insights and key metrics at a glance"
    },
    {
      image: "/screenshots/Screenshot 2025-05-18 at 12.32.29 AM.png",
      title: "Transaction Analysis",
      description: "Detailed transaction monitoring and anomaly detection"
    },
    {
      image: "/screenshots/Screenshot 2025-05-18 at 12.32.45 AM.png",
      title: "Financial Reports",
      description: "Comprehensive financial reporting and analytics"
    }
  ];

  return (
    <section id="overview" className={cn(
      "relative bg-aes-navy overflow-hidden",
      className
    )}>
      {/* Background elements */}
      <ParallaxSection speed={0.15} direction="up">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-1/3 -left-24 w-96 h-96 bg-aes-green/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-72 h-72 bg-aes-green/15 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </div>
      </ParallaxSection>
      
      <AnimatedGridBackground />
      
      <motion.div 
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aes-green/10 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      <div className="container relative z-10 pl-4">
        <FadeUpDiv>
          <div className="mx-auto max-w-3xl text-center mb-0">
            <AnimatedTitle as="h2" className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6 mt-12 leading-tight overflow-wrap-break-word">
              <span className="relative inline-block">
                Explore Our <br />
                <span className="text-aes-green relative inline-block">
                  Dashboard
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-px bg-aes-green/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                  />
                </span>
              </span>
            </AnimatedTitle>
            
            <motion.div 
              className="flex items-center justify-start gap-0 bg-white/10 rounded-full p-0.5 w-fit mx-auto shadow-sm mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{marginTop: '1.5rem'}}
            >
              {segmentLabels.map((label, idx) => (
                <motion.span
                  key={label}
                  className={cn(
                    "px-3 py-1 font-sans font-normal text-sm rounded-full select-none",
                    idx === activeIndex
                      ? "bg-green-700 text-white shadow-md"
                      : "text-slate-500"
                  )}
                  whileHover={{ scale: idx !== activeIndex ? 1.05 : 1 }}
                  style={{minWidth: '80px'}}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </FadeUpDiv>
        
        <FadeInDiv delay={0.3}>
          <DashboardCarousel 
            screenshots={screenshots} 
            activeIndex={activeIndex}
            onPrev={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1))}
            onNext={() => setActiveIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0))}
            onSlideChange={setActiveIndex}
          />
        </FadeInDiv>
      </div>
    </section>
  );
};

export default Overview;

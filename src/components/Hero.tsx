import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedGradient from './ui/animated-gradient';
import AnimatedSection from './ui/animated-section';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn(
      "relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24",
      className
    )}>
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-aes-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-aes-greenDark/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Date and Location */}
          <AnimatedSection direction="down" duration={0.8}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-aes-greenPale px-4 py-1.5 text-sm text-aes-grayDark border border-aes-green/10 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Calendar className="h-4 w-4 text-aes-green" />
              <span>Waterloo, Ontario</span>
            </div>
          </AnimatedSection>
          
          {/* Large Prominent Logo */}
          <AnimatedSection delay={0.1} duration={0.8}>
            <div className="mb-6 flex justify-center">
              <img 
                src="/aesfin-logo.svg" 
                alt="AesFin AI" 
                className="h-24 md:h-32 w-auto object-contain transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </AnimatedSection>
          
          {/* Heading with enhanced gradient and subtle animation */}
          <AnimatedSection delay={0.2} duration={1}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-aes-greenDark/10 via-aes-green/5 to-aes-greenLight/10 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>
              <h1 className="heading-xl relative mb-6 bg-gradient-to-r from-aes-greenDark via-aes-green to-aes-greenLight bg-clip-text text-transparent animate-pulse-very-slow">
                AesFin AI
              </h1>
            </div>
            
            {/* Prototype badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-aes-green/10 text-aes-greenDark border border-aes-green/20 mb-4">
              PROTOTYPE
            </span>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} duration={0.8}>
            <p className="body-lg mb-8 text-aes-gray leading-relaxed mx-auto max-w-2xl">
              A cutting-edge AI financial intelligence platform designed for businesses.
              Direct integration with your accounting tools to deliver exceptional financial clarity and insights.
            </p>
          </AnimatedSection>
          
          {/* Enhanced CTA Buttons */}
          <AnimatedSection delay={0.6} duration={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {/* Wrap Button in an anchor tag to link to the waitlist section */}
              <a href="#wait-list">
                <Button className="bg-aes-green hover:bg-aes-greenDark text-white font-medium w-full sm:w-auto animate-pulse-slow shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Join Waitlist <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              {/* Wrap Button in an anchor tag to link to a relevant section (e.g., features) */}
              <a href="#features"> 
                <Button variant="outline" className="border-aes-green/80 text-aes-green hover:bg-aes-greenPale/50 hover:text-aes-greenDark w-full sm:w-auto transition-all duration-300 hover:border-aes-green">
                  Learn More
                </Button>
              </a>
            </div>
            
            {/* Visual scroll indicator */}
            <div className="hidden md:flex justify-center mt-8 animate-bounce-slow">
              <div className="w-6 h-10 rounded-full border-2 border-aes-gray/30 flex justify-center">
                <span className="block w-1 h-2 bg-aes-green/60 rounded-full mt-2 animate-pulse-slow"></span>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Hero Illustration - enhanced with better shadows and effects */}
        <AnimatedSection delay={1} duration={1.2} direction="up">
          <div className="mt-12 mx-auto max-w-4xl">
            <AnimatedGradient className="aspect-video rounded-xl overflow-hidden border border-aes-grayLight shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="h-full w-full bg-gradient-to-br from-aes-greenPale/80 to-white/80 flex items-center justify-center backdrop-blur-sm">
                <div className="experimental-card w-3/4 h-3/4 flex items-center justify-center flex-col gap-4 p-8 text-center backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300">
                  {/* Embedded logo within the card */}
                  <div className="w-24 h-24 flex items-center justify-center mb-2">
                    <img 
                      src="/aesfin-logo.svg" 
                      alt="AesFin AI Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-xl font-display font-bold text-aes-greenDark">Financial Intelligence Platform</h3>
                  <p className="text-sm text-aes-gray">Prototype Interface</p>
                  <div className="grid grid-cols-3 gap-2 w-full mt-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-aes-green/60 to-aes-greenLight/60 rounded-full animate-pulse-very-slow" style={{ width: `${Math.random() * 100}%`, animationDelay: `${i * 0.2}s` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedGradient>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;

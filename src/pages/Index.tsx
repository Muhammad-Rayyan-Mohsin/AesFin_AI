import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrototypeBanner from '@/components/ui/prototype-banner';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import AnimatedText from '@/components/ui/animated-text';
import WaitList from '@/components/WaitList';
import VideoButton from '@/components/VideoButton';

const Index = () => {
  const navigate = useNavigate();
  
  // Sample logos for social proof section
  const partnerLogos = [
    { alt: 'Partner 1', src: '/placeholder.svg' },
    { alt: 'Partner 2', src: '/placeholder.svg' },
    { alt: 'Partner 3', src: '/placeholder.svg' },
    { alt: 'Partner 4', src: '/placeholder.svg' },
    { alt: 'Partner 5', src: '/placeholder.svg' },
    { alt: 'Partner 6', src: '/placeholder.svg' },
  ];

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
    <div className="min-h-screen bg-white text-aes-navy flex flex-col">
      <PrototypeBanner />
      <Header />
      <main className="flex-grow overflow-hidden">
        {/* Hero Section - Slite-inspired with AesFin branding */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background elements */}
            <motion.div 
              className="absolute top-1/4 right-10 w-80 h-80 bg-aes-greenLight/10 rounded-full blur-[100px]"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-10 left-10 w-60 h-60 bg-aes-greenLight/10 rounded-full blur-[80px]"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          
          {/* Hero content */}
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                {/* Animated hero heading - inspired by Slite's dynamic text */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
                  <span className="text-aes-navy block mb-2">Your financial compliance</span>
                  <span className="inline-block relative">
                    <span className="text-aes-green">on autopilot</span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-aes-gray mb-8 max-w-3xl mx-auto">
                  Skip the manual compliance checks: AesFin delivers automated monitoring, 
                  hassle-free AML screening, and AI-powered risk analysis from day one.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button 
                    size="lg" 
                    className="bg-aes-green text-white hover:bg-aes-greenDark group"
                    onClick={() => navigate('/contact')}
                  >
                    Request a demo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <VideoButton 
                    buttonText="Watch video" 
                    className="border-aes-green text-aes-green hover:bg-aes-greenPale hover:text-aes-green bg-white"
                  />
                </div>
              </ScrollReveal>
            </div>
            
            {/* Hero dashboard preview - centered with shadow */}
            <ScrollReveal delay={0.2}>
              <div className="relative mt-8 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
                <img 
                  src="/screenshots/Screenshot 2025-05-18 at 12.32.00 AM.png" 
                  alt="AesFin Dashboard" 
                  className="w-full h-auto object-cover rounded-xl border border-gray-200/30"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Social proof section */}
        <section className="py-12 bg-aes-mintBg">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <p className="text-center text-aes-navy text-sm mb-6 font-medium">TRUSTED BY 3,000+ FINANCIAL INSTITUTIONS</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {partnerLogos.map((logo, idx) => (
                  <img 
                    key={idx}
                    src={logo.src} 
                    alt={logo.alt}
                    className="h-8 md:h-10 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Main features section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">Get your team set up in minutes, not weeks</h2>
                <p className="text-aes-gray text-lg">Streamline your compliance operations with our intuitive platform</p>
              </div>
            </ScrollReveal>
            
            {/* Feature grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-aes-greenPale flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-aes-navy mb-3">{feature.title}</h3>
                    <p className="text-aes-gray">{feature.description}</p>
                  </div>
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
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/screenshots/Screenshot 2025-05-18 at 12.32.29 AM.png" 
                    alt="AesFin Transaction Monitoring" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </ScrollReveal>
              <div className="lg:w-1/2">
                <ScrollReveal>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-6">What's the use of compliance if you can't manage it?</h2>
                  <p className="text-aes-gray text-lg mb-6">We tried building compliance tools before, but they were too complex and nobody could use them effectively. AesFin has completely turned that around.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">Automated risk scoring with AI-powered analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">Real-time transaction monitoring across all branches</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">Comprehensive audit trails for regulatory compliance</span>
                    </li>
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
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/screenshots/Screenshot 2025-05-18 at 12.32.45 AM.png" 
                    alt="AesFin Risk Assessment" 
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </ScrollReveal>
              <div className="lg:w-1/2">
                <ScrollReveal>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-6">Answers you never have to second-guess</h2>
                  <p className="text-aes-gray text-lg mb-6">AesFin's AI-powered risk analysis has been incredible. It's simplified compliance processes for the whole team, eliminating endless manual checks while increasing accuracy.</p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">Clear risk scoring with actionable insights</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">Comprehensive customer risk profiles</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-aes-greenPale flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-aes-green" />
                      </div>
                      <span className="text-aes-gray">One-click regulatory reporting</span>
                    </li>
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
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">
                  Our customers say it better than we do
                </h2>
                <p className="text-aes-gray text-lg">
                  Trusted by compliance teams at financial institutions worldwide
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-aes-navy text-lg mb-6 italic">"{testimonial.quote}"</p>
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
                  </div>
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
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  The compliance solution your team will actually use
                </h2>
                <p className="text-xl mb-8">
                  Our AI-powered platform can help streamline your compliance operations in record time.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-aes-green hover:bg-gray-100 group"
                    onClick={() => navigate('/pricing')}
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => navigate('/contact')}
                  >
                    Book a demo
                  </Button>
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

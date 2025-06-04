import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Target, Lightbulb, Shield, Star, Clock } from 'lucide-react';
import AnimatedText from '@/components/ui/animated-text';
import { ScrollReveal, ScrollSequence } from '@/components/ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import { fadeIn, fadeUp, cardHover } from '@/lib/animation-variants';

const AboutPage = () => {
  const { prefersReducedMotion } = useAnimation();
  
  const coreValues = [
    {
      icon: <Shield className="h-6 w-6 text-aes-green" />,
      title: "Data Security & Privacy",
      description: "We prioritize the security and privacy of our customers' financial data above all else, implementing the highest standards of protection."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-aes-green" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in financial technology, seeking new ways to solve complex financial challenges."
    },
    {
      icon: <Users className="h-6 w-6 text-aes-green" />,
      title: "Customer Success",
      description: "Our customers' success is our success. We're committed to delivering exceptional value and support at every step."
    },
    {
      icon: <Target className="h-6 w-6 text-aes-green" />,
      title: "Transparency",
      description: "We believe in being transparent in our operations, pricing, and how we handle data, building trust through honest communication."
    },
    {
      icon: <Star className="h-6 w-6 text-aes-green" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from the accuracy of our algorithms to the quality of our customer support."
    },
    {
      icon: <Clock className="h-6 w-6 text-aes-green" />,
      title: "Continuous Improvement",
      description: "We're never satisfied with the status quo, constantly seeking feedback and ways to improve our platform and services."
    }
  ];
  
  const timeline = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Aes AI was founded with a mission to democratize financial intelligence through AI."
    },
    {
      year: "2021",
      title: "Seed Funding",
      description: "Secured $3 million in seed funding to develop the core AI financial analysis platform."
    },
    {
      year: "2022",
      title: "Beta Launch",
      description: "Released our first beta product to select customers, gathering valuable feedback."
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Raised $12 million in Series A funding to expand our team and platform capabilities."
    },
    {
      year: "2024",
      title: "Official Launch",
      description: "Launched our comprehensive financial intelligence platform to the public."
    }
  ];

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-aes-mintBg to-aes-mintBg/95 py-20 md:py-32">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/4 -right-20 w-80 h-80 bg-aes-green/5 rounded-full blur-[100px]"
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
              className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"
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
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <AnimatedText 
                  text="Our Story" 
                  className="text-4xl md:text-5xl font-display font-bold text-aes-navy mb-6"
                  as="h1"
                />
                
                <motion.p 
                  className="text-xl text-aes-gray mb-10"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Aes AI is a cutting-edge financial intelligence platform that leverages artificial intelligence
                  to transform how businesses manage their finances and ensure compliance.
                </motion.p>
                
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    className="bg-aes-green hover:bg-aes-green/90 text-white group"
                    onClick={() => window.location.href = "/contact"}
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-aes-green/10 rounded-full" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-aes-navy/10 rounded-full" />
                  
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img 
                      src="/about/mission.jpg" 
                      alt="Our mission visualization" 
                      className="w-full h-[400px] object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400/aes-navy/white?text=Aes+AI+Mission";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aes-navy/80 to-transparent flex items-end">
                      <div className="p-8">
                        <h3 className="text-white text-2xl font-semibold mb-2">Why We Exist</h3>
                        <p className="text-white/80 text-sm">
                          We believe that advanced financial intelligence should be accessible to businesses of all sizes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-semibold text-aes-navy mb-2">Our Mission</h2>
                    <p className="text-aes-gray">
                      We're on a mission to democratize financial intelligence by making advanced AI-powered
                      financial management tools accessible to businesses of all sizes. By combining cutting-edge
                      artificial intelligence with financial expertise, we help businesses make better financial
                      decisions, ensure compliance, and drive growth.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-semibold text-aes-navy mb-2">Our Vision</h2>
                    <p className="text-aes-gray">
                      We envision a future where every business has access to intelligent financial tools
                      that help them make better decisions, ensure compliance, and drive growth. We see a world
                      where financial complexity is simplified through AI, allowing businesses to focus on what
                      they do best.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Core Values Section - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">
                  Our Core Values
                </h2>
                <p className="text-aes-gray">
                  These principles guide everything we do, from product development to customer support.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreValues.map((value, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div 
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-all duration-300"
                    whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-medium text-aes-navy mb-3">{value.title}</h3>
                    <p className="text-sm text-aes-gray/90">{value.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* Company Timeline - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">
                  Our Journey
                </h2>
                <p className="text-aes-gray">
                  From inception to our current state, we've been focused on innovation and growth.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-1 bg-gray-200 md:left-1/2 md:-ml-0.5"></div>
              
              {timeline.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <div className={`mb-12 relative ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'} md:w-1/2`}>
                    <div className="flex items-center mb-2">
                      <div className="bg-aes-green text-white z-10 rounded-full w-11 h-11 flex items-center justify-center font-medium mr-3 md:absolute md:left-0 md:ml-[42px] md:mr-0 md:-translate-x-1/2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-aes-navy">{item.title}</h3>
                    </div>
                    <p className="text-aes-gray ml-14 md:ml-0">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-aes-ctaBg">
          <div className="container px-4 mx-auto">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-aes-navy to-aes-navy/90 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Us on Our Journey</h3>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    We're always looking for talented individuals who share our passion for financial technology
                    and artificial intelligence. Check out our current openings or get in touch to learn more.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-aes-green hover:bg-aes-green/90 text-white group"
                      onClick={() => window.location.href = "/careers"}
                    >
                      Explore Careers
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white text-white bg-white/10 hover:bg-white/20 group"
                      onClick={() => window.location.href = "/contact"}
                    >
                      Contact Us
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage; 
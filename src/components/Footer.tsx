import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone, ArrowUp, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, ScrollSequence } from './ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import AnimatedText from './ui/animated-text';
import { addToWaitlist } from '@/lib/waitlist-service';
import { useToast } from '@/hooks/use-toast';
import { faker } from '@faker-js/faker';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { prefersReducedMotion } = useAnimation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Listen for scroll to show/hide the "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const triggerThreshold = pageHeight * 0.5;
      
      setShowScrollToTop(scrollPosition > triggerThreshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/company/aesfin-ai/posts/?feedView=all", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
  ];

  const quickLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4 mr-2" />, href: "mailto:info@aesai.com", label: "info@aesai.com" },
    { icon: <Phone className="w-4 h-4 mr-2" />, href: "tel:+11234567890", label: "+1 (123) 456-7890" },
  ];

  // Function to handle waitlist signup
  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    setIsSubmitting(true);
    try {
      // Use the actual waitlist service
      const result = await addToWaitlist(waitlistEmail);
      
      if (result.success) {
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

  return (
    <footer className={cn(
      'relative bg-gradient-to-b from-[#1A2235] to-[#121827] text-[#E5E7EB] pt-12 pb-6 overflow-hidden',
      className
    )}>
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"
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
          className="absolute bottom-0 left-10 w-60 h-60 bg-green-500/5 rounded-full blur-[80px]"
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
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content - Updated grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-12 mb-8 items-start">
          {/* Column 1: Company Info & Description */}
          <ScrollReveal delay={0.1} className="flex flex-col md:col-span-1">
            <motion.div 
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.img 
                src="/Logo.svg" 
                alt="Aes AI"
                className="h-10 w-10 rounded-lg bg-aes-navy p-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-xl font-bold text-aes-white">Aes AI</span>
            </motion.div>
            <motion.p 
              className="text-aes-gray text-sm mb-4 font-normal max-w-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your personal automated AI financial agent that simplifies wealth management and optimizes your financial decisions.
            </motion.p>
            <ScrollSequence className="flex gap-4 text-aes-gray mt-2" staggerChildren={0.1} delayStart={0.3}>
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.label}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-aes-white transition-colors p-2 bg-aes-navyLight rounded-full"
                  whileHover={{ scale: 1.2, backgroundColor: "#2F3441" }} // A darker shade for hover
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </ScrollSequence>
          </ScrollReveal>

          {/* Column 2: Quick Links & Contact Info & Newsletter */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col">
                <AnimatedText 
                  text="Quick Links" 
                  className="text-aes-white font-semibold text-lg mb-3"
                  delayStart={0.1}
                />
                <div className="grid grid-cols-1 gap-2">
                  <ScrollSequence staggerChildren={0.05} delayStart={0.2}>
                    {quickLinks.map((link) => (
                      <motion.a 
                        key={link.label}
                        href={link.href} 
                        className="text-aes-gray hover:text-aes-white transition-colors text-sm flex items-center"
                        whileHover={{ x: 5, color: "#FFFFFF" }}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 bg-aes-grayDark rounded-full mr-2"
                          whileHover={{ backgroundColor: "#6D7185", scale: 1.5 }}
                        />
                        {link.label}
                      </motion.a>
                    ))}
                  </ScrollSequence>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col">
                <AnimatedText 
                  text="Contact" 
                  className="text-aes-white font-semibold text-lg mb-3"
                  delayStart={0.1}
                />
                <div className="grid grid-cols-1 gap-3">
                  <ScrollSequence staggerChildren={0.05} delayStart={0.2}>
                    {contactInfo.map((contact) => (
                      <motion.a 
                        key={contact.label}
                        href={contact.href} 
                        className="text-aes-gray hover:text-aes-white transition-colors text-sm flex items-center"
                        whileHover={{ x: 5, color: "#FFFFFF" }}
                      >
                        {contact.icon}
                        {contact.label}
                      </motion.a>
                    ))}
                  </ScrollSequence>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col">
                <AnimatedText 
                  text="Join Waitlist" 
                  className="text-aes-white font-semibold text-lg mb-3"
                  delayStart={0.1}
                />
                <motion.p 
                  className="text-aes-gray text-sm mb-3 max-w-xs"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Be the first to gain access to our platform when we launch.
                </motion.p>
                <motion.form 
                  className="flex flex-col gap-2 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onSubmit={handleWaitlistSignup}
                >
                  <motion.input
                    type="email"
                    placeholder="Your email address"
                    className="rounded-md bg-aes-navyLight text-aes-white px-4 py-2 outline-none border border-aes-grayDark focus:border-aes-gray focus:ring-1 focus:ring-aes-green placeholder-aes-gray text-sm"
                    whileFocus={{ scale: 1.02, borderColor: "#4B4E5A" }}
                    transition={{ duration: 0.2 }}
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="rounded-md bg-aes-green text-aes-white px-4 py-2 text-sm font-semibold hover:bg-aes-greenDark transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    Join Waitlist
                  </motion.button>
                </motion.form>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <motion.hr 
          className="border-aes-grayDark mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs text-aes-gray">© {currentYear} Aes AI. All rights reserved.</p>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 bg-aes-navy hover:bg-aes-navyLight text-aes-white p-3 rounded-full shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

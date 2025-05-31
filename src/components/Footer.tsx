import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, ScrollSequence } from './ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import AnimatedText from './ui/animated-text';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { prefersReducedMotion } = useAnimation();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://instagram.com", label: "Instagram" },
  ];

  const quickLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/research", label: "Research" },
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cookies", label: "Cookie Policy" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4 mr-2" />, href: "mailto:info@aesai.com", label: "info@aesai.com" },
    { icon: <Phone className="w-4 h-4 mr-2" />, href: "tel:+11234567890", label: "+1 (123) 456-7890" },
  ];

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
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Column 1: Company Info */}
          <ScrollReveal>
          <div className="flex flex-col">
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
                  className="h-10 w-10 rounded-lg bg-[#1A2235] p-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                />
              <span className="text-xl font-bold text-white">Aes AI</span>
              </motion.div>
              <motion.p 
                className="text-[#A1A1AA] text-sm mb-4 font-normal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
              Your personal automated AI financial agent that simplifies wealth management and optimizes your financial decisions.
              </motion.p>
              <ScrollSequence className="flex gap-4 text-[#A1A1AA] mt-2" staggerChildren={0.1} delayStart={0.3}>
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors p-2 bg-[#23262F] rounded-full"
                    whileHover={{ scale: 1.2, backgroundColor: "#2F3441" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </ScrollSequence>
            </div>
          </ScrollReveal>

          {/* Column 2: Quick Links */}
          <ScrollReveal delay={0.1}>
          <div className="flex flex-col">
              <AnimatedText 
                text="Quick Links" 
                className="text-white font-semibold text-lg mb-3"
                delayStart={0.1}
              />
            <div className="grid grid-cols-1 gap-2">
                <ScrollSequence staggerChildren={0.05} delayStart={0.2}>
                  {quickLinks.map((link) => (
                    <motion.a 
                      key={link.label}
                      href={link.href} 
                      className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center"
                      whileHover={{ x: 5, color: "#FFFFFF" }}
                    >
                      <motion.span 
                        className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"
                        whileHover={{ backgroundColor: "#6D7185", scale: 1.5 }}
                      />
                      {link.label}
                    </motion.a>
                  ))}
                </ScrollSequence>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 3: Legal */}
          <ScrollReveal delay={0.2}>
          <div className="flex flex-col">
              <AnimatedText 
                text="Legal" 
                className="text-white font-semibold text-lg mb-3"
                delayStart={0.2}
              />
            <div className="grid grid-cols-1 gap-2">
                <ScrollSequence staggerChildren={0.05} delayStart={0.3}>
                  {legalLinks.map((link) => (
                    <motion.a 
                      key={link.label}
                      href={link.href} 
                      className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center"
                      whileHover={{ x: 5, color: "#FFFFFF" }}
                    >
                      <motion.span 
                        className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"
                        whileHover={{ backgroundColor: "#6D7185", scale: 1.5 }}
                      />
                      {link.label}
                    </motion.a>
                  ))}
                </ScrollSequence>
            </div>
            
              <AnimatedText 
                text="Contact" 
                className="text-white font-semibold text-lg mt-4 mb-3"
                delayStart={0.4}
              />
            <div className="grid grid-cols-1 gap-3">
                <ScrollSequence staggerChildren={0.05} delayStart={0.5}>
                  {contactInfo.map((contact) => (
                    <motion.a 
                      key={contact.label}
                      href={contact.href} 
                      className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center"
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

          {/* Column 4: Newsletter */}
          <ScrollReveal delay={0.3}>
          <div className="flex flex-col">
              <AnimatedText 
                text="Join Our Waitlist" 
                className="text-white font-semibold text-lg mb-3"
                delayStart={0.3}
              />
              <motion.p 
                className="text-[#A1A1AA] text-sm mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
              Be the first to know when we launch and receive exclusive offers.
              </motion.p>
              <motion.form 
                className="flex flex-col gap-2 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.input
                type="email"
                placeholder="Enter your email"
                className="rounded-md bg-[#23262F] text-[#E5E7EB] px-4 py-2 outline-none border border-[#393C49] focus:border-[#4B4E5A] placeholder-[#A1A1AA] text-sm"
                  whileFocus={{ scale: 1.02, borderColor: "#4B4E5A" }}
                  transition={{ duration: 0.2 }}
              />
                <motion.button
                type="submit"
                className="rounded-md bg-gradient-to-r from-[#3D5AFE] to-[#1E88E5] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
              >
                Subscribe
                </motion.button>
              </motion.form>
          </div>
          </ScrollReveal>
        </div>

        <motion.hr 
          className="border-[#23262F] mb-4"
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
          <p className="text-xs text-[#A1A1AA]">© {currentYear} Aes AI. All rights reserved.</p>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            className="fixed bottom-6 right-6 bg-[#23262F] hover:bg-[#2F3441] text-white p-3 rounded-full shadow-lg z-50"
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

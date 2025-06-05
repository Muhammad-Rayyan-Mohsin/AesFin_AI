import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  ArrowRight, 
  BookOpen, 
  Shield, 
  Users, 
  Phone, 
  CalendarClock 
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/providers/AnimationProvider';
import { 
  logoAnimation, 
  navLinkAnimation, 
  buttonHover, 
  staggerContainer, 
  fadeIn 
} from '@/lib/animation-variants';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const isVisible = useScrollDirection();
  const { prefersReducedMotion } = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Listen for scroll to add a background color when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigationLinks = [
    { 
      href: '/pricing', 
      label: 'Pricing', 
      icon: <BookOpen className="w-4 h-4" />
    },
    { 
      href: '/security', 
      label: 'Security', 
      icon: <Shield className="w-4 h-4" />
    },
    { 
      href: '/about', 
      label: 'About Us', 
      icon: <Users className="w-4 h-4" />
    },
    { 
      href: '/contact', 
      label: 'Support & Contact', 
      icon: <Phone className="w-4 h-4" />
    },
  ];

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: 0.1
      }
    }
  };

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className={cn(
      "fixed top-0 w-full z-40 transition-transform duration-300", 
      isVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <motion.header 
        className={cn(
          "w-full", 
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200/50" 
            : "bg-white border-b border-gray-200",
          className
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main header with navigation */}
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              variants={logoAnimation}
              initial="hidden"
              animate="visible"
            >
              <Link to="/" className="flex items-center">
                <motion.img 
                  src="/Logo.svg" 
                  alt="Aes AI Logo" 
                  className="h-10 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <motion.nav 
                className="flex items-center mr-4"
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={navLinkAnimation}
                    custom={index}
                    whileHover="hover"
                    className="relative px-3"
                  >
                    <Link 
                      to={link.href} 
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors relative py-1.5 px-1 group",
                        isActiveLink(link.href)
                          ? "text-aes-green" 
                          : "text-gray-700 hover:text-aes-green"
                      )}
                    >
                      <span className="relative">{link.label}</span>
                      <motion.span 
                        className={cn(
                          "absolute inset-x-0 bottom-0 h-0.5 bg-aes-green rounded-full",
                          isActiveLink(link.href) ? "opacity-100" : "opacity-0"
                        )}
                        initial={{ scaleX: 0 }}
                        animate={{ 
                          scaleX: isActiveLink(link.href) ? 1 : 0,
                          opacity: isActiveLink(link.href) ? 1 : 0
                        }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Login Button */}
              <motion.div
                variants={navLinkAnimation}
                initial="hidden"
                animate="visible"
                custom={navigationLinks.length + 1}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all group"
                  >
                    Log In
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-600 hover:text-gray-900 h-10 w-10 rounded-full"
                      onClick={() => setIsOpen(true)}
                      aria-label="Open navigation menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </motion.div>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-sm border-l border-gray-100 bg-white p-0">
                  <AnimatePresence>
                    <motion.div 
                      className="flex flex-col h-full"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <motion.img 
                          src="/Logo.svg" 
                          alt="Aes AI" 
                          className="h-8 w-auto"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 }}
                        />
                        <motion.button
                          className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                          onClick={() => setIsOpen(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Close navigation menu"
                        >
                          <X className="h-5 w-5 text-gray-600" />
                        </motion.button>
                      </div>
                      
                      <motion.nav 
                        className="flex-1 px-6 py-6"
                        variants={navContainerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="space-y-4">
                          {navigationLinks.map((link, index) => (
                            <motion.div
                              key={link.href}
                              variants={navLinkAnimation}
                              custom={index}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link 
                                to={link.href} 
                                className={cn(
                                  "flex items-center w-full text-base py-3 px-4 rounded-xl font-medium transition-colors",
                                  isActiveLink(link.href)
                                    ? "text-aes-green bg-aes-green/10" 
                                    : "text-gray-800 hover:text-aes-green hover:bg-gray-50"
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="mr-3 w-6 h-6 flex items-center justify-center">{link.icon}</span>
                                {link.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.nav>
                      
                      <motion.div 
                        className="mt-auto border-t border-gray-100 p-6 space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="outline" 
                            className="w-full border-aes-navy text-aes-navy hover:bg-aes-navy hover:text-white transition-colors h-12 rounded-xl"
                          >
                            Login
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <a href="https://calendly.com/ali14hasnain/30min" target="_blank" rel="noopener noreferrer">
                            <Button 
                              className="w-full bg-aes-green hover:bg-aes-green/90 text-white transition-colors h-12 rounded-xl"
                            >
                              <span className="flex-shrink-0 mr-2">
                                <CalendarClock className="w-4 h-4" />
                              </span>
                              Book a Call
                            </Button>
                          </a>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;

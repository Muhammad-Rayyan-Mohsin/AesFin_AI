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
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/providers/AnimationProvider';
import { useDeviceInfo } from '@/hooks/use-mobile';
import MobileMenu from './ui/mobile-menu';
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
  const { isMobile, isTablet } = useDeviceInfo();
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
            : "bg-white border-b border-gray-200/70",
          className
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'transform' }}
      >
        {/* Main header with navigation */}
        <div className="container px-4 sm:px-4 md:px-6">
          <div className="flex h-14 sm:h-14 md:h-16 items-center justify-between">
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
                  className="h-8 sm:h-8 md:h-10 w-auto object-contain"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: 'transform' }}
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

              {/* Desktop Login Button */}
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

            {/* Mobile Navigation - Enhanced */}
            <div className="flex items-center space-x-2 lg:hidden">
              {/* Mobile Login Button (tablet only) */}
              {isTablet && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-aes-green hover:bg-aes-green/10 mr-2"
                  >
                    Log In
                  </Button>
                </motion.div>
              )}

              {/* Hamburger Menu Button */}
              <motion.button
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 relative z-50",
                  "focus:outline-none focus:ring-2 focus:ring-aes-green focus:ring-offset-2",
                  "hover:bg-gray-100 active:bg-gray-200",
                  "min-w-[44px] min-h-[44px]" // Touch-friendly size
                )}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6 text-gray-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6 text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationLinks={navigationLinks}
      />
    </div>
  );
};

export default Header;

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useDeviceInfo } from '@/hooks/use-mobile';

interface NavigationLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationLinks: NavigationLink[];
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationLinks,
  className
}) => {
  const location = useLocation();
  const { touchCapable, reducedMotionPreference } = useDeviceInfo();
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const isActiveLink = (href: string) => location.pathname === href;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const menuVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      scale: 0.95
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: reducedMotionPreference ? 0 : 0.05,
        delayChildren: reducedMotionPreference ? 0 : 0.1
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Handle drag to dismiss (only on touch devices)
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (touchCapable && info.offset.x > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            transition={{ duration: reducedMotionPreference ? 0.1 : 0.3 }}
            style={{
              backdropFilter: 'blur(8px) saturate(180%)',
              WebkitBackdropFilter: 'blur(8px) saturate(180%)'
            }}
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm",
              "bg-white/98 backdrop-blur-xl shadow-2xl",
              "border-l border-gray-200/60",
              "overflow-hidden", // Ensure content doesn't spill out
              className
            )}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag={touchCapable ? "x" : false}
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.99)', // Increased opacity for better readability
              backdropFilter: 'blur(20px) saturate(180%)', // Enhanced blur
              WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari support
              borderLeft: '1px solid rgba(229, 231, 235, 0.8)', // Enhanced border
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)', // Enhanced shadow
              willChange: 'transform, opacity',
              transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
            }}
          >
            {/* Background overlay for extra readability */}
            <div 
              className="absolute inset-0 bg-white/60 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)'
              }}
            />
            
            {/* Content container with relative positioning */}
            <div className="relative flex flex-col h-full bg-white/90">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100/80 bg-white/95">
                <motion.img 
                  src="/Logo.svg" 
                  alt="Aes AI" 
                  className="h-8 w-auto"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-aes-green focus:ring-offset-2"
                  onClick={onClose}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 bg-white/80">
                <div className="space-y-2">
                  {navigationLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      variants={itemVariants}
                      custom={index}
                    >
                      <Link 
                        to={link.href} 
                        className={cn(
                          "flex items-center w-full text-base py-4 px-4 rounded-xl font-medium transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-aes-green focus:ring-offset-2",
                          "hover:transform hover:translate-x-1",
                          isActiveLink(link.href)
                            ? "text-aes-green bg-aes-green/10 border-l-4 border-aes-green" 
                            : "text-gray-800 hover:text-aes-green hover:bg-gray-50"
                        )}
                        onClick={onClose}
                      >
                        <motion.span 
                          className="mr-3 w-6 h-6 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.1 }}
                        >
                          {link.icon}
                        </motion.span>
                        <span className="flex-1">{link.label}</span>
                        {isActiveLink(link.href) && (
                          <motion.div
                            className="w-2 h-2 bg-aes-green rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Action Buttons */}
              <motion.div 
                className="border-t border-gray-100/80 p-4 space-y-3 bg-white/95"
                variants={itemVariants}
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full border-aes-green text-aes-green hover:bg-aes-green hover:text-white",
                      "transition-all duration-200 h-12 rounded-xl font-medium",
                      "focus:outline-none focus:ring-2 focus:ring-aes-green focus:ring-offset-2",
                      "min-h-[44px]" // Touch-friendly minimum size
                    )}
                  >
                    Log In
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button 
                    className={cn(
                      "w-full bg-aes-green hover:bg-aes-green/90 text-white",
                      "transition-all duration-200 h-12 rounded-xl font-medium shadow-lg",
                      "focus:outline-none focus:ring-2 focus:ring-aes-green focus:ring-offset-2",
                      "min-h-[44px]" // Touch-friendly minimum size
                    )}
                    onClick={() => {
                      window.open('https://calendly.com/ali14hasnain/30min', '_blank');
                      onClose();
                    }}
                  >
                    Request Demo
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Drag indicator for touch devices */}
              {touchCapable && (
                <motion.div
                  className="absolute top-4 right-4 opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 1 }}
                >
                  <div className="w-1 h-8 bg-gray-400 rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';
import { Label } from './label';
import { CheckCircle, ArrowRight, Loader2, Sparkles, Building2, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addToWaitlist, getWaitlistCount } from '@/lib/waitlist-service';
import { UnifiedDialog } from './unified-dialog';
import { AnimatedTitle, FadeUpDiv, StaggerContainer } from './motion';

interface UnifiedWaitlistProps {
  className?: string;
  variant?: 'form' | 'dialog' | 'page' | 'test';
  trigger?: React.ReactNode;
  buttonText?: string;
  successMessage?: string;
  placeholder?: string;
  showFeatures?: boolean;
  showCount?: boolean;
  title?: string;
  description?: string;
}

const features = [
  {
    icon: <Building2 className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
    title: "SME Focused",
    description: "Tailored specifically for small and medium enterprises"
  },
  {
    icon: <Clock className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
    title: "Quick Setup", 
    description: "Get started in minutes, not days or weeks"
  },
  {
    icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-aes-green" />,
    title: "Secure & Compliant",
    description: "Enterprise-grade security for your financial data"
  }
];

const WaitlistForm: React.FC<{
  onSubmit: (email: string) => Promise<void>;
  buttonText: string;
  placeholder: string;
  className?: string;
}> = ({ onSubmit, buttonText, placeholder, className }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(email);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative flex flex-col sm:flex-row gap-2 sm:gap-0 w-full max-w-md mx-auto",
        className
      )}
    >
      <div className="relative flex-1">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={handleChange}
          disabled={isSubmitting || isSuccess}
          className={cn(
            "pr-4 border-2 h-12 sm:h-14 rounded-lg sm:rounded-r-none text-base transition-all",
            emailError 
              ? "border-red-400 focus-visible:ring-red-400" 
              : "border-aes-green/30 focus-visible:border-aes-green"
          )}
        />
        <AnimatePresence>
          {emailError && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute text-sm text-red-500 mt-1"
            >
              {emailError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={cn(
          "h-12 sm:h-14 sm:rounded-l-none px-8 relative overflow-hidden group transition-all",
          isSuccess 
            ? "bg-emerald-600 hover:bg-emerald-700" 
            : "bg-aes-green hover:bg-aes-green/90"
        )}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Joined</span>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
};

export const UnifiedWaitlist: React.FC<UnifiedWaitlistProps> = ({
  className,
  variant = 'form',
  trigger,
  buttonText = "Join Waitlist",
  successMessage = "You've been added to our waitlist!",
  placeholder = "Enter your email",
  showFeatures = false,
  showCount = false,
  title,
  description
}) => {
  const { toast } = useToast();
  const [count, setCount] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<string>('');
  const [activeFeature, setActiveFeature] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch waitlist count if needed
  useEffect(() => {
    if (showCount) {
      const fetchCount = async () => {
        try {
          const waitlistCount = await getWaitlistCount();
          setCount(waitlistCount);
        } catch (error) {
          console.error('Error fetching waitlist count:', error);
        }
      };
      fetchCount();
    }
  }, [showCount]);

  // Rotate features every 3 seconds on mobile
  useEffect(() => {
    if (!showFeatures) return;
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [showFeatures]);

  const handleSubmit = async (email: string) => {
    try {
      const result = await addToWaitlist(email);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message || successMessage,
          variant: "default",
        });
        
        // Update count if showing
        if (showCount) {
          const newCount = await getWaitlistCount();
          setCount(newCount);
        }
        
        // For test variant, show result
        if (variant === 'test') {
          setLastResult(JSON.stringify(result, null, 2));
        }
        
        // Close dialog if open
        if (variant === 'dialog') {
          setIsDialogOpen(false);
        }
      } else {
        toast({
          title: "Note",
          description: result.error || "There was an issue with your submission.",
          variant: "destructive",
        });
        
        if (variant === 'test') {
          setLastResult(JSON.stringify(result, null, 2));
        }
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Error",
        description: "There was an error adding you to the waitlist. Please try again.",
        variant: "destructive",
      });
      
      if (variant === 'test') {
        setLastResult(JSON.stringify({ success: false, error: String(error) }, null, 2));
      }
    }
  };

  const renderContent = () => {
    switch (variant) {
      case 'form':
        return (
          <WaitlistForm
            onSubmit={handleSubmit}
            buttonText={buttonText}
            placeholder={placeholder}
            className={className}
          />
        );

      case 'dialog':
        return (
          <UnifiedDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title={title || "Join the Waitlist"}
            description={description || "Be the first to know when we launch new features and updates."}
            trigger={trigger || <Button variant="outline">Join Waitlist</Button>}
          >
            <div className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-aes-navy">
                  Email
                </Label>
                <WaitlistForm
                  onSubmit={handleSubmit}
                  buttonText={buttonText}
                  placeholder={placeholder}
                />
              </div>
            </div>
          </UnifiedDialog>
        );

      case 'page':
        return (
          <div className={cn("space-y-8", className)}>
            {title && (
              <AnimatedTitle className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-aes-navy text-center">
                {title}
              </AnimatedTitle>
            )}
            
            {description && (
              <FadeUpDiv className="text-lg text-aes-gray text-center max-w-2xl mx-auto">
                {description}
              </FadeUpDiv>
            )}

            {showCount && count !== null && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-aes-green/10 rounded-full">
                  <Sparkles className="w-5 h-5 text-aes-green" />
                  <span className="text-aes-navy font-medium">
                    {count} people already joined
                  </span>
                </div>
              </div>
            )}

            <WaitlistForm
              onSubmit={handleSubmit}
              buttonText={buttonText}
              placeholder={placeholder}
              className="max-w-lg mx-auto"
            />

            {showFeatures && (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                {features.map((feature, index) => (
                  <FadeUpDiv
                    key={index}
                    className={cn(
                      "text-center p-6 rounded-xl transition-all duration-300",
                      "md:opacity-100",
                      index === activeFeature ? "opacity-100 bg-aes-green/5" : "opacity-50 md:opacity-100"
                    )}
                  >
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-aes-navy mb-2">{feature.title}</h3>
                    <p className="text-sm text-aes-gray">{feature.description}</p>
                  </FadeUpDiv>
                ))}
              </StaggerContainer>
            )}
          </div>
        );

      case 'test':
        return (
          <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-8">
            <h2 className="text-2xl font-bold text-aes-navy">Waitlist Supabase Test</h2>
            
            {showCount && (
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-gray-700">
                  Current waitlist count: {count !== null ? count : 'Loading...'}
                </p>
              </div>
            )}
            
            <WaitlistForm
              onSubmit={handleSubmit}
              buttonText="Test Add to Waitlist"
              placeholder="Enter your email"
            />
            
            {lastResult && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Last Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {lastResult}
                </pre>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
};

// Convenience exports for backward compatibility
export const WaitlistDialog = (props: Omit<UnifiedWaitlistProps, 'variant'>) => (
  <UnifiedWaitlist {...props} variant="dialog" />
);

// WaitlistForm is already exported above

export const WaitList = (props: Omit<UnifiedWaitlistProps, 'variant'>) => (
  <UnifiedWaitlist {...props} variant="page" showFeatures={true} />
);

export const WaitlistTest = (props: Omit<UnifiedWaitlistProps, 'variant'>) => (
  <UnifiedWaitlist {...props} variant="test" showCount={true} />
);

export default UnifiedWaitlist; 
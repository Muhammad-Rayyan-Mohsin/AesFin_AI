import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Button } from './button';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WaitlistFormProps {
  className?: string;
  onSubmit?: (email: string) => Promise<void>;
  buttonText?: string;
  successMessage?: string;
  placeholder?: string;
}

export function WaitlistForm({
  className,
  onSubmit,
  buttonText = "Join Waitlist",
  successMessage = "You've been added to our waitlist!",
  placeholder = "Enter your email"
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { toast } = useToast();

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
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default behavior if no onSubmit is provided
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setIsSuccess(true);
      
      toast({
        title: "Success!",
        description: successMessage,
        variant: "default",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
      }, 3000);
      
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
} 
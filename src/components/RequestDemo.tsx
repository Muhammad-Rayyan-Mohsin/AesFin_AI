import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface RequestDemoProps {
  className?: string;
  buttonText?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  buttonVariant?: 'primary' | 'secondary' | 'outline';
}

export function RequestDemo({
  className,
  buttonText = "Request Demo",
  buttonSize = 'lg',
  buttonVariant = 'primary'
}: RequestDemoProps) {
  const { toast } = useToast();

  // Button size classes
  const buttonSizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  // Button variant classes
  const buttonVariantClasses = {
    primary: "bg-[#00C37D] hover:bg-[#00C37D]/90 text-white",
    secondary: "bg-[#0E1B2B] hover:bg-[#0E1B2B]/90 text-white",
    outline: "bg-transparent border-2 border-[#00C37D] text-[#00C37D] hover:bg-[#00C37D]/10"
  };

  // Handle opening Calendly
  const handleOpenCalendly = () => {
    // Open Calendly in a new tab
    window.open("https://calendly.com/ali14hasnain/30min", "_blank");
    
    // Show toast notification
    toast({
      title: "Success!",
      description: "Opening Calendly to book your demo.",
      variant: "default",
    });
  };

  return (
    <Button
      onClick={handleOpenCalendly}
      className={cn(
        "rounded-full font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2",
        buttonSizeClasses[buttonSize],
        buttonVariantClasses[buttonVariant],
        className
      )}
      data-request-demo="true"
    >
      <Sparkles className="w-5 h-5" />
      {buttonText}
    </Button>
  );
}

export default RequestDemo; 
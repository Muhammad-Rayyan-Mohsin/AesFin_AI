import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WaitListProps {
  className?: string;
}

const WaitList = ({ className }: WaitListProps) => {
  const { toast } = useToast();

  const handleOpenCalendly = () => {
    window.open('https://calendly.com/ali14hasnain/30min', '_blank');
    toast({
      title: "Success!",
      description: "Opening Calendly to book your meeting.",
      variant: "default",
    });
  };

  return (
    <section id="wait-list" className={cn(
      "relative py-20 bg-aes-navy",
      className
    )}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aes-navy via-aes-mint to-aes-navy"></div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1 bg-aes-greenPale border border-aes-green/20 rounded-full text-aes-greenDark text-sm font-mono">
            SCHEDULE A CALL
          </div>
          <h2 className="heading-lg mb-6 text-white">
            Book a Meeting With Us
          </h2>
          <p className="body-md text-aes-gray mb-8">
            Discover how our financial intelligence platform can transform your business.
            Schedule a 30-minute call to discuss your needs and see how we can help.
          </p>

          <div className="relative max-w-md mx-auto text-center">
            <Button
              onClick={handleOpenCalendly}
              className="bg-aes-mint hover:bg-aes-mintLight text-aes-navy font-medium px-6 py-5 text-lg group animate-bounce-slow w-full sm:w-auto"
            >
              Book a meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-xs text-aes-gray mt-4">
              Choose a time that works for you. We look forward to discussing how AesFin AI can help with your financial intelligence needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitList;

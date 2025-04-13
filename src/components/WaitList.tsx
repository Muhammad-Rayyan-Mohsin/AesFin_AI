import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Check, Mail, X } from 'lucide-react';
import { addToWaitlist } from '@/lib/waitlist-service';
import { useToast } from '@/hooks/use-toast';

interface WaitListProps {
  className?: string;
}

const WaitList = ({ className }: WaitListProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status !== 'idle') {
      setStatus('idle');
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      setSuccessMessage('');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await addToWaitlist(email);

      if (result.success) {
        setStatus('success');
        const currentSuccessMessage = result.message || "You've been added to our waitlist.";
        setSuccessMessage(currentSuccessMessage);
        setEmail('');

        toast({
          title: "Success!",
          description: currentSuccessMessage,
          variant: "default",
        });
      } else {
        setStatus('error');
        const errorMsg = result.error || 'Failed to join waitlist. Please try again.';
        setErrorMessage(errorMsg);
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus('error');
      const errorMsg = 'An unexpected client-side error occurred';
      setErrorMessage(errorMsg);
      console.error('Error submitting to waitlist (client-side):', error);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
            EARLY ACCESS
          </div>
          <h2 className="heading-lg mb-6 text-white">
            Join the AesFin AI Waitlist
          </h2>
          <p className="body-md text-aes-gray mb-8">
            Be among the first to experience the future of financial intelligence.
            Early adopters receive special pricing and direct input into feature development.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-aes-gray" />
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your email address"
                  className={cn(
                    "pl-10 bg-aes-navyLight border-aes-gray/20 text-white placeholder:text-aes-gray focus:border-aes-mint",
                    status === 'error' && "border-red-500 focus:border-red-500",
                    status === 'success' && "border-green-500 focus:border-green-500"
                  )}
                  disabled={isLoading || status === 'success'}
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? "email-error" : status === 'success' ? "email-success" : undefined}
                />
                {status === 'success' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="bg-aes-mint hover:bg-aes-mintLight text-aes-navy font-medium group animate-bounce-slow"
                disabled={isLoading || status === 'success'}
              >
                {isLoading ? 'Joining...' : 'Join'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>

            {status === 'error' && errorMessage && (
              <div id="email-error" className="text-sm text-red-400 mt-2 flex items-center justify-center text-center">
                <X className="h-4 w-4 mr-1 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            {status === 'success' && successMessage && (
              <div id="email-success" className="text-sm text-green-400 mt-2 flex items-center justify-center text-center">
                <Check className="h-4 w-4 mr-1 flex-shrink-0" />
                {successMessage}
              </div>
            )}

            <p className="text-xs text-aes-gray mt-3">
              By joining, you'll be first to know when we launch. We respect your privacy and will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WaitList;

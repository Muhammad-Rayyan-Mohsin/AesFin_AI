import React, { useState, useEffect } from 'react';
import { addToWaitlist, getWaitlistCount } from '@/lib/waitlist-service';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

const WaitlistTest = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<string>('');
  const { toast } = useToast();

  // Fetch waitlist count on component mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const waitlistCount = await getWaitlistCount();
        setCount(waitlistCount);
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch waitlist count',
          variant: 'destructive',
        });
      }
    };

    fetchCount();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await addToWaitlist(email);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message || 'Successfully added to waitlist!',
          variant: 'default',
        });
        
        // Refresh count
        const newCount = await getWaitlistCount();
        setCount(newCount);
        
        // Clear email field
        setEmail('');
        
        // Display success result
        setLastResult(JSON.stringify(result, null, 2));
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to add to waitlist',
          variant: 'destructive',
        });
        
        // Display error result
        setLastResult(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
      
      // Display error result
      setLastResult(JSON.stringify({ success: false, error: String(error) }, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6 mt-8">
      <h2 className="text-2xl font-bold text-aes-navy">Waitlist Supabase Test</h2>
      
      <div className="p-3 bg-gray-50 rounded">
        <p className="text-gray-700">Current waitlist count: {count !== null ? count : 'Loading...'}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="w-full"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-aes-green hover:bg-aes-green/90 text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Test Add to Waitlist'}
        </Button>
      </form>
      
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
};

export default WaitlistTest; 
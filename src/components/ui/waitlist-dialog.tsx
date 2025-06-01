import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addToWaitlist } from '@/lib/waitlist-service';

interface WaitlistDialogProps {
  trigger?: React.ReactNode;
}

const WaitlistDialog = ({ trigger }: WaitlistDialogProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const result = await addToWaitlist(email);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message || "You've been added to our waitlist. We'll notify you when we're ready!",
          variant: "default",
        });
        setEmail('');
        setOpen(false);
      } else {
        toast({
          title: "Note",
          description: result.error || "There was an issue with your submission.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Error",
        description: "There was an error adding you to the waitlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Join Waitlist</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-aes-navy">Join the Waitlist</DialogTitle>
          <DialogDescription className="text-aes-gray">
            Be the first to know when we launch new features and updates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-aes-navy">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-aes-green hover:bg-aes-green/90 text-white"
          >
            Join Waitlist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog; 
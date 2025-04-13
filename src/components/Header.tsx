import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn(
      "relative z-40 w-full border-b border-aes-greenDark/10 bg-white shadow-sm",
      className
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <img 
              src="/aesfin-logo.svg" 
              alt="AesFin AI Logo" 
              className="h-10 w-auto object-contain" 
            />
          </div>
          <div className="flex flex-col sm:hidden">
            <span className="font-display font-bold text-lg text-aes-greenDark tracking-tight">AesFin AI</span>
            <span className="text-xs text-aes-gray -mt-1">Your AI Partner in Financial Integrity</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#overview" className="text-sm text-aes-gray hover:text-aes-greenDark transition-colors">Overview</a>
          <a href="#features" className="text-sm text-aes-gray hover:text-aes-greenDark transition-colors">Features</a>
          <a href="#journey" className="text-sm text-aes-gray hover:text-aes-greenDark transition-colors">User Journey</a>
          <a href="#business" className="text-sm text-aes-gray hover:text-aes-greenDark transition-colors">Business Model</a>
          <div className="flex items-center">
            <a href="#wait-list" className="text-sm text-aes-green hover:text-aes-greenDark transition-colors font-medium">
              Join Waitlist
              <ChevronRight className="inline-block w-3 h-3 ml-1" />
            </a>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-aes-gray hover:text-aes-greenDark">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white border-aes-grayLight">
            <nav className="flex flex-col gap-6 mt-8">
              <a href="#overview" className="text-lg text-aes-grayDark hover:text-aes-green transition-colors font-display">Overview</a>
              <a href="#features" className="text-lg text-aes-grayDark hover:text-aes-green transition-colors font-display">Features</a>
              <a href="#journey" className="text-lg text-aes-grayDark hover:text-aes-green transition-colors font-display">User Journey</a>
              <a href="#business" className="text-lg text-aes-grayDark hover:text-aes-green transition-colors font-display">Business Model</a>
              <a href="#wait-list" className="text-lg text-aes-green hover:text-aes-greenDark transition-colors font-display">
                Join Waitlist
                <ChevronRight className="inline-block w-4 h-4 ml-1" />
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useScrollDirection } from '@/hooks/use-scroll-direction';

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const isVisible = useScrollDirection();

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full bg-white border-b border-gray-200 transition-all duration-300 transform",
      isVisible ? "translate-y-0" : "-translate-y-full",
      className
    )}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <img 
              src="/Logo.svg" 
              alt="AesFin AI Logo" 
              className="h-14 w-auto object-contain" 
            />
          </div>
          <div className="flex flex-col sm:hidden">
            <span className="font-display font-bold text-lg text-gray-900 tracking-tight">AesFin AI</span>
            <span className="text-xs text-gray-500 -mt-1">Your AI Partner in Financial Integrity</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center gap-16 mr-8">
            <a href="/pricing" className="relative text-base text-gray-600 hover:text-gray-900 transition-colors font-medium group">
              <span className="relative z-10">Pricing</span>
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </a>
            <a href="/research" className="relative text-base text-gray-600 hover:text-gray-900 transition-colors font-medium group">
              <span className="relative z-10">Our Research</span>
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </a>
            <a href="/about" className="relative text-base text-gray-600 hover:text-gray-900 transition-colors font-medium group">
              <span className="relative z-10">About Us</span>
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </a>
            <a href="/contact" className="relative text-base text-gray-600 hover:text-gray-900 transition-colors font-medium group">
              <span className="relative z-10">Support & Contact</span>
              <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </a>
          </nav>
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all group"
          >
            Log In
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-gray-900">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l border-aes-grayLight bg-white p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/Logo.svg" 
                  alt="AesFin AI" 
                  className="h-8 w-auto" 
                />
              </div>
              
              <nav className="flex-1">
                <div className="space-y-6">
                  <a href="/pricing" className="flex items-center justify-between w-full text-base text-aes-navy hover:text-aes-green transition-colors group">
                    <span className="font-medium">Pricing</span>
                    <div className="h-px w-8 bg-aes-green/30 group-hover:w-12 transition-all duration-300"></div>
                  </a>
                  <a href="/research" className="flex items-center justify-between w-full text-base text-aes-navy hover:text-aes-green transition-colors group">
                    <span className="font-medium">Our Research</span>
                    <div className="h-px w-8 bg-aes-green/30 group-hover:w-12 transition-all duration-300"></div>
                  </a>
                  <a href="/about" className="flex items-center justify-between w-full text-base text-aes-navy hover:text-aes-green transition-colors group">
                    <span className="font-medium">About Us</span>
                    <div className="h-px w-8 bg-aes-green/30 group-hover:w-12 transition-all duration-300"></div>
                  </a>
                  <a href="/contact" className="flex items-center justify-between w-full text-base text-aes-navy hover:text-aes-green transition-colors group">
                    <span className="font-medium">Support & Contact</span>
                    <div className="h-px w-8 bg-aes-green/30 group-hover:w-12 transition-all duration-300"></div>
                  </a>
                </div>
              </nav>
              
              <div className="mt-auto pt-6 space-y-4">
                <Button 
                  className="w-full bg-aes-green text-white hover:bg-white hover:text-aes-green border border-aes-green transition-all duration-300"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all duration-300"
                >
                  Log In
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

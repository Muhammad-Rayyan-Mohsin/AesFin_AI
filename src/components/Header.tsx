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
              src="/aesfin-logo.svg" 
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
          <SheetContent side="right" className="bg-white border-gray-200">
            <nav className="flex flex-col gap-8 mt-8">
              <a href="/pricing" className="relative text-lg text-gray-600 hover:text-gray-900 transition-colors font-medium group">
                <span className="relative z-10">Pricing</span>
                <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </a>
              <a href="/research" className="relative text-lg text-gray-600 hover:text-gray-900 transition-colors font-medium group">
                <span className="relative z-10">Our Research</span>
                <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </a>
              <a href="/about" className="relative text-lg text-gray-600 hover:text-gray-900 transition-colors font-medium group">
                <span className="relative z-10">About Us</span>
                <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </a>
              <a href="/contact" className="relative text-lg text-gray-600 hover:text-gray-900 transition-colors font-medium group">
                <span className="relative z-10">Support & Contact</span>
                <span className="absolute inset-x-0 -bottom-1 h-1 bg-blue-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </a>
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all group"
                >
                  Log In
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

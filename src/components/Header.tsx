import React from 'react';
import { cn } from '@/lib/utils';
import { Menu, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="flex items-center">
            <img 
              src="/Logo.svg" 
              alt="AesFin AI Logo" 
              className="h-14 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center gap-16 mr-8">
            <Link to="/pricing" className="text-base text-gray-600 hover:text-gray-900 transition-colors font-medium relative group">
              <span className="relative">Pricing</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-aes-green/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </Link>
            <Link to="/security" className="text-base text-gray-600 hover:text-gray-900 transition-colors font-medium relative group">
              <span className="relative">Security</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-aes-green/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </Link>
            <Link to="/about" className="text-base text-gray-600 hover:text-gray-900 transition-colors font-medium relative group">
              <span className="relative">About Us</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-aes-green/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </Link>
            <Link to="/contact" className="text-base text-gray-600 hover:text-gray-900 transition-colors font-medium relative group">
              <span className="relative">Support & Contact</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-aes-green/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
            </Link>
          </nav>
          <Button 
            variant="outline" 
            className="border-aes-green text-aes-green hover:bg-aes-green hover:text-white transition-all group"
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
          <SheetContent side="right" className="w-full max-w-sm border-l border-gray-100 bg-white p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-start p-6">
                <img 
                  src="/Logo.svg" 
                  alt="AesFin AI" 
                  className="h-8 w-auto" 
                />
              </div>
              
              <nav className="flex-1 p-6">
                <div className="space-y-5">
                  <Link to="/pricing" className="block w-full text-base text-gray-800 font-medium hover:text-aes-green transition-colors">
                    Pricing
                  </Link>
                  <Link to="/security" className="block w-full text-base text-gray-800 font-medium hover:text-aes-green transition-colors">
                    Security
                  </Link>
                  <Link to="/about" className="block w-full text-base text-gray-800 font-medium hover:text-aes-green transition-colors">
                    About Us
                  </Link>
                  <Link to="/contact" className="block w-full text-base text-gray-800 font-medium hover:text-aes-green transition-colors">
                    Support & Contact
                  </Link>
                </div>
              </nav>
              
              <div className="mt-auto border-t border-gray-100 p-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full border-aes-navy text-aes-navy hover:bg-aes-navy hover:text-white transition-colors"
                >
                  Login
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Link to="/contact">
                  <Button 
                    className="w-full bg-aes-green hover:bg-aes-green/90 text-white transition-colors"
                  >
                    <span className="flex-shrink-0 mr-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    Book a Call
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

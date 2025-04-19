import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "relative py-12 bg-white border-t border-aes-grayLight",
      className
    )}>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo & Info */}
          <div className="sm:col-span-2">
            <div className="flex flex-col items-start gap-2 mb-6">
              {/* Logo in the footer */}
              <div className="mb-4">
                <img 
                  src="/Logo.svg" 
                  alt="AesFin AI" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              <p className="text-sm text-aes-gray mb-6 max-w-xs text-left">
                A cutting-edge AI financial intelligence platform designed for businesses
                across all sectors and regions.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/aesfin-ai" target="_blank" rel="noopener noreferrer" className="text-aes-gray hover:text-aes-greenDark transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Links - Now in a flex container for better mobile alignment */}
          <div className="flex gap-8 sm:gap-4">
            <div className="flex-1">
              <h3 className="font-display font-semibold text-aes-greenDark mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-aes-gray hover:text-aes-green transition-colors">About</a></li>
                <li><a href="/contact" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Contact</a></li>
                <li><a href="/pricing" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h3 className="font-display font-semibold text-aes-greenDark mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-aes-grayLight mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-aes-gray mb-4 md:mb-0">
            © {currentYear} AesFin AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

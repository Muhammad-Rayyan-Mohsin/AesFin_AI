import React from 'react';
import { cn } from '@/lib/utils';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(
      "relative py-12 bg-aes-greenPale border-t border-aes-grayLight",
      className
    )}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-center md:items-start gap-2 mb-6">
              {/* Single logo in the footer */}
              <div className="mb-4 flex justify-center md:justify-start">
                <img 
                  src="/aesfin-logo.svg" 
                  alt="AesFin AI" 
                  className="h-12 w-auto object-contain" 
                />
              </div>
              <p className="text-sm text-aes-gray mb-6 max-w-xs text-center md:text-left">
                A cutting-edge AI financial intelligence platform designed for businesses
                across all sectors and regions.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="#" className="text-aes-gray hover:text-aes-greenDark transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-aes-gray hover:text-aes-greenDark transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-aes-gray hover:text-aes-greenDark transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-aes-gray hover:text-aes-greenDark transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-aes-greenDark mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Press</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-aes-greenDark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">API</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-aes-gray hover:text-aes-green transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-aes-grayLight mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-aes-gray mb-4 md:mb-0">
            © 2025 AesFin AI. All rights reserved. This is a prototype demo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'relative bg-gradient-to-b from-[#1A2235] to-[#121827] text-[#E5E7EB] pt-12 pb-6',
      className
    )}>
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Column 1: Company Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <img src="/Logo.svg" alt="Aes AI" className="h-10 w-10 rounded-lg bg-[#1A2235] p-2" />
              <span className="text-xl font-bold text-white">Aes AI</span>
            </div>
            <p className="text-[#A1A1AA] text-sm mb-4 font-normal">
              Your personal automated AI financial agent that simplifies wealth management and optimizes your financial decisions.
            </p>
            <div className="flex gap-4 text-[#A1A1AA] mt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-[#23262F] rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-[#23262F] rounded-full">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-[#23262F] rounded-full">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 bg-[#23262F] rounded-full">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
              <a href="/dashboard" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Dashboard
              </a>
              <a href="/about" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                About Us
              </a>
              <a href="/pricing" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Pricing
              </a>
              <a href="/research" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Research
              </a>
              <a href="/contact" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Contact
              </a>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-3">Legal</h3>
            <div className="grid grid-cols-1 gap-2">
              <a href="/terms" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Terms of Service
              </a>
              <a href="/privacy" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Privacy Policy
              </a>
              <a href="/cookies" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-[#393C49] rounded-full mr-2"></span>
                Cookie Policy
              </a>
            </div>
            
            <h3 className="text-white font-semibold text-lg mt-4 mb-3">Contact</h3>
            <div className="grid grid-cols-1 gap-3">
              <a href="mailto:info@aesai.com" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@aesai.com
              </a>
              <a href="tel:+11234567890" className="text-[#A1A1AA] hover:text-white transition-colors text-sm flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +1 (123) 456-7890
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-3">Join Our Waitlist</h3>
            <p className="text-[#A1A1AA] text-sm mb-3">
              Be the first to know when we launch and receive exclusive offers.
            </p>
            <form className="flex flex-col gap-2 w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md bg-[#23262F] text-[#E5E7EB] px-4 py-2 outline-none border border-[#393C49] focus:border-[#4B4E5A] placeholder-[#A1A1AA] text-sm"
              />
              <button
                type="submit"
                className="rounded-md bg-gradient-to-r from-[#3D5AFE] to-[#1E88E5] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="border-[#23262F] mb-4" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-[#A1A1AA]">© {currentYear} Aes AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

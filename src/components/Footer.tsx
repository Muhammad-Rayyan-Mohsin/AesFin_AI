import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'relative bg-[#1A2235] text-[#E5E7EB] pt-28 pb-20',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Left: Logo, description, newsletter */}
          <div className="flex-1 min-w-[260px] flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <img src="/Logo.svg" alt="AesFin AI" className="h-16 w-16 rounded-lg bg-[#1A2235] p-2" />
              <span className="text-2xl font-bold text-white">AesFin AI</span>
            </div>
            <p className="text-[#A1A1AA] text-base max-w-md mb-2 font-normal">
              Your personal automated AI financial agent.
            </p>
          </div>
          {/* Right: Newsletter form */}
          <div className="flex-1 flex flex-col items-end min-w-[320px]">
            <span className="text-lg font-semibold text-white mb-2">Join our waitlist</span>
            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-l-md bg-[#23262F] text-[#E5E7EB] px-5 py-3 outline-none border-none placeholder-[#A1A1AA] text-base"
              />
              <button
                type="submit"
                className="rounded-r-md bg-[#393C49] text-[#E5E7EB] px-6 py-3 text-base font-semibold hover:bg-[#4B4E5A] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-[#23262F]" />

        {/* Navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center mb-8">
          <a href="/dashboard" className="hover:text-white transition-colors text-base">Dashboard</a>
          <a href="/about" className="hover:text-white transition-colors text-base">About Us</a>
          <a href="/pricing" className="hover:text-white transition-colors text-base">Pricing</a>
          <a href="/research" className="hover:text-white transition-colors text-base">Research</a>
          <a href="/contact" className="hover:text-white transition-colors text-base">Contact</a>
          <a href="/privacy" className="hover:text-white transition-colors text-base">Privacy Policy</a>
        </div>

        <hr className="mb-6 border-[#23262F]" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-[#A1A1AA]">© {currentYear} AesFin AI. All rights reserved.</p>
          <div className="flex gap-8 text-[#A1A1AA] text-2xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter className="w-7 h-7" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook className="w-7 h-7" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-7 h-7" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram className="w-7 h-7" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

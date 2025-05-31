import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { X } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, className }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("sm:max-w-[800px] p-0 overflow-hidden bg-aes-navy", className)}>
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-white overflow-wrap-break-word">
              AesFin AI Platform Demo
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              {/* Replace with actual video embed */}
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="AesFin AI Platform Demo"
                className="w-full h-full" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-4 text-white/80 text-sm overflow-wrap-break-word">
              <p>
                This demo shows how AesFin AI can help your financial institution monitor transactions,
                assess risks, and ensure compliance with regulations - all in one unified platform.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal; 
import React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, className }) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content 
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] p-0 bg-aes-navy shadow-lg sm:rounded-lg overflow-hidden",
            className
          )}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="p-6 pb-0">
              <h2 className="text-xl font-bold text-white">
                AesFin AI Platform Demo
              </h2>
            </div>
            
            <div className="p-6">
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.youtube.com/embed/aMohh4bLFlo?autoplay=1&mute=0&controls=1&rel=0&showinfo=0"
                  title="AesFin AI Platform Demo"
                  className="w-full h-full" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              
              <div className="mt-4 text-white/80 text-sm">
                <p>
                  This demo shows how AesFin AI can help your financial institution monitor transactions,
                  assess risks, and ensure compliance with regulations - all in one unified platform.
                </p>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default DemoModal; 
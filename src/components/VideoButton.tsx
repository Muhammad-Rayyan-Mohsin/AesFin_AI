import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from '@/components/ui/button';
import { X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoButtonProps {
  className?: string;
  buttonText?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
}

const VideoButton = ({ 
  className,
  buttonText = "Watch Demo Video",
  buttonSize = 'lg'
}: VideoButtonProps) => {
  const [open, setOpen] = useState(false);

  // Button size classes
  const buttonSizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <>
      <Button 
        variant="outline"
        className={cn(
          "rounded-full bg-[#00C37D] text-white hover:bg-[#00C37D]/90 border-[#00C37D] flex items-center gap-2",
          buttonSizeClasses[buttonSize],
          className
        )}
        onClick={() => {
          console.log('Video button clicked');
          setOpen(true);
        }}
      >
        <Play className="w-5 h-5" />
        {buttonText}
      </Button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] p-0 bg-[#0E1B2B] shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={() => setOpen(false)}
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
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default VideoButton; 
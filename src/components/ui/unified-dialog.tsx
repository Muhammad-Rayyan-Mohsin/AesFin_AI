import React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface UnifiedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'demo' | 'video';
  showCloseButton?: boolean;
  loading?: boolean;
  trigger?: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-[800px]',
  full: 'max-w-[95vw] max-h-[95vh]'
};

const variantClasses = {
  default: 'bg-background border',
  demo: 'bg-aes-navy overflow-hidden',
  video: 'bg-aes-navy overflow-hidden p-0'
};

export const UnifiedDialog: React.FC<UnifiedDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  loading = false,
  trigger
}) => {
  const dialogContent = (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>
          {trigger}
        </DialogPrimitive.Trigger>
      )}
      
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        
        <DialogPrimitive.Content 
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "sm:rounded-lg",
            sizeClasses[size],
            variantClasses[variant],
            variant === 'default' && 'p-6',
            variant === 'demo' && 'p-6 pb-0',
            className
          )}
        >
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 right-2 z-10 rounded-full",
                variant === 'default' 
                  ? "opacity-70 ring-offset-background hover:opacity-100" 
                  : "bg-black/20 text-white hover:bg-black/40"
              )}
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
          
          {title && (
            <div className={cn(
              "flex flex-col space-y-1.5 text-center sm:text-left",
              variant === 'demo' || variant === 'video' ? "text-white" : ""
            )}>
              <h2 className={cn(
                "text-lg font-semibold leading-none tracking-tight",
                variant === 'demo' && "text-xl font-bold"
              )}>
                {title}
              </h2>
              {description && (
                <p className={cn(
                  "text-sm",
                  variant === 'default' ? "text-muted-foreground" : "text-white/80"
                )}>
                  {description}
                </p>
              )}
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-8"
              >
                <Loader2 className="w-8 h-8 animate-spin text-aes-green" />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(title && "mt-4")}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );

  return dialogContent;
};

// Convenience components for specific use cases
export const DemoModal: React.FC<Omit<UnifiedDialogProps, 'variant' | 'size'> & { 
  videoUrl?: string;
}> = ({ videoUrl, ...props }) => (
  <UnifiedDialog
    {...props}
    variant="video"
    size="xl"
    title="AesFin AI Platform Demo"
    description="This demo shows how AesFin AI can help your financial institution monitor transactions, assess risks, and ensure compliance with regulations - all in one unified platform."
  >
    {videoUrl && (
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        <iframe 
          src={videoUrl}
          title="AesFin AI Platform Demo"
          className="w-full h-full" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>
    )}
  </UnifiedDialog>
);

export const TestModal: React.FC<Omit<UnifiedDialogProps, 'variant'>> = (props) => (
  <UnifiedDialog
    {...props}
    variant="default"
    title="Test Modal"
  >
    <p>This is a test modal to check if the Dialog component is working properly.</p>
  </UnifiedDialog>
);

export const SimpleDialog: React.FC<Omit<UnifiedDialogProps, 'variant'>> = (props) => (
  <UnifiedDialog
    {...props}
    variant="default"
    title="Simple Dialog Test"
  >
    <p>This is a simple dialog test using our unified dialog system.</p>
  </UnifiedDialog>
);

export default UnifiedDialog; 
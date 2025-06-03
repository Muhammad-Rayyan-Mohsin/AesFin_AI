import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from '@/components/ui/button';

const SimpleDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        Open Simple Dialog
      </Button>
      
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-lg sm:rounded-lg">
          <h2 className="text-lg font-semibold">Simple Dialog Test</h2>
          <p className="mt-2">This is a simple dialog test using Radix UI Dialog directly.</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default SimpleDialog; 
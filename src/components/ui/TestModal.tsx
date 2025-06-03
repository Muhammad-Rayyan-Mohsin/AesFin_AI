import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const TestModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => {
        console.log('Test button clicked');
        setIsOpen(true);
      }}>
        Open Test Modal
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        console.log('Dialog onOpenChange:', open);
        setIsOpen(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Modal</DialogTitle>
          </DialogHeader>
          <div>
            This is a test modal to check if the Dialog component is working properly.
          </div>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestModal; 
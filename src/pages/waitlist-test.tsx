import React from 'react';
import WaitlistTest from '@/components/WaitlistTest';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WaitlistTestPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-aes-navy">Waitlist Supabase Integration Test</h1>
          <WaitlistTest />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistTestPage; 
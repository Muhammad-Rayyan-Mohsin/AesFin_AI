import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Security from '@/components/Security';
import UserJourney from '@/components/UserJourney';
import WaitList from '@/components/WaitList';
import Footer from '@/components/Footer';
import PrototypeBanner from '@/components/ui/prototype-banner';

const Index = () => {
  return (
    <div className="min-h-screen bg-aes-navy text-white flex flex-col">
      <PrototypeBanner />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Overview />
        <Security />
        <UserJourney />
        <WaitList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

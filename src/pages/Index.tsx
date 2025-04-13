
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import UserJourney from '@/components/UserJourney';
import BusinessModel from '@/components/BusinessModel';
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
        <UserJourney />
        <BusinessModel />
        <WaitList />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

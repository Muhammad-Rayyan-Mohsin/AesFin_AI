import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-aes-navy mb-6">
              About AesFin AI
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-aes-gray mb-8">
                AesFin AI is a cutting-edge financial intelligence platform that leverages artificial intelligence
                to transform how businesses manage their finances and ensure compliance.
              </p>
              
              <h2 className="text-2xl font-semibold text-aes-navy mt-12 mb-4">Our Mission</h2>
              <p className="text-aes-gray mb-8">
                We're on a mission to democratize financial intelligence by making advanced AI-powered
                financial management tools accessible to businesses of all sizes.
              </p>

              <h2 className="text-2xl font-semibold text-aes-navy mt-12 mb-4">Our Vision</h2>
              <p className="text-aes-gray mb-8">
                We envision a future where every business has access to intelligent financial tools
                that help them make better decisions, ensure compliance, and drive growth.
              </p>

              <h2 className="text-2xl font-semibold text-aes-navy mt-12 mb-4">Our Values</h2>
              <ul className="list-disc list-inside space-y-4 text-aes-gray mb-8">
                <li>Innovation in financial technology</li>
                <li>Commitment to customer success</li>
                <li>Data security and privacy</li>
                <li>Transparency in operations</li>
                <li>Continuous improvement</li>
              </ul>

              <h2 className="text-2xl font-semibold text-aes-navy mt-12 mb-4">Our Team</h2>
              <p className="text-aes-gray mb-8">
                Our team consists of experts in artificial intelligence, finance, and software development,
                working together to create the next generation of financial management tools.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage; 
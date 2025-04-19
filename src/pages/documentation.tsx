import React from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Quick Start Guide', href: '#quick-start' },
        { title: 'Installation', href: '#installation' },
        { title: 'Basic Configuration', href: '#configuration' }
      ]
    },
    {
      title: 'Core Features',
      items: [
        { title: 'AML Screening', href: '#aml-screening' },
        { title: 'Transaction Monitoring', href: '#transaction-monitoring' },
        { title: 'Risk Assessment', href: '#risk-assessment' }
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Authentication', href: '#authentication' },
        { title: 'Endpoints', href: '#endpoints' },
        { title: 'Rate Limits', href: '#rate-limits' }
      ]
    },
    {
      title: 'Integrations',
      items: [
        { title: 'Banking Systems', href: '#banking-systems' },
        { title: 'Payment Processors', href: '#payment-processors' },
        { title: 'Third-party Services', href: '#third-party' }
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-aes-navy mb-6">
              Documentation
            </h1>
            <p className="text-lg text-aes-gray mb-12">
              Everything you need to know about implementing and using AesFin AI's compliance solutions.
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-aes-navy mb-4">
                    {section.title}
                  </h2>
                  <div className="grid gap-3">
                    {section.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        <span className="text-aes-gray group-hover:text-aes-navy transition-colors">
                          {item.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-aes-green opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-aes-navy mb-2">
                Need more help?
              </h3>
              <p className="text-aes-gray mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-aes-green hover:text-aes-navy transition-colors"
              >
                Contact Support
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DocumentationPage; 
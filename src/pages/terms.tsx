import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage = () => {
  const sections = [
    {
      title: 'Agreement to Terms',
      content: `By accessing and using AesFin AI's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`
    },
    {
      title: 'Use License',
      content: `Subject to your compliance with these Terms of Service, AesFin AI grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use our services for your business purposes.`,
      list: [
        'You must not modify or copy our software',
        'You must not use the service for any illegal purposes',
        'You must not attempt to derive source code',
        'You must not transfer your account to another party'
      ]
    },
    {
      title: 'Service Description',
      content: `Our services provide compliance and financial management solutions. We reserve the right to:`,
      list: [
        'Modify or discontinue any part of our services',
        'Refuse service to anyone for any reason',
        'Update pricing with reasonable notice',
        'Change features and functionality'
      ]
    },
    {
      title: 'User Obligations',
      content: `As a user of our services, you agree to:`,
      list: [
        'Provide accurate and complete information',
        'Maintain the security of your account',
        'Comply with all applicable laws and regulations',
        'Use the services in a responsible manner',
        'Report any security vulnerabilities or misuse'
      ]
    },
    {
      title: 'Payment Terms',
      content: `For paid services:`,
      list: [
        'Payments are processed securely through our payment providers',
        'Subscriptions auto-renew unless cancelled',
        'Refunds are handled according to our refund policy',
        'Prices are subject to change with notice'
      ]
    },
    {
      title: 'Intellectual Property',
      content: `All content, features, and functionality of our services are owned by AesFin AI and are protected by international copyright, trademark, and other intellectual property laws.`
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law, AesFin AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.`
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including:`,
      list: [
        'Violation of these Terms',
        'Fraudulent or illegal activities',
        'Non-payment of fees',
        'At our sole discretion'
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
              Terms of Service
            </h1>
            <p className="text-lg text-aes-gray mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-aes-navy mb-4">
                    {section.title}
                  </h2>
                  <p className="text-aes-gray mb-4">
                    {section.content}
                  </p>
                  {section.list && (
                    <ul className="list-disc list-inside space-y-2 text-aes-gray">
                      {section.list.map((item, index) => (
                        <li key={index} className="ml-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-lg font-semibold text-aes-navy mb-2">
                Questions about our Terms?
              </h3>
              <p className="text-aes-gray mb-4">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <a
                href="/contact"
                className="text-aes-green hover:text-aes-navy transition-colors"
              >
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage; 
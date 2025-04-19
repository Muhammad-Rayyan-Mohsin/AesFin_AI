import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Introduction',
      content: `At AesFin AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our compliance solutions and visit our website.`
    },
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including but not limited to:`,
      list: [
        'Account information (name, email, company details)',

      ]
    },
    {
      title: 'How We Use Your Information',
      content: `We use the collected information for various purposes:`,
      list: [
        'Providing and maintaining our services',
        'Improving and personalizing user experience',
        'Communicating with you about updates and changes',
        'Ensuring compliance with legal requirements',
        'Detecting and preventing fraud'
      ]
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to maintain the security of your personal information, including encryption, access controls, and regular security assessments.`
    },
    {
      title: 'Data Sharing and Disclosure',
      content: `We may share your information with:`,
      list: [
        'Service providers and business partners',
        'Legal authorities when required by law',
        'Third parties with your explicit consent'
      ]
    },
    {
      title: 'Your Rights',
      content: `You have certain rights regarding your personal information:`,
      list: [
        'Access and obtain a copy of your data',
        'Rectify inaccurate information',
        'Request deletion of your data',
        'Object to processing of your data',
        'Data portability'
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
              Privacy Policy
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
                Questions about our Privacy Policy?
              </h3>
              <p className="text-aes-gray mb-4">
                If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
              </p>
              <a
                href="/contact"
                className="text-aes-green hover:text-aes-navy transition-colors"
              >
                Contact our Privacy Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPage; 
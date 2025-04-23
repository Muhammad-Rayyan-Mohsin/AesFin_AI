import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Database, EyeOff, ServerCrash, CheckCircle, Key } from 'lucide-react';
import AnimatedSection from '@/components/ui/animated-section';

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-aes-green" />,
      title: "End-to-End Encryption",
      description: "All data transmissions are secured with industry-standard TLS 1.3 encryption. Information is encrypted from the moment it leaves your device until it reaches our secure servers, protecting against unauthorized access or interception."
    },
    {
      icon: <Database className="h-6 w-6 text-aes-green" />,
      title: "Secure Data Storage",
      description: "Financial data at rest is protected with AES-256 encryption, the same standard used by financial institutions and governments worldwide. All storage systems are hardened against vulnerabilities and regularly audited."
    },
    {
      icon: <EyeOff className="h-6 w-6 text-aes-green" />,
      title: "Zero-Knowledge Architecture",
      description: "Our systems are designed with a zero-knowledge approach, meaning we never see your raw financial data. Our AI processes your information while maintaining privacy and confidentiality at all times."
    },
    {
      icon: <Lock className="h-6 w-6 text-aes-green" />,
      title: "Advanced Access Controls",
      description: "Granular permission systems ensure that only authorized users can access specific data. Multi-factor authentication is available for all accounts, providing an additional layer of security beyond passwords."
    },
    {
      icon: <ServerCrash className="h-6 w-6 text-aes-green" />,
      title: "Disaster Recovery",
      description: "Automatic backups and comprehensive disaster recovery protocols ensure your data remains safe and available even in the event of system failures or natural disasters."
    },
    {
      icon: <Key className="h-6 w-6 text-aes-green" />,
      title: "Key Management",
      description: "Encryption keys are carefully managed with industry best practices, including key rotation and secure generation using hardware security modules (HSMs)."
    }
  ];
  
  const complianceStandards = [
    "SOC 2 Type II",
    "GDPR Compliant",
    "HIPAA Compliant",
    "ISO 27001",
    "PCI DSS"
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-aes-navy to-aes-navy/90 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 -left-24 w-96 h-96 bg-aes-green/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-aes-green/30 rounded-full blur-[80px]" />
          </div>
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0f1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0f1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          
          <div className="container relative z-10 px-4 md:px-6 text-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center mb-4 md:mb-6 bg-aes-green/10 py-1 px-3 rounded-full">
                <Shield className="h-4 w-4 text-aes-green mr-2" />
                <span className="text-xs text-aes-green font-medium">Secure by Design</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Your Financial Data,{" "}
                <span className="text-aes-green">Fully Protected</span>
              </h1>
              <p className="text-lg text-aes-gray/90 max-w-3xl mx-auto mb-8">
                AesFin AI implements the industry's highest security standards to safeguard your sensitive financial information. Our comprehensive security measures ensure your data remains private, secure, and under your control at all times.
              </p>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Security Features */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Comprehensive Security Features
                </h2>
                <p className="text-aes-gray">
                  Our platform is built from the ground up with security as a core principle,
                  not an afterthought.
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {securityFeatures.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium text-aes-navy mb-3">{feature.title}</h3>
                    <p className="text-sm text-aes-gray/90">{feature.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
        
        {/* Compliance */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-aes-gray">
                  AesFin AI meets or exceeds all relevant industry standards and regulations.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-10">
                {complianceStandards.map((standard, index) => (
                  <div key={index} className="bg-white px-5 py-3 rounded-lg shadow-sm border border-gray-100 flex items-center">
                    <CheckCircle className="h-5 w-5 text-aes-green mr-2" />
                    <span className="text-sm font-medium text-aes-navy">{standard}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8 max-w-3xl mx-auto">
                <h3 className="text-xl font-medium text-aes-navy mb-4">Our Security Commitment</h3>
                <p className="text-sm text-aes-gray/90 mb-4">
                  At AesFin AI, security isn't just a feature—it's foundational to everything we do. We continuously monitor, test, and improve our security measures to stay ahead of emerging threats and vulnerabilities.
                </p>
                <p className="text-sm text-aes-gray/90 mb-4">
                  Our team includes security experts with backgrounds in financial services and data protection. We regularly conduct penetration testing, vulnerability assessments, and security audits to ensure the highest standards of protection.
                </p>
                <p className="text-sm text-aes-gray/90">
                  Your trust is our most valuable asset, and we're committed to earning it every day through rigorous security practices and transparency.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage; 
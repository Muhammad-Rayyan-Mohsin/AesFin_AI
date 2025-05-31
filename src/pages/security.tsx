import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Lock, 
  Database, 
  EyeOff, 
  ServerCrash, 
  CheckCircle, 
  Key, 
  ArrowRight, 
  AlertCircle, 
  FileText,
  Users,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import AnimatedText from '@/components/ui/animated-text';
import { ScrollReveal, ScrollSequence } from '@/components/ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import { fadeIn, fadeUp, slideInRight } from '@/lib/animation-variants';

const SecurityPage = () => {
  const [activeTab, setActiveTab] = useState<string>('data-protection');
  const { prefersReducedMotion } = useAnimation();
  
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
    {
      name: "SOC 2 Type II",
      description: "Verified by independent auditors for security, availability, processing integrity, confidentiality, and privacy controls."
    },
    {
      name: "GDPR Compliant",
      description: "Full compliance with the EU's General Data Protection Regulation for data privacy and protection."
    },
    {
      name: "HIPAA Compliant",
      description: "Meets all Health Insurance Portability and Accountability Act requirements for securing sensitive data."
    },
    {
      name: "ISO 27001",
      description: "Certified against international standards for information security management systems."
    },
    {
      name: "PCI DSS",
      description: "Compliant with Payment Card Industry Data Security Standard for handling credit card information."
    }
  ];
  
  const securityTabs = [
    {
      id: 'data-protection',
      label: 'Data Protection',
      icon: <Shield className="h-5 w-5" />,
      content: {
        title: 'How We Protect Your Data',
        description: 'Our multi-layered approach to data protection ensures your financial information remains secure at all times.',
        features: [
          {
            title: 'Data Encryption',
            description: 'All sensitive data is encrypted both in transit and at rest using AES-256 encryption standards.',
            icon: <Lock className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Regular Security Audits',
            description: 'We conduct comprehensive security audits and penetration testing on a quarterly basis.',
            icon: <FileText className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Access Controls',
            description: 'Strict role-based access controls ensure only authorized personnel can access your data.',
            icon: <Users className="h-5 w-5 text-aes-green" />
          }
        ]
      }
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure',
      icon: <Layers className="h-5 w-5" />,
      content: {
        title: 'Secure Infrastructure',
        description: 'Our infrastructure is designed with multiple redundancies and security measures to ensure continuous operation.',
        features: [
          {
            title: 'Cloud Security',
            description: 'We leverage enterprise-grade cloud infrastructure with advanced security configurations.',
            icon: <Database className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Continuous Monitoring',
            description: '24/7 automated monitoring for suspicious activities and potential threats.',
            icon: <AlertCircle className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Disaster Recovery',
            description: 'Comprehensive disaster recovery plans with regular testing and multi-region backups.',
            icon: <ServerCrash className="h-5 w-5 text-aes-green" />
          }
        ]
      }
    },
    {
      id: 'compliance',
      label: 'Compliance',
      icon: <CheckCircle className="h-5 w-5" />,
      content: {
        title: 'Regulatory Compliance',
        description: 'We adhere to strict regulatory standards to ensure your data is handled in accordance with industry regulations.',
        features: [
          {
            title: 'Industry Certifications',
            description: 'We maintain multiple security certifications, including SOC 2 Type II and ISO 27001.',
            icon: <CheckCircle className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Regular Audits',
            description: 'Independent third-party audits verify our compliance with security standards.',
            icon: <FileText className="h-5 w-5 text-aes-green" />
          },
          {
            title: 'Compliance Documentation',
            description: 'Detailed documentation available to enterprise customers for their own compliance needs.',
            icon: <FileText className="h-5 w-5 text-aes-green" />
          }
        ]
      }
    }
  ];
  
  const securityFAQs = [
    {
      question: "How is my financial data protected?",
      answer: "Your financial data is protected using AES-256 encryption both in transit and at rest. We employ a zero-knowledge architecture, meaning we never have access to your raw financial data. Our systems are designed with multiple security layers, including access controls, intrusion detection, and continuous monitoring."
    },
    {
      question: "Who has access to my data?",
      answer: "Access to customer data is strictly controlled using role-based access controls. Only essential personnel with specific job requirements can access limited parts of the system, and all access is logged and monitored. No staff member has access to your raw financial information."
    },
    {
      question: "What happens if there's a security breach?",
      answer: "We have a comprehensive incident response plan in place. In the unlikely event of a security breach, we would immediately contain the issue, investigate the cause, and notify affected customers as required by law. We maintain security incident teams on standby 24/7."
    },
    {
      question: "Can I request a security audit report?",
      answer: "Yes, enterprise customers can request our latest security audit reports, penetration testing results, and compliance certifications under NDA. Please contact your account manager or our security team to arrange access to these documents."
    }
  ];

  return (
    <div className="min-h-screen bg-aes-mintBg flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Keep the navy color for this section as it creates good contrast */}
        <section className="relative bg-gradient-to-b from-aes-navy to-aes-navy/90 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 -left-24 w-96 h-96 bg-aes-green/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-aes-green/30 rounded-full blur-[80px]" />
          </div>
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0f1a_1px,transparent_1px),linear-gradient(to_bottom,#0a0f1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <ScrollReveal className="md:w-1/2">
                <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center mb-4 md:mb-6 bg-aes-green/10 py-1 px-3 rounded-full">
                <Shield className="h-4 w-4 text-aes-green mr-2" />
                <span className="text-xs text-aes-green font-medium">Secure by Design</span>
              </div>
                  <AnimatedText 
                    text="Your Financial Data, Fully Protected" 
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
                    as="h1"
                  />
                  <motion.p 
                    className="text-lg text-aes-gray/90 mb-8"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                Aes AI implements the industry's highest security standards to safeguard your sensitive financial information. Our comprehensive security measures ensure your data remains private, secure, and under your control at all times.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      className="bg-aes-green hover:bg-aes-green/90 text-white group"
                      onClick={() => window.location.href = "/contact"}
                    >
                      Learn More About Our Security
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal className="md:w-1/2" delay={0.3}>
                <motion.div 
                  className="relative flex justify-center md:justify-end"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-aes-green/20 to-aes-navy/40 rounded-full blur-[50px]"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 0.8, 0.6],
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-40 h-40 md:w-56 md:h-56 bg-aes-navy border-4 border-aes-green/30 rounded-full flex items-center justify-center p-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ 
                            background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, rgba(0,0,0,0) 70%)"
                          }}
                        />
                        <Shield className="w-20 h-20 md:w-28 md:h-28 text-aes-green" />
                      </motion.div>
                    </div>
                    
                    {/* Orbiting elements */}
                    {!prefersReducedMotion && securityFeatures.slice(0, 4).map((_, index) => {
                      const angle = (index * Math.PI) / 2; // Divide the circle into 4 parts
                      const delay = index * 0.2;
                      
                      return (
                        <motion.div
                          key={index}
                          className="absolute w-12 h-12 rounded-full bg-[#1A2235] border border-aes-green/30 flex items-center justify-center"
                          initial={{ 
                            x: Math.cos(angle) * 120 + (96/2 - 6), 
                            y: Math.sin(angle) * 120 + (96/2 - 6),
                            opacity: 0 
                          }}
                          animate={{ 
                            opacity: 1 
                          }}
                          transition={{ 
                            delay: 0.5 + delay,
                            duration: 0.3 
                          }}
                        >
                          {[<Lock />, <Database />, <EyeOff />, <Key />][index % 4]}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        {/* Security Tabs Section - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Comprehensive Security Features
                </h2>
                <p className="text-aes-gray">
                  Our platform is built from the ground up with security as a core principle,
                  not an afterthought.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="max-w-4xl mx-auto">
                <Tabs 
                  defaultValue="data-protection" 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full mb-8">
                    {securityTabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id}
                        className="flex items-center gap-2 data-[state=active]:bg-aes-green/10 data-[state=active]:text-aes-green"
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {securityTabs.map((tab) => (
                    <TabsContent 
                      key={tab.id} 
                      value={tab.id}
                      className="p-6 border border-gray-100 rounded-xl shadow-sm bg-white mt-2"
                    >
                      <h3 className="text-2xl font-display font-medium text-aes-navy mb-3">{tab.content.title}</h3>
                      <p className="text-aes-gray mb-8">{tab.content.description}</p>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {tab.content.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <div className="w-10 h-10 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                              {feature.icon}
                            </div>
                            <h4 className="text-lg font-medium text-aes-navy mb-2">{feature.title}</h4>
                            <p className="text-sm text-aes-gray">{feature.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Security Features Grid - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Security Built Into Every Layer
                </h2>
                <p className="text-aes-gray">
                  Every aspect of our platform incorporates security best practices and advanced protection measures.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {securityFeatures.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div 
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full hover:shadow-md transition-all duration-300"
                    whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-aes-green/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium text-aes-navy mb-3">{feature.title}</h3>
                    <p className="text-sm text-aes-gray/90">{feature.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        
        {/* Compliance - Feature */}
        <section className="py-16 md:py-20 bg-aes-featureBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Compliance & Certifications
                </h2>
                <p className="text-aes-gray">
                  Aes AI meets or exceeds all relevant industry standards and regulations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                <ScrollSequence staggerChildren={0.1} delayStart={0.2}>
                {complianceStandards.map((standard, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                      whileHover={prefersReducedMotion ? {} : { y: -5 }}
                    >
                      <div className="flex items-center mb-3">
                        <CheckCircle className="h-5 w-5 text-aes-green mr-2 flex-shrink-0" />
                        <h3 className="text-lg font-medium text-aes-navy">{standard.name}</h3>
                  </div>
                      <p className="text-sm text-aes-gray">{standard.description}</p>
                    </motion.div>
                ))}
                </ScrollSequence>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-aes-mintBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-aes-navy mb-4">
                  Security FAQs
                </h2>
                <p className="text-aes-gray">
                  Answers to common questions about our security practices
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {securityFAQs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-aes-navy">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-aes-gray">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-aes-ctaBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto bg-gradient-to-r from-aes-navy to-aes-navy/90 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="md:flex items-start justify-between">
                    <div className="md:max-w-2xl">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need more information about our security?</h3>
                      <p className="text-gray-300 mb-8">
                        Our team is available to answer your security questions and provide detailed information about our compliance standards, infrastructure, and data protection measures.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          className="bg-aes-green hover:bg-aes-green/90 text-white group"
                          onClick={() => window.location.href = "/contact"}
                        >
                          Contact Security Team
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-white text-white hover:bg-white/10 group"
                          onClick={() => window.location.href = "/documentation"}
                        >
                          View Security Docs
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <Shield className="h-24 w-24 text-aes-green opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SecurityPage; 
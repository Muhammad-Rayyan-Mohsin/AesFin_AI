import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Users, 
  Building, 
  ArrowRight, 
  CheckCircle,
  Headphones,
  FileQuestion,
  CreditCard,
  LifeBuoy
} from 'lucide-react';
import AnimatedText from '@/components/ui/animated-text';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import { fadeIn, fadeUp } from '@/lib/animation-variants';

const ContactPage = () => {
  const { prefersReducedMotion } = useAnimation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const supportCategories = [
    {
      id: 'general',
      label: 'General Inquiries',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Questions about our services, pricing, or general information'
    },
    {
      id: 'technical',
      label: 'Technical Support',
      icon: <Headphones className="h-5 w-5" />,
      description: 'Help with technical issues, platform access, or features'
    },
    {
      id: 'billing',
      label: 'Billing Support',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Questions about invoices, payments, or subscription changes'
    },
    {
      id: 'enterprise',
      label: 'Enterprise Solutions',
      icon: <Building className="h-5 w-5" />,
      description: 'Custom solutions for large organizations'
    },
  ];
  
  const commonQuestions = [
    {
      category: 'general',
      questions: [
        {
          question: "What is Aes AI?",
          answer: "Aes AI is a financial intelligence platform that uses artificial intelligence to help businesses manage their finances, ensure compliance, and make better financial decisions."
        },
        {
          question: "How do I get started with Aes AI?",
          answer: "You can sign up for a free trial on our website. Once registered, you'll receive access to our platform and guidance on how to set up your account."
        },
        {
          question: "Is my data secure with Aes AI?",
          answer: "Yes, we take data security very seriously. We implement industry-leading security measures including end-to-end encryption, secure data storage, and regular security audits. You can learn more on our Security page."
        }
      ]
    },
    {
      category: 'technical',
      questions: [
        {
          question: "How do I reset my password?",
          answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
        },
        {
          question: "Can I integrate Aes AI with my existing systems?",
          answer: "Yes, Aes AI offers API access and integrations with popular financial and business software. Our Professional and higher plans include API access."
        },
        {
          question: "What browsers are supported?",
          answer: "Aes AI supports all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience."
        }
      ]
    },
    {
      category: 'billing',
      questions: [
        {
          question: "How does billing work?",
          answer: "We offer monthly and annual subscription plans. You'll be billed at the start of each billing cycle. You can view and manage your subscription from your account settings."
        },
        {
          question: "Can I change my plan?",
          answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes to your plan will be effective immediately, with prorated billing adjustments."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied with our service within the first 30 days, contact our billing department for a full refund."
        }
      ]
    },
    {
      category: 'enterprise',
      questions: [
        {
          question: "What enterprise features do you offer?",
          answer: "Our enterprise solutions include custom integrations, dedicated support, SLA guarantees, advanced security features, and the ability to handle large transaction volumes."
        },
        {
          question: "How do I get a custom enterprise quote?",
          answer: "Contact our sales team through the Enterprise Solutions form on this page, and we'll schedule a consultation to understand your needs and provide a custom quote."
        },
        {
          question: "Do you offer on-premise solutions?",
          answer: "For enterprise customers with specific security or regulatory requirements, we can discuss on-premise or private cloud deployment options. Contact our enterprise sales team for details."
        }
      ]
    }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your backend
    // For demo purposes, we'll just simulate a successful submission
    setFormSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <>
      <Header />
      <main className="overflow-hidden bg-aes-mintBg">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-aes-mintBg to-aes-mintBg/95 py-20 md:py-32">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/4 -right-20 w-80 h-80 bg-aes-green/5 rounded-full blur-[100px]"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          
          <div className="container px-4 mx-auto relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <AnimatedText 
                  text="Support & Contact" 
                  className="text-4xl md:text-5xl font-display font-bold text-aes-navy mb-6"
                  as="h1"
                />
                
                <motion.p 
                  className="text-xl text-aes-gray mb-6"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We're here to help! Reach out with questions about our services or get support for your account.
                </motion.p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                    <Phone className="h-4 w-4 text-aes-green mr-2" />
                    <span className="text-sm text-aes-navy">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                    <Mail className="h-4 w-4 text-aes-green mr-2" />
                    <span className="text-sm text-aes-navy">support@aesfin.ai</span>
                  </div>
                  <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                    <Clock className="h-4 w-4 text-aes-green mr-2" />
                    <span className="text-sm text-aes-navy">Mon-Fri: 9am-5pm PST</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* Contact Tabs Section - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto">
                <Tabs 
                  defaultValue="general" 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
                    {supportCategories.map((category) => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="flex items-center gap-2 data-[state=active]:bg-aes-green/10 data-[state=active]:text-aes-green"
                      >
                        {category.icon}
                        <span className="hidden md:inline">{category.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {supportCategories.map((category) => (
                    <TabsContent 
                      key={category.id} 
                      value={category.id}
                      className="mt-2"
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <div className="md:flex items-start gap-8">
                          <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 rounded-full bg-aes-green/10 flex items-center justify-center mr-3">
                                {category.icon}
                              </div>
                              <h2 className="text-2xl font-medium text-aes-navy">{category.label}</h2>
                            </div>
                            <p className="text-aes-gray mb-6">{category.description}</p>
                            
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <h3 className="text-sm font-medium text-aes-navy mb-2">Response Time</h3>
                              <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-xs text-aes-gray">
                                  {category.id === 'technical' || category.id === 'enterprise' 
                                    ? 'Typically within 2 hours' 
                                    : 'Typically within 24 hours'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:w-2/3">
                            <form onSubmit={handleSubmit} className="space-y-6">
                              {formSubmitted ? (
                                <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                  <h3 className="text-xl font-medium text-aes-navy mb-2">Message Sent!</h3>
                                  <p className="text-aes-gray">
                                    Thank you for reaching out. We'll get back to you as soon as possible.
                                  </p>
                                </div>
                              ) : (
                                <>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <Label htmlFor={`${category.id}-firstName`}>First Name</Label>
                                      <Input id={`${category.id}-firstName`} placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                                      <Label htmlFor={`${category.id}-lastName`}>Last Name</Label>
                                      <Input id={`${category.id}-lastName`} placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                                    <Label htmlFor={`${category.id}-email`}>Email</Label>
                                    <Input id={`${category.id}-email`} type="email" placeholder="Enter your email address" required />
                </div>

                <div className="space-y-2">
                                    <Label htmlFor={`${category.id}-company`}>Company</Label>
                                    <Input id={`${category.id}-company`} placeholder="Enter your company name" />
                </div>

                <div className="space-y-2">
                                    <Label htmlFor={`${category.id}-subject`}>Subject</Label>
                                    <Input id={`${category.id}-subject`} placeholder={`${category.label} Inquiry`} required />
                </div>

                <div className="space-y-2">
                                    <Label htmlFor={`${category.id}-message`}>Message</Label>
                  <Textarea
                                      id={`${category.id}-message`}
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                                      required
                  />
                </div>

                                  <Button type="submit" className="w-full bg-aes-green hover:bg-aes-green/90 text-white">
                  Send Message
                </Button>
                                </>
                              )}
              </form>
            </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </ScrollReveal>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-aes-mintBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-aes-gray">
                  Find quick answers to common questions about {supportCategories.find(c => c.id === activeTab)?.label.toLowerCase()}
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {commonQuestions.find(c => c.category === activeTab)?.questions.map((faq, index) => (
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
        
        {/* Office Locations - Feature */}
        <section className="py-16 md:py-24 bg-aes-featureBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">
                  Our Offices
                </h2>
                <p className="text-aes-gray">
                  Visit us at one of our office locations
                </p>
            </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src="/offices/san-francisco.jpg" 
                      alt="San Francisco Office" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400/aes-navy/white?text=San+Francisco";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aes-navy/80 to-transparent flex items-end">
                      <div className="p-4">
                        <h3 className="text-white text-xl font-semibold">San Francisco</h3>
                        <p className="text-white/80 text-sm">Headquarters</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-aes-gray">
                  123 Business Street<br />
                  Suite 456<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
                    <div className="flex items-start mb-4">
                      <Phone className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-aes-gray">+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-aes-gray">Monday - Friday, 9am - 5pm PST</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                  whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src="/offices/new-york.jpg" 
                      alt="New York Office" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x400/aes-navy/white?text=New+York";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-aes-navy/80 to-transparent flex items-end">
                      <div className="p-4">
                        <h3 className="text-white text-xl font-semibold">New York</h3>
                        <p className="text-white/80 text-sm">East Coast Office</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-aes-gray">
                        456 Finance Avenue<br />
                        Floor 12<br />
                        New York, NY 10022<br />
                        United States
                      </p>
                    </div>
                    <div className="flex items-start mb-4">
                      <Phone className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-aes-gray">+1 (555) 987-6543</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-aes-green mt-0.5 mr-3 flex-shrink-0" />
                      <p className="text-aes-gray">Monday - Friday, 9am - 5pm EST</p>
                    </div>
                  </div>
                </motion.div>
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
                  <div className="md:flex items-center justify-between">
                    <div className="md:max-w-2xl">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need immediate assistance?</h3>
                      <p className="text-gray-300 mb-8">
                        Our support team is available for live chat during business hours. 
                        Get real-time help with your questions or issues.
                      </p>
                      <Button 
                        className="bg-aes-green hover:bg-aes-green/90 text-white group"
                        onClick={() => window.location.href = "https://calendly.com/ali14hasnain/30min"}
                      >
                        Book a Call
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                    <div className="hidden md:block">
                      <LifeBuoy className="h-24 w-24 text-aes-green opacity-80" />
                    </div>
                  </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage; 
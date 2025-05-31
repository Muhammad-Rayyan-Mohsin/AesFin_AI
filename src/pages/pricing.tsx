import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, BadgeCheck, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AnimatedText from '@/components/ui/animated-text';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useAnimation } from '@/providers/AnimationProvider';
import { fadeIn, fadeUp, staggerContainer } from '@/lib/animation-variants';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { prefersReducedMotion } = useAnimation();
  
  const tiers = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 'Free' : 'Free',
      description: 'Perfect for small businesses getting started with financial compliance',
      features: [
        'Basic AML screening',
        'Up to 100 transactions/month',
        'Standard support',
        'Basic reporting',
        'Single user access'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const,
      href: '/demo'
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? '$29.99' : '$24.99',
      period: billingCycle === 'monthly' ? '/month' : '/month',
      description: 'Ideal for growing SMEs requiring comprehensive compliance tools',
      features: [
        'Advanced AML screening',
        '∞ transactions/month',
        'Priority support',
        'Advanced reporting & analytics',
        'Monitor multiple branches (up to 3)',
        'Custom rules engine',
        'API access'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
      href: '/demo',
      isRecommended: true
    },
    {
      name: 'Business Plus',
      price: billingCycle === 'monthly' ? '$99.99' : '$79.99',
      period: billingCycle === 'monthly' ? '/month' : '/month',
      description: 'Perfect for medium-sized businesses needing enhanced features and support',
      features: [
        'Everything in Professional, plus:',
        'Monitor up to 10 branches',
        'Advanced AI risk analysis',
        'Custom integrations',
        'Dedicated support manager',
        'Priority feature requests',
        'Enhanced API access',
        'Compliance training resources'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
      href: '/demo'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for large organizations with complex needs',
      features: [
        'Enterprise-grade AML screening',
        'Unlimited transactions',
        '24/7 dedicated support',
        'Advanced AI-powered analytics',
        'Unlimited branches',
        'Custom integration',
        'Dedicated account manager',
        'SLA guarantees'
      ],
      buttonText: "Let's Talk",
      buttonVariant: 'outline' as const,
      href: '/demo'
    }
  ];
  
  const faqs = [
    {
      question: "How does your free trial work?",
      answer: "Our free trial gives you full access to the plan features for 14 days with no credit card required. You can explore all capabilities and decide if it's right for your business before committing."
    },
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or change your plan at any time. Your billing will be prorated based on the time remaining in your current billing cycle."
    },
    {
      question: "Do you offer discounts for startups or non-profits?",
      answer: "Yes, we offer special pricing for eligible startups, non-profits, and educational institutions. Please contact our sales team to learn more about our discount programs."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. For enterprise plans, we can also accommodate bank transfers and other payment methods."
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-aes-mintBg to-aes-mintBg/95 overflow-hidden">
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
            {/* Header */}
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center justify-center mb-4 md:mb-6 bg-aes-green/10 py-1 px-3 rounded-full">
                  <Sparkles className="h-4 w-4 text-aes-green mr-2" />
                  <span className="text-xs text-aes-green font-medium">Simple & Transparent</span>
                </div>
                <AnimatedText 
                  text="Choose the perfect plan for your business" 
                  className="text-4xl font-display font-bold tracking-tight text-aes-navy sm:text-5xl mb-4"
                  as="h1"
                />
                <motion.p 
                  className="text-xl text-aes-gray"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  All plans include a 14-day free trial. No credit card required.
                </motion.p>
              </div>
            </ScrollReveal>

            {/* Pricing Cards - Feature section */}
            <section className="py-16 md:py-24 bg-aes-featureBg">
              <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal>
                  <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">Our Pricing Plans</h2>
                    <p className="text-aes-gray">Choose the perfect plan for your business needs</p>
                  </div>
                </ScrollReveal>
                
                {/* Billing toggle */}
                <ScrollReveal>
                  <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-full p-1 shadow-sm border border-gray-100 inline-flex">
                      <Tabs defaultValue="monthly" className="w-full" onValueChange={(v) => setBillingCycle(v as 'monthly' | 'yearly')}>
                        <TabsList className="grid w-full grid-cols-2 bg-transparent">
                          <TabsTrigger value="monthly" className="rounded-full data-[state=active]:bg-aes-green data-[state=active]:text-white">
                            Monthly
                          </TabsTrigger>
                          <TabsTrigger value="yearly" className="rounded-full data-[state=active]:bg-aes-green data-[state=active]:text-white">
                            <div className="flex items-center">
                              Yearly
                              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                Save 20%
                              </span>
                            </div>
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Pricing Cards */}
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {tiers.map((tier, index) => (
                    <motion.div
                      key={tier.name}
                      variants={fadeUp}
                      custom={index}
                      className={cn(
                        "relative rounded-2xl bg-white p-8 shadow-lg flex flex-col h-full transform transition-all duration-300 hover:shadow-xl",
                        tier.isRecommended && "ring-2 ring-aes-green"
                      )}
                      whileHover={prefersReducedMotion ? {} : { y: -8 }}
                    >
                      {tier.isRecommended && (
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 rounded-full bg-aes-green text-white text-sm font-medium">
                          <div className="flex items-center">
                            <BadgeCheck className="w-4 h-4 mr-1" /> 
                            Recommended
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold leading-6 text-aes-navy">
                          {tier.name}
                        </h3>
                        <div className="mt-4 flex items-baseline text-aes-navy">
                          <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                          {tier.period && (
                            <span className="text-lg font-semibold text-aes-gray">{tier.period}</span>
                          )}
                        </div>
                        <p className="mt-4 text-sm text-aes-gray">{tier.description}</p>
                      </div>

                      <div className="flex-grow">
                        <ul className="space-y-3">
                          {tier.features.map((feature) => {
                            const isHeading = feature.includes('plus:');
                            return (
                              <li key={feature} className="flex items-start">
                                <Check className={`h-5 w-5 ${isHeading ? 'text-aes-navy' : 'text-aes-green'} shrink-0`} />
                                <span className={`ml-3 text-sm ${isHeading ? 'font-medium text-aes-navy' : 'text-aes-gray'}`}>
                                  {feature}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <motion.div 
                        className="mt-8 w-full"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      >
                        <Button
                          variant={tier.buttonVariant}
                          className={cn(
                            "w-full group transition-all duration-300",
                            tier.name === 'Professional' || tier.name === 'Business Plus'
                              ? "bg-aes-green text-white hover:opacity-90"
                              : tier.isRecommended 
                                ? "bg-gradient-to-r from-aes-green to-aes-navy text-white hover:opacity-90" 
                                : "border-aes-green text-aes-green hover:bg-aes-green hover:text-white"
                          )}
                          onClick={() => window.location.href = tier.href}
                        >
                          {tier.buttonText}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Enterprise CTA */}
            <section className="py-16 md:py-20 bg-aes-ctaBg">
              <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal delay={0.4}>
                  <div className="max-w-3xl mx-auto bg-gradient-to-r from-aes-navy to-[#2A3A5A] rounded-2xl shadow-lg overflow-hidden">
                    <div className="md:flex items-center">
                      <div className="p-8 md:p-10 md:w-2/3">
                        <h3 className="text-2xl font-bold text-white mb-2">Need a custom solution?</h3>
                        <p className="text-gray-300 mb-6">Contact our sales team for a personalized demo and custom pricing tailored to your organization's needs.</p>
                        <Button 
                          className="bg-white text-aes-navy hover:bg-gray-100 group"
                          onClick={() => window.location.href = "/contact"}
                        >
                          Contact Sales
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </div>
                      <div className="hidden md:block md:w-1/3 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-aes-green/20 to-transparent mix-blend-overlay" />
                        <svg 
                          className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 text-aes-green opacity-20" 
                          width="300" 
                          height="300" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Feature comparison - Feature section */}
            <section className="py-16 md:py-24 bg-aes-featureBg">
              <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal>
                  <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-aes-navy mb-4">Compare Plan Features</h2>
                    <p className="text-aes-gray">Find the perfect plan for your business needs</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-4 px-6 text-left text-sm font-semibold text-aes-navy">Features</th>
                          {tiers.map((tier) => (
                            <th key={tier.name} className="py-4 px-6 text-center text-sm font-semibold text-aes-navy">
                              {tier.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-6 text-sm text-aes-gray font-medium">
                            <div className="flex items-center">
                              AML Screening
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 ml-1 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="w-60">Check transactions against global watchlists and sanctions databases</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Basic</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Advanced</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Advanced</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Enterprise-grade</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-6 text-sm text-aes-gray font-medium">
                            <div className="flex items-center">
                              Monthly Transactions
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">100</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Unlimited</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Unlimited</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Unlimited</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-6 text-sm text-aes-gray font-medium">
                            <div className="flex items-center">
                              Support Level
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Standard</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Priority</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Dedicated</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">24/7 Dedicated</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-6 text-sm text-aes-gray font-medium">
                            <div className="flex items-center">
                              Branches
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">1</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Up to 3</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Up to 10</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Unlimited</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-4 px-6 text-sm text-aes-gray font-medium">
                            <div className="flex items-center">
                              API Access
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">—</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">✓</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Enhanced</td>
                          <td className="py-4 px-6 text-center text-sm text-aes-gray">Custom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-aes-mintBg">
          <div className="container px-4 md:px-6 mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-aes-navy mb-4">Frequently Asked Questions</h2>
                <p className="text-aes-gray">Find answers to common questions about our pricing plans</p>
              </div>
              
              <div className="grid gap-6">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-medium text-aes-navy mb-2">{faq.question}</h3>
                    <p className="text-aes-gray">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-aes-gray mb-4">
                  Still have questions?
                </p>
                <Button 
                  className="bg-aes-green hover:bg-aes-green/90 text-white group"
                  onClick={() => window.location.href = "/contact"}
                >
                  Contact Our Team
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage; 
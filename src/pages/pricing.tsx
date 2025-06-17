import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, BadgeCheck, Info, Shield, Zap, Users } from 'lucide-react';
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
import { Link, useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { prefersReducedMotion } = useAnimation();
  const navigate = useNavigate();
  
  // Updated pricing tiers following Slite's simple structure
  const tiers = [
    {
      name: 'Standard',
      description: 'For teams to create, monitor & manage compliance at scale.',
      price: billingCycle === 'monthly' ? '$29' : '$24',
      period: billingCycle === 'monthly' ? '/user/month' : '/user/month',
      info: 'Billed yearly',
      buttonText: 'Start free trial',
      buttonVariant: 'default' as const,
      href: '/demo',
      features: [
        'Basic AML screening',
        'Up to 500 transactions/month',
        'Standard support (email)',
        'Basic reporting',
        'Up to 5 user access',
        'Document verification',
        'API access (limited)'
      ],
    },
    {
      name: 'Premium',
      description: 'For businesses needing enhanced security & streamlined user management.',
      price: billingCycle === 'monthly' ? '$79' : '$69',
      period: billingCycle === 'monthly' ? '/user/month' : '/user/month',
      info: 'Billed yearly',
      buttonText: 'Start free trial',
      buttonVariant: 'default' as const,
      href: '/demo',
      isRecommended: true,
      features: [
        'Everything in Standard, plus:',
        'Advanced AML screening',
        'Unlimited transactions',
        'Priority support',
        'Advanced analytics',
        'User provisioning (SSO)',
        'Custom domain',
        'Full API access'
      ],
    },
    {
      name: 'Enterprise',
      description: 'For large organizations requiring read-only roles, dedicated account management & priority support.',
      price: 'Custom',
      period: '',
      buttonText: "Let's talk",
      buttonVariant: 'outline' as const,
      href: '/demo',
      features: [
        'Everything in Premium, plus:',
        'Read-only roles',
        'Audit logs',
        'Priority support',
        'Dedicated account manager',
        'Custom integrations',
        'Personalized onboarding',
        'Service Level Agreement'
      ],
    }
  ];

  // Feature comparison data
  const featureCategories = [
    {
      name: 'Usage',
      features: [
        {
          name: 'Number of transactions',
          standard: '500/month',
          premium: 'Unlimited',
          enterprise: 'Unlimited',
        },
        {
          name: 'File upload',
          standard: 'Up to 5MB per file',
          premium: 'Up to 25MB per file',
          enterprise: 'Unlimited',
        },
        {
          name: 'Document storage',
          standard: '1GB per user',
          premium: '10GB per user',
          enterprise: '25GB per user',
        },
        {
          name: 'Transaction history',
          standard: '3 months',
          premium: '12 months',
          enterprise: '36 months',
        }
      ]
    },
    {
      name: 'Features',
      features: [
        {
          name: 'AI risk analysis',
          standard: '30/month/user',
          premium: '1000/month/user',
          enterprise: 'Unlimited',
        },
        {
          name: 'Compliance assistant',
          standard: '50 responses/month/user',
          premium: 'Unlimited',
          enterprise: 'Unlimited',
        },
        {
          name: 'Schedule recurring checks',
          standard: true,
          premium: true,
          enterprise: true,
        },
        {
          name: 'Risk management panel',
          standard: true,
          premium: true,
          enterprise: true,
        }
      ]
    },
    {
      name: 'Security',
      features: [
        {
          name: 'SOC2 Type II Compliance',
          standard: true,
          premium: true,
          enterprise: true,
        },
        {
          name: 'Automatic data back-ups',
          standard: true,
          premium: true,
          enterprise: true,
        },
        {
          name: 'OpenID Single Sign-On (SSO)',
          standard: false,
          premium: true,
          enterprise: true,
        },
        {
          name: 'Audit log (on demand)',
          standard: false,
          premium: false,
          enterprise: true,
        }
      ]
    }
  ];
  
  // Testimonials
  const testimonials = [
    {
      quote: "As we're growing fast, the ease of adoption is a crucial element when choosing a new solution. AesFin is friendly, and easy to adopt.",
      author: "Martin Kappers",
      title: "Head of Compliance, VanTrade",
      avatar: "/placeholder.svg"
    },
    {
      quote: "Our entire team is on the same page and moves faster. AesFin lets our staff operate as a single team across multiple timezones and functions.",
      author: "Leah Wilson",
      title: "Co-founder, SecureFinance",
      avatar: "/placeholder.svg"
    },
    {
      quote: "Our team has grown from 50 people to over 200 in the last year. AesFin supports our fast growth by giving us a structured system to manage compliance.",
      author: "Jessica Ramirez",
      title: "Head of Risk, MetroBank",
      avatar: "/placeholder.svg"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "How does the 14 days free trial work?",
      answer: "Once you sign up to AesFin, your 14 day free trial begins. During this period you can test out the capabilities of the product and everything that's included in the Standard plan before purchasing one of our plans. You'll have the option to book a demo with one of our compliance experts at any point during the trial."
    },
    {
      question: "What happens after the Free Trial has ended?",
      answer: "Once the 14 day free trial has ended, you will see a message that purchasing one of our subscription plans is necessary to continue using AesFin. You'll need to be a workspace admin to purchase a plan."
    },
    {
      question: "Do you offer discounts for non-profit and academic organizations?",
      answer: "Yes, we do offer discounts to eligible non-profit or academic organizations. Contact support@aesfin.com to redeem this offer."
    },
    {
      question: "Can I add extra members to the workspace and how are these billed?",
      answer: "You can add extra users to your workspace directly in the product. If you are on our monthly plan, these extra users will be billed on your next invoice. If you are on our yearly plan, we will prorate the costs. We'll review the number of members each month on the day you have started your subscription."
    }
  ];
  
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero section */}
        <section className="py-20 md:py-24 bg-aes-mintBg overflow-hidden relative">
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
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-display font-bold tracking-tight text-aes-navy sm:text-5xl mb-4">
                  Plans for every stage of your business
                </h1>
                <p className="text-xl text-aes-gray">
                  All plans include a 14-day free trial. No credit card required.
                </p>
              </div>
            </ScrollReveal>

            {/* Pricing toggle */}
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

            {/* Pricing Cards - Slite-inspired design */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className={cn(
                    "relative bg-white p-6 shadow-md rounded-xl border border-gray-200 flex flex-col h-full",
                    tier.isRecommended && "border-aes-green ring-2 ring-aes-green shadow-lg"
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

                  <div>
                    <h3 className="text-xl font-semibold text-aes-navy mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-aes-gray mb-3 h-12">
                      {tier.description}
                    </p>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-aes-navy">{tier.price}</span>
                        <span className="text-lg text-aes-gray ml-1">{tier.period}</span>
                      </div>
                      {tier.info && (
                        <p className="text-sm text-aes-gray mt-1">{tier.info}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Button
                      className={cn(
                        "w-full mb-6",
                        tier.buttonVariant === 'default' && "bg-aes-green hover:bg-aes-greenDark text-white",
                        tier.buttonVariant === 'outline' && "border-aes-green text-aes-green hover:bg-aes-greenPale"
                      )}
                      variant={tier.buttonVariant}
                      onClick={() => navigate(tier.href)}
                    >
                      {tier.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <ul className="space-y-3 text-sm">
                      {tier.features.map((feature) => {
                        const isHeading = feature.includes('plus:');
                        return (
                          <li key={feature} className={cn("flex items-start", isHeading && "font-medium")}>
                            <Check className={cn("h-5 w-5 mr-3 flex-shrink-0", isHeading ? "text-aes-navy" : "text-aes-green")} />
                            <span className={isHeading ? "text-aes-navy" : "text-aes-gray"}>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-display font-bold text-aes-navy">
                  They say it better than we do
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <div className="bg-aes-mintBg p-6 rounded-2xl">
                    <p className="text-aes-navy mb-6 italic text-sm">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-sm text-aes-navy">{testimonial.author}</p>
                        <p className="text-xs text-aes-gray">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed feature comparison - Slite-inspired clean table */}
        <section className="py-16 md:py-24 bg-aes-mintBg">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-display font-bold text-aes-navy mb-4">
                  Compare all features
                </h2>
                <p className="text-aes-gray">
                  Get exactly what you need for your compliance operations
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-5xl mx-auto overflow-x-auto">
              {featureCategories.map((category, categoryIdx) => (
                <div key={categoryIdx} className="mb-12">
                  <h3 className="text-xl font-semibold text-aes-navy mb-4">{category.name}</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-4 px-6 font-medium text-aes-navy w-1/3"></th>
                        <th className="py-4 px-6 font-medium text-aes-navy">Standard</th>
                        <th className="py-4 px-6 font-medium text-aes-navy">Premium</th>
                        <th className="py-4 px-6 font-medium text-aes-navy">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.features.map((feature, featureIdx) => (
                        <tr key={featureIdx} className="border-b border-gray-200 hover:bg-white/50">
                          <td className="py-4 px-6 text-sm font-medium text-aes-navy">{feature.name}</td>
                          <td className="py-4 px-6 text-sm text-aes-gray">
                            {typeof feature.standard === 'boolean' ? (
                              feature.standard ? (
                                <Check className="h-5 w-5 text-aes-green" />
                              ) : (
                                <span className="text-gray-400">-</span>
                              )
                            ) : (
                              feature.standard
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-aes-gray">
                            {typeof feature.premium === 'boolean' ? (
                              feature.premium ? (
                                <Check className="h-5 w-5 text-aes-green" />
                              ) : (
                                <span className="text-gray-400">-</span>
                              )
                            ) : (
                              feature.premium
                            )}
                          </td>
                          <td className="py-4 px-6 text-sm text-aes-gray">
                            {typeof feature.enterprise === 'boolean' ? (
                              feature.enterprise ? (
                                <Check className="h-5 w-5 text-aes-green" />
                              ) : (
                                <span className="text-gray-400">-</span>
                              )
                            ) : (
                              feature.enterprise
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-display font-bold text-aes-navy mb-4">
                  Frequently Asked Questions
                </h2>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-8">
              {faqs.map((faq, idx) => (
                <ScrollReveal key={idx} delay={0.1 * idx}>
                  <div>
                    <h3 className="text-xl font-semibold text-aes-navy mb-2">{faq.question}</h3>
                    <p className="text-aes-gray">{faq.answer}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-aes-green text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl font-display font-bold mb-6">Try AesFin today</h2>
                <p className="text-xl mb-8">Get your team set up in minutes, not weeks.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-aes-green hover:bg-gray-100"
                    onClick={() => navigate('/demo')}
                  >
                    Get AesFin free
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => navigate('/contact')}
                  >
                    Book a demo
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage; 
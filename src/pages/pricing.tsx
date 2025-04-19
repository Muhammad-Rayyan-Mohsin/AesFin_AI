import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
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
      price: '$19.99',
      period: '/month',
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

  return (
    <>
      <Header />
      <main>
        <div className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-display font-bold tracking-tight text-aes-navy sm:text-5xl mb-4">
                Simple, transparent pricing
              </h1>
              <p className="text-xl text-aes-gray">
                Choose the perfect plan for your business needs
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    "relative rounded-2xl bg-white p-8 shadow-lg flex flex-col",
                    tier.isRecommended && "ring-2 ring-aes-green"
                  )}
                >
                  {tier.isRecommended && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 rounded-full bg-aes-green text-white text-sm font-medium">
                      Recommended
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
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="h-5 w-5 text-aes-green shrink-0" />
                          <span className="ml-3 text-sm text-aes-gray">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant={tier.buttonVariant}
                    className={cn(
                      "mt-8 w-full group transition-all duration-300",
                      tier.isRecommended 
                        ? "bg-gradient-to-r from-aes-green to-aes-navy text-white hover:opacity-90 hover:scale-[1.02] transform" 
                        : "border-aes-green text-aes-green hover:bg-aes-green hover:text-white"
                    )}
                    onClick={() => window.location.href = tier.href}
                  >
                    {tier.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              ))}
            </div>

            {/* FAQ or Additional Info */}
            <div className="text-center mt-16">
              <p className="text-aes-gray">
                Need help choosing the right plan?{' '}
                <a href="/contact" className="text-aes-green hover:text-aes-navy font-medium transition-colors">
                  Contact our team
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage; 
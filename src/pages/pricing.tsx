import React, { useState, useEffect } from "react";
import { Check, Sparkles, Shield, Zap, Crown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  
  const plans = [
    {
      id: "starter",
      name: "Starter",
      icon: <Sparkles className="h-6 w-6" />,
      price: "Free",
      description: "Perfect starting point for your compliance journey",
      features: [
        'Basic AML screening',
        'Up to 100 transactions/month',
        'Standard support',
        'Basic reporting',
        'Single user access'
      ],
      buttonText: "Get Started",
      buttonLink: "#",
      popular: false,
      delay: 0.1
    },
    {
      id: "business",
      name: "Business",
      icon: <Zap className="h-6 w-6" />,
      price: billingCycle === "monthly" ? "$29.99" : "$23.99",
      period: "/mo",
      description: "Advanced tools for growing businesses",
      features: [
        'Advanced AML screening',
        '∞ transactions/month',
        'Priority support',
        'Advanced reporting & analytics',
        'Monitor multiple branches (up to 3)',
        'Custom rules engine',
        'API access'
      ],
      buttonText: "Start Free Trial",
      buttonLink: "#",
      popular: true,
      delay: 0.2
    },
    {
      id: "professional",
      name: "Professional",
      icon: <Shield className="h-6 w-6" />,
      price: billingCycle === "monthly" ? "$99.99" : "$79.99",
      period: "/mo",
      description: "Complete solution for established enterprises",
      features: [
        'Advanced AML screening',
        'Up to 10,000 transactions/month',
        'Premium support with 24-hour response',
        'Advanced analytics dashboard',
        'Monitor multiple branches (up to 10)',
        'Enhanced rules engine',
        'API access with higher rate limits',
        'Compliance alert system'
      ],
      buttonText: "Contact Sales",
      buttonLink: "https://calendly.com/ali14hasnain/30min",
      popular: false,
      delay: 0.3
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: <Crown className="h-6 w-6" />,
      price: "Custom",
      description: "Tailored solutions for large organizations",
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
      buttonText: "Contact Sales",
      buttonLink: "https://calendly.com/ali14hasnain/30min",
      popular: false,
      delay: 0.4
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your business needs
            </p>

            {/* Billing toggle */}
            <div className="inline-flex p-1 rounded-full bg-white shadow-md border border-gray-200">
              <button
                className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  billingCycle === "monthly" 
                    ? "bg-aes-green text-white shadow-sm" 
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 relative ${
                  billingCycle === "annually" 
                    ? "bg-aes-green text-white shadow-sm" 
                    : "bg-transparent text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setBillingCycle("annually")}
              >
                Annually
                <span className="absolute -top-2 -right-2 bg-aes-navy text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: plan.delay, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 inset-x-0 flex justify-center z-20">
                    <span className="bg-aes-green text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div 
                  className={cn(
                    "h-full rounded-xl overflow-hidden transform transition-all duration-300",
                    "bg-white border border-gray-200 shadow-xl hover:shadow-2xl",
                    plan.id === "enterprise" ? "bg-gray-900" : "",
                    plan.popular ? "ring-2 ring-aes-green pt-5" : ""
                  )}
                  onMouseEnter={() => setHoveredTier(plan.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                >
                  <div className={`p-8 ${plan.id === "enterprise" ? "text-white" : ""}`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-xl font-bold ${plan.id === "enterprise" ? "text-white" : "text-gray-900"}`}>
                        {plan.name}
                      </h3>
                      
                      <div className={`p-2 rounded-lg ${
                        plan.id === "enterprise" ? "bg-white/20" : "bg-aes-green/10"
                      }`}>
                        <div className={`${
                          plan.id === "enterprise" ? "text-white" : "text-aes-green"
                        }`}>
                          {plan.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className={`text-5xl font-bold ${plan.id === "enterprise" ? "text-white" : "text-gray-900"}`}>
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className={`ml-2 ${plan.id === "enterprise" ? "text-gray-300" : "text-gray-500"}`}>
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <p className={`mt-2 text-sm ${plan.id === "enterprise" ? "text-gray-300" : "text-gray-500"}`}>
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="mb-8">
                      <a 
                        href={plan.buttonLink}
                        target={plan.buttonLink.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={cn(
                          "block w-full text-center py-3 px-4 rounded-lg font-medium transition-all",
                          plan.id === "starter" 
                            ? "bg-white border-2 border-aes-green text-aes-green hover:bg-aes-green/5"
                            : plan.id === "enterprise"
                              ? "bg-white text-gray-900 hover:bg-gray-100"
                              : "bg-aes-green text-white hover:bg-aes-green/90"
                        )}
                      >
                        {plan.buttonText}
                      </a>
                    </div>
                    
                    <div className={`pt-6 border-t ${plan.id === "enterprise" ? "border-gray-700" : "border-gray-100"}`}>
                      <p className={`font-medium mb-4 ${plan.id === "enterprise" ? "text-white" : "text-gray-900"}`}>
                        What's included:
                      </p>
                      <ul className="space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className={`mr-3 p-0.5 rounded-full ${
                              plan.id === "enterprise" ? "bg-white/20 text-white" : "bg-aes-green/20 text-aes-green"
                            }`}>
                              <Check className="h-4 w-4" />
                            </span>
                            <span className={`text-sm ${plan.id === "enterprise" ? "text-gray-300" : "text-gray-600"}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-500">
              Questions about our pricing? <a href="https://calendly.com/ali14hasnain/30min" target="_blank" rel="noopener noreferrer" className="text-aes-green font-medium hover:underline">Schedule a call</a> with our sales team to learn more.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing; 
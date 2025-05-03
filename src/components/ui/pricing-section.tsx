"use client"
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Check } from "lucide-react";
import { Switch } from "./switch";
import Image from "next/image";

type PricingFeature = {
  text: string;
  included: boolean;
};

type PricingTier = {
  name: string;
  price: string | { monthly: string; annually: string };
  description: string;
  features: PricingFeature[];
  buttonText: string;
  highlighted?: boolean;
  delay?: string;
};

const PricingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");
  const pricingRef = useRef(null);

  // Pricing tiers data
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: { monthly: "$0", annually: "$0" },
      description: "Perfect for getting started with AI chatbots",
      features: [
        { text: "1 AI chatbot", included: true },
        { text: "100 messages per month", included: true },
        { text: "Basic analytics", included: true },
        { text: "Website embedding", included: true },
        { text: "Community support", included: true },
        { text: "File upload (5MB limit)", included: false },
        { text: "Custom branding", included: false },
        { text: "API access", included: false },
      ],
      buttonText: "Get Started",
      delay: "100ms",
    },
    {
      name: "Pro",
      price: { monthly: "$29", annually: "$19" },
      description: "For growing businesses with advanced needs",
      features: [
        { text: "Unlimited AI chatbots", included: true },
        { text: "2,500 messages per month", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Website & app embedding", included: true },
        { text: "Priority email support", included: true },
        { text: "File upload (50MB limit)", included: true },
        { text: "Custom branding", included: true },
        { text: "API access", included: true },
      ],
      buttonText: "Start Free Trial",
      highlighted: true,
      delay: "200ms",
    },
    {
      name: "Enterprise",
      price: { monthly: "$99", annually: "$79" },
      description: "For organizations with complex requirements",
      features: [
        { text: "Unlimited AI chatbots", included: true },
        { text: "10,000 messages per month", included: true },
        { text: "Custom analytics dashboards", included: true },
        { text: "Multi-platform integration", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "File upload (500MB limit)", included: true },
        { text: "Custom branding & white labeling", included: true },
        { text: "Advanced API access", included: true },
      ],
      buttonText: "Contact Sales",
      delay: "300ms",
    },
  ];

  // Simple intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => {
      if (pricingRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={pricingRef} className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        {/* Pricing illustration */}
        <div className={`max-w-md mx-auto mb-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <Image 
            src="/pricing-illustration.svg" 
            alt="Pricing Plans Comparison" 
            width={600} 
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          Transparent Pricing for Every Need
        </h2>
        <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ transitionDelay: "100ms" }}>
          Choose the perfect plan for your business. No hidden fees, cancel anytime.
        </p>

        {/* Billing toggle */}
        <div className={`flex items-center justify-center space-x-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ transitionDelay: "150ms" }}>
          <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
            Monthly
          </span>
          <Switch 
            checked={billingCycle === "annually"} 
            onCheckedChange={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
          />
          <div className="flex items-center">
            <span className={`text-sm font-medium ${billingCycle === "annually" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              Annual
            </span>
            <span className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-semibold py-0.5 px-2 rounded-full">
              Save 30%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <div
            key={tier.name}
            className={`rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${
              tier.highlighted
                ? "border-2 border-blue-500 dark:border-blue-400 shadow-xl shadow-blue-500/10 relative z-10 scale-105 md:scale-110"
                : "border border-gray-200 dark:border-gray-700 shadow-lg"
            }`}
            style={{ transitionDelay: tier.delay }}
          >
            {tier.highlighted && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="bg-white dark:bg-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {typeof tier.price === "string" 
                    ? tier.price 
                    : billingCycle === "monthly" 
                      ? tier.price.monthly 
                      : tier.price.annually}
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2 pb-1">
                  /{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 min-h-[50px]">{tier.description}</p>
              
              <Button 
                className={`w-full mb-6 ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    : tier.name === "Free" 
                      ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white" 
                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                } rounded-full transition-all hover:-translate-y-1 hover:shadow-md`}
              >
                {tier.buttonText}
              </Button>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Includes:</p>
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <div className={`mt-1 mr-3 flex-shrink-0 ${feature.included ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`}>
                      <Check size={16} />
                    </div>
                    <p className={`text-sm ${feature.included ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}>{feature.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise custom section */}
      <div className={`mt-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 max-w-6xl mx-auto transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`} style={{ transitionDelay: "400ms" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">We offer custom plans for organizations with specific needs. Contact our sales team to discuss your requirements.</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-5 transition-all hover:-translate-y-1 hover:shadow-md whitespace-nowrap">
            Contact Sales Team
          </Button>
        </div>
      </div>

      {/* FAQ teaser */}
      <div className={`mt-16 text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`} style={{ transitionDelay: "500ms" }}>
        <h3 className="text-xl font-bold mb-4">Have questions?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Check out our frequently asked questions or contact our support team.</p>
        <Button variant="outline" className="rounded-full transition-all hover:-translate-y-1">
          View FAQ
        </Button>
      </div>
    </div>
  );
};

export default PricingSection; 
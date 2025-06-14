'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/constants';
import Button from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate pricing cards
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent{' '}
            <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your warranty management needs. 
            Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border-neon-blue shadow-lg shadow-neon-blue/20'
                  : 'bg-black/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-1 rounded-full text-black font-semibold text-sm flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-neon-green mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-2 mb-8">
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start">
                      <div className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-3 h-3 bg-gray-600 rounded-full mx-auto mt-1"></div>
                      </div>
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                size="lg"
                fullWidth
                className="mb-4"
              >
                {plan.cta}
              </Button>

              {/* Additional Info */}
              {plan.id === 'free' && (
                <p className="text-center text-gray-500 text-sm">
                  No credit card required
                </p>
              )}
              {plan.id === 'pro' && (
                <p className="text-center text-gray-500 text-sm">
                  14-day free trial included
                </p>
              )}
              {plan.id === 'business' && (
                <p className="text-center text-gray-500 text-sm">
                  Custom pricing available
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Compare All Features
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4 text-white font-semibold">Features</th>
                  {PRICING_PLANS.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-4 text-white font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Warranty Items', free: '10', pro: 'Unlimited', business: 'Unlimited' },
                  { feature: 'AI Receipt Scanning', free: '❌', pro: '✅', business: '✅' },
                  { feature: 'Auto-Import', free: '❌', pro: '✅', business: '✅' },
                  { feature: '3D/AR Inventory', free: '❌', pro: '✅', business: '✅' },
                  { feature: 'Team Collaboration', free: '❌', pro: '❌', business: '✅' },
                  { feature: 'API Access', free: '❌', pro: '❌', business: '✅' },
                  { feature: 'Priority Support', free: '❌', pro: '✅', business: '✅' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-4 px-4 text-gray-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.free}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.pro}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change plans anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for business plans.',
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees.',
              },
            ].map((faq, index) => (
              <div key={index} className="text-left p-6 bg-black/30 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full mb-6">
            <Zap className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving time and money with WarrantyAI.
          </p>
          <Button variant="primary" size="xl">
            Start Your Free Trial
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

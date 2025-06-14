'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, TrendingUp, DollarSign, Users, Target, Zap, Globe } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ProfessionalBackground from '@/components/effects/ProfessionalBackground';

const slides = [
  {
    id: 1,
    title: 'WarrantyAI',
    subtitle: 'Never Miss a Warranty Again',
    content: (
      <div className="text-center space-y-8">
        <div className="text-6xl font-bold text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
          WarrantyAI
        </div>
        <p className="text-2xl text-gray-300">
          Smart AI assistant to track, manage, and remind users of all warranties, 
          expiring services, and coverage across electronics, home, vehicles, and more.
        </p>
        <div className="text-xl text-neon-blue font-semibold">
          Own smart. Live smart.
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'The Problem',
    subtitle: '$2.9B Lost Annually',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-red-400">Pain Points</h3>
            <div className="space-y-4">
              {[
                '70%+ of consumers lose receipts within 6 months',
                'Average household owns 25+ items with warranties',
                '$2.9B in unclaimed warranty value annually (US)',
                '85% of warranty claims never filed due to lost docs',
                'No unified solution for all warranty types'
              ].map((point, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-4">$2.9B</div>
              <div className="text-xl text-white mb-2">Lost Value</div>
              <div className="text-gray-400">Unclaimed warranties annually</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Our Solution',
    subtitle: 'AI-Powered Warranty Management',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-green-400">Key Features</h3>
            <div className="space-y-4">
              {[
                'AI Receipt Scanning (99.2% accuracy)',
                'Smart Reminders & Notifications',
                '3D/AR Inventory Visualization',
                'Multi-Category Support',
                'Claim Assistance & Guidance',
                'Ownership Verification System'
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-4">99.2%</div>
              <div className="text-xl text-white mb-2">AI Accuracy</div>
              <div className="text-gray-400">Receipt data extraction</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Market Opportunity',
    subtitle: 'Massive Addressable Market',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-neon-blue mb-2">$4.2B</div>
            <div className="text-white font-semibold mb-1">TAM</div>
            <div className="text-gray-400 text-sm">Global Warranty Management</div>
          </div>
          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-neon-purple mb-2">$1.2B</div>
            <div className="text-white font-semibold mb-1">SAM</div>
            <div className="text-gray-400 text-sm">US Consumer Market</div>
          </div>
          <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-neon-green mb-2">$45M</div>
            <div className="text-white font-semibold mb-1">SOM</div>
            <div className="text-gray-400 text-sm">5-Year Target</div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Market Drivers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Growing consumer awareness of warranty value',
              'Increasing complexity of product ecosystems',
              'Rise of AI and automation adoption',
              'Shift towards digital-first solutions'
            ].map((driver, index) => (
              <div key={index} className="flex items-center justify-center p-3 bg-gray-800/50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-neon-blue mr-3" />
                <span className="text-gray-300">{driver}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Business Model',
    subtitle: 'Scalable SaaS Revenue',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-gray-700 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Free Tier</h4>
            <div className="text-3xl font-bold text-gray-400 mb-2">$0</div>
            <div className="text-gray-400 mb-4">Up to 10 items</div>
            <div className="space-y-2 text-sm text-gray-500">
              <div>• Manual upload only</div>
              <div>• Basic reminders</div>
              <div>• Email support</div>
            </div>
          </div>
          <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Pro</h4>
            <div className="text-3xl font-bold text-neon-blue mb-2">$9.99</div>
            <div className="text-gray-400 mb-4">per month</div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>• Unlimited items</div>
              <div>• AI scanning</div>
              <div>• 3D/AR features</div>
              <div>• Priority support</div>
            </div>
          </div>
          <div className="bg-neon-purple/10 border border-neon-purple/30 rounded-xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Business</h4>
            <div className="text-3xl font-bold text-neon-purple mb-2">$29.99</div>
            <div className="text-gray-400 mb-4">per month</div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>• Team features</div>
              <div>• API access</div>
              <div>• Custom integrations</div>
              <div>• Dedicated support</div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Revenue Projections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-neon-blue">Year 1</div>
              <div className="text-gray-300">$2.5M ARR</div>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-neon-purple">Year 3</div>
              <div className="text-gray-300">$15M ARR</div>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-neon-green">Year 5</div>
              <div className="text-gray-300">$45M ARR</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Traction',
    subtitle: 'Strong Early Momentum',
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-neon-blue/10 border border-neon-blue/30 rounded-xl">
            <Users className="w-12 h-12 text-neon-blue mx-auto mb-4" />
            <div className="text-3xl font-bold text-neon-blue mb-2">10,000+</div>
            <div className="text-white font-semibold">Active Users</div>
          </div>
          <div className="text-center p-6 bg-neon-green/10 border border-neon-green/30 rounded-xl">
            <DollarSign className="w-12 h-12 text-neon-green mx-auto mb-4" />
            <div className="text-3xl font-bold text-neon-green mb-2">$2.5M+</div>
            <div className="text-white font-semibold">Money Saved</div>
          </div>
          <div className="text-center p-6 bg-neon-purple/10 border border-neon-purple/30 rounded-xl">
            <Target className="w-12 h-12 text-neon-purple mx-auto mb-4" />
            <div className="text-3xl font-bold text-neon-purple mb-2">4.9/5</div>
            <div className="text-white font-semibold">User Rating</div>
          </div>
          <div className="text-center p-6 bg-neon-pink/10 border border-neon-pink/30 rounded-xl">
            <Zap className="w-12 h-12 text-neon-pink mx-auto mb-4" />
            <div className="text-3xl font-bold text-neon-pink mb-2">99.2%</div>
            <div className="text-white font-semibold">AI Accuracy</div>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Key Milestones</h3>
          <div className="space-y-4">
            {[
              'MVP launched Q1 2024 with 1,000+ early adopters',
              'AI accuracy improved to 99.2% (industry leading)',
              'Mobile apps released with 50,000+ downloads',
              'Partnership discussions with major retailers',
              'Seed funding round oversubscribed by 200%'
            ].map((milestone, index) => (
              <div key={index} className="flex items-center justify-center p-3 bg-gray-800/50 rounded-lg">
                <div className="w-2 h-2 bg-neon-blue rounded-full mr-4"></div>
                <span className="text-gray-300">{milestone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'The Ask',
    subtitle: 'Series A Funding',
    content: (
      <div className="space-y-8 text-center">
        <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-2xl p-8">
          <h3 className="text-4xl font-bold text-white mb-4">$5M Series A</h3>
          <p className="text-xl text-gray-300 mb-6">
            To accelerate growth, expand our team, and capture market leadership
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-black/50 border border-gray-700 rounded-xl">
            <h4 className="text-xl font-bold text-neon-blue mb-4">40% Product</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div>• AI/ML engineering team</div>
              <div>• 3D/AR development</div>
              <div>• Mobile app enhancement</div>
            </div>
          </div>
          <div className="p-6 bg-black/50 border border-gray-700 rounded-xl">
            <h4 className="text-xl font-bold text-neon-green mb-4">35% Marketing</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div>• Customer acquisition</div>
              <div>• Brand building</div>
              <div>• Partnership development</div>
            </div>
          </div>
          <div className="p-6 bg-black/50 border border-gray-700 rounded-xl">
            <h4 className="text-xl font-bold text-neon-purple mb-4">25% Operations</h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div>• Infrastructure scaling</div>
              <div>• Customer success</div>
              <div>• Legal & compliance</div>
            </div>
          </div>
        </div>
        
        <div className="text-xl text-gray-300">
          <strong className="text-white">Goal:</strong> Reach $15M ARR by end of Year 3
        </div>
      </div>
    ),
  },
];

export default function PitchDeckPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Slide Container */}
        <ProfessionalBackground
          variant="business"
          className="min-h-screen flex items-center justify-center"
        >

          <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Slide Header */}
            <div className="text-center mb-12">
              <div className="text-neon-blue font-semibold mb-2">
                Slide {currentSlide + 1} of {slides.length}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-400">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Slide Content */}
            <div ref={slideRef} className="mb-12">
              {slides[currentSlide].content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 rounded-lg transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-neon-blue scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 rounded-lg transition-colors duration-300"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
        </ProfessionalBackground>

        {/* Contact Section */}
        <ProfessionalBackground
          variant="elegant"
          className="py-20"
        >
          <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Invest in the Future?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join us in revolutionizing warranty management and capturing a massive market opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" onClick={() => window.open('mailto:investors@warrantyai.com?subject=Investment Meeting Request', '_blank')}>
                Schedule Meeting
              </Button>
              <Button variant="outline" size="lg" onClick={() => router.push('/sign-up')}>
                Start Free Trial
              </Button>
            </div>
            <div className="mt-8 text-gray-500">
              <p>For investor inquiries: investors@warrantyai.com</p>
            </div>
          </div>
        </section>
        </ProfessionalBackground>
      </main>

      <Footer />
    </div>
  );
}

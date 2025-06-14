'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import { STATISTICS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProblemSolutionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate problem section - ensure content is always visible
      gsap.set(problemRef.current, { opacity: 1 });
      gsap.fromTo(
        problemRef.current,
        { x: -50 },
        {
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: problemRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate solution section - ensure content is always visible
      gsap.set(solutionRef.current, { opacity: 1 });
      gsap.fromTo(
        solutionRef.current,
        { x: 50 },
        {
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: solutionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate statistics - ensure content is always visible
      if (statsRef.current) {
        gsap.set(statsRef.current.children, { opacity: 1 });
        gsap.fromTo(
          statsRef.current.children,
          { y: 30, scale: 0.9 },
          {
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The <span className="text-gradient bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Problem</span> vs{' '}
            <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">Our Solution</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Warranty management is broken. We're here to fix it with AI-powered automation and visual tracking.
          </p>
        </div>

        {/* Problem vs Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Problem Side */}
          <div ref={problemRef} className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Current Problems</h3>
              <p className="text-gray-400 text-lg">
                Managing warranties is a nightmare that costs consumers billions annually
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Lost Receipts & Documents',
                  description: 'Physical receipts fade, tear, or disappear. Digital receipts are scattered across email accounts.',
                  icon: '📄',
                },
                {
                  title: 'Forgotten Expiration Dates',
                  description: 'No reminders mean missed warranty claims and lost money when products fail.',
                  icon: '⏰',
                },
                {
                  title: 'Complex Claim Processes',
                  description: 'Confusing warranty terms and complicated claim procedures discourage users.',
                  icon: '🔄',
                },
                {
                  title: 'No Visual Inventory',
                  description: 'Impossible to track what you own and where it is, especially for insurance claims.',
                  icon: '👁️',
                },
              ].map((problem, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <div className="text-2xl">{problem.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{problem.title}</h4>
                    <p className="text-gray-400">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Side */}
          <div ref={solutionRef} className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">WarrantyAI Solution</h3>
              <p className="text-gray-400 text-lg">
                AI-powered automation meets visual inventory management for complete warranty control
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'AI Receipt Scanning',
                  description: 'Upload any receipt or photo. AI extracts all warranty information automatically.',
                  icon: '🤖',
                  color: 'from-neon-blue to-neon-purple',
                },
                {
                  title: 'Smart Reminders',
                  description: 'Intelligent notifications before warranties expire or service dates arrive.',
                  icon: '🔔',
                  color: 'from-neon-purple to-neon-green',
                },
                {
                  title: 'Guided Claims',
                  description: 'Step-by-step assistance with document generation and claim tracking.',
                  icon: '📋',
                  color: 'from-neon-green to-neon-pink',
                },
                {
                  title: '3D/AR Inventory',
                  description: 'Visualize your items in 3D space and track them room by room with AR.',
                  icon: '🥽',
                  color: 'from-neon-pink to-neon-yellow',
                },
              ].map((solution, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-colors duration-300">
                  <div className="text-2xl">{solution.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{solution.title}</h4>
                    <p className="text-gray-400">{solution.description}</p>
                    <div className={`mt-2 h-1 w-full bg-gradient-to-r ${solution.color} rounded-full opacity-60`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">The Numbers Don't Lie</h3>
          <p className="text-gray-400 text-lg">
            Warranty mismanagement is costing consumers billions every year
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATISTICS.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-black/50 border border-neon-blue/20 rounded-xl hover:border-neon-blue/40 transition-colors duration-300"
            >
              <div className="text-4xl sm:text-5xl font-bold text-neon-blue mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full mb-6">
            <TrendingUp className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Take Control of Your Warranties?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already saved money and time with WarrantyAI's intelligent warranty management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300">
              See Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURE_HIGHLIGHTS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate feature cards
      if (featuresRef.current) {
        gsap.fromTo(
          featuresRef.current.children,
          { opacity: 0, y: 50, rotationX: 15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Auto-rotate active feature
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % FEATURE_HIGHLIGHTS.length);
      }, 3000);

      return () => clearInterval(interval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Powerful Features for{' '}
            <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Smart Warranty Management
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of warranty tracking with AI-powered automation, 
            3D visualization, and intelligent reminders.
          </p>
        </div>

        {/* Interactive Feature Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {FEATURE_HIGHLIGHTS.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                activeFeature === index
                  ? 'bg-gradient-to-br from-black/80 to-gray-900/80 border-neon-blue shadow-lg shadow-neon-blue/20'
                  : 'bg-black/50 border-gray-700 hover:border-gray-600'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              {/* Feature Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg'
                    : 'bg-gray-800 group-hover:bg-gray-700'
                }`}
                style={{
                  backgroundColor: activeFeature === index ? feature.color : undefined,
                }}
              >
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Active Indicator */}
              {activeFeature === index && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="bg-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature Details */}
            <div>
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4"
                  style={{ backgroundColor: FEATURE_HIGHLIGHTS[activeFeature].color }}
                >
                  {FEATURE_HIGHLIGHTS[activeFeature].icon}
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {FEATURE_HIGHLIGHTS[activeFeature].title}
                </h3>
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {FEATURE_HIGHLIGHTS[activeFeature].description}
              </p>

              {/* Feature Benefits */}
              <div className="space-y-4">
                {[
                  'Save time with automated data extraction',
                  'Never miss important warranty dates',
                  'Reduce claim processing time by 80%',
                  'Increase successful claims by 60%',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full mr-3"></div>
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="mt-8 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
                Try This Feature
              </button>
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-black rounded-2xl border border-gray-700 p-8 flex items-center justify-center">
                {/* Animated Feature Demo */}
                <div className="text-center">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center text-6xl mb-6 animate-pulse"
                    style={{ backgroundColor: FEATURE_HIGHLIGHTS[activeFeature].color + '20' }}
                  >
                    {FEATURE_HIGHLIGHTS[activeFeature].icon}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {FEATURE_HIGHLIGHTS[activeFeature].title}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">
                    Interactive Demo
                  </div>
                </div>

                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full opacity-60 animate-float"
                    style={{
                      backgroundColor: FEATURE_HIGHLIGHTS[activeFeature].color,
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i * 10)}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                style={{
                  background: `radial-gradient(circle, ${FEATURE_HIGHLIGHTS[activeFeature].color}40 0%, transparent 70%)`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Feature Navigation */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-3">
            {FEATURE_HIGHLIGHTS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeFeature === index
                    ? 'bg-neon-blue scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

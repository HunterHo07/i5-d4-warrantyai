'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Home, Search, ArrowLeft, Zap } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !glitchRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );

      // Glitch effect animation
      gsap.to(glitchRef.current, {
        x: () => (Math.sin(Date.now() * 0.01) * 4),
        y: () => (Math.cos(Date.now() * 0.01) * 4),
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      // Floating animation for elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Display */}
          <div className="mb-12">
            <div ref={glitchRef} className="relative inline-block">
              <div className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text mb-4">
                404
              </div>
              {/* Glitch layers */}
              <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-red-500 opacity-20 animate-pulse">
                404
              </div>
              <div className="absolute inset-0 text-8xl sm:text-9xl font-bold text-neon-blue opacity-30 transform translate-x-1">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Oops! It looks like this page has vanished into the digital void. 
              Don't worry, our AI is working to track it down.
            </p>
          </div>

          {/* Animated Elements */}
          <div className="mb-12 flex justify-center space-x-8">
            <div className="floating-element w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-black" />
            </div>
            <div className="floating-element w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-green rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <div className="floating-element w-16 h-16 bg-gradient-to-r from-neon-green to-neon-pink rounded-full flex items-center justify-center">
              <Home className="w-8 h-8 text-black" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button variant="primary" size="lg">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300 flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="bg-black/50 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/demo"
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300 group"
              >
                <div className="text-neon-blue group-hover:text-white font-semibold mb-2">
                  Interactive Demo
                </div>
                <div className="text-gray-400 text-sm">
                  Try our AI-powered warranty tracking
                </div>
              </Link>
              
              <Link
                href="/why-us"
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300 group"
              >
                <div className="text-neon-purple group-hover:text-white font-semibold mb-2">
                  Why Choose Us
                </div>
                <div className="text-gray-400 text-sm">
                  Learn about our advantages
                </div>
              </Link>
              
              <Link
                href="/roadmap"
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 group"
              >
                <div className="text-neon-green group-hover:text-white font-semibold mb-2">
                  Product Roadmap
                </div>
                <div className="text-gray-400 text-sm">
                  See what we're building
                </div>
              </Link>
              
              <Link
                href="/sign-up"
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-neon-pink hover:bg-neon-pink/10 transition-all duration-300 group"
              >
                <div className="text-neon-pink group-hover:text-white font-semibold mb-2">
                  Get Started
                </div>
                <div className="text-gray-400 text-sm">
                  Start your free trial
                </div>
              </Link>
            </div>
          </div>

          {/* Error Code */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm font-mono">
              Error Code: 404_PAGE_NOT_FOUND
            </p>
            <p className="text-gray-600 text-xs mt-2">
              If you believe this is an error, please contact support
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

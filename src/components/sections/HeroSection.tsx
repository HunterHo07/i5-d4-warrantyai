'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ProfessionalBackground from '@/components/effects/ProfessionalBackground';
import { APP_CONFIG } from '@/lib/constants';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Seeded random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate consistent positions for floating elements
const generateFloatingElements = (count: number, seed: number) => {
  return Array.from({ length: count }, (_, i) => ({
    left: seededRandom(seed + i * 2) * 100,
    top: seededRandom(seed + i * 2 + 1) * 100,
    width: 2 + seededRandom(seed + i * 3) * 4,
    height: 2 + seededRandom(seed + i * 3) * 4,
    delay: seededRandom(seed + i * 4) * 3,
    glow: 5 + seededRandom(seed + i * 5) * 10,
    color: i % 3,
  }));
};

// Generate consistent positions for geometric shapes
const generateGeometricShapes = (count: number, seed: number) => {
  return Array.from({ length: count }, (_, i) => ({
    left: seededRandom(seed + i * 6) * 90,
    top: seededRandom(seed + i * 7) * 90,
    width: 30 + seededRandom(seed + i * 8) * 60,
    height: 30 + seededRandom(seed + i * 8) * 60,
    rotation: seededRandom(seed + i * 9) * 360,
    borderRadius: i % 3 === 0 ? '50%' : '0',
    color: i % 2,
  }));
};

const HeroSection: React.FC = () => {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline();

      // Animate title with typing effect
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0 });
        tl.to(titleRef.current, {
          opacity: 1,
          duration: 0.5,
        });

        // Typing animation for the main title
        if (titleRef.current) {
          const titleText = titleRef.current.textContent || '';
          titleRef.current.textContent = '';
          titleRef.current.style.borderRight = '2px solid #00d4ff';

          let i = 0;
          const typeWriter = () => {
            if (titleRef.current && i < titleText.length) {
              titleRef.current.textContent += titleText.charAt(i);
              i++;
              setTimeout(typeWriter, 100);
            } else if (titleRef.current) {
              // Remove cursor after typing
              setTimeout(() => {
                if (titleRef.current) {
                  titleRef.current.style.borderRight = 'none';
                }
              }, 1000);
            }
          };

          setTimeout(typeWriter, 500);
        }
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.2,
            ease: 'back.out(1.7)'
          },
          '-=0.4'
        );
      }

      // Parallax effect for background
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Floating animation for elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const navigateToDemo = () => {
    router.push('/demo');
  };

  const navigateToSignup = () => {
    router.push('/sign-up');
  };

  return (
    <ProfessionalBackground
      variant="tech"
      className="min-h-screen flex items-center justify-center"
    >
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >


        {/* Enhanced Parallax Layers */}
        <div className="absolute inset-0 z-0">
          {/* Layer 1 - Deep Background */}
          <div
            ref={parallaxRef}
            className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
                radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 60%)
              `,
            }}
          />

          {/* Layer 2 - Enhanced Grid Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px),
                linear-gradient(45deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px',
            }}
          />

          {/* Layer 3 - Enhanced Floating Elements */}
          <div className="absolute inset-0">
            {isClient && generateFloatingElements(30, 100).map((element, i) => (
              <div
                key={i}
                className="floating-element absolute rounded-full opacity-40"
                style={{
                  left: `${element.left}%`,
                  top: `${element.top}%`,
                  width: `${element.width}px`,
                  height: `${element.height}px`,
                  background: element.color === 0 ? '#00d4ff' : element.color === 1 ? '#8b5cf6' : '#00ff88',
                  animationDelay: `${element.delay}s`,
                  boxShadow: `0 0 ${element.glow}px currentColor`,
                }}
              />
            ))}
          </div>

          {/* Layer 4 - Geometric Shapes */}
          <div className="absolute inset-0">
            {isClient && generateGeometricShapes(8, 200).map((shape, i) => (
              <div
                key={i}
                className="absolute border opacity-20 animate-pulse"
                style={{
                  left: `${shape.left}%`,
                  top: `${shape.top}%`,
                  width: `${shape.width}px`,
                  height: `${shape.height}px`,
                  borderColor: shape.color === 0 ? '#00d4ff' : '#8b5cf6',
                  transform: `rotate(${shape.rotation}deg)`,
                  borderRadius: shape.borderRadius,
                }}
              />
            ))}
          </div>
        </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold font-display text-white leading-tight"
          >
            <span className="text-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
              WarrantyAI
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            {APP_CONFIG.tagline}
            <br />
            <span className="text-neon-blue font-semibold">Own smart. Live smart.</span>
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Smart AI assistant to track, manage, and remind users of all warranties, 
            expiring services, and coverage—across electronics, home, vehicles, and more.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              variant="primary"
              size="xl"
              onClick={navigateToSignup}
              className="min-w-[200px]"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={navigateToDemo}
              className="min-w-[200px]"
            >
              Watch Demo
            </Button>
          </div>

          {/* Mini Demo Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-black/50 backdrop-blur-sm border border-neon-blue/30 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                See WarrantyAI in Action
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <h4 className="text-lg font-semibold text-white">AI Scanning</h4>
                  <p className="text-gray-400 text-sm">
                    Upload receipts and let AI extract warranty info automatically
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center text-2xl">
                    ⏰
                  </div>
                  <h4 className="text-lg font-semibold text-white">Smart Reminders</h4>
                  <p className="text-gray-400 text-sm">
                    Never miss a warranty expiration or service date again
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-neon-green to-neon-pink rounded-full flex items-center justify-center text-2xl">
                    🥽
                  </div>
                  <h4 className="text-lg font-semibold text-white">3D Inventory</h4>
                  <p className="text-gray-400 text-sm">
                    Visualize your items in 3D space with AR technology
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-neon-blue rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>

        {/* Enhanced Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/2 rounded-full blur-3xl"></div>
      </section>
    </ProfessionalBackground>
  );
};

export default HeroSection;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProfessionalBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'tech' | 'business' | 'minimal' | 'elegant';
}

const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({
  children,
  className = '',
  variant = 'tech',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      // Subtle floating animation for elements
      gsap.to('.floating-element', {
        y: -10,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Gentle rotation for geometric elements
      gsap.to('.rotating-element', {
        rotation: 360,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isClient]);

  const getTechBackground = () => (
    <>
      {/* Modern glassmorphism effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-neon-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Subtle tech grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Minimal floating elements */}
      <div className="absolute top-32 left-1/5 floating-element">
        <div className="w-2 h-2 bg-neon-blue/20 rounded-full" />
      </div>
      <div className="absolute top-2/3 right-1/5 floating-element">
        <div className="w-1 h-1 bg-neon-purple/30 rounded-full" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 floating-element">
        <div className="w-3 h-3 bg-neon-green/15 rounded-full" />
      </div>
    </>
  );

  const getBusinessBackground = () => (
    <>
      {/* Professional depth layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/10 via-transparent to-slate-800/5" />
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-neon-blue/3 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neon-purple/3 to-transparent" />
      </div>

      {/* Elegant geometric accents */}
      <div className="absolute top-20 right-20 rotating-element opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-blue" />
          <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-blue" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-16 rotating-element opacity-15">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-purple" />
        </svg>
      </div>
    </>
  );

  const getMinimalBackground = () => (
    <>
      {/* Ultra-clean minimal texture */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-neon-blue/2 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-neon-purple/2 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.02) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.02) 0%, transparent 50%)`,
        }}
      />
    </>
  );

  const getElegantBackground = () => (
    <>
      {/* Luxury gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/8 via-transparent to-violet-900/6" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-neon-blue/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-tr from-neon-purple/4 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Premium floating accents */}
      <div className="absolute top-1/5 left-1/5 floating-element">
        <div className="w-1 h-1 bg-neon-blue/40 rounded-full shadow-lg shadow-neon-blue/20" />
      </div>
      <div className="absolute top-3/5 right-1/5 floating-element">
        <div className="w-2 h-2 bg-neon-purple/30 rounded-full shadow-lg shadow-neon-purple/20" />
      </div>
      <div className="absolute bottom-1/5 left-2/5 floating-element">
        <div className="w-1 h-1 bg-neon-green/35 rounded-full shadow-lg shadow-neon-green/20" />
      </div>
    </>
  );

  const getBackgroundContent = () => {
    switch (variant) {
      case 'tech':
        return getTechBackground();
      case 'business':
        return getBusinessBackground();
      case 'minimal':
        return getMinimalBackground();
      case 'elegant':
        return getElegantBackground();
      default:
        return getMinimalBackground();
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background Effects - Very Subtle */}
      <div className="absolute inset-0 pointer-events-none">
        {getBackgroundContent()}
      </div>

      {/* Content - Always 100% Visible */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ProfessionalBackground;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Seeded random function for consistent server/client rendering
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate consistent positions for particles using fixed values
const generateParticlePositions = (count: number, seed: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      left: ((seed + i * 17) % 100),
      top: ((seed + i * 23) % 100),
      delay: ((seed + i * 7) % 30) / 10,
      size: 1 + ((seed + i * 11) % 20) / 10,
    });
  }
  return positions;
};

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  backgroundType?: 'gradient' | 'particles' | 'geometric' | 'cyber';
  intensity?: 'low' | 'medium' | 'high';
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  backgroundType = 'gradient',
  intensity = 'medium',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    const ctx = gsap.context(() => {
      // Parallax effect for different layers
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          yPercent: direction === 'up' ? -50 * speed : 50 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          yPercent: direction === 'up' ? -30 * speed : 30 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          yPercent: direction === 'up' ? -20 * speed : 20 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Floating particles animation
      gsap.to('.floating-particle', {
        y: -30,
        x: (i) => seededRandom(i * 123) * 20 - 10,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Geometric shapes rotation
      gsap.to('.geometric-shape', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
        stagger: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [speed, direction, isClient]);

  const getBackgroundLayers = () => {
    switch (backgroundType) {
      case 'gradient':
        return (
          <>
            <div
              ref={layer1Ref}
              className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"
            />
            <div
              ref={layer2Ref}
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-blue/5 to-transparent"
            />
            <div
              ref={layer3Ref}
              className="absolute inset-0 bg-gradient-to-bl from-transparent via-neon-purple/5 to-transparent"
            />
          </>
        );

      case 'particles':
        const particles1 = generateParticlePositions(50, 100);
        const particles2 = generateParticlePositions(30, 200);
        const particles3 = generateParticlePositions(20, 300);

        return (
          <>
            <div ref={layer1Ref} className="absolute inset-0">
              {particles1.map((particle, i) => (
                <div
                  key={i}
                  className="floating-particle absolute w-1 h-1 bg-neon-blue rounded-full opacity-30"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
            <div ref={layer2Ref} className="absolute inset-0">
              {particles2.map((particle, i) => (
                <div
                  key={i}
                  className="floating-particle absolute w-2 h-2 bg-neon-purple rounded-full opacity-20"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
            <div ref={layer3Ref} className="absolute inset-0">
              {particles3.map((particle, i) => (
                <div
                  key={i}
                  className="floating-particle absolute w-3 h-3 bg-neon-green rounded-full opacity-10"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case 'geometric':
        const shapes1 = generateParticlePositions(10, 400);
        const shapes2 = generateParticlePositions(8, 500);
        const shapes3 = generateParticlePositions(6, 600);

        return (
          <>
            <div ref={layer1Ref} className="absolute inset-0">
              {shapes1.map((shape, i) => (
                <div
                  key={i}
                  className="geometric-shape absolute border border-neon-blue/20 opacity-30"
                  style={{
                    left: `${shape.left * 0.9}%`,
                    top: `${shape.top * 0.9}%`,
                    width: `${20 + shape.size * 20}px`,
                    height: `${20 + shape.size * 20}px`,
                    transform: `rotate(${shape.delay * 120}deg)`,
                  }}
                />
              ))}
            </div>
            <div ref={layer2Ref} className="absolute inset-0">
              {shapes2.map((shape, i) => (
                <div
                  key={i}
                  className="geometric-shape absolute border border-neon-purple/20 opacity-20 rounded-full"
                  style={{
                    left: `${shape.left * 0.9}%`,
                    top: `${shape.top * 0.9}%`,
                    width: `${30 + shape.size * 25}px`,
                    height: `${30 + shape.size * 25}px`,
                  }}
                />
              ))}
            </div>
            <div ref={layer3Ref} className="absolute inset-0">
              {shapes3.map((shape, i) => (
                <div
                  key={i}
                  className="geometric-shape absolute border border-neon-green/20 opacity-10"
                  style={{
                    left: `${shape.left * 0.9}%`,
                    top: `${shape.top * 0.9}%`,
                    width: `${40 + shape.size * 30}px`,
                    height: `${40 + shape.size * 30}px`,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  }}
                />
              ))}
            </div>
          </>
        );

      case 'cyber':
        // Use fixed positions to avoid hydration mismatch
        const fixedLines = [
          { left: 10, delay: 0 },
          { left: 25, delay: 0.5 },
          { left: 40, delay: 1 },
          { left: 55, delay: 1.5 },
          { left: 70, delay: 2 },
          { left: 85, delay: 2.5 },
        ];

        return (
          <>
            <div
              ref={layer1Ref}
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
            <div
              ref={layer2Ref}
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
              }}
            />
            <div ref={layer3Ref} className="absolute inset-0">
              {fixedLines.map((line, i) => (
                <div
                  key={i}
                  className="absolute w-px bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent opacity-30"
                  style={{
                    left: `${line.left}%`,
                    height: '100%',
                    animationDelay: `${line.delay}s`,
                  }}
                />
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getIntensityClass = () => {
    switch (intensity) {
      case 'low':
        return 'opacity-5';
      case 'medium':
        return 'opacity-10';
      case 'high':
        return 'opacity-15';
      default:
        return 'opacity-10';
    }
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Background Layers - NEVER affect content opacity */}
      <div className="absolute inset-0 opacity-5">
        {getBackgroundLayers()}
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/2 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/2 rounded-full blur-3xl" />

      {/* Content - ALWAYS 100% opacity */}
      <div className="relative z-10 opacity-100">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;

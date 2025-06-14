'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Users, Award, Target, Rocket, Brain, Lock } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ParallaxBackground from '@/components/effects/ParallaxBackground';
import AnimatedCanvas from '@/components/effects/AnimatedCanvas';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const advantages = [
  {
    icon: Brain,
    title: 'Advanced AI Technology',
    description: 'Our proprietary AI engine achieves 99.2% accuracy in receipt scanning and warranty extraction, outperforming competitors by 40%.',
    stats: '99.2% accuracy',
    color: 'from-neon-blue to-neon-purple',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Process receipts and extract warranty information in under 3 seconds, compared to 30+ seconds with manual entry.',
    stats: '< 3 seconds',
    color: 'from-neon-purple to-neon-green',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Bank-level encryption, SOC 2 compliance, and zero-trust architecture ensure your data is always protected.',
    stats: 'SOC 2 Certified',
    color: 'from-neon-green to-neon-pink',
  },
  {
    icon: Users,
    title: 'Proven Track Record',
    description: 'Trusted by 10,000+ users who have saved over $2.5M through successful warranty claims and proactive management.',
    stats: '$2.5M+ saved',
    color: 'from-neon-pink to-neon-yellow',
  },
];

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'CEO & Co-Founder',
    background: 'Former Apple AI Engineer, 10+ years in computer vision',
    image: '/team/alex.jpg',
  },
  {
    name: 'Sarah Rodriguez',
    role: 'CTO & Co-Founder',
    background: 'Ex-Google ML Lead, PhD in Machine Learning from Stanford',
    image: '/team/sarah.jpg',
  },
  {
    name: 'Michael Kim',
    role: 'Head of Product',
    background: 'Former Tesla Product Manager, 8+ years in consumer tech',
    image: '/team/michael.jpg',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Engineering',
    background: 'Ex-Microsoft Senior Engineer, Expert in scalable systems',
    image: '/team/emily.jpg',
  },
];

const competitors = [
  {
    feature: 'AI Receipt Scanning',
    us: true,
    competitor1: false,
    competitor2: 'Limited',
    competitor3: false,
  },
  {
    feature: '3D/AR Inventory',
    us: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
  },
  {
    feature: 'Multi-Category Support',
    us: true,
    competitor1: 'Limited',
    competitor2: true,
    competitor3: 'Limited',
  },
  {
    feature: 'Smart Reminders',
    us: true,
    competitor1: true,
    competitor2: 'Basic',
    competitor3: true,
  },
  {
    feature: 'Claim Assistance',
    us: true,
    competitor1: false,
    competitor2: false,
    competitor3: 'Basic',
  },
  {
    feature: 'API Access',
    us: true,
    competitor1: false,
    competitor2: false,
    competitor3: false,
  },
];

export default function WhyUsPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.animate-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <ParallaxBackground
          backgroundType="cyber"
          speed={0.7}
          intensity="high"
          className="py-20"
        >
          <AnimatedCanvas
            type="waves"
            color="#00ff88"
            opacity={0.2}
            speed={0.8}
          />
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                Why Choose{' '}
                <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                  WarrantyAI?
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                We're not just another warranty tracker. We're the future of intelligent asset management,
                powered by cutting-edge AI and built by industry veterans.
              </p>
              <Button variant="primary" size="xl" onClick={() => router.push('/sign-up')}>
                Start Free Trial
              </Button>
            </div>
          </section>
        </ParallaxBackground>

        {/* Competitive Advantages */}
        <ParallaxBackground
          backgroundType="particles"
          speed={0.5}
          intensity="medium"
          className="py-20"
        >
          <section ref={sectionRef} className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Competitive Edge</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Built from the ground up with advanced AI and user-centric design
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <div
                      key={index}
                      className="animate-card bg-black/50 border border-gray-700 rounded-2xl p-8 hover:border-neon-blue/50 transition-all duration-300"
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${advantage.color} flex items-center justify-center mb-6`}>
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{advantage.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">{advantage.description}</p>
                      <div className="text-neon-blue font-bold text-lg">{advantage.stats}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </ParallaxBackground>

        {/* Team Section */}
        <ParallaxBackground
          backgroundType="gradient"
          speed={0.3}
          intensity="low"
          className="py-20"
        >
          <section className="py-20 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    Industry veterans from top tech companies, united by a vision to revolutionize warranty management
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="animate-card bg-black/50 border border-gray-700 rounded-2xl p-6 text-center hover:border-neon-blue/50 transition-all duration-300"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-black font-bold text-2xl">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-neon-blue font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm">{member.background}</p>
                    </div>
                  ))}
                </div>
              </div>
          </section>
        </ParallaxBackground>

        {/* Comparison Table */}
        <ParallaxBackground
          backgroundType="geometric"
          speed={0.4}
          intensity="medium"
          className="py-20"
        >
          <section className="py-20 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">How We Compare</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    See why WarrantyAI leads the market in features and innovation
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-800">
                        <tr>
                          <th className="text-left py-4 px-6 text-white font-semibold">Features</th>
                          <th className="text-center py-4 px-6 text-neon-blue font-semibold">WarrantyAI</th>
                          <th className="text-center py-4 px-6 text-gray-400 font-semibold">Competitor A</th>
                          <th className="text-center py-4 px-6 text-gray-400 font-semibold">Competitor B</th>
                          <th className="text-center py-4 px-6 text-gray-400 font-semibold">Competitor C</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitors.map((row, index) => (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                            <td className="py-4 px-6 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                                ✓
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center text-gray-400">
                              {typeof row.competitor1 === 'boolean' ? (
                                row.competitor1 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">✓</span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 rounded-full">✗</span>
                                )
                              ) : (
                                row.competitor1
                              )}
                            </td>
                            <td className="py-4 px-6 text-center text-gray-400">
                              {typeof row.competitor2 === 'boolean' ? (
                                row.competitor2 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">✓</span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 rounded-full">✗</span>
                                )
                              ) : (
                                row.competitor2
                              )}
                            </td>
                            <td className="py-4 px-6 text-center text-gray-400">
                              {typeof row.competitor3 === 'boolean' ? (
                                row.competitor3 ? (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">✓</span>
                                ) : (
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 rounded-full">✗</span>
                                )
                              ) : (
                                row.competitor3
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </section>
        </ParallaxBackground>

        {/* Mission & Vision */}
        <ParallaxBackground
          backgroundType="particles"
          speed={0.2}
          intensity="low"
          className="py-20"
        >
          <section className="py-20 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                      To eliminate the frustration and financial loss caused by poor warranty management.
                      We believe everyone deserves to protect their investments and maximize the value of their purchases.
                    </p>
                    <div className="space-y-4">
                      {[
                        'Democratize access to advanced warranty management',
                        'Reduce consumer financial losses from missed warranties',
                        'Simplify the complex world of product protection',
                        'Enable smarter purchasing decisions through data'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Target className="w-5 h-5 text-neon-blue mr-3" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-blue/20 rounded-2xl p-8">
                    <Rocket className="w-16 h-16 text-neon-blue mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-gray-400 leading-relaxed">
                      A world where every consumer has complete visibility and control over their warranties,
                      where AI handles the complexity, and where no valuable warranty ever goes unclaimed again.
                    </p>
                  </div>
                </div>
              </div>
          </section>
        </ParallaxBackground>

        {/* CTA Section */}
        <ParallaxBackground
          backgroundType="cyber"
          speed={0.5}
          intensity="high"
          className="py-20"
        >
          <section className="py-20 relative">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Experience the Difference?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join thousands of users who have already discovered why WarrantyAI is the clear choice for warranty management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" onClick={() => router.push('/sign-up')}>
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => router.push('/demo')}>
                    Try Demo
                  </Button>
                </div>
              </div>
          </section>
        </ParallaxBackground>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Clock, Calendar, Zap, Brain, Shield, Globe, Smartphone } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ParallaxBackground from '@/components/effects/ParallaxBackground';
import AnimatedCanvas from '@/components/effects/AnimatedCanvas';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const roadmapPhases = [
  {
    phase: 'Phase 1',
    title: 'MVP Foundation',
    status: 'completed',
    timeline: 'Q4 2023 - Q1 2024',
    description: 'Core warranty tracking with manual upload and basic AI extraction',
    features: [
      'Manual receipt upload',
      'Basic AI extraction',
      'Dashboard with warranty list',
      'Email reminders',
      'Web application',
      'User authentication',
    ],
    icon: CheckCircle,
    color: 'from-green-400 to-green-600',
  },
  {
    phase: 'Phase 2',
    title: 'Smart Automation',
    status: 'in-progress',
    timeline: 'Q2 2024 - Q3 2024',
    description: 'Advanced AI features and automated data import capabilities',
    features: [
      'Gmail/email auto-import',
      'E-commerce integration (Amazon, Best Buy)',
      'Advanced AI with 99%+ accuracy',
      'Smart reminder system',
      'Service history tracking',
      'Mobile app (iOS/Android)',
    ],
    icon: Brain,
    color: 'from-neon-blue to-neon-purple',
  },
  {
    phase: 'Phase 3',
    title: 'Visual Intelligence',
    status: 'planned',
    timeline: 'Q4 2024 - Q1 2025',
    description: '3D/AR inventory and enhanced claim assistance',
    features: [
      '3D room inventory visualization',
      'AR item placement and tracking',
      'Claim assistant with document generation',
      'Smart coverage analysis',
      'Food freshness tracking',
      'IoT device integration',
    ],
    icon: Zap,
    color: 'from-neon-purple to-neon-green',
  },
  {
    phase: 'Phase 4',
    title: 'Enterprise & Scale',
    status: 'planned',
    timeline: 'Q2 2025 - Q3 2025',
    description: 'Business features and advanced integrations',
    features: [
      'Team collaboration tools',
      'Business API and integrations',
      'Advanced analytics and reporting',
      'Custom branding options',
      'Enterprise security features',
      'Multi-language support',
    ],
    icon: Shield,
    color: 'from-neon-green to-neon-pink',
  },
  {
    phase: 'Phase 5',
    title: 'Future Innovation',
    status: 'future',
    timeline: 'Q4 2025+',
    description: 'Next-generation features and emerging technologies',
    features: [
      'Blockchain ownership verification',
      'NFT-based warranty certificates',
      'Metaverse inventory spaces',
      'AI predictive maintenance',
      'Global marketplace integration',
      'Voice assistant integration',
    ],
    icon: Globe,
    color: 'from-neon-pink to-neon-yellow',
  },
];

const milestones = [
  { date: 'Jan 2024', title: 'MVP Launch', description: 'First public release with core features' },
  { date: 'Mar 2024', title: '1,000 Users', description: 'Reached first thousand active users' },
  { date: 'Jun 2024', title: 'AI Upgrade', description: 'Deployed advanced AI with 99% accuracy' },
  { date: 'Sep 2024', title: 'Mobile Apps', description: 'iOS and Android apps released' },
  { date: 'Dec 2024', title: 'AR Features', description: '3D/AR inventory visualization' },
  { date: 'Mar 2025', title: 'Enterprise', description: 'Business features and API launch' },
];

export default function RoadmapPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedPhase, setSelectedPhase] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.roadmap-card',
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-neon-blue animate-pulse" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-400/30 bg-green-400/5';
      case 'in-progress':
        return 'border-neon-blue/30 bg-neon-blue/5';
      default:
        return 'border-gray-600/30 bg-gray-600/5';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <ParallaxBackground
          backgroundType="cyber"
          speed={0.6}
          intensity="high"
          className="py-20"
        >
          <AnimatedCanvas
            type="neural"
            color="#ff0080"
            opacity={0.25}
            speed={0.7}
          />
          <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Product{' '}
              <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                Roadmap
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              See what we've built, what we're working on, and where we're heading. 
              Our roadmap is driven by user feedback and cutting-edge technology.
            </p>
            <Button variant="primary" size="xl" onClick={() => router.push('/sign-up')}>
              Join Our Journey
            </Button>
          </div>
        </section>
        </ParallaxBackground>

        {/* Timeline Overview */}
        <ParallaxBackground
          backgroundType="particles"
          speed={0.4}
          intensity="medium"
          className="py-20"
        >
          <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Development Timeline</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Track our progress from MVP to the future of warranty management
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-blue to-neon-green"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-black/50 border border-gray-700 rounded-xl p-6">
                        <div className="text-neon-blue font-bold text-lg mb-2">{milestone.date}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-4 h-4 bg-neon-blue rounded-full border-4 border-black"></div>
                    </div>
                    
                    <div className="w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </ParallaxBackground>

        {/* Detailed Roadmap */}
        <ParallaxBackground
          backgroundType="geometric"
          speed={0.3}
          intensity="low"
          className="py-20"
        >
          <section ref={sectionRef} className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Detailed Roadmap</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Explore each phase of our development journey in detail
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Phase Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {roadmapPhases.map((phase, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPhase(index)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                        selectedPhase === index
                          ? 'border-neon-blue bg-neon-blue/10'
                          : 'border-gray-700 bg-black/50 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neon-blue font-semibold">{phase.phase}</span>
                        {getStatusIcon(phase.status)}
                      </div>
                      <h3 className="text-white font-semibold mb-1">{phase.title}</h3>
                      <p className="text-gray-400 text-sm">{phase.timeline}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase Details */}
              <div className="lg:col-span-2">
                <div className="roadmap-card bg-black/50 border border-gray-700 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${roadmapPhases[selectedPhase].color} flex items-center justify-center mr-4`}>
                      {React.createElement(roadmapPhases[selectedPhase].icon, {
                        className: 'w-8 h-8 text-black'
                      })}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-2xl font-bold text-white mr-3">
                          {roadmapPhases[selectedPhase].title}
                        </h3>
                        {getStatusIcon(roadmapPhases[selectedPhase].status)}
                      </div>
                      <p className="text-neon-blue font-semibold">{roadmapPhases[selectedPhase].timeline}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {roadmapPhases[selectedPhase].description}
                  </p>

                  <h4 className="text-xl font-semibold text-white mb-6">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapPhases[selectedPhase].features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {roadmapPhases[selectedPhase].status === 'in-progress' && (
                    <div className="mt-8 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-neon-blue mr-2" />
                        <span className="text-neon-blue font-semibold">Currently in Development</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        This phase is actively being developed. Features may be released incrementally.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        </ParallaxBackground>

        {/* Community Feedback */}
        <ParallaxBackground
          backgroundType="gradient"
          speed={0.5}
          intensity="medium"
          className="py-20"
        >
          <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Shape Our Future</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Your feedback drives our roadmap. Join our community and help us build the future of warranty management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Feature Requests</h3>
                <p className="text-gray-400 mb-6">
                  Suggest new features and vote on what matters most to you.
                </p>
                <Button variant="outline" size="md" onClick={() => router.push('/pitch-deck')}>
                  View Pitch Deck
                </Button>
              </div>

              <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-green to-neon-pink rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Beta Testing</h3>
                <p className="text-gray-400 mb-6">
                  Get early access to new features and help us test them.
                </p>
                <Button variant="outline" size="md" onClick={() => router.push('/sign-up')}>
                  Join Beta
                </Button>
              </div>

              <div className="bg-black/50 border border-gray-700 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-400 mb-6">
                  Connect with other users and share your experiences.
                </p>
                <Button variant="outline" size="md" onClick={() => window.open('https://discord.gg/warrantyai', '_blank')}>
                  Join Discord
                </Button>
              </div>
            </div>
          </div>
        </section>
        </ParallaxBackground>

        {/* CTA Section */}
        <ParallaxBackground
          backgroundType="cyber"
          speed={0.4}
          intensity="high"
          className="py-20"
        >
          <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Be Part of Our Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Start using WarrantyAI today and experience our latest features as we continue to innovate.
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Scan, Bell, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DemoWarranty {
  id: string;
  name: string;
  brand: string;
  category: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
  daysLeft: number;
}

const mockWarranties: DemoWarranty[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'Electronics',
    purchaseDate: '2023-01-15',
    expiryDate: '2024-01-15',
    status: 'expiring',
    daysLeft: 45,
  },
  {
    id: '2',
    name: 'Samsung Refrigerator',
    brand: 'Samsung',
    category: 'Appliances',
    purchaseDate: '2022-06-10',
    expiryDate: '2025-06-10',
    status: 'active',
    daysLeft: 520,
  },
  {
    id: '3',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    category: 'Electronics',
    purchaseDate: '2022-09-20',
    expiryDate: '2023-09-20',
    status: 'expired',
    daysLeft: -30,
  },
];

const DemoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [warranties, setWarranties] = useState<DemoWarranty[]>([]);

  const steps = [
    {
      title: 'Upload Receipt',
      description: 'Take a photo or upload your receipt',
      icon: Upload,
      color: 'from-neon-blue to-neon-purple',
    },
    {
      title: 'AI Scanning',
      description: 'AI extracts warranty information',
      icon: Scan,
      color: 'from-neon-purple to-neon-green',
    },
    {
      title: 'Smart Reminders',
      description: 'Get notified before expiration',
      icon: Bell,
      color: 'from-neon-green to-neon-pink',
    },
    {
      title: 'Visual Tracking',
      description: 'See all warranties in one place',
      icon: Eye,
      color: 'from-neon-pink to-neon-yellow',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate demo cards
      gsap.fromTo(
        '.demo-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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

  useEffect(() => {
    // Auto-advance demo steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        if (next === 1) {
          setIsScanning(true);
          setTimeout(() => setIsScanning(false), 2000);
        }
        if (next === 3) {
          setWarranties(mockWarranties);
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'expiring':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-400/30 bg-green-400/5';
      case 'expiring':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'expired':
        return 'border-red-400/30 bg-red-400/5';
      default:
        return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  return (
    <section ref={sectionRef} id="demo-section" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            See WarrantyAI in{' '}
            <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch how WarrantyAI transforms warranty management from chaos to clarity 
            with AI-powered automation and smart tracking.
          </p>
        </div>

        {/* Demo Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Steps */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              
              return (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg border transition-all duration-500 ${
                    isActive
                      ? 'border-neon-blue bg-neon-blue/10 scale-105'
                      : isCompleted
                      ? 'border-green-400/30 bg-green-400/5'
                      : 'border-gray-700 bg-black/30'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${step.color}`
                        : isCompleted
                        ? 'bg-green-400'
                        : 'bg-gray-700'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive || isCompleted ? 'text-black' : 'text-gray-400'}`} />
                  </div>
                  
                  <div>
                    <h4 className={`font-semibold ${isActive ? 'text-neon-blue' : 'text-white'}`}>
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                  
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Demo Visualization */}
          <div className="demo-card">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-96 flex flex-col">
              {currentStep === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-dashed border-neon-blue rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Upload className="w-8 h-8 text-neon-blue" />
                    </div>
                    <p className="text-white font-semibold">Upload Receipt</p>
                    <p className="text-gray-400 text-sm">Drag & drop or click to upload</p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-24 h-24 bg-gradient-to-r from-neon-purple to-neon-green rounded-lg flex items-center justify-center mb-4 mx-auto ${isScanning ? 'animate-pulse' : ''}`}>
                      <Scan className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-white font-semibold">AI Scanning...</p>
                    <p className="text-gray-400 text-sm">Extracting warranty information</p>
                    <div className="mt-4 w-32 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-neon-purple to-neon-green rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-neon-green to-neon-pink rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <Bell className="w-8 h-8 text-black" />
                    </div>
                    <p className="text-white font-semibold">Smart Reminders Set</p>
                    <p className="text-gray-400 text-sm">You'll be notified before expiration</p>
                    <div className="mt-4 p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg">
                      <p className="text-neon-green text-sm">✓ Reminder set for 30 days before expiry</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Your Warranties</h4>
                    <Eye className="w-5 h-5 text-neon-blue" />
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {warranties.map((warranty) => (
                      <div
                        key={warranty.id}
                        className={`p-3 rounded-lg border ${getStatusColor(warranty.status)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-white font-medium text-sm">{warranty.name}</h5>
                            <p className="text-gray-400 text-xs">{warranty.brand} • {warranty.category}</p>
                          </div>
                          {getStatusIcon(warranty.status)}
                        </div>
                        <div className="mt-2 text-xs">
                          {warranty.status === 'expired' ? (
                            <span className="text-red-400">Expired {Math.abs(warranty.daysLeft)} days ago</span>
                          ) : warranty.status === 'expiring' ? (
                            <span className="text-yellow-400">{warranty.daysLeft} days left</span>
                          ) : (
                            <span className="text-green-400">{warranty.daysLeft} days remaining</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Try It Yourself?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven warranty management. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

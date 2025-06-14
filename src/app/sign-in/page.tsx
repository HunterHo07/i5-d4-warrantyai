'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ParallaxBackground from '@/components/effects/ParallaxBackground';
import AnimatedCanvas from '@/components/effects/AnimatedCanvas';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful login
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGoogleSignIn = () => {
    // Simulate Google OAuth
    console.log('Google Sign In');
  };

  const handleAppleSignIn = () => {
    // Simulate Apple OAuth
    console.log('Apple Sign In');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        <ParallaxBackground
          backgroundType="geometric"
          speed={0.4}
          intensity="medium"
          className="py-20"
        >
          <AnimatedCanvas
            type="particles"
            color="#8b5cf6"
            opacity={0.25}
            speed={0.5}
          />
          <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Welcome Back to{' '}
                  <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                    WarrantyAI
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                  Continue managing your warranties with AI-powered precision. 
                  Your digital warranty assistant is waiting.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">AI-Powered Scanning</h3>
                      <p className="text-gray-400 text-sm">99.2% accuracy in receipt processing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-green to-neon-pink rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold">⏰</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Smart Reminders</h3>
                      <p className="text-gray-400 text-sm">Never miss a warranty expiration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center mr-4">
                      <span className="text-black font-bold">🥽</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">3D Visualization</h3>
                      <p className="text-gray-400 text-sm">See your items in augmented reality</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Sign In Form */}
              <div className="bg-black/50 border border-gray-700 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                  <p className="text-gray-400">Access your warranty dashboard</p>
                </div>

                {/* Social Sign In */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                  
                  <button
                    onClick={handleAppleSignIn}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-black text-white hover:bg-gray-900 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Continue with Apple
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-gray-400">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                        className="mr-2 w-4 h-4 text-neon-blue bg-gray-800 border-gray-600 rounded focus:ring-neon-blue focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-neon-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  {/* General Error */}
                  {errors.general && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400">{errors.general}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                  >
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/sign-up" className="text-neon-blue hover:underline">
                      Sign up for free
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ParallaxBackground>

        {/* Trust Indicators */}
        <ParallaxBackground
          backgroundType="gradient"
          speed={0.2}
          intensity="low"
          className="py-12"
        >
          <section className="py-12 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Trusted by 10,000+ Users</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-2xl font-bold text-neon-blue mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-2xl font-bold text-neon-green mb-2">256-bit</div>
                <div className="text-gray-400">Encryption</div>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-2xl font-bold text-neon-purple mb-2">SOC 2</div>
                <div className="text-gray-400">Compliant</div>
              </div>
            </div>
          </div>
        </section>
        </ParallaxBackground>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import ParallaxBackground from '@/components/effects/ParallaxBackground';
import AnimatedCanvas from '@/components/effects/AnimatedCanvas';
import { PRICING_PLANS } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  plan: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'free',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-green-500/10 border border-green-500/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Welcome to WarrantyAI!</h1>
            <p className="text-gray-400 mb-8">
              Your account has been created successfully. Check your email for verification instructions.
            </p>
            <Button variant="primary" size="lg">
              Go to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <main className="pt-20">
        <ParallaxBackground
          backgroundType="cyber"
          speed={0.5}
          intensity="medium"
          className="py-20"
        >
          <AnimatedCanvas
            type="waves"
            color="#00d4ff"
            opacity={0.2}
            speed={0.6}
          />
          <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Start Your{' '}
                <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                  Free Trial
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of users who never miss a warranty again. 
                No credit card required for the free plan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Sign Up Form */}
              <div className="bg-black/50 border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create Your Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

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
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded ${
                                i < passwordStrength
                                  ? passwordStrength <= 2
                                    ? 'bg-red-400'
                                    : passwordStrength <= 3
                                    ? 'bg-yellow-400'
                                    : 'bg-green-400'
                                  : 'bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Password strength: {
                            passwordStrength <= 2 ? 'Weak' :
                            passwordStrength <= 3 ? 'Medium' : 'Strong'
                          }
                        </p>
                      </div>
                    )}
                    
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-neon-blue'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Plan Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Choose Your Plan
                    </label>
                    <div className="space-y-3">
                      {PRICING_PLANS.map((plan) => (
                        <label
                          key={plan.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.plan === plan.id
                              ? 'border-neon-blue bg-neon-blue/10'
                              : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="plan"
                            value={plan.id}
                            checked={formData.plan === plan.id}
                            onChange={(e) => handleInputChange('plan', e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-white font-semibold">{plan.name}</h3>
                              <span className="text-neon-blue font-bold">
                                ${plan.price}{plan.price > 0 && `/${plan.period}`}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 mr-3 w-4 h-4 text-neon-blue bg-gray-800 border-gray-600 rounded focus:ring-neon-blue focus:ring-2"
                      />
                      <span className="text-sm text-gray-300">
                        I agree to the{' '}
                        <Link href="/terms" className="text-neon-blue hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-neon-blue hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-400">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={isLoading}
                  >
                    Create Account
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-neon-blue hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Why Choose WarrantyAI?</h3>
                  <div className="space-y-4">
                    {[
                      'AI-powered receipt scanning with 99.2% accuracy',
                      'Smart reminders before warranties expire',
                      '3D/AR inventory visualization',
                      'Multi-category support (electronics, home, vehicles)',
                      'Claim assistance and guidance',
                      'Secure, encrypted data storage'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Free Trial Includes:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>• 14-day access to all Pro features</div>
                    <div>• No credit card required</div>
                    <div>• Cancel anytime</div>
                    <div>• Full customer support</div>
                  </div>
                </div>
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

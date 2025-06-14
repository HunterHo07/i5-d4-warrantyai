'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate testimonial cards
      gsap.fromTo(
        '.testimonial-card',
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

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            What Our{' '}
            <span className="text-gradient bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their warranty management with WarrantyAI.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="testimonial-card mb-16">
          <div className="bg-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-3xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-black" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex mb-4">
                  {renderStars(TESTIMONIALS[currentTestimonial].rating)}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-6">
                  "{TESTIMONIALS[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-black font-bold text-lg">
                      {TESTIMONIALS[currentTestimonial].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {TESTIMONIALS[currentTestimonial].name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {TESTIMONIALS[currentTestimonial].role} • {TESTIMONIALS[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col items-center space-y-6">
                <div className="flex space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 bg-gray-800 hover:bg-neon-blue/20 border border-gray-700 hover:border-neon-blue rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-neon-blue" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 bg-gray-800 hover:bg-neon-blue/20 border border-gray-700 hover:border-neon-blue rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-400 hover:text-neon-blue" />
                  </button>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex space-x-2">
                  {TESTIMONIALS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index
                          ? 'bg-neon-blue scale-125'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                currentTestimonial === index
                  ? 'bg-neon-blue/10 border-neon-blue shadow-lg shadow-neon-blue/20 scale-105'
                  : 'bg-black/30 border-gray-700 hover:border-gray-600 hover:bg-black/50'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content.length > 120 
                  ? testimonial.content.substring(0, 120) + '...' 
                  : testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center mr-3">
                  <span className="text-black font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="testimonial-card">
            <div className="text-4xl font-bold text-neon-blue mb-2">10,000+</div>
            <div className="text-white font-semibold mb-1">Happy Users</div>
            <div className="text-gray-400 text-sm">Actively managing warranties</div>
          </div>
          
          <div className="testimonial-card">
            <div className="text-4xl font-bold text-neon-green mb-2">$2.5M+</div>
            <div className="text-white font-semibold mb-1">Money Saved</div>
            <div className="text-gray-400 text-sm">Through successful claims</div>
          </div>
          
          <div className="testimonial-card">
            <div className="text-4xl font-bold text-neon-purple mb-2">4.9/5</div>
            <div className="text-white font-semibold mb-1">User Rating</div>
            <div className="text-gray-400 text-sm">Based on 2,500+ reviews</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join Our Happy Users?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Start your warranty management journey today and see why thousands trust WarrantyAI.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  image: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'VP of Product',
      company: 'Logix.io',
      quote: 'Nexus Tech transformed our product. Their Next.js frontend is incredibly responsive, and our Lighthouse performance score went from 45 to 99 in just a few weeks. Absolute professionals.',
      rating: 5,
      image: '/images/avatar_1.png'
    },
    {
      id: 2,
      name: 'David Carter',
      role: 'Co-Founder & CTO',
      company: 'PayFlux',
      quote: 'The Express API pipeline built by Nexus Tech handles millions of ledger entries seamlessly. Cryptographic tokens and robust security gates mean we sleep soundly at night.',
      rating: 5,
      image: '/images/avatar_2.png'
    },
    {
      id: 3,
      name: 'Samantha Vance',
      role: 'Director of AI Solutions',
      company: 'Aetheria',
      quote: 'Their agentic AI integration workflows automated our document parsing overnight. What used to take hours of manual data entry now happens in seconds with 99.8% precision.',
      rating: 5,
      image: '/images/avatar_3.png'
    }
  ];

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    clearTimer();
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [isPlaying, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-secondary overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        {/* Header */}
        <div className="mb-12">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Testimonials
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-accent leading-tight">
            Loved by leading technology teams.
          </h2>
        </div>

        {/* Carousel Outer Frame */}
        <div className="relative min-h-[300px] flex items-center justify-center bg-white border border-black/5 p-8 sm:p-12 rounded-3xl shadow-xl shadow-black/5 mb-10 overflow-hidden text-left">
          {/* Quote mark decorator */}
          <div className="absolute top-6 left-6 text-primary/10">
            <Quote className="w-16 h-16 transform -scale-x-100" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col md:flex-row items-center gap-8"
            >
              {/* User Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-primary/10 flex-shrink-0 border-2 border-primary/20">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Area */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-accent text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                  "{active.quote}"
                </p>

                <div>
                  <h4 className="font-heading font-bold text-base text-accent">
                    {active.name}
                  </h4>
                  <p className="text-neutral-grey text-xs">
                    {active.role} &mdash; <span className="font-semibold text-primary">{active.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-xl bg-white border border-black/5 text-neutral-grey hover:text-accent hover:bg-black/5 transition-colors cursor-pointer"
            title="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-xl bg-white border border-black/5 text-neutral-grey hover:text-accent hover:bg-black/5 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto-scroll' : 'Play Auto-scroll'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-xl bg-white border border-black/5 text-neutral-grey hover:text-accent hover:bg-black/5 transition-colors cursor-pointer"
            title="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

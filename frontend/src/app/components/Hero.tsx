'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowRight, Play, Terminal, Cpu, Database } from 'lucide-react';

export default function Hero() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP floating animation for background gradients
    if (typeof window !== 'undefined') {
      gsap.to(blob1Ref.current, {
        x: '80%',
        y: '50%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to(blob2Ref.current, {
        x: '-60%',
        y: '-40%',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
      gsap.to(blob3Ref.current, {
        x: '40%',
        y: '-80%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-accent"
    >
      {/* Dynamic Animated Background Blobs (GSAP driven) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <div 
          ref={blob1Ref}
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/40 blur-[100px] pointer-events-none"
        />
        <div 
          ref={blob2Ref}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-light/35 blur-[120px] pointer-events-none"
        />
        <div 
          ref={blob3Ref}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-neutral-grey/25 blur-[90px] pointer-events-none"
        />
      </div>

      {/* Grid overlay for tech look */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] z-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Robot as a startup service(RaaS).
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Automated Cleaning <br/><span className="text-primary">Every Surface</span><br/>Zero Effort
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-grey mb-8 max-w-xl leading-relaxed"
          >
            Subscribe to robotics-as-a-service — facade, floor, drone & industrial cleaning, fully managed. No robots to buy. No staff to train.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection('portfolio')}
              className="px-8 py-4 bg-primary text-secondary font-bold rounded-2xl hover:bg-primary-light shadow-lg shadow-primary/20 hover:shadow-primary-light/35 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              Explore Our Work <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4.5 h-4.5 text-primary fill-primary" /> Book a Demo
            </button>
          </motion.div>
        </div>

        {/* Graphics Area */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[450px] aspect-square"
          >
            {/* Visual Glassmorphic Image Container */}
            <div className="absolute inset-0 glass-panel-dark rounded-3xl p-2 shadow-2xl flex flex-col justify-center overflow-hidden border border-white/10 backdrop-blur-xl animate-float">
              <img 
                src="/images/normal_robot_display.png" 
                alt="Yunthra Robot"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Glowing background halo */}
            <div className="absolute -z-10 inset-4 bg-primary/20 rounded-3xl blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

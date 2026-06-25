'use client';

import React from 'react';
import { Target, Compass, Zap, ShieldCheck, BarChart3, Users, Leaf, Globe } from 'lucide-react';

export default function About() {
  const edgeFeatures = [
    {
      title: 'Consistency',
      description: 'A robot cleans the same way every single time. No shortcuts, no bad days.',
      icon: ShieldCheck,
    },
    {
      title: 'No Human Error',
      description: 'Precision mapping and autonomous operation ensures nothing is missed.',
      icon: Target,
    },
    {
      title: 'Data-Driven',
      description: 'Robots track cleaning coverage, time, and hygiene metrics in real-time.',
      icon: BarChart3,
    },
    {
      title: 'Partnership Model',
      description: "Yunthra doesn't just drop a robot and leave; we stay with you.",
      icon: Users,
    },
    {
      title: 'Scalable',
      description: 'One robot today, ten tomorrow — no HR headaches or hiring delays.',
      icon: Zap,
    },
    {
      title: 'Eco-Friendly',
      description: 'Optimized water and chemical usage compared to traditional methods.',
      icon: Leaf,
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Story */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Our Story
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-accent mb-6 leading-tight">
            Redefining Facility Management Through Intelligent Robotics
          </h2>
          <p className="text-neutral-grey text-base sm:text-lg">
            Yunthra is a Bangalore-based Robot-as-a-Service (RAAS) startup offering smart automated solutions across B2B & B2C segments. We combine cutting-edge robotics with customer-centric services to deliver efficient, scalable, and modern cleaning solutions. Our promise to you - We provide the best facility management experience.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-primary/20 shadow-xl shadow-black/5 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-accent mb-4">Our Mission</h3>
            <p className="text-neutral-grey text-sm leading-relaxed">
              "To transform cleaning through intelligent robotics — delivering consistent, efficient, and hygienic environments while building lasting partnerships with every client we serve."
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-black/5 hover:border-primary/20 shadow-xl shadow-black/5 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-primary-light/10 flex items-center justify-center text-primary-light mb-6">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-accent mb-4">Our Vision</h3>
            <p className="text-neutral-grey text-sm leading-relaxed">
              "A world where every space is maintained by smart, sustainable robots — freeing people from repetitive work and empowering businesses to focus on what truly matters."
            </p>
          </div>
        </div>

        {/* Why India Needs Yunthra & Competitive Edge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Why India Needs Us */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              The Market Need
            </h4>
            <h3 className="font-heading font-extrabold text-3xl text-accent mb-4">
              Why India Needs Yunthra Right Now
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-neutral-grey leading-relaxed">
                  <strong className="text-accent">Smart Cities:</strong> India is moving toward smart cities — robots fit perfectly into this modern infrastructure.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-neutral-grey leading-relaxed">
                  <strong className="text-accent">Hygiene Standards:</strong> Post-COVID, consistent hygiene has become critical in all public spaces.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-neutral-grey leading-relaxed">
                  <strong className="text-accent">Labor Shortages:</strong> Finding reliable manual labor in hospitals, malls, airports, and hotels is an escalating challenge.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-neutral-grey leading-relaxed">
                  <strong className="text-accent">Make in India:</strong> Government push for Make in India and Digital India aligns perfectly with RaaS models.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-neutral-grey leading-relaxed">
                  <strong className="text-accent">Predictable Costs:</strong> Businesses want fixed, predictable costs — subscriptions beat unpredictable wages.
                </p>
              </li>
            </ul>
          </div>

          {/* Competitive Edge Grid */}
          <div className="lg:col-span-7">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Yunthra's Advantage
            </h4>
            <h3 className="font-heading font-extrabold text-3xl text-accent mb-10">
              Our Competitive Edge
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {edgeFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-black/5 hover:border-primary/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-heading font-bold text-base text-accent mb-2">{feat.title}</h5>
                    <p className="text-neutral-grey text-xs leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

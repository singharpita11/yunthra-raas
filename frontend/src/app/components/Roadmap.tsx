'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Hospital, ShoppingBag, Plane, Factory } from 'lucide-react';

export default function Roadmap() {
  const connections = [
    {
      id: 1,
      title: 'Corporate Offices',
      description: 'Maintaining pristine environments for knowledge workers with silent overnight autonomous scrubbing.',
      icon: Building2,
    },
    {
      id: 2,
      title: 'Healthcare Facilities',
      description: 'Hospital-grade hygiene standards achieved through precision UV and chemical deployment robots.',
      icon: Hospital,
    },
    {
      id: 3,
      title: 'Retail & Malls',
      description: 'Ensuring immaculate heavy-footfall floors and sparkling atrium facades safely and reliably.',
      icon: ShoppingBag,
    },
    {
      id: 4,
      title: 'Aviation & Transit',
      description: 'Rapid wide-area cleaning for airports and transit hubs that never sleep.',
      icon: Plane,
    },
    {
      id: 5,
      title: 'Industrial Manufacturing',
      description: 'Heavy-duty robotic systems tackling grease, grime, and hazardous chemical spills.',
      icon: Factory,
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-accent text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Connected Roadmap
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-6 leading-tight">
            Trusted By The Infrastructure That Moves India
          </h2>
          <p className="text-neutral-grey text-base">
            Yunthra is weaving a network of smart, automated facilities across the nation. Here is where we deploy our fleet.
          </p>
        </div>

        {/* Roadmap Visualization */}
        <div className="relative mt-12 pb-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {connections.map((conn, index) => {
              const Icon = conn.icon;
              return (
                <motion.div
                  key={conn.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative z-10 flex flex-col items-center group"
                >
                  {/* Connection Node */}
                  <div className="w-16 h-16 rounded-full bg-accent border-4 border-secondary flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:border-primary group-hover:text-secondary transition-all duration-300 shadow-xl mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-primary transition-colors">
                    {conn.title}
                  </h3>
                  <p className="text-neutral-grey text-xs leading-relaxed max-w-[200px] mx-auto">
                    {conn.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Palette, BrainCircuit, Building, Warehouse, Plane, Factory, ArrowUpRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

export default function Services() {
  const services: Service[] = [
    {
      id: 'srv-1',
      title: 'Facade Glass Cleaning',
      description: 'Automated robotic scaling for high-rise buildings. Ensures spotless exterior windows without endangering human lives.',
      icon: Building,
      features: ['High-Rise Compatibility', 'Streak-free Washing', 'Safety Compliance']
    },
    {
      id: 'srv-2',
      title: 'Floor Warehouse Cleaning',
      description: 'Autonomous scrubbers and sweepers designed for massive industrial floor spaces. Continuous operation and mapping.',
      icon: Warehouse,
      features: ['LiDAR Navigation', 'Continuous Operation', 'Deep Scrubbing']
    },
    {
      id: 'srv-3',
      title: 'Drone Cleaning',
      description: 'Tethered and untethered drone swarms for complex structural cleaning and solar panel maintenance.',
      icon: Plane,
      features: ['Solar Panel Cleaning', 'Hard-to-reach Areas', 'Swarm Capability']
    },
    {
      id: 'srv-4',
      title: 'Industrial Cleaning',
      description: 'Heavy-duty robotic systems for hazardous environments, chemical plants, and manufacturing floors.',
      icon: Factory,
      features: ['Hazardous Environments', 'Chemical Resistance', 'Heavy-Duty Scrub']
    }
  ];

  return (
    <section id="services" className="py-24 bg-accent text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-light/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-left max-w-3xl mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Our Robotics Verticals
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-6 leading-tight">
            One Platform. Every Surface.
          </h2>
          <p className="text-neutral-grey text-base">
            Four specialised robotic systems covering every cleaning challenge your facility faces — all under one subscription.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative glass-panel-dark p-8 rounded-2xl border border-white/5 hover:border-primary/25 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Glow */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-white mb-4 group-hover:text-primary transition-colors flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-grey text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bullet points */}
                <ul className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="text-xs text-neutral-grey flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

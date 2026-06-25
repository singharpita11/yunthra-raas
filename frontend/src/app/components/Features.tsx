'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, BarChart3, Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: any;
}

export default function Features() {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(0);

  const benefits: Benefit[] = [
    {
      id: 0,
      title: 'Zero Capital Expenditure',
      description: 'Subscription model — no upfront purchase, no depreciation, no maintenance headache.',
      icon: CreditCard,
    },
    {
      id: 1,
      title: 'Worker Safety First',
      description: 'Remove humans from high-rise, chemical, and hazardous environments entirely.',
      icon: Shield,
    },
    {
      id: 2,
      title: 'Measurable Outcomes',
      description: 'Technology-driven quality control with consistent, auditable cleaning standards.',
      icon: BarChart3,
    },
    {
      id: 3,
      title: 'One Vendor, All Verticals',
      description: 'Consolidate facade, floor, drone, and industrial cleaning under a single platform.',
      icon: Layers,
    }
  ];

  return (
    <section id="features" className="py-24 bg-secondary text-accent overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Why Yunthra
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-accent mb-6 leading-tight">
            Robotics without the complexity
          </h2>
          <p className="text-neutral-grey text-base">
            Facility managers shouldn't need to be robotics engineers. Yunthra takes ownership of the entire stack — hardware, software, deployment, and maintenance. You subscribe to outcomes, not equipment.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-left">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const isExpanded = expandedBenefit === benefit.id;
            return (
              <div
                key={benefit.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-white border-primary/20 shadow-lg shadow-black/5'
                    : 'bg-white/40 border-black/5 hover:border-primary/10'
                }`}
              >
                <button
                  onClick={() => setExpandedBenefit(isExpanded ? null : benefit.id)}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isExpanded ? 'bg-primary text-secondary' : 'bg-black/5 text-accent'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-bold text-base text-accent">
                      {benefit.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-neutral-grey" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-grey" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pl-19 border-t border-black/5 pt-4 text-neutral-grey text-sm leading-relaxed">
                    {benefit.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

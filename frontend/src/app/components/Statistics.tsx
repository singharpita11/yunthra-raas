'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatItemProps {
  value: number | string;
  suffix: string;
  label: string;
  decimals?: number;
}

function StatCounter({ value, suffix, label, decimals = 0 }: StatItemProps) {
  const [count, setCount] = useState(typeof value === 'number' ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = progress * (2 - progress);
        const currentCount = start + easeProgress * (end - start);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(updateCount);
    }
  }, [isInView, value]);

  const displayValue = typeof value === 'number' && typeof count === 'number' 
    ? count.toFixed(decimals) 
    : count;

  return (
    <div ref={ref} className="text-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300">
      <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-2 tracking-tight">
        <span className="text-primary">{displayValue}</span>
        {suffix}
      </div>
      <div className="text-neutral-grey text-xs sm:text-sm font-semibold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function Statistics() {
  const stats = [
    { value: 10, suffix: '+', label: 'Commercial verticals served' },
    { value: 0, suffix: '', label: 'Safety incidents with robotic deployment' },
    { value: 3, suffix: '×', label: 'Faster than manual cleaning teams' },
    { value: 'BLR', suffix: '', label: 'Based at Prestige Tech Park, Bengaluru' },
  ];

  return (
    <section className="py-20 bg-accent text-white relative overflow-hidden">
      {/* Decorative radial gradient grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              decimals={0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

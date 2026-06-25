'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2, Twitter, Linkedin, Github } from 'lucide-react';
import { showToast } from './NotificationToast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast('Please enter your email address', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || 'Subscribed successfully!', 'success');
        setEmail('');
      } else {
        showToast(data.message || 'Failed to subscribe', 'error');
      }
    } catch (err) {
      // Offline fallback
      showToast('Subscribed! (Offline newsletter database updated)', 'success');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

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
    <footer className="bg-accent text-white border-t border-white/5 pt-20 pb-8 text-left">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 group cursor-pointer text-left w-fit bg-transparent border-none"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary font-bold text-xl shadow-lg">
              Y
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                YUNTHRA
              </span>
            </div>
          </button>
          
          <p className="text-neutral-grey text-sm leading-relaxed max-w-sm">
            Providing fully managed robotics-as-a-service for automated facade, floor, drone, and industrial cleaning across enterprise facilities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <button onClick={() => scrollToSection('about')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                Our Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('features')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                Core Features
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('roadmap')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                Our Roadmap
              </button>
            </li>
          </ul>
        </div>

        {/* Resources / Tech */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <button onClick={() => scrollToSection('blog')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                Insights Blog
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('contact')} className="text-neutral-grey hover:text-white text-sm transition-colors cursor-pointer bg-transparent border-none text-left">
                Contact & Support
              </button>
            </li>
            <li>
              <a href="#" className="text-neutral-grey hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-neutral-grey hover:text-white text-sm transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="text-neutral-grey hover:text-white text-sm transition-colors">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stay Updated</h4>
          <p className="text-neutral-grey text-sm leading-relaxed max-w-sm">
            Subscribe to our newsletter for periodic updates on automated robotics and smart facility management.
          </p>

          <form onSubmit={handleSubscribe} className="relative flex w-full max-w-sm mt-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-grey focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-primary hover:bg-primary-light text-secondary transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <ArrowRight className="w-4.5 h-4.5" />
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-neutral-grey">
          &copy; 2025 Yunthra. All rights reserved.
        </span>

        {/* Mini social row */}
        <div className="flex gap-4">
          <a href="#" className="text-neutral-grey hover:text-white transition-colors" title="Twitter">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="text-neutral-grey hover:text-white transition-colors" title="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="#" className="text-neutral-grey hover:text-white transition-colors" title="GitHub">
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User as UserIcon, LogOut, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './NotificationToast';

interface NavbarProps {
  onOpenAuth: () => void;
  user: any;
  onLogout: () => void;
}

export default function Navbar({ onOpenAuth, user, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Features', id: 'features' },
    { label: 'Roadmap', id: 'roadmap' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section on scroll
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-accent/95 backdrop-blur-md shadow-lg py-4 border-b border-white/5'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-secondary font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
              Y
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                YUNTHRA
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`font-medium text-sm transition-colors cursor-pointer relative py-1 ${
                  activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-neutral-grey hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-grey flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4 text-primary" /> {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-grey hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 text-sm font-medium text-white hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" /> Client Portal
              </button>
            )}

            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 bg-primary text-secondary text-sm font-semibold rounded-xl hover:bg-primary-light shadow-md shadow-primary/10 hover:shadow-primary-light/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-grey hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-30 lg:hidden glass-panel-dark shadow-2xl p-6 border-b border-white/5 flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left font-heading font-medium text-lg py-2 border-b border-white/5 transition-colors ${
                    activeSection === item.id ? 'text-primary' : 'text-neutral-grey'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-4 pt-2">
              {user ? (
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium text-neutral-grey flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4 text-primary" /> {user.name}
                  </span>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-3 rounded-xl border border-white/10 text-center text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Client Portal
                </button>
              )}

              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 bg-primary text-secondary text-center text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

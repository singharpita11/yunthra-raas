'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Features from './components/Features';
import Roadmap from './components/Roadmap';
import Statistics from './components/Statistics';
import BlogSection from './components/BlogSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import NotificationToast, { showToast } from './components/NotificationToast';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user session exists in client local storage
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('nexus-user');
      const token = localStorage.getItem('nexus-token');
      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('nexus-user');
          localStorage.removeItem('nexus-token');
        }
      }
    }
  }, []);

  const handleLoginSuccess = (userData: any, token: string) => {
    setUser(userData);
    localStorage.setItem('nexus-user', JSON.stringify(userData));
    localStorage.setItem('nexus-token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexus-user');
    localStorage.removeItem('nexus-token');
    showToast('Logged out of Client Portal', 'info');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Real-time Toast Notifications Banner */}
      <NotificationToast />

      {/* Sticky Header Nav */}
      <Navbar 
        onOpenAuth={() => setAuthModalOpen(true)} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Area */}
        <Hero />

        {/* 2. Statistics Counter Bar */}
        <Statistics />

        {/* 3. About Details & Milestones */}
        <About />

        {/* 4. Service Category Cards */}
        <Services />

        {/* 5. Benefits & Comparer Matrix */}
        <Features />

        {/* 6. Trusted Connections Roadmap */}
        <Roadmap />

        {/* 8. Insights & Searchable Mini-CMS */}
        <BlogSection />

        {/* 9. Validated Form & Map Frame */}
        <Contact />
      </main>

      {/* Footer Area with Newsletter subscription form */}
      <Footer />

      {/* Client authentication drawer pop-up */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

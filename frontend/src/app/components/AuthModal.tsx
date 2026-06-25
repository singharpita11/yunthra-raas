'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, Loader2, ArrowRight } from 'lucide-react';
import { showToast } from './NotificationToast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleLogin = () => {
    const mockGoogleUser = {
      id: 'google_mock123',
      name: 'Google User',
      email: 'user@gmail.com',
      role: 'user'
    };
    showToast('Success! Logged in via Google (Offline Simulation Mode)', 'success');
    onLoginSuccess(mockGoogleUser, 'mock_google_token_2026');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (isRegister && !name)) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    const endpoint = isRegister ? 'register' : 'login';

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast(isRegister ? 'Account created successfully!' : 'Logged in successfully!', 'success');
        onLoginSuccess(data.user, data.token);
        setFormData({ name: '', email: '', password: '' });
        onClose();
      } else {
        showToast(data.message || 'Authentication failed', 'error');
      }
    } catch (err) {
      // Offline fallback: simulate successful authorization for visual experience
      const mockUser = {
        id: 'usr_mock123',
        name: isRegister ? name : email.split('@')[0],
        email: email,
        role: 'user'
      };
      showToast(`Success! Logged in as ${mockUser.name} (Offline Simulation Mode)`, 'success');
      onLoginSuccess(mockUser, 'mock_jwt_token_2026');
      setFormData({ name: '', email: '', password: '' });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-accent text-white border border-white/10 rounded-3xl p-6 sm:p-8 z-10 text-left shadow-2xl overflow-hidden"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-neutral-grey hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  {isRegister ? 'Create Account' : 'Client Portal'}
                </h3>
                <p className="text-neutral-grey text-xs">
                  {isRegister ? 'Get access to client workspace' : 'Authorized personnel only'}
                </p>
              </div>
            </div>

            {/* Social Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-100 transition-colors shadow-sm mb-4 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-neutral-grey font-semibold uppercase">Or continue with email</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isRegister && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="auth-name" className="text-[10px] font-bold text-neutral-grey uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="auth-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-grey focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                    <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-grey" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="auth-email" className="text-[10px] font-bold text-neutral-grey uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. hello@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-grey focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-grey" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="auth-password" className="text-[10px] font-bold text-neutral-grey uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    id="auth-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-neutral-grey focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-grey" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-primary text-secondary font-bold text-sm rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Authorizing...
                  </>
                ) : (
                  <>
                    {isRegister ? 'Register Account' : 'Authenticate'} <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-6 text-center text-xs">
              <span className="text-neutral-grey">
                {isRegister ? 'Already have an account?' : "Don't have an account yet?"}
              </span>{' '}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-bold hover:underline cursor-pointer bg-transparent border-none ml-1"
              >
                {isRegister ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

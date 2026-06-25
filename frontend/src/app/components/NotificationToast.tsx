'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

// Helper to trigger toast notifications from any client component
export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('nexus-toast', {
      detail: { message, type }
    });
    window.dispatchEvent(event);
  }
};

export default function NotificationToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: 'success' | 'error' | 'info' }>;
      const { message, type } = customEvent.detail;
      const newToast: ToastMessage = {
        id: Math.random().toString(36).substring(2, 9),
        message,
        type
      };
      
      setToasts(prev => [...prev, newToast]);

      // Auto-remove toast after 4 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 4000);
    };

    window.addEventListener('nexus-toast', handleToastEvent);
    return () => {
      window.removeEventListener('nexus-toast', handleToastEvent);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center p-4 rounded-xl shadow-lg border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-accent/95 text-secondary border-primary/20'
                : toast.type === 'error'
                ? 'bg-red-950/95 text-red-100 border-red-800/30'
                : 'bg-zinc-900/95 text-zinc-100 border-zinc-700/30'
            }`}
          >
            <div className="mr-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-primary" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-teal-400" />}
            </div>
            
            <p className="text-sm font-medium flex-1">{toast.message}</p>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-full text-neutral-grey hover:text-secondary hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

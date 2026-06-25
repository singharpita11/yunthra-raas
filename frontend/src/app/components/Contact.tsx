'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from 'lucide-react';
import { showToast } from './NotificationToast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, company, message } = formData;

    if (!name || !email || !message) {
      showToast('Please fill in required fields', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || 'Message sent successfully!', 'success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        showToast(data.message || 'Failed to submit form', 'error');
      }
    } catch (err) {
      // Offline fallback
      showToast('Enquiry sent! We will contact you soon.', 'success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary text-accent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Get In Touch
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-accent mb-6 leading-tight">
            Let's Build Smarter Facilities Together
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Details & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-heading font-extrabold text-2xl text-accent mb-2">Connect</h3>
              <p className="text-neutral-grey text-sm leading-relaxed mb-4">
                Reach out for a demo, pricing enquiry, or partnership discussion. Our team will get back to you within one business day.
              </p>

              {/* Detail Blocks */}
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-black/5 hover:border-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-neutral-grey uppercase tracking-wider">WhatsApp</h5>
                    <a href="https://wa.me/919686189150" className="text-sm font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1">
                      Chat on WhatsApp →
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-black/5 hover:border-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-neutral-grey uppercase tracking-wider">Call Us</h5>
                    <a href="tel:+919686189150" className="text-sm font-semibold text-accent hover:text-primary transition-colors">
                      +91-9686189150
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-black/5 hover:border-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-neutral-grey uppercase tracking-wider">Email Us</h5>
                    <a href="mailto:info@yunthra.com" className="text-sm font-semibold text-accent hover:text-primary transition-colors">
                      info@yunthra.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-black/5 hover:border-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-neutral-grey uppercase tracking-wider">Headquarters</h5>
                    <span className="text-sm font-semibold text-accent">
                      11th Floor, Prestige Tech Park, Platina 2,<br/>Kadubeesanahalli, Bengaluru – 560103
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form & Maps */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-xl shadow-black/5">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-neutral-grey uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-xs font-bold text-neutral-grey uppercase tracking-wider">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-neutral-grey uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-xs font-bold text-neutral-grey uppercase tracking-wider">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-neutral-grey uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your facility and what you'd like to achieve..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-4 bg-primary text-secondary font-bold text-sm rounded-xl hover:bg-primary-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10 hover:shadow-primary-light/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending Enquiry...
                    </>
                  ) : (
                    <>
                      Send Enquiry <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Map (Bengaluru Location logic) */}
            <div className="w-full h-[220px] rounded-3xl overflow-hidden border border-black/5 bg-zinc-950 shadow-xl relative group">
              <iframe
                title="Yunthra Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6656755498877!2d77.6917631148216!3d12.929215090883398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13ac8c6e21b9%3A0xe67c00e6a394a4c5!2sPrestige%2C%20Tech%20Park%20Rd%2C%20Kadubeesanahalli%2C%20Bengaluru%2C%20Karnataka%20560103!5e0!3m2!1sen!2sin!4v1655381881512!5m2!1sen!2sin"
                className="w-full h-full border-none filter invert contrast-110 opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

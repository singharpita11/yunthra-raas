'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Tag, Calendar, BarChart3, Check } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  category: 'web-app' | 'ai-integration' | 'brand';
  summary: string;
  image: string;
  details: {
    client: string;
    timeline: string;
    services: string[];
    results: string;
    fullDescription: string;
  };
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'web-app' | 'ai-integration' | 'brand'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'SaaS Web Apps', value: 'web-app' },
    { label: 'AI Integrations', value: 'ai-integration' },
    { label: 'Brand Identity', value: 'brand' }
  ];

  const projects: Project[] = [
    {
      id: 'proj-1',
      title: 'Aether AI Operations Hub',
      category: 'ai-integration',
      summary: 'Autonomous operation center with stream analytics, semantic search caching, and LLM orchestration.',
      image: '/images/portfolio_item_1.png',
      details: {
        client: 'Aether Corp',
        timeline: '12 Weeks',
        services: ['AI Agents Pipeline', 'Next.js App Router', 'Vector Database Indexing'],
        results: '142% Operations Efficiency Gain',
        fullDescription: 'The Aether AI Hub provides an autonomous operations workspace where data streams are continuously analyzed by agentic workflows. By incorporating custom vector database caching, response times for internal queries dropped to under 100ms while automating document ingestion pipelines.'
      }
    },
    {
      id: 'proj-2',
      title: 'Voltaic Payment Gateway',
      category: 'web-app',
      summary: 'High-throughput payment gateway utilizing robust ledgering systems and secure JWT authorization protocols.',
      image: '/images/portfolio_item_2.png',
      details: {
        client: 'Volta Finance',
        timeline: '16 Weeks',
        services: ['Express.js API Layer', 'PostgreSQL DB Tuning', 'Docker Cluster Config'],
        results: '$2.4M Transaction Stream Processed',
        fullDescription: 'Voltaic is a multi-currency routing ledger built for high availability and low latency. The API handles millions of events daily, secured behind cryptographic tokens and a strict CORS gate. Database architectures use optimized replication indexes.'
      }
    },
    {
      id: 'proj-3',
      title: 'Scribe Intelligent CRM',
      category: 'web-app',
      summary: 'Enterprise document sync workspace featuring semantic tagging, real-time feedback, and automated CRM workflows.',
      image: '/images/portfolio_item_3.png',
      details: {
        client: 'Scribe Global',
        timeline: '10 Weeks',
        services: ['React 19 & Next.js 15', 'MongoDB Schema Scaling', 'Micro-interactions Design'],
        results: '90% Search Retrieval Speedup',
        fullDescription: 'Scribe CRM introduces structured workspaces for document lifecycle tracking. Documents are scanned, parsed, and semantically categorized on import, syncing automatically to contact histories with real-time browser notifications.'
      }
    }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-accent text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-left max-w-3xl mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Our Portfolio
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-6 leading-tight">
            Engineering digital experiences that deliver outstanding results.
          </h2>
          <p className="text-neutral-grey text-base">
            Explore some of our recent product releases. From clean frontend dashboards to robust distributed payment API pipelines.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as any)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-primary text-secondary shadow-md shadow-primary/20'
                  : 'bg-white/5 border border-white/10 text-neutral-grey hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/40 hover:border-primary/25 transition-all duration-300 flex flex-col justify-between"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-accent/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {project.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {project.title} <ExternalLink className="w-4 h-4 opacity-50" />
                    </h3>
                    <p className="text-neutral-grey text-xs sm:text-sm leading-relaxed mb-4">
                      {project.summary}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/5 border border-primary/10 px-3 py-2 rounded-xl w-fit">
                    <BarChart3 className="w-4.5 h-4.5" /> {project.details.results}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-accent border border-white/10 rounded-3xl p-6 sm:p-8 z-10 text-left shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-neutral-grey hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                {/* Visual Area */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-950">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details Area */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedProject.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-white mt-4 mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-neutral-grey text-sm leading-relaxed mb-6">
                      {selectedProject.details.fullDescription}
                    </p>

                    {/* Stats List */}
                    <div className="flex flex-col gap-3 mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-neutral-grey flex items-center gap-1.5"><Tag className="w-4 h-4" /> Client:</span>
                        <span className="font-semibold text-white">{selectedProject.details.client}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-neutral-grey flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Timeline:</span>
                        <span className="font-semibold text-white">{selectedProject.details.timeline}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-neutral-grey flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Metrics:</span>
                        <span className="font-semibold text-primary">{selectedProject.details.results}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet points of services */}
                  <div>
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Core Deliverables</h4>
                    <ul className="flex flex-col gap-2">
                      {selectedProject.details.services.map((serv, idx) => (
                        <li key={idx} className="text-xs text-neutral-grey flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          {serv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

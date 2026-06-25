'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './NotificationToast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
}

// Fallback seed data in case API is offline
const fallbackBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'India Is Ready. So Is Yunthra.',
    slug: 'india-is-ready-so-is-yunthra',
    summary: 'India\'s push toward smart cities, rising hygiene standards post-COVID, and a growing demand for tech-driven services make 2026 the defining year for robotic cleaning adoption.',
    content: 'India\'s push toward smart cities, rising hygiene standards post-COVID, and a growing demand for tech-driven services make 2026 the defining year for robotic cleaning adoption. AI is transforming RaaS by shifting it from simple pre-programmed automation to intelligent, autonomous systems capable of adapting to unstructured environments — with robots now able to analyze data in real time, optimize navigation, and continuously improve without constant human oversight. Yunthra is bringing this revolution to every Indian facility — from hospitals and hotels to malls and corporate offices.',
    category: 'Industry',
    author: 'Yunthra Team',
    image: '/images/blog_banner.png',
    readTime: '3 min read',
    publishedAt: '2026-06-25',
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Billions Being Invested. For Good Reason.',
    slug: 'billions-being-invested-for-good-reason',
    summary: 'The global robotics market is expected to reach $88.3 billion, with the industry recording steady expansion driven by rising automation demand and labor efficiency requirements.',
    content: 'The global robotics market is expected to reach $88.3 billion, with the industry recording steady expansion driven by rising automation demand, labor efficiency requirements, and advances in AI, sensing, and control systems. Robotics investments are at an all-time high, with robotics being a direct beneficiary of the excitement around AI — with public robotics companies outperforming the market. Yunthra is your gateway into this booming ecosystem.',
    category: 'Market Trends',
    author: 'Yunthra Team',
    image: '/images/blog_nextjs.png',
    readTime: '4 min read',
    publishedAt: '2026-06-22',
    featured: false
  }
];

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 3;
  const categories = ['All', 'Technology', 'Design', 'Engineering'];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Connect to Express backend API
        const response = await fetch('http://localhost:5000/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (err) {
        // Fallback to local copy if API fails to load
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter and search logic
  const filteredBlogs = blogs.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const section = document.getElementById('blog');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredBlog = blogs.find(b => b.featured);

  return (
    <section id="blog" className="py-24 bg-secondary text-accent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Our Insights
          </h4>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-accent mb-6 leading-tight">
            Latest trends in modern engineering and RaaS Service for future.
          </h2>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-secondary'
                    : 'bg-white border border-black/5 text-neutral-grey hover:bg-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-black/5 text-sm text-accent focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-grey" />
          </div>
        </div>

        {/* Blog Post List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-grey text-sm">Loading insights feed...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white border border-black/5 rounded-3xl">
            <p className="text-neutral-grey text-base">No articles found matching your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedBlog(post)}
                className="group cursor-pointer bg-white border border-black/5 hover:border-primary/20 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="text-left">
                  {/* Banner Image */}
                  <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-black/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-black/5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-neutral-grey mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-accent leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-neutral-grey text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-left">
                  <div className="text-xs sm:text-sm font-semibold text-primary group-hover:text-primary-light transition-colors flex items-center gap-1.5 mt-2">
                    Read Article <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border border-black/5 bg-white text-neutral-grey hover:text-accent hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-semibold text-accent">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border border-black/5 bg-white text-neutral-grey hover:text-accent hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedBlog(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white border border-black/5 rounded-3xl p-6 sm:p-8 z-10 text-left shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-black/5 border border-black/5 text-neutral-grey hover:text-accent hover:bg-black/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pt-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-grey mb-4">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary font-bold rounded-lg uppercase tracking-wider">{selectedBlog.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4.5 h-4.5" /> {selectedBlog.publishedAt}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4.5 h-4.5" /> {selectedBlog.readTime}</span>
                  <span className="flex items-center gap-1"><User className="w-4.5 h-4.5 text-primary" /> {selectedBlog.author}</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-accent leading-snug mb-6">
                  {selectedBlog.title}
                </h3>

                {/* Banner Image */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-zinc-100 border border-black/5 mb-8">
                  <img
                    src={selectedBlog.image}
                    alt={selectedProjectImageDescription(selectedBlog)}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Detailed Text Content */}
                <div className="prose max-w-none text-neutral-grey text-sm sm:text-base leading-relaxed space-y-4">
                  <p>{selectedBlog.content}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Simple function to map title description for image labels
function selectedProjectImageDescription(blog: BlogPost) {
  return blog.title;
}

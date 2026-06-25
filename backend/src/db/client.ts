import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define Interfaces
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface BlogPost {
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

// Local JSON file path for fallback
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DB_PATH = path.join(__dirname, 'local-db.json');

// Seed Data
const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Future of AI in SaaS: What to Expect in 2026',
    slug: 'future-of-saas-ai-2026',
    summary: 'Explore how generative AI models and agentic workflows are reshaping software-as-a-service platforms, making them more proactive, autonomous, and value-driven.',
    content: 'We are living in an era where AI is shifting from a passive chatbot assistant to an active participant in SaaS ecosystems. Agentic workflows, self-healing code, and intent-driven interfaces are defining the new generation of software. The transition means software is no longer just a database wrapper with a UI; it is an intelligent system capable of understanding complex human intents, synthesizing solutions, and executing tasks autonomously. In this post, we detail the core architecture of Agentic SaaS, explore the integration of vector search, and highlight how businesses can prepare for the agentic revolution.',
    category: 'Technology',
    author: 'Elena Vance, Head of R&D',
    image: '/images/blog_banner.png',
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Designing for the Future: Clean Layouts & Micro-interactions',
    slug: 'designing-future-layouts-micro-interactions',
    summary: 'A deep dive into visual aesthetics that make modern applications feel alive, responsive, and exceptionally premium.',
    content: 'Premium SaaS products are defined by their attention to detail. Soft shadow gradients, glassmorphic headers that blur the content underneath, hover animations using Framer Motion, and micro-interactions make users feel like they are interacting with a physical, responsive medium. In this article, we outline our 5 core design principles: generous whitespace, a functional HSL color model, rounded corners between 12px and 20px, stateful UI animations, and dark-mode elegance. We also provide step-by-step guides on implementing CSS transitions that feel natural rather than jarring.',
    category: 'Design',
    author: 'Lucas Thorne, Creative Director',
    image: '/images/blog_design.png',
    readTime: '4 min read',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    featured: false
  },
  {
    id: 'blog-3',
    title: 'Scaling Next.js 15: Optimizing Performance and SEO',
    slug: 'scaling-next-js-15-performance-seo',
    summary: 'Practical tips on achieving a perfect 100 Lighthouse score with Next.js App Router, advanced lazy loading, and dynamic metadata.',
    content: 'Next.js 15 brings powerful updates to routing, compilation speed, and server-side components. However, achieving sub-second load times requires careful planning around image optimization, selective client components, and dynamic SEO metadata. This guide covers how to set up metadata objects for dynamic pages, structure open-graph representations, optimize Google Fonts, and utilize Tailwind CSS v4 variables for sub-millisecond styling transitions. We also detail how to audit bundle sizes using Webpack Analyzers and configure edge runtime execution.',
    category: 'Engineering',
    author: 'Marcus Chen, Principal Architect',
    image: '/images/blog_nextjs.png',
    readTime: '6 min read',
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    featured: false
  },
  {
    id: 'blog-4',
    title: 'Securing API Infrastructure: Implementing JWT & MFA',
    slug: 'securing-api-jwt-mfa',
    summary: 'Learn how to secure your Express.js and Node.js backend using JWT access tokens, secure cookie storage, and multi-factor auth.',
    content: 'Security is the foundation of trust. Building a production-ready authentication backend requires more than storing password hashes. In this technical deep dive, we explore how to configure robust JSON Web Token (JWT) handling with access and refresh tokens, establish cookie flags such as HttpOnly and SameSite, protect route handlers with customizable middleware layers, and design a database schema ready for authentication logs. We also show how to connect this backend structure to a React frontend securely.',
    category: 'Security',
    author: 'Sophia Martinez, Security Engineer',
    image: '/images/blog_security.png',
    readTime: '8 min read',
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    featured: false
  }
];

class LocalDatabase {
  private data: {
    users: User[];
    contacts: ContactMessage[];
    subscribers: NewsletterSubscriber[];
    blogs: BlogPost[];
  };

  constructor() {
    this.data = { users: [], contacts: [], subscribers: [], blogs: initialBlogs };
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(LOCAL_DB_PATH)) {
        const fileContent = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
        this.data = JSON.parse(fileContent);
        // Ensure initial blogs exist
        if (!this.data.blogs || this.data.blogs.length === 0) {
          this.data.blogs = initialBlogs;
          this.save();
        }
      } else {
        // Create folder if it doesn't exist
        const dir = path.dirname(LOCAL_DB_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        this.save();
      }
    } catch (err) {
      console.error('Error loading local JSON DB:', err);
    }
  }

  private save() {
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving local JSON DB:', err);
    }
  }

  // Users
  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.data.users.find(u => u.id === id) || null;
  }

  // Contacts
  async createContact(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.data.contacts.push(newMessage);
    this.save();
    return newMessage;
  }

  async getContacts(): Promise<ContactMessage[]> {
    return this.data.contacts;
  }

  // Newsletter
  async createSubscriber(email: string): Promise<NewsletterSubscriber> {
    const existing = this.data.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const newSub: NewsletterSubscriber = {
      id: 'sub_' + Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString()
    };
    this.data.subscribers.push(newSub);
    this.save();
    return newSub;
  }

  async findSubscriberByEmail(email: string): Promise<NewsletterSubscriber | null> {
    return this.data.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // Blogs
  async getBlogs(): Promise<BlogPost[]> {
    return this.data.blogs;
  }

  async findBlogBySlug(slug: string): Promise<BlogPost | null> {
    return this.data.blogs.find(b => b.slug === slug) || null;
  }

  async findBlogById(id: string): Promise<BlogPost | null> {
    return this.data.blogs.find(b => b.id === id) || null;
  }

  async createBlog(blog: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
    const newBlog: BlogPost = {
      ...blog,
      id: 'blog_' + Math.random().toString(36).substr(2, 9),
      publishedAt: new Date().toISOString().split('T')[0]
    };
    this.data.blogs.push(newBlog);
    this.save();
    return newBlog;
  }
}

// Instantiate Local DB client
const localDb = new LocalDatabase();

// Centralized Database Adapter
export const db = {
  users: {
    create: async (user: Omit<User, 'id' | 'createdAt'>) => {
      // If postgresql/mongodb configured, write code here. Otherwise fallback.
      return localDb.createUser(user);
    },
    findByEmail: async (email: string) => {
      return localDb.findUserByEmail(email);
    },
    findById: async (id: string) => {
      return localDb.findUserById(id);
    }
  },
  contacts: {
    create: async (message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
      return localDb.createContact(message);
    },
    list: async () => {
      return localDb.getContacts();
    }
  },
  subscribers: {
    create: async (email: string) => {
      return localDb.createSubscriber(email);
    },
    findByEmail: async (email: string) => {
      return localDb.findSubscriberByEmail(email);
    }
  },
  blogs: {
    list: async () => {
      return localDb.getBlogs();
    },
    findBySlug: async (slug: string) => {
      return localDb.findBlogBySlug(slug);
    },
    findById: async (id: string) => {
      return localDb.findBlogById(id);
    },
    create: async (blog: Omit<BlogPost, 'id' | 'publishedAt'>) => {
      return localDb.createBlog(blog);
    }
  }
};

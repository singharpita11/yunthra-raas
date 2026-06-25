import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    
    // In production, MONGODB_URI must be provided.
    // In development, we can fallback to a local MongoDB instance if not provided,
    // or log a warning.
    if (!process.env.MONGODB_URI) {
      console.warn('WARNING: MONGODB_URI not found in environment variables. Falling back to local memory simulation.');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    await seedBlogs();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define Mongoose Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' }
}, { timestamps: true });

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  readTime: { type: String, required: true },
  publishedAt: { type: String, required: true },
  featured: { type: Boolean, default: false }
});

// Models
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
const ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const SubscriberModel = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// Initial Seed Data for Blogs
const initialBlogs = [
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

const seedBlogs = async () => {
  try {
    const count = await BlogModel.countDocuments();
    if (count === 0) {
      console.log('Seeding initial Yunthra blogs...');
      await BlogModel.insertMany(initialBlogs);
    }
  } catch (error) {
    console.error('Error seeding blogs:', error);
  }
};

// Fallback logic for when MongoDB isn't connected (so the server doesn't crash during local dev)
let fallbackData = { users: [], contacts: [], subscribers: [], blogs: initialBlogs };

// Exported Database Adapter
export const db = {
  connect: connectDB,
  users: {
    create: async (user: any) => {
      if (mongoose.connection.readyState !== 1) {
        const newUser = { ...user, _id: 'fallback_id', id: 'usr_' + Date.now() };
        fallbackData.users.push(newUser as never);
        return newUser;
      }
      return await UserModel.create(user);
    },
    findByEmail: async (email: string) => {
      if (mongoose.connection.readyState !== 1) return fallbackData.users.find((u: any) => u.email === email);
      return await UserModel.findOne({ email });
    },
    findById: async (id: string) => {
      if (mongoose.connection.readyState !== 1) return fallbackData.users.find((u: any) => u._id === id || u.id === id);
      return await UserModel.findById(id);
    }
  },
  contacts: {
    create: async (message: any) => {
      if (mongoose.connection.readyState !== 1) {
        const newMsg = { ...message, id: 'msg_' + Date.now() };
        fallbackData.contacts.push(newMsg as never);
        return newMsg;
      }
      return await ContactModel.create(message);
    },
    list: async () => {
      if (mongoose.connection.readyState !== 1) return fallbackData.contacts;
      return await ContactModel.find().sort({ createdAt: -1 });
    }
  },
  subscribers: {
    create: async (email: string) => {
      if (mongoose.connection.readyState !== 1) {
        const sub = { email, id: 'sub_' + Date.now() };
        fallbackData.subscribers.push(sub as never);
        return sub;
      }
      const existing = await SubscriberModel.findOne({ email });
      if (existing) return existing;
      return await SubscriberModel.create({ email });
    },
    findByEmail: async (email: string) => {
      if (mongoose.connection.readyState !== 1) return fallbackData.subscribers.find((s: any) => s.email === email);
      return await SubscriberModel.findOne({ email });
    }
  },
  blogs: {
    list: async () => {
      if (mongoose.connection.readyState !== 1) return fallbackData.blogs;
      return await BlogModel.find().sort({ publishedAt: -1 });
    },
    findBySlug: async (slug: string) => {
      if (mongoose.connection.readyState !== 1) return fallbackData.blogs.find(b => b.slug === slug);
      return await BlogModel.findOne({ slug });
    },
    findById: async (id: string) => {
      if (mongoose.connection.readyState !== 1) return fallbackData.blogs.find(b => b.id === id);
      return await BlogModel.findOne({ id });
    },
    create: async (blog: any) => {
      if (mongoose.connection.readyState !== 1) {
        const newBlog = { ...blog, id: 'blog_' + Date.now() };
        fallbackData.blogs.push(newBlog as never);
        return newBlog;
      }
      return await BlogModel.create(blog);
    }
  }
};

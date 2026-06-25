import { Router, Response } from 'express';
import { db } from '../db/client.js';

const router = Router();

// Get all blogs (supports category filter & search query)
router.get('/', async (req: any, res: Response) => {
  try {
    const { category, search } = req.query;
    let blogs = await db.blogs.list();

    if (category) {
      blogs = blogs.filter(b => b.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (search) {
      const q = (search as string).toLowerCase();
      blogs = blogs.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.summary.toLowerCase().includes(q) || 
        b.content.toLowerCase().includes(q)
      );
    }

    // Sort by publish date descending
    blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return res.json(blogs);
  } catch (err: any) {
    console.error('Error fetching blogs:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single blog by slug
router.get('/:slug', async (req: any, res: Response) => {
  try {
    const blog = await db.blogs.findBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    return res.json(blog);
  } catch (err: any) {
    console.error('Error fetching blog by slug:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new blog post
router.post('/', async (req: any, res: Response) => {
  try {
    const { title, summary, content, category, author, image, readTime, featured } = req.body;

    if (!title || !summary || !content || !category || !author) {
      return res.status(400).json({ message: 'Title, summary, content, category, and author are required' });
    }

    // Auto-generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const existing = await db.blogs.findBySlug(slug);
    if (existing) {
      return res.status(400).json({ message: 'A blog post with a similar title already exists' });
    }

    const blog = await db.blogs.create({
      title,
      slug,
      summary,
      content,
      category,
      author,
      image: image || '/images/blog_banner.png',
      readTime: readTime || '5 min read',
      featured: featured || false
    });

    return res.status(201).json(blog);
  } catch (err: any) {
    console.error('Error creating blog post:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

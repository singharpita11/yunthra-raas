import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/client.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_nexus_tech_key_2026';

// Register User
router.post('/register', async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await db.users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.users.create({
      name,
      email,
      passwordHash,
      role: 'user'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    console.error('Error during registration:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login User
router.post('/login', async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await db.users.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err: any) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get User Profile (Protected)
router.get('/profile', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (err: any) {
    console.error('Error fetching user profile:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

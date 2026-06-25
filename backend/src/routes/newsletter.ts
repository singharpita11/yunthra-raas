import { Router, Response } from 'express';
import { db } from '../db/client.js';

const router = Router();

// Subscribe to newsletter
router.post('/subscribe', async (req: any, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const existing = await db.subscribers.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'This email is already subscribed to our newsletter' });
    }

    await db.subscribers.create(email);

    return res.status(201).json({
      message: 'Subscribed successfully! Welcome to our newsletter.'
    });
  } catch (err: any) {
    console.error('Error in newsletter subscription:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

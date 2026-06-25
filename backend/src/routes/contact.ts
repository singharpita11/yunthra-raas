import { Router, Response } from 'express';
import { db } from '../db/client.js';

const router = Router();

// Submit contact form message
router.post('/', async (req: any, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const newMessage = await db.contacts.create({
      name,
      email,
      subject,
      message
    });

    return res.status(201).json({
      message: 'Thank you! Your message has been received.',
      data: newMessage
    });
  } catch (err: any) {
    console.error('Error submitting contact form:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// List contact messages (for potential admin dashboards)
router.get('/', async (req: any, res: Response) => {
  try {
    const messages = await db.contacts.list();
    return res.json(messages);
  } catch (err: any) {
    console.error('Error retrieving contact messages:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

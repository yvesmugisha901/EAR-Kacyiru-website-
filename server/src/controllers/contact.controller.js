import { prisma } from '../config/db.js';
import { notifyChurch } from '../services/mailer.service.js';

export async function createContact(req, res, next) {
  try {
    const { website, ...data } = req.body;
    if (website) return res.status(201).json({ message: 'Message received.' }); // bots get a fake success
    await prisma.contactMessage.create({ data: { ...data, phone: data.phone || null } });
    notifyChurch(data).catch((e) => console.error('Email failed:', e.message)); // never block the visitor
    res.status(201).json({ message: 'Message received.' });
  } catch (err) {
    next(err);
  }
}

import { prisma } from '../config/db.js';
import { notifyChurch } from '../services/mailer.service.js';

export async function createContact(req, res, next) {
  try {
    const { website, ...data } = req.body;
    if (website) return res.status(201).json({ message: 'Message received.' }); // bots get a fake success
    const saved = await prisma.contactMessage.create({ data: { ...data, phone: data.phone || null } });
    console.log(`[contact] new message #${saved.id} from ${saved.name}`);
    await notifyChurch(data).catch((e) => console.error('Email failed:', e.message));
    res.status(201).json({ message: 'Message received.' });
  } catch (err) {
    next(err);
  }
}
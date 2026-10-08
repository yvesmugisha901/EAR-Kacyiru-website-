import { prisma } from '../config/db.js';

export const listSermons = async (req, res, next) => {
  try {
    const { q = '', language, limit } = req.query;
    const sermons = await prisma.sermon.findMany({
      where: {
        ...(language && { language: String(language) }),
        ...(q && { OR: ['title', 'speaker', 'scripture'].map((f) => ({ [f]: { contains: String(q) } })) }),
      },
      orderBy: { preachedOn: 'desc' },
      take: limit ? Math.min(Number(limit) || 20, 50) : 50,
    });
    res.json(sermons);
  } catch (e) { next(e); }
};

export const listEvents = async (req, res, next) => {
  try {
    const from = new Date(); from.setHours(0, 0, 0, 0);
    const limit = req.query.limit ? Math.min(Number(req.query.limit) || 10, 50) : 50;
    res.json(await prisma.event.findMany({ where: { startsAt: { gte: from } }, orderBy: { startsAt: 'asc' }, take: limit }));
  } catch (e) { next(e); }
};

export const registerForEvent = async (req, res, next) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    await prisma.eventRegistration.create({ data: { ...req.body, eventId: event.id } });
    res.status(201).json({ message: 'Registered.' });
  } catch (e) { next(e); }
};

export const listMinistries = async (req, res, next) => {
  try { res.json(await prisma.ministry.findMany({ orderBy: { name: 'asc' } })); } catch (e) { next(e); }
};

export const createPrayer = async (req, res, next) => {
  try {
    const { website, name, ...rest } = req.body;
    if (!website) await prisma.prayerRequest.create({ data: { ...rest, name: name || null } });
    res.status(201).json({ message: 'Received.' });
  } catch (e) { next(e); }
};

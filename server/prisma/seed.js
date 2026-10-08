// SAMPLE content. Replace via Prisma Studio (npm run db:studio) or edit here and re-run.
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const day = (n, h = 10) => { const d = new Date(); d.setDate(d.getDate() + n); d.setHours(h, 0, 0, 0); return d; };

await prisma.$transaction([
  prisma.eventRegistration.deleteMany(), prisma.event.deleteMany(),
  prisma.sermon.deleteMany(), prisma.ministry.deleteMany(),
]);
await prisma.sermon.createMany({ data: [
  { title: 'Walking in Faith', speaker: 'Sample Preacher', scripture: 'Hebrews 11:1-6', preachedOn: day(-7), language: 'en' },
  { title: 'Urukundo rw’Imana', speaker: 'Sample Preacher', scripture: '1 Yohana 4:7-12', preachedOn: day(-14), language: 'rw' },
  { title: 'Peace in a Restless World', speaker: 'Sample Preacher', scripture: 'Yohana 14:27', preachedOn: day(-21), language: 'en' },
  { title: 'Reconciliation and Hope', speaker: 'Sample Preacher', scripture: '2 Abakorinto 5:17-20', preachedOn: day(-28), language: 'rw' },
]});
await prisma.event.createMany({ data: [
  { title: 'Youth Night', description: 'An evening of worship, teaching and fellowship for young people.', location: 'EAR Kacyiru', startsAt: day(1, 17), endsAt: day(1, 20), needsRsvp: false },
  { title: 'Parish Prayer Retreat', description: 'A day of prayer and reflection for the whole parish. Bring a Bible.', location: 'EAR Kacyiru', startsAt: day(10, 9), endsAt: day(10, 15), needsRsvp: true },
  { title: 'Choir Concert', description: 'An afternoon of praise with our choirs.', location: 'EAR Kacyiru', startsAt: day(24, 14), needsRsvp: true },
]});
await prisma.ministry.createMany({ data: [
  { slug: 'youth', name: 'Youth ministry', summary: 'Monday service from 17:30 to 20:00, with worship, teaching and friendship.', leader: 'Bigiringabo Moses' },
  { slug: 'children', name: "Children's ministry", summary: 'Sunday School where children learn Bible stories and grow in faith.', leader: null },
  { slug: 'women', name: "Women's ministry", summary: 'Fellowship, prayer and support among the women of the parish.', leader: null },
  { slug: 'men', name: "Men's ministry", summary: 'Brothers growing together in faith and service.', leader: null },
  { slug: 'outreach', name: 'Outreach and community', summary: 'Serving neighbours in Kacyiru through visits, giving and practical help.', leader: null },
]});
console.log('Seeded.');
await prisma.$disconnect();

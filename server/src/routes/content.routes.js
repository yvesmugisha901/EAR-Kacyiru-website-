import { Router } from 'express';
import * as c from '../controllers/content.controller.js';
import { validate } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { prayerSchema, registrationSchema } from '../validators/forms.schema.js';

const r = Router();
r.get('/sermons', c.listSermons);
r.get('/events', c.listEvents);
r.post('/events/:id/register', formLimiter, validate(registrationSchema), c.registerForEvent);
r.get('/ministries', c.listMinistries);
r.post('/prayer', formLimiter, validate(prayerSchema), c.createPrayer);
export default r;

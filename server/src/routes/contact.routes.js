import { Router } from 'express';
import { createContact } from '../controllers/contact.controller.js';
import { validate } from '../middleware/validate.js';
import { formLimiter } from '../middleware/rateLimiter.js';
import { contactSchema } from '../validators/contact.schema.js';

const router = Router();
router.post('/', formLimiter, validate(contactSchema), createContact);
export default router;

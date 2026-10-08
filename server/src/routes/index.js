import { Router } from 'express';
import contact from './contact.routes.js';
import content from './content.routes.js';

const router = Router();
router.get('/health', (req, res) => res.json({ ok: true }));
router.use('/contact', contact);
router.use('/', content);
export default router;

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1); // correct client IPs behind a host proxy (needed for rate limiting)
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;

import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', apiRouter);
  app.use(errorHandler);

  return app;
}

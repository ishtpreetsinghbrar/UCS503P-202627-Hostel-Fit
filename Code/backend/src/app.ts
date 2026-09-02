import cors from 'cors';
import express, { type Express } from 'express';

import { loadEnvironment } from './config/env';

export function createApp(): Express {
  const environment = loadEnvironment();
  const app = express();

  app.disable('x-powered-by');
  app.use(
    cors({
      origin: environment.CORS_ORIGIN,
    }),
  );
  app.use(express.json({ limit: '10kb' }));

  app.get('/api/health', (_request, response) => {
    response.status(200).json({
      service: 'hostelfit-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}

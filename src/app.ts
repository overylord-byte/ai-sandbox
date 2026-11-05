// Express configuration.
// Why: app.ts only creates the application and wires infrastructure (json parser,
// routers). The endpoints themselves live in api/, the logic in lessons/. This allows
// testing the application without starting the server (supertest) and without startup tasks.

import express, { Request, Response } from 'express';
import { apiRouter } from './api/index.js';
import { logger } from './core/logger.js';

export const app = express();

app.use(express.json());

app.use(apiRouter);

// Root response — just a pointer to the API description.
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'AI Training Lab is running. See /api for available endpoints.',
    });
});

// Fallback for unknown routes — a unified error format.
app.use((req: Request, res: Response) => {
    logger.warn('api', `unmatched route ${req.method} ${req.originalUrl}`);
    res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
});

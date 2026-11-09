// Service endpoints: health-check and API description.
// Why it lives outside app.ts: app.ts should only assemble the application, not contain
// business routes — this follows the "Express configuration" principle.

import { Router, Request, Response } from 'express';
import { logger } from '../core/logger.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
    logger.info('api', 'GET /health');
    res.status(200).json({ status: 'ok' });
});

healthRouter.get('/api', (_req: Request, res: Response) => {
    logger.info('api', 'GET /api');
    res.status(200).json({
        service: 'ai-training-lab',
        version: '0.1.0-demo',
        endpoints: [
            'GET  /health',
            'GET  /api',
            'GET  /api/lessons',
            'GET  /api/lessons/:lessonId',
            'POST /api/lessons/:lessonId/execute'
        ],
    });
});

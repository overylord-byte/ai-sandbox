// Router aggregation point.
// Why: app.ts mounts a single router, so adding new endpoint groups
// does not require changes in app.ts.

import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { lessonsRouter } from './lessons.routes.js';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(lessonsRouter);

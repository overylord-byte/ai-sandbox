// A0.1 — Hello World.
// Demo lesson: shows the minimal Lesson contract.
// No ML logic: only mock data and console.log output.

import { logger } from '../../../core/logger.js';
import type { Lesson } from '../../types.js';

export const lesson: Lesson = {
    id: 'a0/lesson-01',
    level: 'a0',
    title: 'Introduction to AI (demo)',
    description: 'Mock lesson: greeting and echo of the incoming payload.',

    execute(payload: unknown): unknown {
        logger.info('lesson', `a0/lesson-01 received payload: ${JSON.stringify(payload)}`);

        // Mock data so the response shape is visible right away.
        return {
            message: 'Hello from A0.1',
            received: payload ?? null,
            mockPrediction: 0.42,
        };
    },
};

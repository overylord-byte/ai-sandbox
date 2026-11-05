// A0.2 — Mock regression.
// Demo lesson: imitates the response of a "trained" model without any training.
// Why: demonstrates the separation of train/inference — here only an inference stub.
// In a real lesson the constant will be replaced by a call to a separate training module.

import { logger } from '../../../core/logger.js';
import type { Lesson } from '../../types.js';

/** Hypothetical "model": y = 2x + 1. Real training appears in later lessons. */
const MOCK_FEATURES = [1, 2, 3, 4, 5];
const MOCK_LABELS = MOCK_FEATURES.map((x) => 2 * x + 1);

export const lesson: Lesson = {
    id: 'a0/lesson-02',
    level: 'a0',
    title: 'Mock regression (demo)',
    description: 'Mock lesson: sample dataset and a "prediction" from a linear function.',

    execute(payload: unknown): unknown {
        logger.info('lesson', `a0/lesson-02 received payload: ${JSON.stringify(payload)}`);

        const x = typeof (payload as { x?: unknown })?.x === 'number'
            ? (payload as { x: number }).x
            : MOCK_FEATURES[MOCK_FEATURES.length - 1];

        return {
            model: 'mock-linear-v0',
            formula: 'y = 2x + 1',
            dataset: { features: MOCK_FEATURES, labels: MOCK_LABELS },
            input: { x },
            prediction: 2 * x + 1,
        };
    },
};

// Standalone experiment.
// Why: the architecture supports three execution models. This script is an example of
// "Standalone Scripts": it does not start Express, it simply runs code and prints results.
// Run: npm run experiment

import { logger } from '../core/logger.js';

function main(): void {
    logger.info('experiment', 'start');

    // Mock "model": formula y = 2x + 1.
    const predict = (x: number): number => 2 * x + 1;

    const inputs = [1, 2, 3, 4, 5];
    const outputs = inputs.map(predict);

    logger.info('experiment', `inputs:  ${JSON.stringify(inputs)}`);
    logger.info('experiment', `outputs: ${JSON.stringify(outputs)}`);
    logger.info('experiment', 'done');
}

main();

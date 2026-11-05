// Startup task registry.
// Why: the architecture requires expensive initialization (dataset loading, model building)
// to run ONCE per process start, not on every request.
// The registry is the minimal solution: a set of named functions executed during bootstrap.

import { logger } from './logger.js';

type StartupTask = {
    name: string;
    run: () => void | Promise<void>;
};

const tasks: StartupTask[] = [];

/** Registers a task to be executed on server startup. */
export function registerStartupTask(name: string, run: StartupTask['run']): void {
    tasks.push({ name, run });
}

/** Runs all registered tasks sequentially. */
export async function runStartupTasks(): Promise<void> {
    logger.info('init', `running ${tasks.length} startup task(s)`);
    for (const task of tasks) {
        const startedAt = Date.now();
        await task.run();
        // Demonstrates that the task actually ran once — for this educational example.
        logger.info('init', `${task.name} done in ${Date.now() - startedAt} ms`);
    }
    logger.info('init', 'all startup tasks finished');
}

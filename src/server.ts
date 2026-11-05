// Application bootstrap.
// Why: the order follows architecture.md strictly — configuration and initialization first,
// then server start. If a startup task fails, the server does not come up in a broken state.

import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './core/logger.js';
import { registerStartupTask, runStartupTasks } from './core/initialization.js';

// Demo startup task: imitates expensive initialization (dataset loading).
registerStartupTask('load mock dataset', () => {
    const rows = 100;
    logger.info('init', `loading mock dataset with ${rows} rows`);
    // In a real lesson this would be data loading / splitting.
});

async function bootstrap(): Promise<void> {
    logger.info('server', `environment: ${env.nodeEnv}`);

    await runStartupTasks();

    app.listen(env.port, () => {
        logger.info('server', `started on http://localhost:${env.port}`);
        logger.info('server', 'try GET /api');
    });
}

bootstrap().catch((error: unknown) => {
    logger.error('server', 'failed to start', error);
    process.exit(1);
});

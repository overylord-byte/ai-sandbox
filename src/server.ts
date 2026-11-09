// Application bootstrap.
// Why: the order follows architecture.md strictly — configuration and initialization first,
// then server start. If a startup task fails, the server does not come up in a broken state.

import {app} from './app.js';
import {env} from './config/env.js';
import {logger} from './core/logger.js';
import {registerStartupTask, runStartupTasks} from './core/initialization.js';
import {ApartmentPricingModel, trainModel} from "./ml/pricing/training-price-model";
import {apartments} from "./ml/pricing/dataset";

export let apartmentPricingModel: ApartmentPricingModel;

// Price model: training runs once per process start, never inside a request handler.
registerStartupTask('train price model', () => {
    apartmentPricingModel = trainModel(apartments);
    logger.info('init', 'price model trained');
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

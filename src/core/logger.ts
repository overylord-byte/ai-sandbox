// Simple prefixed logger.
// Why: at the learning stage a full-fledged logger (pino/winston) is an unnecessary dependency.
// A single console.log with a tag is enough to distinguish output by source.

type Level = 'info' | 'warn' | 'error';

function format(level: Level, scope: string, message: string): string {
    const time = new Date().toISOString();
    return `[${time}][${level}][${scope}] ${message}`;
}

export const logger = {
    info(scope: string, message: string, ...args: unknown[]): void {
        console.log(format('info', scope, message), ...args);
    },
    warn(scope: string, message: string, ...args: unknown[]): void {
        console.warn(format('warn', scope, message), ...args);
    },
    error(scope: string, message: string, ...args: unknown[]): void {
        console.error(format('error', scope, message), ...args);
    },
};

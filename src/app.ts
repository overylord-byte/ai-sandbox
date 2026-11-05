import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
    });
});

app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        message: 'Medicine bot server is running',
    });
});
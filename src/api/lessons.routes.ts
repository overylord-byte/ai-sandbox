// HTTP wrapper around the lesson registry.
// Why: all Express specifics (req/res, status codes) live here, while lessons
// stay pure and reusable.
// :lessonId contains a slash ("a0/lesson-01"), so Express 5 handles such parameters
// via the wildcard syntax *lessonId.

import { Router, Request, Response } from 'express';
import { logger } from '../core/logger.js';
import { getLesson, listLessons } from '../lessons/index.js';

export const lessonsRouter = Router();

// Express 5 helper: assembles a parameter that may contain slashes into a string.
function readLessonId(req: Request): string {
    const raw = req.params.lessonId;
    if (Array.isArray(raw)) {
        return raw.join('/');
    }
    return raw ?? '';
}

lessonsRouter.get('/api/lessons', (_req: Request, res: Response) => {
    const summaries = listLessons();
    logger.info('api', `GET /api/lessons -> ${summaries.length} lesson(s)`);
    res.status(200).json({ count: summaries.length, lessons: summaries });
});

lessonsRouter.get('/api/lessons/*lessonId', (req: Request, res: Response) => {
    const lessonId = readLessonId(req);
    const lesson = getLesson(lessonId);
    logger.info('api', `GET /api/lessons/${lessonId}`);

    if (!lesson) {
        res.status(404).json({ ok: false, error: `Lesson "${lessonId}" not found` });
        return;
    }

    res.status(200).json({
        id: lesson.id,
        level: lesson.level,
        title: lesson.title,
        description: lesson.description,
    });
});

lessonsRouter.post('/api/lessons/*lessonId/execute', (req: Request, res: Response) => {
    const lessonId = readLessonId(req);
    const lesson = getLesson(lessonId);
    logger.info('api', `POST /api/lessons/${lessonId}/execute body=${JSON.stringify(req.body)}`);

    if (!lesson) {
        res.status(404).json({ ok: false, error: `Lesson "${lessonId}" not found` });
        return;
    }

    // Important: the logic itself stays in the lesson; the handler only wraps the call.
    const result = lesson.execute(req.body);
    res.status(200).json({ ok: true, lessonId, result });
});

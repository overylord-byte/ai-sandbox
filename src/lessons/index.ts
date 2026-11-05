// Lesson registry.
// Why: single entry point for the api/ layer. New lessons are registered here with one line;
// the internal architecture of each lesson may differ (allowed by the architecture document).
// The registry is a Map to look up a lesson by id in O(1).

import type { Lesson, LessonId, LessonSummary } from './types.js';
import { lesson as a0Lesson01 } from './a0/lesson-01/index.js';
import { lesson as a0Lesson02 } from './a0/lesson-02/index.js';

const registry = new Map<LessonId, Lesson>();

function register(lesson: Lesson): void {
    registry.set(lesson.id, lesson);
}

register(a0Lesson01);
register(a0Lesson02);

export function listLessons(): LessonSummary[] {
    return Array.from(registry.values()).map(({ id, level, title, description }) => ({
        id,
        level,
        title,
        description,
    }));
}

export function getLesson(id: LessonId): Lesson | undefined {
    return registry.get(id);
}

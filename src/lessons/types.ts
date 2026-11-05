// Lesson contract.
// Why: the architecture requires lessons to be independent of Express — a lesson operates
// on a payload and returns a result. The HTTP wrapper (validation, statuses) lives in api/.
// This lets the same lesson be reused from both API and scripts.

export type LessonId = string;

export interface Lesson {
    /** Unique lesson identifier. */
    id: LessonId;
    /** Roadmap level. */
    level: string;
    /** Human-readable title. */
    title: string;
    /** Short description for the lessons listing. */
    description: string;
    /** Lesson body; returns mock data in demos. */
    execute(payload: unknown): unknown;
}

/** Short lesson representation for listing. */
export interface LessonSummary {
    id: LessonId;
    level: string;
    title: string;
    description: string;
}

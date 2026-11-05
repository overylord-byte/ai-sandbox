# Architecture — AI Training Lab

> Educational project. Current code is a skeleton with mock endpoints;
> real lesson logic is added incrementally.

## 1. Purpose

Educational Node.js application for learning
AI engineering through practical experiments.

The project supports:
- Running standalone TypeScript scripts.
- Implementing experiments for different AI topics.
- Exposing functionality through HTTP APIs.
- Executing initialization logic at server startup.
- Testing and comparing different approaches.

The architecture must remain independent
of any specific learning topic.

## 2. Tech Stack

Core:
- Node.js
- TypeScript (strict)
- Express

Additional libraries:
- Introduced only when required by a lesson.
- Must not become global architectural dependencies
  without justification.

## 3. Project Structure

src/
app.ts                        # Express configuration (createApp + mount routers)
server.ts                     # Application bootstrap (startup tasks + listen)

api/                          # HTTP endpoints
index.ts                      # Router aggregator
health.routes.ts              # GET /health, GET /api
lessons.routes.ts             # GET /api/lessons, GET/POST /api/lessons/:lessonId

core/                         # Shared infrastructure
logger.ts                     # Minimal console-based logger
initialization.ts             # Startup task registry

lessons/                      # Lesson implementations
index.ts                      # Lesson registry
types.ts                      # Lesson contract
a0/
lesson-01/
lesson-02/

scripts/                      # Standalone experiments (under src/)
example-experiment.ts         # npm run experiment

config/
env.ts                        # Environment configuration

docs/
architecture.md               # Architecture
roadmap.md                    # Learning curriculum
progress.md                   # Current learning state

Why scripts live under src/: tsconfig's rootDir is src, so scripts
are type-checked together with the application. Standalone execution
does not require a compiled build (tsx runs the source directly).

## 4. Application Lifecycle

Server startup:
1. Load application configuration.
2. Initialize required components.
3. Execute startup tasks when necessary.
4. Register HTTP endpoints.
5. Start the Express server.

HTTP request:
1. Validate incoming data.
2. Execute the appropriate handler.
3. Return the response.

Expensive initialization should not run
on every HTTP request.

## 5. Lesson Organization

Each lesson may introduce its own:
- Business logic
- Experiments
- API endpoints
- Dependencies
- Initialization requirements

Example:

src/lessons/
a0/
lesson-01/
lesson-02/
a1/
lesson-01/
a2/
lesson-01/

Lesson implementations should be isolated
from each other whenever practical.

Do not enforce the same internal architecture
for every lesson.

## 6. Execution Models

The project supports three execution models.

### Standalone Scripts

Used for experiments that do not require
an HTTP server.

Example:
npm run experiment

### Startup Initialization

Used when a lesson requires data preparation
or resource initialization before serving API requests.

Initialization runs once per server process startup.

### Request Processing

Used for experiments exposed through HTTP APIs.

Request handlers should not repeat expensive
initialization unless explicitly required
by the experiment.

## 7. Architectural Principles

- Keep the core application topic-independent.
- Prefer simple implementations.
- Keep lesson-specific logic inside lessons.
- Avoid unnecessary abstractions.
- Do not introduce dependencies prematurely.
- Separate initialization from request processing.
- Use shared infrastructure only when justified.
- Prefer composition over inheritance.
- Support gradual architectural evolution.

## 8. API Design

API endpoints are introduced when required
by a lesson.

Example:

POST /api/lessons/:lessonId/execute

This is a possible convention, not a mandatory
endpoint.

Lessons may expose dedicated endpoints
when appropriate.

## 9. Architecture Evolution

The architecture evolves with the curriculum.

Before introducing architectural changes:
1. Inspect the existing implementation.
2. Identify the actual requirement.
3. Prefer the smallest reasonable change.
4. Explain architectural trade-offs.
5. Update this document if necessary.

Do not redesign previously implemented lessons
unless explicitly requested.

## 11. Implementation Status

Current state: skeleton implemented.

- `src/api/` — routers for health and lessons (mock endpoints).
- `src/core/` — logger and startup task registry.
- `src/lessons/` — registry contract plus two demo lessons (a0/lesson-01,
  a0/lesson-02) that return mock data only; no real learning yet.
- `src/scripts/` — one standalone experiment (`npm run experiment`).
- Startup initialization demonstrated via a mock "load dataset" task.

Not yet implemented:
- Real lesson logic (training / evaluation / inference).
- Automated tests.
- Error-handling middleware beyond the 404 fallback.

The actual implementation may evolve.

Keep the document aligned with the codebase.
Do not describe planned functionality as implemented.

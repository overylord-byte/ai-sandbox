# node-ts-express-template

Minimal Node.js + TypeScript + Express template for building backend services.

This template provides a clean starting point with preconfigured TypeScript, ESLint, and a basic project structure. It is designed to be used as a foundation for new projects.

## Features

* Node.js + Express
* TypeScript setup
* ESLint configuration
* Ready-to-use project structure
* Dev and production scripts

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Run production build

```bash
npm run start
```

## Usage

Use this repository as a template to bootstrap new backend projects.
Clone or fork it, then start building your own services on top of it.

## Demo API

The current implementation exposes mock endpoints used as placeholders.
They log each request and return static data — no ML logic yet.

| Method | Path                              | Description                                    |
|--------|-----------------------------------|------------------------------------------------|
| GET    | `/health`                         | Health check                                   |
| GET    | `/api`                            | List of available endpoints                    |
| GET    | `/api/lessons`                    | List registered demo lessons                   |
| GET    | `/api/lessons/:lessonId`          | Lesson details (`a0/lesson-01`, `a0/lesson-02`)|
| POST   | `/api/lessons/:lessonId/execute`  | Run a lesson with a JSON payload               |

Examples:

```bash
curl http://localhost:3000/api/lessons
curl http://localhost:3000/api/lessons/a0/lesson-01
curl -X POST http://localhost:3000/api/lessons/a0/lesson-02/execute \
  -H "Content-Type: application/json" -d '{"x":10}'
```

## Scripts

```bash
npm run dev         # start dev server with watch mode
npm run build       # compile TypeScript
npm run start       # run compiled app
npm run experiment  # run a standalone experiment script (src/scripts/*)
npm run lint        # run ESLint
npm run lint:fix    # fix ESLint issues
```

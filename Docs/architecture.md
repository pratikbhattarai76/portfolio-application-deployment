# Architecture

The portfolio application is deployed as a containerized server-side rendered (SSR) application.

## Flow

User
    ↓
Cloudflare
    ↓
Server
    ↓
Portfolio App (Astro SSR running on Node.js)

## Explanation

- The application is built using Astro with server-side rendering.
- It runs inside a Docker container using Node.js as the runtime.
- Cloudflare handles DNS and HTTPS for the domain.
- The server runs Docker and pulls the application image from GHCR.
- The application listens on port 4321 inside the container.

## Key Design Decisions

- Docker is used for consistent runtime across environments.
- Node.js is required because the app uses SSR and features like Nodemailer.
- The server only runs the built image and does not store application source code.

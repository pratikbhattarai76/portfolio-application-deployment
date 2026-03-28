# Deployment

The portfolio application is deployed using Docker Compose on a self-hosted server.

## Deployment Setup

- The application is containerized using a Dockerfile.
- The server uses Docker Compose to run the container.
- The image is pulled from GitHub Container Registry (GHCR).
- Environment variables are stored on the server in a `.env` file.

## Deployment Flow

1. GitHub Actions builds and publishes the Docker image.
2. The server periodically checks for new images.
3. If a new image is available, the container is updated.

## Important Points

- The server does not store application source code.
- Deployment is fully image-based.
- Docker Compose manages the container lifecycle.
- Updates are applied without manual intervention.

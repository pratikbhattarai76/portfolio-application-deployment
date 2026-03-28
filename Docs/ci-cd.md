# CI/CD Pipeline

This project uses GitHub Actions for CI and a pull-based deployment model for CD.

## Pipeline Flow

git push
    ↓
GitHub Actions runs verification
    ↓
Build Docker image
    ↓
Push image to GHCR
    ↓
Server-side cron job runs every 30 minutes
    ↓
Bash update script checks for new image
    ↓
docker compose pull
    ↓
docker compose up -d

## Key Ideas

- CI is handled by GitHub Actions.
- The Docker image is built and pushed to GHCR.
- The server does not receive direct deployment commands.
- A cron job triggers a bash script every 30 minutes.
- The script pulls the latest image and updates the container if needed.

## Why This Approach

- No need to expose the server for remote deployment triggers.
- Simple and reliable deployment model.
- Suitable for self-hosted environments.

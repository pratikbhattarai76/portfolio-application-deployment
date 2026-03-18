# portfolio-app

Simple portfolio site built with Astro and Tailwind CSS.

## Requirements

- Node.js `22.12.0` or newer
- npm
- Docker (optional, for container build/run)

## Run locally

1. Install dependencies:

```bash
npm ci
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Update the values in `.env` as needed. The contact form uses SMTP settings from this file.

4. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:4321`.

## Production build

Build the app:

```bash
npm run build
```

Start the built server:

```bash
npm run start
```

## Build Docker image

The contact form configuration is compiled during the Astro build, so pass the SMTP values as build arguments when creating the image:

```bash
docker build \
  --build-arg SMTP_HOST=smtp.gmail.com \
  --build-arg SMTP_PORT=465 \
  --build-arg SMTP_USER=your-email@example.com \
  --build-arg SMTP_PASS=your-app-password \
  --build-arg SMTP_SECURE=true \
  --build-arg SMTP_FROM_EMAIL=your-email@example.com \
  --build-arg SMTP_FROM_NAME="Portfolio" \
  --build-arg CONTACT_TO_EMAIL=your-email@example.com \
  -t portfolio-app .
```

## Run with Docker

Run the container:

```bash
docker run --rm -p 4321:4321 portfolio-app
```

The app will be available at `http://localhost:4321`.

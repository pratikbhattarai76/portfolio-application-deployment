# 🚀 My Personal DevOps Portfolio & Cloud Portal

A high-performance, Server-Side Rendered (SSR) portfolio application that serves as the public entry point to my self-hosted private cloud environment.

This repository contains the portfolio application source code, contact form API logic, and the Docker build configuration used to package the app for deployment.

**🔗 Live Deployment:** [Portfolio](https://web.pratik-labs.xyz)
**⚙️ Infrastructure Repository:** Deployment and production infrastructure are managed separately in my private cloud infrastructure repository.

---

## 🏗️ Application Role in the Architecture

This repository is responsible for the **application layer** of the portfolio platform:

- Astro-based SSR portfolio application
- Contact form API endpoint
- Docker image build process
- GitHub-based source control and CI image workflow

The **production deployment layer** is managed outside this repository as part of my broader private cloud infrastructure, including: [Private Cloud Architecture]()https://github.com/pratikbhattarai76/private-cloud-infrastructure.git

- Docker Compose orchestration
- Reverse proxy routing
- Cloudflare Tunnel integration
- Shared Docker networking

---

## 🏗️ DevOps & Architectural Highlights

### Multi-Stage Docker Build
The application uses a 3-stage Dockerfile to improve efficiency, portability, and security. Dependencies are installed in a dedicated stage, the Astro application is built in a separate builder stage, and only the production artifacts are copied into the final runtime image.

### Server-Side Rendering with Node.js
The project uses the Astro Node adapter to run as an SSR application instead of a static export. This allows the portfolio to serve dynamic functionality such as backend API routes for the contact form while still keeping the frontend lightweight.

### Runtime Secret Injection
Sensitive runtime values such as SMTP credentials are not embedded into the image. They are injected during deployment through environment variables managed outside the repository.

### Infrastructure Separation
Application code and infrastructure code are intentionally separated. This repository focuses on application development and image creation, while deployment orchestration is managed through the private cloud infrastructure repository.

### Cloud-Native Deployment Style
The application is built as a portable container image and integrated into a broader reverse-proxied, tunnel-based homelab deployment model, reflecting real-world DevOps and platform engineering practices.

---

## 🛠️ Technology Stack

### Application Layer
- **Framework:** Astro
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Rendering Mode:** Server-Side Rendering (SSR)
- **API Layer:** Astro API Routes
- **Email Service:** Nodemailer with SMTP

### Delivery & Operations
- **Containerization:** Docker
- **Image Registry:** GitHub Container Registry (GHCR)
- **Reverse Proxy:** Nginx / Nginx Proxy Manager *(managed externally)*
- **Edge Access:** Cloudflare DNS + Cloudflare Tunnel *(managed externally)*
- **Deployment Orchestration:** Docker Compose *(managed externally in infrastructure repository)*

---

## ⚙️ Local Development Setup

To run this project locally for development or testing:

```bash
# 1. Clone the repository
git clone https://github.com/pratikbhattarai76/portfolio-app.git
cd portfolio-app

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start the development server
npm run dev

```

## 🔐 Environment Variables

This project uses environment variables for runtime configuration, primarily for the SMTP-powered contact form.

Create a local `.env` file from `.env.example` and provide the required values before running the app.

### Example `.env.example`

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=mailer@example.com
SMTP_PASS=replace-with-your-smtp-password
SMTP_FROM_EMAIL=mailer@example.com
SMTP_FROM_NAME=Portfolio Contact Form
CONTACT_TO_EMAIL=owner@example.com
```

## 📌 Notes

- This repository does **not** contain the full production infrastructure stack. [Private Cloud Architecture]()https://github.com/pratikbhattarai76/private-cloud-infrastructure.git
- Production deployment is orchestrated from the private cloud infrastructure repository.
- Reverse proxy, public routing, and tunnel configuration are managed outside this application repository.

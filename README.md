# 🚀 My Personal DevOps Portfolio & Cloud Portal

A high-performance, Server-Side Rendered (SSR) portfolio built to act as the public ingress point for my self-hosted Hybrid Private Cloud. 

This repository contains the application source code, API logic for the SMTP contact module, and the automated containerization blueprints (`Dockerfile`).

🔗 **Live Deployment:** [pratik-labs.xyz](https://web.pratik-labs.xyz)
⚙️ **Infrastructure Repo:** [View the Private Cloud Architecture here](https://github.com/pratikbhattarai76/private-cloud-infrastructure)

---

## 🏗️ DevOps & Architectural Highlights

While this functions as a portfolio, it was engineered as a **Proof of Concept** for cloud-native deployment practices:

*   **Multi-Stage Docker Build:** Utilizes a 3-stage `Dockerfile` to drastically reduce image size and attack surface. It compiles the TypeScript/Astro assets using `node:22-bookworm-slim` and ships only the compiled production artifacts in the final runner stage.
*   **Runtime Secret Injection:** Strict separation of build-time and run-time environments. SMTP credentials and API keys are not baked into the image; they are passed securely via `.env` files and `docker-compose` at runtime.
*   **Node.js SSR Adapter:** Configured to run as a dynamic Node server rather than a static site, enabling real-time REST API endpoints (like the contact form webhook) while maintaining edge-level caching.

---

## 🛠️ Technology Stack

**Application Layer:**
*   **Framework:** Astro
*   **Language:** Strict TypeScript
*   **Styling:** Tailwind CSS + Glassmorphism UI
*   **API:** Built-in Astro API Routes (Node.js)
*   **Email Delivery:** Nodemailer (SMTP Integration)

**Deployment Layer:**
*   **Containerization:** Docker (`pratikbhattarai76/portfolio-app:latest`)
*   **Reverse Proxy:** Nginx Proxy Manager (External Repo)
*   **Edge Security:** Cloudflare Zero Trust Tunnels (External Repo)

---

## ⚙️ Local Development Setup

To run this project locally for development or testing:

```bash
# 1. Clone the repository
git clone https://github.com/pratikbhattarai76/portfolio-app.git
cd portfolio-app

# 2. Install dependencies
npm install

# 3. Configure Environment Variables
cp .env.example .env
# Edit the .env file with your SMTP credentials (see variables below)

# 4. Start the development server
npm run dev

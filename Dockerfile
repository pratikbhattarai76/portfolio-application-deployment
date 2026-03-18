FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app

ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_USER
ARG SMTP_PASS
ARG SMTP_SECURE
ARG SMTP_FROM_EMAIL
ARG SMTP_FROM_NAME
ARG CONTACT_TO_EMAIL

ENV SMTP_HOST=$SMTP_HOST
ENV SMTP_PORT=$SMTP_PORT
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASS=$SMTP_PASS
ENV SMTP_SECURE=$SMTP_SECURE
ENV SMTP_FROM_EMAIL=$SMTP_FROM_EMAIL
ENV SMTP_FROM_NAME=$SMTP_FROM_NAME
ENV CONTACT_TO_EMAIL=$CONTACT_TO_EMAIL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 4321

USER node

CMD ["node", "./dist/server/entry.mjs"]

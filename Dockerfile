FROM node:25.8.1-bookrowm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:25.8.1-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:25.8.1-bookworm-slim AS runner
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

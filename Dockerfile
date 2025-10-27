FROM node:22 as ts-compiler

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src/ ./src
COPY prisma/ ./prisma
COPY .env* ./

RUN npm ci
RUN npm run build

FROM node:22-slim
WORKDIR /app

# prisma ssl
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=ts-compiler /app/package*.json ./
COPY --from=ts-compiler /app/dist ./dist
COPY --from=ts-compiler /app/prisma ./prisma
COPY --from=ts-compiler /app/.env* ./
COPY --from=ts-compiler /app/tsconfig.json ./

RUN npm ci --omit=dev

EXPOSE 8080

CMD ["node", "dist/index.js"]
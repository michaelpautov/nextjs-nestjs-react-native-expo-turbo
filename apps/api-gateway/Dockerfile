# Use an official Node.js runtime as the base image. Base stage to have pnpm installed
FROM node:20.17-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# Install Python and build tools
RUN apk add --no-cache python3 make g++ build-base

# DEFINING DEVELOPMENT STAGE
FROM base AS dev

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-gateway ./apps/api-gateway
COPY tooling ./tooling
COPY packages ./packages

RUN pnpm install && \
    pnpm add -w -D dotenv-cli && \
    pnpm -r prebuild && \
    pnpm -r build && \
    pnpm i && \
    pnpm prune --prod

# DEFINING PRODUCTION STAGE
FROM base AS prod

WORKDIR /app
COPY --from=dev app/ .

USER node

CMD ["node", "apps/api-gateway/dist/main"]

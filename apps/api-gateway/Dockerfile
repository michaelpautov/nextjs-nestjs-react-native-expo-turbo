# Use an official Node.js runtime as the base image. Base stage to have pnpm installed
FROM node:20.17-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# DEFINING DEVELOPMENT STAGE
FROM base AS dev

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api-gateway ./apps/api-gateway
COPY tooling ./tooling
COPY packages ./packages

RUN pnpm install && \
    pnpm -r prebuild && \
    pnpm -r build && \
    pnpm i && \
    pnpm prune --prod

# DEFINING PRODUCTION STAGE
FROM base AS prod

WORKDIR /app
COPY --from=dev app/ .

USER node

EXPOSE 8080
#RUN sleep 500;
#CMD ["node", "/apps/api-gateway/dist/main"]

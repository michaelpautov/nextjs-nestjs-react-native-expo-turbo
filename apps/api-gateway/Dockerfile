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

# Command to run the application's 'dist/main' file with 'node'
CMD ["node", "apps/api-gateway/dist/main"]

###########
# WIP
###########

# Use an official Node.js runtime as the base image. Base stage to have pnpm installed
# FROM node:20.17-alpine AS base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable pnpm

# DEFINING DEVELOPMENT STAGE
# FROM base AS dev

# WORKDIR /app

# RUN pnpm fetch

# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# COPY apps/api-gateway ./apps/api-gateway
# COPY tooling ./tooling
# COPY packages ./packages

# RUN pnpm install && \
#     pnpm -r build && \
#     pnpm i


# RUN \
#     if [ "$NODE_ENV" = "production" ]; then \
#     corepack enable pnpm && pnpm prune --prod; \
#     fiq


# DEFINING PRODUCTION STAGE
# FROM base AS prod

# WORKDIR /app
# COPY --from=dev --chown=node:node /app/apps/api-gateway/dist ./apps/api-gateway/dist
# COPY --from=dev --chown=node:node /app/apps/api-gateway/node_modules ./apps/api-gateway/node_modules
# COPY --from=dev --chown=node:node /app/node_modules ./node_modules

# USER node

# Command to run the application's 'dist/main' file with 'node'
# CMD ["node", "apps/api-gateway/dist/main"]

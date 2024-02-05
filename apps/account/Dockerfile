FROM node:18-bullseye-slim AS base

# --- Pruned ---

FROM base AS pruned

RUN apt-get update
WORKDIR /app

RUN npm install turbo --global

COPY . .

RUN turbo prune --scope=account --docker

# --- Install & Build ---

FROM base AS installer
RUN apt-get update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruned /app/out/json/ .
COPY --from=pruned /app/out/package-lock.json ./package-lock.json

RUN npm install

COPY --from=pruned /app/out/full/ .

# Build the project

RUN (timeout 100 npx turbo run build --filter=account...; exit 0)

# --- RUN ---

FROM nginx:stable-alpine as runner

COPY --from=installer /app/apps/account/dist /usr/share/nginx/html
COPY infrastructure/account/nginx/nginx.conf /etc/nginx

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build Storybook static site
FROM node:22-alpine AS builder

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build-storybook

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/storybook-static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

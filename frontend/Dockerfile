FROM node:20-alpine AS builder

ENV NODE_ENV=production

COPY package.json .

RUN npm install --non-interactive

COPY . .

RUN npm run build-only --force

FROM sebp/lighttpd

COPY --from=builder dist /var/www/localhost/htdocs